import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart from "./cmscharts/Message/LineChart1";
import HeatMap from "./cmscharts/Message/HeatMap1";
import DoughnutChart from "./cmscharts/Message/DoughnutChart";
import NumberCard from "./cmscharts/Message/NumberCard";
import Leaderboard from "./cmscharts/Message/LeaderBoard";
import BarChart1 from "./cmscharts/Message/BarChart1"
import BarChart2 from "./cmscharts/Message/BarChart2"
import BarChart3 from "./cmscharts/Message/BarChart3"

const MessageAnalyticsGraph = ({
  lineChartCsvFile, // CSV file for LineChart
  heatMapCsvFile,   // CSV file for HeatMap
}) => {
  const [lineChartData, setLineChartData] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);

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
    fetchData(heatMapCsvFile, setHeatMapData);
  }, [lineChartCsvFile, heatMapCsvFile]);

  return (
    <Box sx={{ padding: 0.5, display: "flex", width: "100%", height: "100%" }}>
      {/* Left side for graphs in a grid with NumberCard on top */}
      <Box
        sx={{
          width: "60%",
          display: "flex",
          flexDirection: "column",
          gap: 1,
          flexGrow: 1, // Makes the left side grow to fill the height dynamically
        }}
      >
       {/* Replace with dynamic value as needed */}

        {/* Graphs in a 2x2 grid below NumberCard */}
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, flexGrow: 1 }}
        >
           <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Daily Messages
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "160px" }}>
              <BarChart1 
                labels={["1", "2", "3", "4", "5","6", "7", "8", "9", "10"]} 
                data={[30, 40, 50, 60, 80, 29, 40, 50, 70, 90]} 
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Most Active Days
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "160px" }}>
              <BarChart2 
                labels={["1", "2", "3", "4", "5","6", "7", "8", "9", "10"]} 
                data={[30, 40, 50, 60, 80, 29, 40, 50, 70, 90]} 
              />
            </Box>
          </CardContent>
        </Card>

        <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Replies Count
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "160px" }}>
              <BarChart3 
                labels={["1", "2", "3", "4", "5","6", "7", "8", "9", "10"]} 
                data={[30, 40, 50, 60, 80, 29, 40, 50, 70, 90]} 
              />
            </Box>
          </CardContent>
        </Card>

          {/* Line Chart 2 (Optional, duplicate as needed) */}
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
              <Typography variant="h6" gutterBottom>
                Hourly Messages
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "95%",
                  width: "90%",
                }}
              >
                <LineChart data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Heat Map */}
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
              sx={{ textAlign: "center", padding: "8px", width: "90%", height: "100%" }}
            >
              <Typography variant="h6" gutterBottom>
                Activity
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
                <HeatMap data={heatMapData} />
              </Box>
            </CardContent>
          </Card>

         {/* Heat Map */}
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
              sx={{ textAlign: "center", padding: "8px", width: "90%", height: "100%" }}
            >
              <Typography variant="h6" gutterBottom>
                Bot vs human Messages
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
                <DoughnutChart data={heatMapData} />
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Box>

      {/* Right side with the leaderboard in a card */}
      <Box sx={{ width: "40%", paddingLeft: 1, display: "flex", flexDirection: "column", gap: 1 }}>
  {/* Number Card for Total Messages */}
  <Card sx={{ height: "100px", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
    <CardContent>
      <NumberCard title="Total Number Messages" number={1500} /> {/* Replace with dynamic value as needed */}
    </CardContent>
  </Card>

  {/* Leaderboard */}
  <Card sx={{ flexGrow: 1, transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
    <CardContent>
      <Leaderboard />
    </CardContent>
  </Card>
</Box>
    </Box>
  );
};

export default MessageAnalyticsGraph;
