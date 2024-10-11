import { Box } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";

const Pie = () => {
  return (
    <Box m="20px"sx={{
      marginLeft: '250px', // Match this to the sidebar's expanded width
      padding: '20px', // Add some padding if needed
      height: '100vh', // Full viewport height
      overflowY: 'auto', // Allow vertical scrolling
    }}>
      <Header title="Pie Chart" subtitle="Simple Pie Chart" />
      <Box height="75vh">
        <PieChart />
      </Box>
    </Box>
  );
};

export default Pie;
