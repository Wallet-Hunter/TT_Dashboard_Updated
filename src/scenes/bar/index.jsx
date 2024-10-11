import { Box } from "@mui/material";
import Header from "../../components/Header";
import BarChart from "../../components/BarChart"; // Ensure the path to BarChart is correct
import csvFile from "../../csvData/daily_member_growth.csv";

const Bar = () => {
  return (
    <Box m="20px"sx={{
      marginLeft: '250px', // Match this to the sidebar's expanded width
      padding: '20px', // Add some padding if needed
      height: '100vh', // Full viewport height
      overflowY: 'auto', // Allow vertical scrolling
    }}>
      <Header title="Bar Chart" subtitle="Simple Bar Chart" />
      <Box height="75vh">
        <BarChart csvFile={csvFile} /> {/* Pass the CSV file correctly */}
      </Box>
    </Box>
  );
};

export default Bar;
