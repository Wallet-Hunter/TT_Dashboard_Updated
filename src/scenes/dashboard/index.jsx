import React, { useState } from "react";
import { Box, Typography, Button, Card, CardContent, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { mockTransactions } from "../../data/mockData"; 
import Header from "../../components/Header";
import BarChart from "../../components/BarChart";
import SentimentMeter from "../../components/SentimentMeter";
import HeatMap from "../../components/HeatMap";
import LineGraph from "../../components/LineChart";
import ComboChart from "../../components/ComboChart";
import WorldMap from "../../components/WorldMap";
import Leaderboard from "../../components/LeaderBoard"; 
import csvFile from "../../csvData/hours_messages.csv";
import daily_file from "../../csvData/daily_member_growth.csv";
import stackedfile from "../../csvData/day_wise_reaction.csv";
import worldcsv from "../../csvData/worldmap.csv";
import heatmapcsv from "../../csvData/messages_data-2.csv";
import combocsv from "../../csvData/ComboChart.csv";
import "../../css/AnimatedBox.css";

const Dashboard = ({ isCollapsed }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [timePeriod, setTimePeriod] = useState("daily");

  return (
    <Box
      sx={{
        marginLeft: isCollapsed ? "80px" : "250px",
        padding: "20px",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      {/* Header Section */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title={
            <Typography
              variant="h4"
              fontSize="2rem"
              fontWeight="bolder"
              color={colors.grey[100]}
            >
              WooBee
            </Typography>
          }
          subtitle={
            <Typography variant="h6" color={colors.grey[400]}>
              Building Dreams, Together
            </Typography>
          }
        />

        {/* Time Period Buttons */}
        <Box>
          {["daily", "weekly", "monthly"].map((period) => (
            <Button
              key={period}
              variant={timePeriod === period ? "contained" : "outlined"}
              onClick={() => setTimePeriod(period)}
              sx={{
                marginRight: "10px",
                backgroundColor:
                  timePeriod === period ? colors.green[500] : "transparent",
                color: timePeriod === period ? "white" : colors.green[500],
                fontWeight: "bolder",
                "&:hover": {
                  backgroundColor:
                    timePeriod === period
                      ? colors.green[700]
                      : "rgba(0, 0, 0, 0.1)",
                },
              }}
            >
              {period === "daily" ? "1D" : period === "weekly" ? "1W" : "1M"}
            </Button>
          ))}
        </Box>
      </Box>

      {/* Main Grid for Charts and Statistics */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
        marginTop="20px"
      >
        {/* Combined Number Cards in One Box */}
        <Box
          className="animated-border-box"
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="16px"
          display="flex"
          justifyContent="space-around"
          alignItems="center"
          flexDirection="column"
          sx={{backgroundColor:"transparent"}} // Background color for the box
        >
          <Card variant="outlined" sx={{ width: '100%', marginBottom: '10px' }}>
            <CardContent>
              <Typography variant="h5" color={colors.green[500]} fontWeight="bold">
                Total Messages
              </Typography>
              <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                {/* Replace with actual total messages count */}
                1200
              </Typography>
            </CardContent>
          </Card>

          <Card variant="outlined" sx={{ width: '100%' }}>
            <CardContent>
              <Typography variant="h5" color={colors.green[500]} fontWeight="bold">
                Total Active Members
              </Typography>
              <Typography variant="h4" color={colors.grey[100]} fontWeight="bold">
                {/* Replace with actual total active members count */}
                450
              </Typography>
            </CardContent>
          </Card>
        </Box>

        {/* Sentiment Meter */}
        <Box
          className="animated-border-box"
          gridColumn="span 4"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          overflow="hidden"
        >
          <Typography variant="h6" fontWeight="600" color={colors.grey[100]} p="10px">
            Sentiment Analysis
          </Typography>
          <Box
            width="90%"
            height="100%"
            maxWidth="900px"
            display="flex"
            justifyContent="center"
            alignItems="center"
            m="0"
          >
            <SentimentMeter csvFile={csvFile} timeFrame={timePeriod} />
          </Box>
        </Box>

        {/* Leaderboard */}
        <Box
          className="animated-border-box"
          gridColumn="span 4"
          gridRow="span 3"
          display="flex"
          flexDirection="column"
          overflow="hidden"
          justifyContent="center"
          alignItems="center"
          m="0"
        >
          <Leaderboard />
        </Box>

        {/* Bar Chart */}
        <Box
          className="animated-border-box"
          gridColumn="span 4"
          gridRow="span 2"
          borderRadius="16px"
        >
          <Typography variant="h6" fontWeight="600" color={colors.grey[100]} p="10px">
            Member Count
          </Typography>
          <Box height="90%" m="0">
            <BarChart csvFile={daily_file} timeFrame={timePeriod} isDashboard />
          </Box>
        </Box>

        {/* Line Chart */}
        <Box
          className="animated-border-box"
          gridColumn="span 4"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          overflow="hidden"
        >
          <Typography variant="h6" fontWeight="600" color={colors.grey[100]} p="10px">
          Message Count
          </Typography>
          <LineGraph csvFile={csvFile} timeFrame={timePeriod} isDashboard />
        </Box>

        {/* Recent Analytics */}
        <Box
          className="animated-border-box"
          gridColumn="span 4"
          gridRow="span 3"
          overflow="auto"
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            p="15px"
          >
            <Typography color={colors.grey[100]} variant="h5" fontWeight="600">
              Recent Analytics
            </Typography>
          </Box>
          {mockTransactions.map((transaction, i) => (
            <Box
              key={`${transaction.txId}-${i}`}
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              p="15px"
            >
              <Typography
                color={colors.greenAccent[100]}
                variant="h5"
                fontWeight="600"
              >
                Group with Maximum Participants: CryptoMoonShots Chat (36694)
              </Typography>
            </Box>
          ))}
        </Box>

        {/* Combo  Chart */}
        <Box
          className="animated-border-box"
          gridColumn="span 4"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          height="300px"
          overflow="hidden"
        >
          <Typography variant="h6" fontWeight="600" color={colors.grey[100]} p="10px">
            Reaction Distribution
          </Typography>
          <ComboChart
            csvFile={combocsv}
            timeFrame={timePeriod}
            isDashboard
          />
        </Box>

        {/* Heat Map */}
        <Box
          className="animated-border-box"
          gridColumn="span 4"
          gridRow="span 2"
          display="flex"
          flexDirection="column"
          justifyContent="flex-start"
          overflow="hidden"
        >
          <Typography variant="h6" fontWeight="600" color={colors.grey[100]} p="10px">
            Activity Heatmap
          </Typography>
          <HeatMap csvFile={heatmapcsv} timePeriod={timePeriod} />
        </Box>

        

        {/* Daily News */}
        <Box
          gridColumn="span 12"
          gridRow="span 0.5"
          display="flex"
          justifyContent="flex-start"
          alignItems="center"
          borderRadius="16px"
          border={`1px solid ${colors.green[500]}`}
          p="10px"
        >
          <Typography variant="h5" fontWeight="600" color={colors.grey[100]}>
            Daily News
          </Typography>
        </Box>

        {/* World Map */}
        <Box
          gridColumn="span 12"
          gridRow="span 4"
          borderRadius="16px"
          className="animated-border-box"
        >
          <WorldMap
            csvFile={worldcsv}
            timePeriod={timePeriod}
            backgroundColor="transparent"
          />
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
