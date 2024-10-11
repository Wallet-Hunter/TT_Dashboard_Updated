
import React from 'react';
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  styled,
} from '@mui/material';

// Hardcoded data for the leaderboard (groups with member counts)
const leaderboardData = [
  { groupId: 1, groupName: 'Group 1', memberCount: 150 },
  { groupId: 2, groupName: 'Group 2', memberCount: 120 },
  { groupId: 3, groupName: 'Group 3', memberCount: 110 },
  { groupId: 4, groupName: 'Group 4', memberCount: 100 },
  { groupId: 5, groupName: 'Group 5', memberCount: 90 },
  { groupId: 6, groupName: 'Group 6', memberCount: 80 },
  { groupId: 7, groupName: 'Group 7', memberCount: 70 },
  { groupId: 8, groupName: 'Group 8', memberCount: 60 },
  { groupId: 9, groupName: 'Group 9', memberCount: 50 },
  { groupId: 10, groupName: 'Group 10', memberCount: 40 },
];

// Styled TableRow for futuristic effect
const StyledTableRow = styled(TableRow)(({ theme }) => ({
  transition: '0.3s',
  '&:hover': {
    boxShadow: '0 4px 20px rgba(0, 0, 0, 0.3)', // Box shadow on hover
    backgroundColor: 'rgba(255, 255, 255, 0.1)', // Slightly change background color on hover
  },
}));

// Badges for top three ranks
const Badge = styled('span')(({ theme }) => ({
  borderRadius: '12px',
  padding: '4px 8px',
  color: 'white',
  fontWeight: 'bold',
  fontSize: '0.9rem',
  marginRight: '8px',
}));

const Leaderboard = () => {
  // Ensure data is sorted by member count in descending order
  const topGroups = leaderboardData
    .sort((a, b) => b.memberCount - a.memberCount)
    .slice(0, 10); // Limit to top 10 groups

  // Custom styles for rank highlighting
  const getRowStyle = (index) => {
    switch (index) {
      case 0:
        return { backgroundColor: '#76dde1' }; // Gold for 1st
      case 1:
        return { backgroundColor: '#54d5d9' }; // Silver for 2nd
      case 2:
        return { backgroundColor: '#43aaae' }; // Bronze for 3rd
      default:
        return {};
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        maxHeight: '100%', // Ensure it does not exceed the parent container
        overflow: 'hidden',
        borderRadius: '8px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      <Typography variant="h5" sx={{ marginBottom: 2, textAlign: 'center', color: 'colors.grey[400]', fontWeight: 'bold' }}>
        Top Groups
      </Typography>

      {/* Scrollable table container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: '8px',
          overflowY: 'auto', // Hidden overflow to prevent scrollbars
          maxHeight: '400px', // Adjust maxHeight to fit 10 rows
        }}
      >
        <Table stickyHeader> {/* Enable sticky header for the table */}
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Group</TableCell>
              <TableCell align="right">Members</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topGroups.map((group, index) => (
              <StyledTableRow
                key={group.groupId}
                sx={{
                  ...getRowStyle(index), // Apply custom row styles for top 3 groups
                }}
              >
                <TableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: '#76dde1' }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: '#54d5d9' }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: '#43aaae' }}>🥉</Badge>}
                </TableCell>
                <TableCell>{group.groupName}</TableCell>
                <TableCell align="right">{group.memberCount}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Leaderboard;

