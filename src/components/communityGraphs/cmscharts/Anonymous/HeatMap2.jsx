import React, { useState } from 'react';
import styled from 'styled-components';

// List of months and days in each month
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

const daysInMonth = {
  January: 31, February: 28, March: 31, April: 30, May: 31, June: 30,
  July: 31, August: 31, September: 30, October: 31, November: 30, December: 31
};

// Get the current month and year
const currentDate = new Date();
const currentMonth = months[currentDate.getMonth()];
const currentYear = currentDate.getFullYear();

// Hardcoded daily message counts for the current month
const hardcodedData = {
  October: [0, 12, 15, 20, 25, 30, 0, 5, 10, 8, 7, 15, 18, 19, 10, 5, 0, 12, 20, 30, 18, 9, 5, 6, 0, 14, 18, 0, 15, 12, 20],
  // Add similar data for other months...
};

const HeatMap = ({ theme }) => {
  const [tooltip, setTooltip] = useState({ visible: false, content: '', top: 0, left: 0 });

  const dailyCounts = hardcodedData[currentMonth] || [];

  const handleMouseEnter = (e, label, count) => {
    const container = document.querySelector('.heatmap-container');
    const containerRect = container.getBoundingClientRect();
    const rect = e.target.getBoundingClientRect();
    const tooltipWidth = 140;
    const tooltipHeight = 50;

    let tooltipTop = rect.top + window.scrollY - tooltipHeight - 10;
    let tooltipLeft = rect.left + window.scrollX + rect.width / 2 - tooltipWidth / 2;

    if (tooltipLeft < containerRect.left) {
      tooltipLeft = containerRect.left + 10;
    } else if (tooltipLeft + tooltipWidth > containerRect.right) {
      tooltipLeft = containerRect.right - tooltipWidth - 10;
    }

    setTooltip({
      visible: true,
      content: `${label}: ${count} message${count !== 1 ? 's' : ''}`,
      top: tooltipTop,
      left: tooltipLeft
    });
  };

  const handleMouseLeave = () => {
    setTooltip({ ...tooltip, visible: false });
  };

  const renderDays = () => {
    const numberOfDays = daysInMonth[currentMonth];
    return Array.from({ length: numberOfDays }, (_, index) => {
      const day = index + 1;
      const count = dailyCounts[day - 1] || 0;
      const color = getColor(count);

      return (
        <DaySquare
          key={day}
          style={{ backgroundColor: color }}
          onMouseEnter={(e) => handleMouseEnter(e, `Day ${day}`, count)}
          onMouseLeave={handleMouseLeave}
        />
      );
    });
  };

  const getColor = (count) => {
    if (count === 0) return theme === 'dark' ? '#444' : '#ddd';
    if (count <= 20) return '#54d5d9';
    if (count <= 40) return '#2c9393';
    return '#176364';
  };

  return (
    <HeatmapContainer className={`heatmap-container ${theme}`}>
      <MonthContainer>
        <MonthName theme={theme}>{currentMonth}</MonthName>
        <DaysGrid>
          {renderDays()}
        </DaysGrid>
      </MonthContainer>
      {tooltip.visible && (
        <Tooltip theme={theme} style={{ top: tooltip.top, left: tooltip.left }} dangerouslySetInnerHTML={{ __html: tooltip.content }} />
      )}
    </HeatmapContainer>
  );
};

// Styled components for HeatMap
const HeatmapContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  box-sizing: border-box;
  padding: 20px;
  margin: 10px 0;
`;

const MonthContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  height: auto;  /* Allow dynamic height based on content */
  box-sizing: border-box;
`;

const MonthName = styled.div`
  margin-bottom: 10px;
  font-size: 2vw;  /* Responsive font size */
  font-weight: bold;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};  /* Adjusted for visibility */
  white-space: nowrap;
  text-align: center;
`;

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  grid-gap: 5px;
  width: 100%;
  height: auto;
`;

const DaySquare = styled.div`
  width: 100%;
  padding-top: 100%;  /* Maintain aspect ratio */
  position: relative;
  border-radius: 4px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out, background-color 0.2s ease-in-out;

  &:hover {
    opacity: 0.9;
    transform: scale(1.1);
    cursor: pointer;
  }
`;

const Tooltip = styled.div`
  position: absolute;
  padding: 10px;
  background-color: ${({ theme }) => (theme === 'dark' ? '#333' : '#fff')};
  border: 1px solid ${({ theme }) => (theme === 'dark' ? '#ADD8E6' : '#000080')};
  border-radius: 5px;
  color: ${({ theme }) => (theme === 'dark' ? '#fff' : '#000')};
  font-size: 0.9em;
  pointer-events: none;
  z-index: 1000;
  white-space: nowrap;
  opacity: 0.9;
`;

export default HeatMap;
