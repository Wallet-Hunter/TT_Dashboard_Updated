import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/Engagement/LineChart1";
import LineChart2 from "./cmscharts/Engagement/LineChart2";
import HeatMap from "./cmscharts/Engagement/HeatMap1";
import NumberCard from "./cmscharts/Engagement/NumberCard";
import Leaderboard from "./cmscharts/Engagement/LeaderBoard";

const EngagementAnalyticsGraph = ({
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
       
        
        {/* Graphs in a 2x2 grid below NumberCard */}
        <Box
          sx={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1, flexGrow: 1 }}
        >

           {/* Number Card for Total Users */}
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
              <NumberCard title="Total Daily Messages" number={1000} />{/* Replace with dynamic value as needed */}
            </CardContent>
          </Card>
          
          {/* Line Chart 1 */}
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
                Unique Users
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
                <LineChart1 data={lineChartData} />
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
                Active Users
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
                <LineChart2 data={lineChartData} />
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
                Engegement Activity
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

         
        </Box>
      </Box>

      {/* Right side for leaderboard */}
      <Box sx={{ width: "40%", paddingLeft: 1 }}>
        <Card sx={{ height: "100%", padding: 2, display: "flex", flexDirection: "column", justifyContent: "top" ,transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` }}}>
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EngagementAnalyticsGraph;
