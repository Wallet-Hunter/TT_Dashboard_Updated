import React from "react";
import {
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  Modal,
  useTheme,
} from "@mui/material";

const Popup = ({
  open,
  handleClose,
  formData,
  handleInputChange,
  handleAddPost,
}) => {
  const theme = useTheme();

  return (
    <Modal open={open} onClose={handleClose}>
      <Box
        sx={{
          width: 400,
          backgroundColor: theme.palette.mode === "dark" ? "#1e1e1e" : "#ffffff",
          padding: "20px",
          borderRadius: "8px",
          margin: "100px auto",
          color: theme.palette.mode === "dark" ? "#ffffff" : "#000000",
        }}
      >
        <Typography variant="h5" marginBottom="20px">
          Schedule a Post
        </Typography>

        <TextField
          label="Title"
          name="title"
          value={formData.title}
          onChange={handleInputChange}
          fullWidth
          margin="normal"
          sx={{
            input: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
            label: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
          }}
        />
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              label="Publication Date"
              type="date"
              name="publicationDate"
              value={formData.publicationDate}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              InputLabelProps={{ shrink: true }}
              sx={{
                input: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
                label: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
              }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              label="Time"
              type="time"
              name="publicationTime"
              value={formData.publicationTime}
              onChange={handleInputChange}
              fullWidth
              margin="normal"
              sx={{
                input: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
                label: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
              }}
            />
          </Grid>
        </Grid>
        <TextField
          label="Groups"
          name="groups"
          value={formData.groups.join(", ")}
          onChange={(e) =>
            handleInputChange({
              target: { name: "groups", value: e.target.value.split(",") },
            })
          }
          fullWidth
          margin="normal"
          sx={{
            input: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
            label: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
          }}
        />
        <TextField
          label="Message"
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          multiline
          rows={4}
          fullWidth
          margin="normal"
          sx={{
            input: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
            label: { color: theme.palette.mode === "dark" ? "#ffffff" : "#000000" },
          }}
        />
        <Button
          variant="contained"
          onClick={handleAddPost}
          sx={{ marginTop: "20px", backgroundColor: "#54d5d9" }}
        >
          Schedule
        </Button>
      </Box>
    </Modal>
  );
};

export default Popup;
