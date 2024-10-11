import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/Anonymous/LineChart1"; 
import BarChart1 from "./cmscharts/Anonymous/LineChart2"; 
import NumberCard from "./cmscharts/Anonymous/NumberCard";
import HeatMap from "./cmscharts/Anonymous/HeatMap1";

import Leaderboard from "./cmscharts/EventAnalytics/LeaderBoard"; // Top Organizers
// Optionally: import WordCloud from './WordCloud'; // Popular Topics (if you plan to add this)

const AnonymousAnalyticsGraph = ({ lineChartCsvFile }) => {
  const [lineChartData, setLineChartData] = useState([]);

  // Function to fetch and parse CSV data
  const fetchData = async (file, setData) => {
    try {
      const data = await csv(file);
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${file}:`, error);
    }
  };

  useEffect(() => {
    fetchData(lineChartCsvFile, setLineChartData);
  }, [lineChartCsvFile]);

  return (
    <Box sx={{ padding: 0.5, display: "flex", width: "100%", height: "100%" }}>
      {/* Left side for graphs in a grid */}
      <Box sx={{ width: "60%", display: "flex", flexDirection: "column", gap: 1, flexGrow: 1 }}>
        {/* Graphs in a 2x2 grid */}
        <Box sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, flexGrow: 1 }}>
          
        
          <Card
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                padding: "8px",
                width: "100%",
                height: "100%",
              }}
            >
              <NumberCard title="Total Anonymous Messages" number={500} /> {/* Replace with dynamic value as needed */}
            </CardContent>
          </Card>
          {/*  - Line Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Anonymous Messages </Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LineChart1 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Active Days - Bar Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>Active Days</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BarChart1 labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} data={[30, 40, 35, 60, 50, 70, 80]} />
              </Box>
            </CardContent>
          </Card>

          <Card
            sx={{
              height: "200px",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              transition: "box-shadow 0.3s ease-in-out",
              "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` },
            }}
          >
            <CardContent
              sx={{
                textAlign: "center",
                padding: "8px",
                width: "90%",
                height: "100%",
              }}
            >
              <Typography variant="h6" gutterBottom>
                Activity Heatmap
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "140px",
                }}
              >
                <HeatMap  />
              </Box>
            </CardContent>
          </Card>

          
          
        </Box>
      </Box>

      {/* Right side for Leaderboard */}
      <Box sx={{ width: "40%", paddingLeft: 1 }}>
        <Card sx={{ height: "100", padding: 2, display: "flex", flexDirection: "column", justifyContent: "top" }}>
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default AnonymousAnalyticsGraph;
