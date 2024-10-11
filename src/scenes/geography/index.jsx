import { Box, useTheme } from "@mui/material";
import WorldMap from "../../components/WorldMap";
import Header from "../../components/Header";
import { tokens } from "../../theme";

const Geography = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  return (
    <Box m="20px"sx={{
      marginLeft: '250px', // Match this to the sidebar's expanded width
      padding: '20px', // Add some padding if needed
      height: '100vh', // Full viewport height
      overflowY: 'auto', // Allow vertical scrolling
    }}>
      <Header title="Geography" subtitle="Simple Geography Chart" />

      <Box
        height="75vh"
        border={`1px solid ${colors.grey[100]}`}
        borderRadius="4px"
      >
        <WorldMap />
      </Box>
    </Box>
  );
};

export default Geography;
