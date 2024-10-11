import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/EventAnalytics/LineChart1"; // Events Created
import BarChart1 from "./cmscharts/EventAnalytics/BarChart1"; // Active Days
import LineChart2 from "./cmscharts/EventAnalytics/LineChart2"; // Engagement
import BarChart2 from "./cmscharts/EventAnalytics/BarChart2"; // Promotion
import BarChart3 from "./cmscharts/EventAnalytics/BarChart3"; // Reminders
import LineChart3 from "./cmscharts/EventAnalytics/LineChart3"; // Follow-up Messages
import Leaderboard from "./cmscharts/EventAnalytics/LeaderBoard"; // Top Organizers
// Optionally: import WordCloud from './WordCloud'; // Popular Topics (if you plan to add this)

const EventAnalyticsGraph = ({ lineChartCsvFile }) => {
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
          
          {/* Events Created - Line Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Events Created</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LineChart1 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Active Days - Bar Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Active Days</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BarChart1 labels={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]} data={[30, 40, 35, 60, 50, 70, 80]} />
              </Box>
            </CardContent>
          </Card>

          {/* Engagement - Line Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Engagement Trend</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <LineChart2 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>
          

          {/* Promotion - Bar Chart */}
          <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Promoted Events</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BarChart2 labels={["Event1", "Event2", "Event3"]} data={[50, 70, 40]} />
              </Box>
            </CardContent>
          </Card>


          {/* Reminders - Bar Chart */}
         {/* <Card sx={{ height: "200px", transition: "box-shadow 0.3s", "&:hover": { boxShadow: "0px 4px 20px #54d5d9" } }}>
            <CardContent>
              <Typography variant="h6">Reminders Sent</Typography>
              <Box sx={{ height: "160px", display: "flex", justifyContent: "center", alignItems: "center" }}>
                <BarChart3 labels={["R1", "R2", "R3"]} data={[20, 40, 60]} />
              </Box>
            </CardContent>
          </Card> */}

          
         
          
        </Box>
      </Box>

      {/* Right side for Leaderboard */}
      <Box sx={{ width: "40%", paddingLeft: 1 }}>
        <Card sx={{ height: "100%", padding: 2, display: "flex", flexDirection: "column", justifyContent: "top", transition: "box-shadow 0.3s ease-in-out",
            "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent>
            <Leaderboard />
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
};

export default EventAnalyticsGraph;