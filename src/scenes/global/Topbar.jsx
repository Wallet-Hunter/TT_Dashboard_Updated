import { Box, IconButton, useTheme } from "@mui/material";
import * as React from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";
import { useEffect } from "react";
import { useContext } from "react";


import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
// import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import TelegramIcon from '@mui/icons-material/Telegram';
import { Padding } from "@mui/icons-material";

const Topbar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const colorMode = useContext(ColorModeContext);
  const [user, setUser] = useState({});
  // const [avalable, setAvalable] = useState(false);
  const botUsername = "LoginTtbot";
  const [authToken, setAuthToken] = useState("");
  const generateTelegramLoginURL = () => {
    // Construct the Telegram login URL with your bot username and auth token
    const telegramLoginURL = `tg://resolve?domain=${botUsername}&start=${authToken}`;
    return telegramLoginURL;
  }

  

  const click = () => {
    // const [loginError, setLoginError] = useState(false);
   
  // Function to handle the Telegram login
 
    const url = generateTelegramLoginURL();

    if (url && !(navigator.userAgent.indexOf("Firefox") > -1)) {
        // Trigger the login by opening the Telegram app (in most browsers)
        let anchor = document.createElement("a");
        anchor.href = url;
        anchor.target = "_blank";
        anchor.click();
        anchor.remove();
    } else {
        // Fallback for browsers that don't support the direct open (e.g., Firefox)
        // window.open(`https://t.me/${botUsername}`);
        
    }
  }
// Simulate authentication token generation (you might get this from your backend)
useEffect(() => {
  const fetchAuthToken = async () => {
      // This is where you'd normally fetch the auth token from your backend API
      const token = "7416078699:AAGk5OuX341sFtgWOBySiCw3p0-4ZRDnIoA"; // Example token
      setAuthToken(token);
      if(localStorage.getItem("data") === null){
        
        console.log("data is null");
      }else{
        // setUser(localStorage.getItem("data"));
        console.log(localStorage.getItem("data"));
        let data = JSON.parse(localStorage.getItem("data"));
        setUser(data);
        console.log(data);
      }
    };

  fetchAuthToken();
}, []);

// Callback for handling the result after login
// useEffect(() => {
//   if (authToken) {
//       // After login callback (e.g., update user state, etc.)
//       afterLoginCallback && afterLoginCallback();
//   }
// }, [authToken, afterLoginCallback]);
  
const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
    <Box display="flex" justifyContent="space-between" p={2} >
      {/* SEARCH BAR */}
      <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
        
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Search" />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box>

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        <IconButton>
          <NotificationsOutlinedIcon />
        </IconButton>
        <IconButton>
          <SettingsOutlinedIcon />
        </IconButton>
        
        {user.firstname === undefined ? ( <IconButton onClick={handleClickOpen}>
          <PersonOutlinedIcon variant="outlined" />
        </IconButton>
        
      ) : (
        <IconButton>{user.firstname + " " + user.lastname}</IconButton>
      )}
      </Box>
    </Box>
    <React.Fragment>
     
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{}}
      >
        <DialogTitle id="alert-dialog-title" style={{textAlign: "center"}}>
          {"Login with Telegram"}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {/* <h2>Login with Telegram</h2> */}
          </DialogContentText>
          <Button onClick={click} variant="contained" size="large" style={{color:"#ffffff", background:"#54a9eb"}}>
          <TelegramIcon/> Login with Telegram</Button>
        </DialogContent>
      </Dialog>
    </React.Fragment>
    </div>
  );
};

export default Topbar;
