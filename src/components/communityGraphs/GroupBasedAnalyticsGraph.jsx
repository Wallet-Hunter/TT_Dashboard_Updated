import React, { useEffect, useState } from "react";
import { Box, Card, CardContent, Typography, CircularProgress } from "@mui/material";
import { csv } from "d3-fetch";

// Import your individual graph components
import MsgsPerHourChart from "./cmscharts/Group/BarChart2";
import AvgRepliesChart from "./cmscharts/Group/BarChart1";
import LineChart1 from "./cmscharts/Group/LineChart1";
import LineChart2 from "./cmscharts/Group/LineChart1";
import HeatMap from "./cmscharts/Group/HeatMap";
import StackedBar1 from "./cmscharts/Group/StackedBar1"; // Corrected component name
import Leaderboard from "./cmscharts/Group/LeaderBoard";

const GroupBasedAnalyticsGraph = ({
  barChartCsvFile,
  lineChartCsvFile,
  heatMapCsvFile,
  pieChartCsvFile,
  stackedBarChartCsvFile,
  isExpanded,
}) => {
  const [barChartData, setBarChartData] = useState([]);
  const [lineChartData, setLineChartData] = useState([]);
  const [heatMapData, setHeatMapData] = useState([]);
  const [pieChartData, setPieChartData] = useState([]);
  const [stackedBarChartData, setStackedBarChartData] = useState([]);
  const [loading, setLoading] = useState({
    barChart: true,
    lineChart: true,
    heatMap: true,
    pieChart: true,
    stackedBarChart: true,
  });

  // Function to fetch and parse CSV data for a specific graph
  const fetchData = async (file, setData, chartType) => {
    try {
      const data = await csv(file);
      setData(data);
    } catch (error) {
      console.error(`Error fetching ${file}:`, error);
    } finally {
      setLoading((prevState) => ({ ...prevState, [chartType]: false }));
    }
  };

  useEffect(() => {
    if (isExpanded) {
      // Fetch CSV data for each chart
      fetchData(barChartCsvFile, setBarChartData, "barChart");
      fetchData(lineChartCsvFile, setLineChartData, "lineChart");
      fetchData(heatMapCsvFile, setHeatMapData, "heatMap");
      fetchData(pieChartCsvFile, setPieChartData, "pieChart");
      fetchData(stackedBarChartCsvFile, setStackedBarChartData, "stackedBarChart");
    }
  }, [isExpanded, barChartCsvFile, lineChartCsvFile, heatMapCsvFile, pieChartCsvFile, stackedBarChartCsvFile]);

  if (loading.barChart || loading.lineChart || loading.heatMap || loading.pieChart || loading.stackedBarChart) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100%" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", height: "100%", padding: 0.5 }}>
      {/* Left side with charts in a 2x2 grid */}
      <Box sx={{ width: "60%", display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 1 }}>
        {/* Bar Chart */}
        <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Average Replies Per Hour
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "160px" }}>
              <AvgRepliesChart 
                labels={["1", "2", "3", "4", "5","6", "7", "8", "9", "10"]} 
                data={[30, 40, 50, 60, 80, 29, 40, 50, 70, 90]} 
              />
            </Box>
          </CardContent>
        </Card>

        {/* Line Chart */}
        <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Messages by Volume
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "95%", width: "90%" }}>
              <LineChart1 data={lineChartData} />
            </Box>
          </CardContent>
        </Card>

        {/* Heat Map */}
        <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "90%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Activity Peak
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "140px" }}>
              <HeatMap data={heatMapData} />
            </Box>
          </CardContent>
        </Card>

        {/* Messages Per Hour Chart */}
        <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Messages Per Hour
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "150px" }}>
              <MsgsPerHourChart 
                data={[12, 5, 8, 20, 30, 15, 10, 25, 35, 22, 18, 45, 50, 38, 29, 40, 55, 60, 25, 30, 42, 36, 28, 19]}
              />
            </Box>
          </CardContent>
        </Card>

        {/* Stacked Bar Chart */}
        <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Average Replies Per Hour
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "170px" }}>
              <StackedBar1
                labels={["1", "2", "3", "4", "5","6", "7", "8", "9", "10"]} 
                data={[30, 40, 50, 60, 80, 29, 40, 50, 70, 90]} 
              />
            </Box>
          </CardContent>
        </Card>



        {/* Line Chart */}
        <Card sx={{ height: "200px", width: "100%", display: "flex", justifyContent: "center", alignItems: "center", transition: "box-shadow 0.3s ease-in-out", "&:hover": { boxShadow: `0px 4px 20px 0px #54d5d9` } }}>
          <CardContent sx={{ textAlign: "center", padding: "8px", width: "100%", height: "100%" }}>
            <Typography variant="h6" gutterBottom>
              Growth
            </Typography>
            <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center", alignItems: "center", height: "95%", width: "90%" }}>
              <LineChart2 data={lineChartData} />
            </Box>
          </CardContent>
        </Card>
      </Box>

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

export default GroupBasedAnalyticsGraph;
