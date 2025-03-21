import React from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AppBar, Toolbar, Box } from "@mui/material";
import LogoRey from "../../assets/Rey.svg";
import styles from "../NavBar/NavBar.module.css";
import ThemeSwitcher from "../ThemeSwitcher/ThemeSwitcher";
import { useTheme } from "@mui/material/styles";
import { MenuNavBar } from "../../Data/Data";

export default function NavBar() {
  const location = useLocation();
  const theme = useTheme();
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar
        className={styles.appbar}
        sx={{
          boxShadow: "none",
          height: "65px",
          width: "100%",
          zIndex: 1000,
        }}
      >
        <Toolbar
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            // minHeight: "56px",
            height: "100%",
            padding: "0px 12px",
          }}
        >
          <NavLink to="/" className={styles.navlogo}>
            <Box
              className={styles.logocontainer}
              sx={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
            >
              <img src={LogoRey} className={styles.logoimg} />
              <span
                className={`${styles.logotext} ${styles.hiddenOnMobile}`}
                style={{
                  color: theme.palette.mode === "dark" ? "#fcfcfc" : "#282c34",
                  transition: "color 0.3s ease",
                }}
              >
                HernandoRey
              </span>
            </Box>
          </NavLink>
          <nav className={styles.navbar}>
            <Box className={styles.navContainer}>
              {MenuNavBar.map((text, index) => {
                const path = `/${text.toLowerCase()}`;
                const isActive = location.pathname === path;

                return (
                  <NavLink
                    key={index}
                    to={path}
                    className={`${styles.navlink} ${
                      isActive ? styles.active : ""
                    }`}
                  >
                    {text}
                  </NavLink>
                );
              })}
            </Box>
          </nav>
          <ThemeSwitcher />
        </Toolbar>
      </AppBar>
    </Box>
  );
}
