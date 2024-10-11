import React, { useEffect, useState } from 'react';
import GaugeChart from 'react-gauge-chart';

const SentimentMeter = () => {
  const [sentimentValue, setSentimentValue] = useState(0.5); // Initial value at 50%
  const [theme, setTheme] = useState("light");
  const [shineIndex, setShineIndex] = useState(0); // Index to control the shining level
  const [isShining, setIsShining] = useState(true); // Control shining state

  const getSentimentLabel = (value) => {
    const sentimentDescriptions = [
      { label: 'Bored', min: 0, max: 0.17 },
      { label: 'Surprised', min: 0.17, max: 0.33 },
      { label: 'Worried', min: 0.33, max: 0.4 },
      { label: 'Neutral', min: 0.5, max: 0.67 },
      { label: 'Calm', min: 0.67, max: 0.83 },
      { label: 'Good', min: 0.83, max: 0.92 },
      { label: 'Happiness', min: 0.92, max: 1 }
    ];
    const sentiment = sentimentDescriptions.find(sent => value >= sent.min && value <= sent.max);
    return sentiment ? sentiment.label : '';
  };

  // Theme handling for dark/light mode
  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setTheme(matchMedia.matches ? "dark" : "light");

    const handleThemeChange = (e) => {
      setTheme(e.matches ? "dark" : "light");
    };

    matchMedia.addEventListener("change", handleThemeChange);
    return () => {
      matchMedia.removeEventListener("change", handleThemeChange);
    };
  }, []);

  // Cycle through the gauge levels to create the shine effect with pause
  useEffect(() => {
    let interval;
    if (isShining) {
      interval = setInterval(() => {
        setShineIndex((prevIndex) => (prevIndex + 1) % 6); // Cycle through indices 0-5
      }, 1000); // Change every second (adjust as needed)
    }

    return () => clearInterval(interval); // Clear interval on unmount
  }, [isShining]);

  // Cycle through shining and pausing
  useEffect(() => {
    const shineCycle = async () => {
      for (let i = 0; i < 6; i++) {
        setShineIndex(i);
        await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait for 1 second
      }
      setIsShining(false); // Stop shining after one full cycle
      await new Promise((resolve) => setTimeout(resolve, 2000)); // Pause for 2 seconds
      setIsShining(true); // Restart shining
    };

    shineCycle();
  }, []);

  const styles = {
    body: {
      margin: 0,
      padding: 0,
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '40vh', // Increased height
    },
    sentimentContainer: {
      width: '100%', // Full width of parent
      maxWidth: '700px', // Increased max width for larger meter
      textAlign: 'center',
      position: 'relative',
      padding: '10px',
      boxSizing: 'border-box',
    },
    gaugeContainer: {
      width: '100%',
      maxHeight: '250px', // Increased height for the gauge
    },
    sentimentLabel: {
      marginTop: '20px',
      fontSize: '18px', // Slightly larger font size for label
      fontWeight: 'bold',
      color: '#4bc3db',
    },
    title: {
      fontSize: '24px', // Title font size
      fontWeight: 'bold',
      color: theme === 'dark' ? '#ffffff' : '#000000', // Change color based on theme
      marginBottom: '10px', // Space below the title
    },
  };

  // Define colors with shine effect
  const colors = [
    '#c2ebf3',
    '#86d7e7',
    '#4bc3db',
    '#1c6a7a',
    '#144f5b',
    '#0d333a',
  ].map((color, index) => (
    shineIndex === index ? `${color} !important` : color // Apply shine effect based on shineIndex
  ));

  return (
    <div style={styles.body}>
      <div style={styles.sentimentContainer}>
        <div style={styles.gaugeContainer}>
          <GaugeChart
            id="sentiment-gauge"
            nrOfLevels={6}
            percent={sentimentValue}
            colors={colors} // Updated colors to include shine effect
            arcWidth={0.3}
            needleColor="#464A4F"
            textColor="#4bc3db"
            animate={true}
            style={{ width: '100%', height: '100%' }} // Increased size of the gauge
            arcPadding={0.05} // Added arc padding for better visual separation
            hideText={false} // Show percentage text if needed
            needleTransitionDuration={1000} // Smooth transition for the needle
            textFontSize={20} // Font size for the text in the gauge
          />
        </div>
        <div style={styles.sentimentLabel}>
          <p>{getSentimentLabel(sentimentValue)}</p>
        </div>
      </div>
    </div>
  );
};

export default SentimentMeter;
