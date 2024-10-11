import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import LineChart1 from "./cmscharts/Member/LineChart1";
import LineChart2 from "./cmscharts/Member/LineChart2";
import HeatMap from "./cmscharts/Member/HeatMap";
import DoughnutChart from "./cmscharts/Member/DoughnutChart";
import NumberCard from "./cmscharts/Member/NumberCard";
import Leaderboard from "./cmscharts/Member/LeaderBoard";

const MemberAnalyticsGraph = ({
  lineChartCsvFile, // CSV file for LineChart
  heatMapCsvFile, // CSV file for HeatMap
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
        {/* Row with NumberCard taking half width */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <Box sx={{ width: "45%" }}>
            <NumberCard title="Total Members" number={1500} />{" "}
            {/* Replace with dynamic value as needed */}
          </Box>
          <Box sx={{ width: "100%" }}></Box> {/* Empty space on the right */}
          <Box sx={{ width: "50%" }}>
            <NumberCard title="Total Members" number={1200} />{" "}
            {/* Replace with dynamic value as needed */}
          </Box>
          <Box sx={{ width: "100%" }}></Box>
        </Box>


        {/* Graphs in a 2x2 grid below NumberCard */}
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: 1,
            flexGrow: 1,
          }}
        >
          {/* Line Chart 1 for Daily Growth */}
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
                Daily Growth
              </Typography>
              <Box
                sx={{
                  flexGrow: 1,
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  height: "90%",
                  width: "90%",
                }}
              >
                <LineChart1 data={lineChartData} />
              </Box>
            </CardContent>
          </Card>

          {/* Line Chart 2 for Engagement Rate Over Time */}
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
                Engagement Over Time
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
                <LineChart2
                  labels={[
                    "10-01",
                    "10-02",
                    "10-03",
                    "10-04",
                    "10-05",
                    "10-06",
                    "10-07",
                  ]}
                  data={[100, 120, 90, 150, 80, 170, 200]}
                />
              </Box>
            </CardContent>
          </Card>

          {/* Heat Map for Activity Heatmap */}
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
                <HeatMap data={heatMapData} />
              </Box>
            </CardContent>
          </Card>

          {/* Doughnut Chart for Bots vs Members */}
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
                Bots vs Members
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

      {/* Right side for leaderboard */}
      {/* Right side with the leaderboard in a card */}
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

export default MemberAnalyticsGraph;
