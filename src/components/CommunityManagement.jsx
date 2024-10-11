import React, { useState, useRef } from "react";
import { Box, Typography, Button } from "@mui/material";
import { FaChevronDown, FaAngleRight } from "react-icons/fa";
import GroupBasedAnalyticsGraph from "./communityGraphs/GroupBasedAnalyticsGraph";
import SchedulePost from "./communityGraphs/SchedulePost";
import MembersAnalytics from "./communityGraphs/MembersAnalytics";
import EventsAnalyticsGraph from "./communityGraphs/EventsAnalyticsGraph";
import BotAnalyticsGraph from "./communityGraphs/BotAnalyticsGraph";
import EngagementAnalyticsGraph from "./communityGraphs/EngagementAnalyticsGraph";
import MessageAnalyticsGraph from "./communityGraphs/MessageAnalyticsGraph";
//import MemberGrowthAnalyticsGraph from "./communityGraphs/MemberGrowthAnalyticsGraph";
import AnonymousAnalyticsGraph from "./communityGraphs/AnonymousAnalyticsGraph";

const CommunityManagement = ({ colors }) => {
  const [clickedIndex, setClickedIndex] = useState(null);
  const [openSections, setOpenSections] = useState(Array(9).fill(true)); // Track open state for each section

  const items = [
    "Group",
    "Scheduling",
    "Members",
    "Events",
    "Bots",
    "Engagement",
    "Messages",
    "Anonymous",
  ];

  const sectionRefs = useRef(items.map(() => React.createRef()));

  const handleClick = (index) => {
    setClickedIndex(index);
    sectionRefs.current[index].current.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const toggleSection = (index) => {
    setOpenSections((prev) => {
      const updated = [...prev];
      updated[index] = !updated[index]; // Toggle the section open/close state
      return updated;
    });
  };

  const renderGraph = (index) => {
    switch (index) {
      case 0:
        return (
          <GroupBasedAnalyticsGraph
            lineChartCsvFile="../csvData/cms/groupBasedAnalyticsLine.csv"
            isExpanded={openSections[index]}
          />
        );
      case 1:
        return <SchedulePost />;
      case 2:
        return <MembersAnalytics />;
      case 3:
        return <EventsAnalyticsGraph />;
      case 4:
        return <BotAnalyticsGraph />;
      case 5:
        return <EngagementAnalyticsGraph />;
      case 6:
        return <MessageAnalyticsGraph />;
      
      case 7:
        return <AnonymousAnalyticsGraph />;
      default:
        return null;
    }
  };

  return (
    <Box
      sx={{
        height: "100vh",
        overflowY: "auto",
        backgroundColor: "transparent",
        padding: "20px",
      }}
    >
      <Typography variant="h4" fontWeight="bolder" gutterBottom color="#54d5d9">
        Community Management Dashboard
      </Typography>

      {/* Navbar */}
      <Box
        display="flex"
        justifyContent="space-between"
        sx={{
          backgroundColor: "transparent",
          padding: "10px 20px",
          borderRadius: "8px",
          marginBottom: "20px",
          overflowX: "auto",
        }}
      >
        <div style={{ display: "flex", gap: "20px" }}>
          {" "}
          {/* Added a div with gap for spacing */}
          {items.map((item, index) => (
            <Typography
              key={index}
              onClick={() => handleClick(index)}
              sx={{
                color:
                  clickedIndex === index ? colors.grey[100] : colors.grey[300],
                fontWeight: clickedIndex === index ? "bold" : "normal",
                cursor: "pointer",
                fontSize: clickedIndex === index ? "1.2rem" : "1rem", // Increase font size on click
                textDecoration: clickedIndex === index ? "underline" : "none", // Add underline on click
                "&:hover": {
                  color: colors.mode === "dark" ? "#121212" : "#e0e0e0", // Lighter shade of black or darker shade of white on hover
                  textDecoration: "underline", // Underline on hover
                },
                transition: "all 0.3s ease", // Smooth transition for hover and click effects
              }}
            >
              {item}
            </Typography>
          ))}
        </div>
      </Box>

      {/* Divider Line */}
      <Box
        sx={{
          height: "2px",
          width: "100%",
          backgroundColor: "#54d5d9",
          marginBottom: "20px", // Space between navbar and sections
        }}
      />

      {/* Sections */}
      <Box display="flex" flexDirection="column" marginTop="20px">
        {items.map((item, index) => (
          <Box
            key={index}
            marginBottom="15px"
            ref={sectionRefs.current[index]}
            sx={{
              transition: "height 0.5s ease",
              overflow: "hidden",
              height: openSections[index] ? "auto" : "100px",
            }}
          >
            <Box display="flex" alignItems="center">
              {/* Toggle Icon */}
              <Button
                onClick={() => toggleSection(index)}
                sx={{
                  backgroundColor: colors.grey[800],
                  color: colors.grey[200],
                  width: "40px",
                  height: "40px",
                  minWidth: "40px",
                  minHeight: "40px",
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                  marginRight: "10px",
                  borderRadius: "8px",
                  "&:hover": {
                    backgroundColor: colors.grey[700],
                  },
                }}
              >
                {openSections[index] ? (
                  <FaChevronDown size={20} />
                ) : (
                  <FaAngleRight size={20} />
                )}
              </Button>

              {/* Plain Text in h4 */}
              <Typography
                variant="h4"
                onClick={() => handleClick(index)}
                sx={{
                  color:
                    clickedIndex === index
                      ? colors.grey[100]
                      : colors.grey[200],
                  fontWeight: "bolder",
                  cursor: "pointer",
                  "&:hover": {
                    color: colors.grey[100],
                  },
                }}
              >
                {item}
              </Typography>
            </Box>

            {/* Section Content */}
            {openSections[index] && (
              <Box
                sx={{
                  backgroundColor: colors.grey[900],
                  padding: "10px",
                  borderRadius: "4px",
                  marginTop: "5px",
                  color: colors.grey[100],
                }}
              >
                {/* Render the graph conditionally based on the index */}
                {renderGraph(index)}
              </Box>
            )}
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CommunityManagement;
