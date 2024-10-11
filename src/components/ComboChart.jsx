import React, { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
} from "chart.js";
import Papa from "papaparse";
import moment from "moment";  // Use moment.js for date manipulation

// Register Chart.js components
ChartJS.register(
  Title,
  Tooltip,
  Legend,
  BarElement,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement
);

const ComboChart = ({ csvFile, timeFrame }) => {
  const [data, setData] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    // Parse the CSV file using PapaParse
    Papa.parse(csvFile, {
      download: true,
      header: true,
      dynamicTyping: true,
      complete: (result) => {
        const parsedData = result.data;
        let labels = [];
        let barData = [];
        let lineData = [];

        // Check timeFrame and process the data accordingly
        if (timeFrame === "daily") {
          const hourlyData = processDailyData(parsedData);
          labels = hourlyData.labels;
          barData = hourlyData.barData;
          lineData = hourlyData.lineData;
        } else if (timeFrame === "weekly") {
          const weeklyData = processWeeklyData(parsedData);
          labels = weeklyData.labels;
          barData = weeklyData.barData;
          lineData = weeklyData.lineData;
        } else if (timeFrame === "monthly") {
          const monthlyData = processMonthlyData(parsedData);
          labels = monthlyData.labels;
          barData = monthlyData.barData;
          lineData = monthlyData.lineData;
        }

        // Set chart data
        setData({
          labels: labels,
          datasets: [
            {
              label: "Message Count",
              data: barData,
              backgroundColor: "rgba(67, 229, 244, 0.7)",  // Transparent background for bars
              hoverBackgroundColor: "rgba(170, 240, 242, 0.9)",
              type: "bar",
              borderRadius: 10,
              barThickness: 20,
              borderSkipped: false,
              order: 1,  // Lower order so bars are behind the line
            },
            {
              label: "Message Percentage (%)",
              data: lineData,
              borderColor: theme === "light" ? "#43e5f4" : "#43e5f4",
              backgroundColor: "rgba(52, 152, 219, 0.2)",
              tension: 0.1,
              type: "line",
              pointRadius: 5,
              pointBackgroundColor: theme === "light" ? "#055457" : "#1e90ff",
              pointBorderColor: "#ffffff",
              pointHoverBackgroundColor: "#ffffff",
              pointHoverBorderColor: theme === "light" ? "#2980b9" : "#1e90ff",
              order: 2,  // Higher order so the line is above the bars
            },
          ],
        });
      },
    });

    // Handle theme change
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [csvFile, timeFrame]);

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false, // Make chart responsive to the container
    plugins: {
      legend: {
        position: "top",
      },
      tooltip: {
        backgroundColor: theme === "light" ? "#ffffff" : "#1e1e1e",
        borderColor: theme === "light" ? "#cccccc" : "#333333",
        borderWidth: 1,
        titleColor: theme === "light" ? "#333333" : "#ffffff",
        bodyColor: theme === "light" ? "#333333" : "#ffffff",
        callbacks: {
          label: function (tooltipItem) {
            return `${tooltipItem.dataset.label}: ${tooltipItem.raw}`;
          },
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      x: {
        grid: {
          color: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
          borderColor: theme === "light" ? "#cccccc" : "#444444",
          borderWidth: 1,
        },
        ticks: {
          color: theme === "light" ? "#333333" : "#bbbbbb",
        },
      },
      y: {
        grid: {
          color: theme === "light" ? "rgba(0, 0, 0, 0.1)" : "rgba(255, 255, 255, 0.1)",
          borderColor: theme === "light" ? "#cccccc" : "#444444",
          borderWidth: 1,
        },
        ticks: {
          color: theme === "light" ? "#333333" : "#bbbbbb",
        },
      },
    },
  };

  return (
    <div style={styles.chartContainer(theme)}>
      <div style={styles.chartWrapper}>
        {data && <Line data={data} options={chartOptions} />}
      </div>
    </div>
  );
};

// Process daily data (hourly distribution for a specific day)
const processDailyData = (parsedData) => {
  const labels = [];
  const barData = [];
  const lineData = [];
  parsedData.forEach((row) => {
    const hour = row.hour; // Assumes 'hour' column is present
    labels.push(`${hour}:00`); // Example label: '10:00'
    barData.push(row.messageCount);
    lineData.push(row.messagePercentage);
  });
  return { labels, barData, lineData };
};

// Process weekly data (daily distribution for a week)
const processWeeklyData = (parsedData) => {
  const labels = [];
  const barData = [];
  const lineData = [];
  parsedData.forEach((row) => {
    const dayOfWeek = moment(row.date).format("dddd"); // Convert date to weekday
    labels.push(dayOfWeek);
    barData.push(row.messageCount);
    lineData.push(row.messagePercentage);
  });
  return { labels, barData, lineData };
};

// Process monthly data (weekly distribution for a specific month)
const processMonthlyData = (parsedData) => {
  const labels = [];
  const barData = [];
  const lineData = [];
  const weeksData = {};
  parsedData.forEach((row) => {
    const weekNumber = moment(row.date).week(); // Convert date to week number
    if (!weeksData[weekNumber]) {
      weeksData[weekNumber] = { messageCount: 0, messagePercentage: 0 };
    }
    weeksData[weekNumber].messageCount += row.messageCount;
    weeksData[weekNumber].messagePercentage += row.messagePercentage;
  });
  Object.keys(weeksData).forEach((week) => {
    labels.push(`Week ${week}`);
    barData.push(weeksData[week].messageCount);
    lineData.push(weeksData[week].messagePercentage);
  });
  return { labels, barData, lineData };
};

// Styles for the chart container and chart wrapper
const styles = {
  chartContainer: (theme) => ({
    width: "100%",
    height: "100%", // Ensure chart takes up 100% of the parent container
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    borderRadius: "15px",
    backgroundColor: "transparent",
    transition: "background-color 0.3s ease, box-shadow 0.3s ease",
  }),
  chartWrapper: {
    width: "100%",
    height: "100%",
  },
};

export default ComboChart;
