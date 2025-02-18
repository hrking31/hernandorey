import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Grid2, Box } from "@mui/material";
import LogoRey from "../../assets/Rey.svg";
import styles from "../NavBar/NavBar.module.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";

export default function NavBar() {
  const location = useLocation();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        sx={{
          // backgroundColor: "#ffffff",
          boxShadow: "none",
          borderBottom: { xs: "none", sm: "0.5px solid #ddd" },
          borderTop: { xs: "1px solid #ddd", sm: "none" },
          minHeight: "36px",
          position: { xs: "fixed" },
          bottom: { xs: 0, sm: "auto" },
          top: { xs: "auto", sm: 0 },
          width: "100%",
          zIndex: 1000,
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
          <NavLink to="/" className={styles.navlogo}>
            <Box
              className={styles.logocontainer}
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <img src={LogoRey} alt="logo" className={styles.logoimg} />
              <span className={`${styles.logotext} ${styles.hiddenOnMobile}`}>
                HernandoRey
              </span>
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
            {["Hola", "Blog"].map((text, index) => {
              const path = `/${text.toLowerCase()}`;
              const isActive = location.pathname === path;

              return (
                <Grid2 item key={index}>
                  <NavLink
                    to={path}
                    className={`${styles.navlink} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    {text}
                  </NavLink>
                </Grid2>
              );
            })}
          </Grid2>
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
