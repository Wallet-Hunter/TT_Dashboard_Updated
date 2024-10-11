import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme"; // Import the tokens for theme support
import CommunityManagement from "../../components/CommunityManagement";

const CommunityManagementPage = () => {
  const theme = useTheme(); // Get the current theme (light or dark)
  const colors = tokens(theme.palette.mode); // Get theme-specific colors

  return (
    <Box 
      display="flex" 
      height="100vh" // Full viewport height for consistent length
      overflow="hidden" // Prevent overflow
      marginLeft="260px" // Adjust the margin according to your sidebar width
      sx={{ backgroundColor: "transparent" }} // Apply dynamic background color
    >
      <CommunityManagement colors={colors} /> {/* Pass colors to the CommunityManagement component */}
    </Box>
  );
};

export default CommunityManagementPage;
