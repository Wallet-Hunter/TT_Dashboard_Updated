import React, { useState, useEffect, useCallback } from "react";
import { Bar } from "react-chartjs-2";
import Papa from "papaparse";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChart = ({
  csvFile,
  timeFrame = "daily",
  isDashboard = false,
  chartTitle = "Member Count",
  dataKey = "member_count",
  dateKey = "date_only",
  timeKey = "time", // Assuming there is a time key for hourly data in the CSV
  backgroundColorLight = "rgba(75, 192, 192, 1)",
  backgroundColorDark = "rgba(67, 229, 244, 1)",
}) => {
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: chartTitle,
        data: [],
        backgroundColor: backgroundColorLight,
        borderColor: backgroundColorLight,
        borderWidth: 1,
      },
    ],
  });

  const [rawData, setRawData] = useState([]); // Store raw CSV data

  // Fetch and parse CSV data
  const fetchData = useCallback(async () => {
    try {
      const response = await fetch(csvFile);
      const text = await response.text();

      Papa.parse(text, {
        header: true,
        complete: (results) => {
          if (results.data.length > 0) {
            setRawData(results.data);
            processCSVData(results.data);
          }
        },
        error: (error) => {
          console.error("Error parsing CSV data:", error);
        },
      });
    } catch (error) {
      console.error("Error fetching CSV file:", error);
    }
  }, [csvFile]);

  // Process CSV data based on the selected time frame
  const processCSVData = (data) => {
    const aggregatedData = {};

    // Handle hourly, daily, and weekly timeframes
    data.forEach((row) => {
      const date = new Date(row[dateKey]);
      let key;

      if (timeFrame === "daily") {
        // Group data by hours for the selected day
        key = `${row[dateKey]} ${row[timeKey].slice(0, 2)}:00`; // Example: "2024-10-10 09:00"
      } else if (timeFrame === "weekly") {
        // Group data by days of the week for the selected week
        const dayOfWeek = date.toLocaleString("default", { weekday: "short" });
        key = dayOfWeek;
      } else if (timeFrame === "monthly") {
        // Group data by weeks within the month
        const weekNumber = Math.ceil((date.getDate() + date.getDay()) / 7);
        key = `Week ${weekNumber}`;
      }

      // Aggregate data (e.g., member count)
      aggregatedData[key] = (aggregatedData[key] || 0) + parseInt(row[dataKey], 10) || 0;
    });

    // Prepare chart data
    const labels = Object.keys(aggregatedData).sort((a, b) => new Date(a) - new Date(b));
    const values = labels.map((label) => aggregatedData[label]);

    setChartData({
      labels,
      datasets: [
        {
          label: chartTitle,
          data: values,
          backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
          borderColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
          borderWidth: 1,
        },
      ],
    });
  };

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);
    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    fetchData(); // Fetch data on mount

    return () => {
      matchMedia.removeEventListener("change", handleChange);
    };
  }, [fetchData]);

  useEffect(() => {
    if (rawData.length > 0) {
      processCSVData(rawData); // Reprocess data whenever time frame changes
    }
  }, [timeFrame, rawData]);

  return (
    <div style={{ position: "relative", width: "100%", height: "100%" }}>
      <div style={{ width: "100%", height: "100%" }} className="chart-container">
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            animation: {
              duration: 1000,
              easing: "easeOutQuart",
            },
            hover: {
              animationDuration: 500,
              mode: "nearest",
              intersect: true,
            },
            plugins: {
              legend: {
                display: !isDashboard,
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {
                    return `${chartTitle}: ${tooltipItem.raw}`;
                  },
                },
              },
            },
            scales: {
              x: {
                title: {
                  display: true,
                  text:
                    timeFrame === "weekly"
                      ? "Day of Week"
                      : timeFrame === "monthly"
                      ? "Weeks"
                      : timeFrame === "daily"
                      ? "Hours"
                      : "Date",
                },
                grid: {
                  display: false,
                },
              },
              y: {
                title: {
                  display: true,
                  text: chartTitle,
                },
                beginAtZero: true,
                grid: {
                  color: isDarkMode ? "rgba(220, 220, 220, 0.1)" : "rgba(0, 0, 0, 0.1)",
                },
              },
            },
            elements: {
              bar: {
                borderRadius: 10,
                backgroundColor: isDarkMode ? backgroundColorDark : backgroundColorLight,
                hoverBackgroundColor: isDarkMode ? `${backgroundColorDark}0.7` : `${backgroundColorLight}0.7`,
              },
            },
          }}
        />
      </div>

      <style jsx>{`
        .chart-container:hover .chartjs-render-monitor {
          transform: scale(1.05); /* Scale the entire chart on hover */
          transition: transform 0.3s ease;
        }
        .chartjs-render-monitor:hover {
          transition: transform 0.3s ease;
          transform: scale(1.05); /* Scale specific bars on hover */
        }
      `}</style>
    </div>
  );
};

export default BarChart;
