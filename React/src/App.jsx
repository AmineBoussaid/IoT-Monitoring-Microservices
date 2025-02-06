import { useNavigate, Outlet, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Button, Box, Drawer, List, ListItem, ListItemIcon, ListItemText, IconButton, Typography } from "@mui/material";
import { Dashboard as DashboardIcon, TableChart as TableIcon, ExitToApp as LogoutIcon, Menu as MenuIcon } from "@mui/icons-material";
import { useState } from "react";

function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [openDrawer, setOpenDrawer] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    navigate("/");
  };

  return (
    <Box sx={{ display: "flex" }}>
      {/* SIDEBAR MENU */}
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List sx={{ width: 250 }}>
          <ListItem>
            <Typography variant="h6" sx={{ fontWeight: "bold" }}>IoT Dashboard</Typography>
          </ListItem>
          <ListItem button onClick={() => navigate("/dashboard")}>
            <ListItemIcon><DashboardIcon /></ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItem>
          <ListItem button onClick={() => navigate("/dashboard/tables")}>
          <ListItemIcon><TableIcon /></ListItemIcon>
            <ListItemText primary="Tables" />
          </ListItem>
          <ListItem button onClick={handleLogout}>
            <ListItemIcon><LogoutIcon /></ListItemIcon>
            <ListItemText primary="Déconnexion" />
          </ListItem>
        </List>
      </Drawer>

      {/* TOP NAVBAR */}
      <AppBar position="fixed" sx={{ backgroundColor: "#1E88E5", zIndex: 1000 }}>
        <Toolbar>
          <IconButton color="inherit" onClick={() => setOpenDrawer(true)}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>Dashboard</Typography>
          <Button color="inherit" onClick={handleLogout}>Déconnexion</Button>
        </Toolbar>
      </AppBar>

      {/* CONTENU PRINCIPAL */}
      <Box component="main" sx={{ flexGrow: 1, mt: 8, p: 3 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default App;
