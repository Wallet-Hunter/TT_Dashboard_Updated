import React, { useState } from "react";
import {
  Box,
  Button,
  Typography,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { FaRegCalendarAlt, FaListUl } from "react-icons/fa";
import Popup from "./Popup"; // Import the new Popup component

const SchedulePost = () => {
  const [openModal, setOpenModal] = useState(false);
  const [isListView, setIsListView] = useState(true);
  const [openCalendar, setOpenCalendar] = useState(false);
  const [scheduledPosts, setScheduledPosts] = useState([]);
  const [formData, setFormData] = useState({
    title: "",
    publicationDate: "",
    publicationTime: "",
    groups: [],
    message: "",
  });

  const handleOpenModal = () => setOpenModal(true);
  const handleCloseModal = () => setOpenModal(false);
  
  const handleOpenCalendar = () => setOpenCalendar(true);
  const handleCloseCalendar = () => setOpenCalendar(false);

  const handleAddPost = () => {
    setScheduledPosts((prev) => [...prev, formData]);
    setFormData({
      title: "",
      publicationDate: "",
      publicationTime: "",
      groups: [],
      message: "",
    });
    handleCloseModal();
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const renderScheduledPosts = () => {
    return scheduledPosts.length > 0 ? (
      <TableContainer component={Paper} sx={{ maxHeight: "400px", overflowY: "auto" }}>
        <Table stickyHeader>
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Publication Date</TableCell>
              <TableCell>Publication Time</TableCell>
              <TableCell>Groups</TableCell>
              <TableCell>Message</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {scheduledPosts.map((post, index) => (
              <TableRow key={index}>
                <TableCell>{post.title}</TableCell>
                <TableCell>{post.publicationDate}</TableCell>
                <TableCell>{post.publicationTime}</TableCell>
                <TableCell>{post.groups.join(", ")}</TableCell>
                <TableCell>{post.message}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    ) : (
      <Typography>No scheduled posts.</Typography>
    );
  };

  return (
    <Box
      sx={{
        display: "flex",
        padding: "20px",
        backgroundColor: "transparent",
        borderRadius: "8px",
        flexDirection: "row",
        flexGrow: 1,
      }}
    >
      {/* Left Side - Scheduled Posts */}
      <Box sx={{ flex: 1, marginRight: "20px" }}>
        <Typography variant="h5" marginBottom="20px">Scheduled Posts</Typography>
        {renderScheduledPosts()}
      </Box>

      {/* Right Side - Buttons and Modal */}
      <Box sx={{ width: "300px" }}>
        <Box display="flex" justifyContent="flex-end" marginBottom="20px">
          <Box display="flex" alignItems="center">
            {/* List Icon */}
            <IconButton
              onClick={() => setIsListView(true)}
              sx={{
                backgroundColor: isListView ? "rgba(255, 255, 255, 0.1)" : "transparent",
                padding: 0,
                marginRight: "5px",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <FaListUl color={isListView ? "#54d5d9" : "#ffffff"} size={24} />
            </IconButton>

            {/* Calendar Icon */}
            <IconButton
              onClick={handleOpenCalendar}
              sx={{
                backgroundColor: !isListView ? "rgba(255, 255, 255, 0.1)" : "transparent",
                padding: 0,
                marginRight: "10px",
                borderRadius: "50%",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              <FaRegCalendarAlt color={!isListView ? "#54d5d9" : "#ffffff"} size={24} />
            </IconButton>

            {/* Add Button */}
            <Button
              variant="contained"
              onClick={handleOpenModal}
              sx={{
                width: "120px",
                backgroundColor: "#54d5d9",
                color: "#ffffff",
                border: "1px solid #ffffff",
                "&:hover": {
                  backgroundColor: "rgba(255, 255, 255, 0.1)",
                },
              }}
            >
              + Add
            </Button>
          </Box>
        </Box>

        {/* Post Modal Component */}
        <Popup
          open={openModal}
          handleClose={handleCloseModal}
          formData={formData}
          handleInputChange={handleInputChange}
          handleAddPost={handleAddPost}
        />
      </Box>
    </Box>
  );
};

export default SchedulePost;
