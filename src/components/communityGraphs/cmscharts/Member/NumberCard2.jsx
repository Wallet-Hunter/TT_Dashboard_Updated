import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

const NumberCard = ({ totalMembers, totalBots }) => {
  // Calculate percentages
  const total = totalMembers + totalBots;
  const membersPercentage = ((totalMembers / total) * 100).toFixed(2);
  const botsPercentage = ((totalBots / total) * 100).toFixed(2);

  return (
    <Card
      sx={{
        minWidth: 275,
        padding: 2,
        backgroundColor: '#1e1e1e', // Custom dark background
        color: '#76ff03', // Custom text color (green)
      }}
    >
      <CardContent>
        <Typography variant="h6" component="div">
          Total Members vs Bots
        </Typography>

        {/* Displaying total members and bots */}
        <Box sx={{ marginTop: 2 }}>
          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Members: {totalMembers} ({membersPercentage}%)
          </Typography>

          <Typography variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
            Bots: {totalBots} ({botsPercentage}%)
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default NumberCard;
