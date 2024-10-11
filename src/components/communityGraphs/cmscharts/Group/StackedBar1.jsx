import React from "react";
import { Bar } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Tooltip,
    Legend,
} from "chart.js";

ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const StackedBar1 = () => {
    const themeColors = [
        "#45e8ed", // Color for Active members
        "#0b4a4c", // Color for Inactive members
    ];

    // Hardcoded data for Active vs Inactive members
    const fullDateLabels = ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'];

    // Extracting just the day part (1, 2, 3, ...) from the dates
    const dayLabels = fullDateLabels.map(date => new Date(date).getDate());

    const hardcodedData = {
        labels: dayLabels, // Using just the day part as labels
        datasets: [
            {
                label: 'Active',
                data: [30, 45, 25, 40, 35], // Hardcoded active members data
                backgroundColor: themeColors[0],
            },
            {
                label: 'Inactive',
                data: [15, 10, 20, 5, 10], // Hardcoded inactive members data
                backgroundColor: themeColors[1],
            },
        ],
    };

    const options = {
        responsive: true,
        maintainAspectRatio: false, // Allow chart to fill its container
        scales: {
            x: {
                stacked: true, // Ensure stacking on x-axis
                title: {
                    display: true,
                    text: 'Day',
                    font: {
                        size: 12, // Font size for x-axis title
                    },
                },
                ticks: {
                    font: {
                        size: 10, // Font size for x-axis labels
                    },
                    autoSkip: false, // Disable automatic skipping of ticks
                    maxRotation: 0, // Prevent rotation of labels
                    minRotation: 0, // Prevent rotation of labels
                    padding: 5, // Add padding to labels
                    // Set the maximum number of ticks to prevent overlap
                    callback: function(value) {
                        return `Day ${value}`; // Custom label format
                    },
                },
            },
            y: {
                stacked: true, // Ensure stacking on y-axis
                beginAtZero: true,
                title: {
                    display: true,
                    text: 'Count',
                    font: {
                        size: 12, // Font size for y-axis title
                    },
                },
                ticks: {
                    font: {
                        size: 10, // Font size for y-axis labels
                    },
                },
            },
        },
        plugins: {
            legend: {
                position: 'top', // Position of the legend
                align: 'end', // Align to the right
                labels: {
                    font: {
                        size: 10, // Font size for legend labels
                    },
                },
            },
        },
    };

    return (
        <div style={{ width: '100%', height: '200px', position: 'relative', padding: '20px', boxSizing: 'border-box' }}>
            {/* Container for the stacked bar chart and label */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', height: '100%' }}>
                <div style={{ width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Bar data={hardcodedData} options={options} />
                </div>
            </div>
        </div>
    );
};

export default StackedBar1;
