import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js";
import { csv } from "d3-fetch";
import { parse, format } from "date-fns"; // Import date-fns for date manipulation

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const StackedBarChart = ({ csvFile, timePeriod }) => {
    const themeColors = [
        "#45e8ed", "#0b4a4c", "#3fb3b5", "#69edf1", "#8df2f5", "#b0f7f8", "#d4fbfc", "#54d5d9", "#3fb3b5", "#2c9393",
        "#2db7ba", "#229ca1", "#1c8084", "#176364", "#11494c", "#0d3738", "#091f21", "#0b4a4c"
    ];

    const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        const parseCSV = async () => {
            try {
                const data = await csv(csvFile);
                
                // Group data based on time period
                const groupedData = {};
                
                data.forEach((row) => {
                    const date = parse(row.date_only, "yyyy-MM-dd", new Date()); // Assuming the date is in 'yyyy-MM-dd' format
                    let key;

                    // Determine key based on time period
                    switch (timePeriod) {
                        case "daily":
                            key = format(date, "yyyy-MM-dd");
                            break;
                        case "weekly":
                            key = format(date, "yyyy-'W'ww"); // Week number
                            break;
                        case "monthly":
                            key = format(date, "yyyy-MM"); // Year and month
                            break;
                        default:
                            key = format(date, "yyyy-MM-dd");
                    }

                    if (!groupedData[key]) {
                        groupedData[key] = { replies: 0, views: 0, forwards: 0 }; // Initialize counts
                    }
                    groupedData[key].replies += +row.replies || 0;
                    groupedData[key].views += +row.views || 0;
                    groupedData[key].forwards += +row.forwards || 0;
                });

                // Convert grouped data into chart data format
                const labels = Object.keys(groupedData);
                const replies = labels.map((label) => groupedData[label].replies);
                const views = labels.map((label) => groupedData[label].views);
                const forwards = labels.map((label) => groupedData[label].forwards);

                setChartData({
                    labels,
                    datasets: [
                        {
                            label: 'Replies',
                            data: replies,
                            backgroundColor: themeColors[0],
                        },
                        {
                            label: 'Views',
                            data: views,
                            backgroundColor: themeColors[1],
                        },
                        {
                            label: 'Forwards',
                            data: forwards,
                            backgroundColor: themeColors[2],
                        },
                    ],
                });
            } catch (error) {
                console.error('Error fetching or parsing CSV file:', error);
            }
        };

        parseCSV();
    }, [csvFile, timePeriod]); // Depend on timePeriod

    const options = {
        responsive: true,
        maintainAspectRatio: false,
        scales: {
            x: {
                stacked: true,
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                stacked: true,
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count',
                },
            },
        },
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: 'Stacked Bar Chart',
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '100%' }}>
            <Bar data={chartData} options={options} />
        </div>
    );
};

export default StackedBarChart;