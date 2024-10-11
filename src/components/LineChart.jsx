import React, { useEffect, useState } from 'react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import Papa from 'papaparse';
import styled from 'styled-components';

const LineChart = ({ csvFile, timeFrame = "daily" }) => {
  const [data, setData] = useState([]);
  const [theme, setTheme] = useState("light");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Process CSV data based on the selected time frame
  const processCSVData = (rawData) => {
    const aggregatedData = {};
    rawData.forEach(row => {
      const date = new Date(row.date); // Assuming 'date' is the field in CSV
      let key;

      // Determine the key based on the selected time frame
      switch (timeFrame) {
        case "daily":
          key = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()} ${date.getHours()}:00`;
          aggregatedData[key] = (aggregatedData[key] || 0) + parseInt(row.messages, 10) || 0;
          break;
        case "weekly":
          const dayKey = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
          const weekDay = date.toLocaleString('en-US', { weekday: 'long' }); // Get day of the week
          aggregatedData[weekDay] = (aggregatedData[weekDay] || 0) + parseInt(row.messages, 10) || 0;
          break;
        case "monthly":
          const monthKey = `${date.getFullYear()}-${date.getMonth() + 1}`;
          const weekOfMonth = Math.ceil((date.getDate() + 6) / 7); // Calculate week number of the month
          const weekKey = `Week ${weekOfMonth}`;
          aggregatedData[weekKey] = (aggregatedData[weekKey] || 0) + parseInt(row.messages, 10) || 0;
          break;
        case "yearly":
          key = `${date.getFullYear()}`;
          aggregatedData[key] = (aggregatedData[key] || 0) + parseInt(row.messages, 10) || 0;
          break;
        default:
          break;
      }
    });

    // Prepare data for the chart
    const formattedData = Object.keys(aggregatedData).sort().map(key => ({
      time: key,
      messages: aggregatedData[key],
    }));

    setData(formattedData);
  };

  // Set theme based on system preference and fetch CSV data
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);

    const fetchCSVData = async () => {
      try {
        const response = await fetch(csvFile);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            processCSVData(results.data); // Process data after parsing
            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setError("Error parsing CSV");
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
        setError("Error fetching CSV");
        setLoading(false);
      }
    };

    fetchCSVData();

    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, [csvFile]); // Only fetch once when csvFile changes

  // Refetch and process data when timeFrame changes
  useEffect(() => {
    setLoading(true); // Reset loading state
    const fetchCSVData = async () => {
      try {
        const response = await fetch(csvFile);
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const text = await response.text();
        Papa.parse(text, {
          header: true,
          complete: (results) => {
            processCSVData(results.data);
            setLoading(false);
          },
          error: (error) => {
            console.error("Error parsing CSV:", error);
            setError("Error parsing CSV");
            setLoading(false);
          }
        });
      } catch (error) {
        console.error("Error fetching CSV:", error);
        setError("Error fetching CSV");
        setLoading(false);
      }
    };

    fetchCSVData();
  }, [csvFile, timeFrame]); // This effect runs when timeFrame changes

  if (loading) {
    return <div>Loading data...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const getAxisLabel = () => {
    switch (timeFrame) {
      case "weekly":
        return "Day of Week";
      case "monthly":
        return "Week of Month";
      case "yearly":
        return "Year";
      case "daily":
      default:
        return "Hour";
    }
  };

  return (
    <ChartContainer className={theme}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsLineChart
          data={data}
          margin={{ top: 10, right: 10, left: 10, bottom: 10 }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="var(--grid-color)" />
          <XAxis
            dataKey="time"
            label={{ value: getAxisLabel(), position: 'insideBottomRight', offset: -5 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
            padding={{ left: 10, right: 10 }}
          />
          <YAxis
            label={{ value: 'Messages', angle: -90, position: 'insideLeft', offset: 10 }}
            tick={{ fill: "var(--axis-color)", fontSize: '0.8em' }}
          />
          <Tooltip
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
            contentStyle={{
              backgroundColor: 'var(--tooltip-bg)',
              border: 'none',
              color: 'var(--tooltip-color)',
              fontSize: '0.8em', // Dynamic font size for tooltips
            }}
            wrapperStyle={{ zIndex: 10 }}
          />
          <Line
            type="monotone"
            dataKey="messages"
            stroke="var(--line-color)"
            strokeWidth={2}
            dot={{ r: 4, fill: "var(--line-color)" }}
            className="animated-line"
          />
        </RechartsLineChart>
      </ResponsiveContainer>
      <Style theme={theme} />
    </ChartContainer>
  );
};

// Styled components for LineChart
const ChartContainer = styled.div`
  width: 100%;
  height: 100%;  // Make sure it fills the parent
  display: flex;
  justify-content: center;
  align-items: center;

  &.light {
    --line-color: #43e5f4;
    --axis-color: #333333;
    --grid-color: rgba(0, 0, 0, 0.1);
    --tooltip-bg: #f0f0f0;
    --tooltip-color: #333333;
  }

  &.dark {
    --line-color: #43e5f4;
    --axis-color: #dcdcdc;
    --grid-color: rgba(220, 220, 220, 0.1);
    --tooltip-bg: #1a1a1a;
    --tooltip-color: #ffffff;
  }
`;

const Style = styled.div`
  .animated-line {
    stroke-dasharray: 500;
    stroke-dashoffset: 0;
    animation: drawLine 2s linear infinite;
    filter: drop-shadow(0 0 5px rgba(80, 185, 255, 0.7));
  }

  @keyframes drawLine {
    0% {
      stroke-dashoffset: 500;
    }
    100% {
      stroke-dashoffset: 0;
    }
  }
`;

export default LineChart;
