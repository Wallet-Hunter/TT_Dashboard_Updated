import { Box } from "@mui/material";
import Header from "../../components/Header";
import HeatMap from "../../components/comp/HeatMap";  // Import the HeatMap component

const Heatmap = () => {
  return (
    <Box m="20px">
      <Header title="Heat Map" subtitle="Data Heat Map Visualization" />
      <Box height="75vh">
        <HeatMap />
      </Box>
    </Box>
  );
};

export default Heatmap;
