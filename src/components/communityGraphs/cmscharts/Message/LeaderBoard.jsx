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

// Hardcoded data for the top contributors
const contributorsData = [
  { userId: 1, userName: 'Alice', contributionCount: 320 },
  { userId: 2, userName: 'Bob', contributionCount: 280 },
  { userId: 3, userName: 'Charlie', contributionCount: 250 },
  { userId: 4, userName: 'David', contributionCount: 230 },
  { userId: 5, userName: 'Eve', contributionCount: 210 },
  { userId: 6, userName: 'Frank', contributionCount: 190 },
  { userId: 7, userName: 'Grace', contributionCount: 170 },
  { userId: 8, userName: 'Heidi', contributionCount: 150 },
  { userId: 9, userName: 'Ivan', contributionCount: 140 },
  { userId: 10, userName: 'Judy', contributionCount: 130 },
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

const TopContributors = () => {
  // Sort the data by contribution count in descending order
  const topContributors = contributorsData
    .sort((a, b) => b.contributionCount - a.contributionCount)
    .slice(0, 5); // Limit to top 5 contributors

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
        Top Contributors
      </Typography>

      {/* Scrollable table container */}
      <TableContainer
        component={Paper}
        elevation={0}
        sx={{
          borderRadius: '8px',
          overflowY: 'auto', // Scrollable when content overflows
          maxHeight: '300px', // Adjust maxHeight to control visible rows
        }}
      >
        <Table stickyHeader> {/* Enable sticky header for the table */}
          <TableHead>
            <TableRow>
              <TableCell>Rank</TableCell>
              <TableCell>Contributor</TableCell>
              <TableCell align="right">Contributions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {topContributors.map((contributor, index) => (
              <StyledTableRow
                key={contributor.userId}
                sx={{
                  ...getRowStyle(index), // Apply custom row styles for top 3 contributors
                }}
              >
                <TableCell>
                  {index + 1}
                  {index === 0 && <Badge style={{ backgroundColor: '#76dde1' }}>🏆</Badge>}
                  {index === 1 && <Badge style={{ backgroundColor: '#54d5d9' }}>🥈</Badge>}
                  {index === 2 && <Badge style={{ backgroundColor: '#43aaae' }}>🥉</Badge>}
                </TableCell>
                <TableCell>{contributor.userName}</TableCell>
                <TableCell align="right">{contributor.contributionCount}</TableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default TopContributors;
