import { useState, useEffect } from "react";
import { Routes, Route, useNavigate, useParams } from "react-router-dom";
import Topbar from "./scenes/global/Topbar";
import Sidebar from "./scenes/global/Sidebar";
import Dashboard from "./scenes/dashboard";
import CommunityManagementPage from "./scenes/communitymanagement";
import Invoices from "./scenes/invoices";
import Contacts from "./scenes/contacts";
import Bar from "./scenes/bar";
import Form from "./scenes/form";
import Line from "./scenes/line";
import Pie from "./scenes/pie";
import FAQ from "./scenes/faq";
import Geography from "./scenes/geography";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { ColorModeContext, useMode } from "./theme";
import Calendar from "./scenes/calendar/calendar";

// Component to handle capturing the ID and redirecting
function IdCaptureRedirect() {
  const { id } = useParams(); // Get the ID from the URL
  const navigate = useNavigate();
  // const [user, setUser] = useState({});
  
  //while user visit this site he has option to login with telegram and after telegram redidirect user to same site on new page with id so how to redirect user to same page with id

  // Use useEffect to handle side effects such as navigation
  useEffect(() => {
    const data = localStorage.getItem("data");
    if(data === null || data.telegramId !== id){
      console.log(`Captured ID: ${id}`); // Debugging
    if (id) {
      // Save ID to state if needed and then redirect
     
      
      navigate("/home"); // Redirect to home after capturing ID

      fetch(`http://127.0.0.1:8000/userInfo/${id}`).then(response => response.json()).then(data => localStorage.setItem("data", JSON.stringify(data)));
      
      
      //set the id to the local storage
    }
  }else{
    console.log(localStorage.getItem("data")); // Debugging
    navigate("/home");

  }
  }, [id, navigate]);


  return null; // No need to render anything
}

function App() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  // const [user, setUser] = useState({});
  // setUser(localStorage.getItem("data"));
  const handleSidebarToggle = () => {
    setIsSidebar((prev) => !prev);
  };

  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={handleSidebarToggle} />
            <Routes>
              {/* Route for capturing ID and redirecting */}
              <Route path="/:id" element={<IdCaptureRedirect />} />
              
              {/* Other routes */}
              <Route path="/" element={<Dashboard />} />
              <Route path="/home" element={<Dashboard />} />
              <Route path="/communitymanagement" element={<CommunityManagementPage />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/bar" element={<Bar />} />
              <Route path="/pie" element={<Pie />} />
              <Route path="/line" element={<Line />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/geography" element={<Geography />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}

export default App;
