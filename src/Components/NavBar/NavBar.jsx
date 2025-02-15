import React from "react";
import { NavLink } from "react-router-dom";
import { AppBar, Toolbar, Typography, Grid2, Box } from "@mui/material";
import LogoRey from "../../assets/Rey.svg";
import "../NavBar/NavBar.Module.css";

export default function NavBar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        // position="static"
        sx={{
          backgroundColor: "white",
          boxShadow: "none",
          borderBottom: "1px solid #ddd",
          minHeight: "36px",
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            minHeight: "30px",
            padding: "0px 12px",
          }}
        >
          <NavLink to="/" className="nav-logo">
            <Box
              className="logo-container"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
              }}
            >
              <img src={LogoRey} alt="logo" className="logo-img" />
              <span className="logo-text">HernandoRey</span>
            </Box>
          </NavLink>
          <Grid2
            container
            justifyContent="center"
            alignItems="center"
            spacing={4}
            sx={{
              flexGrow: 1,
              position: "absolute",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            {["Hola", "Blog"].map((text, index) => (
              <Grid2 item key={index}>
                <NavLink to={`/${text.toLowerCase()}`} className="nav-link">
                  {text}
                </NavLink>
              </Grid2>
            ))}
          </Grid2>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
