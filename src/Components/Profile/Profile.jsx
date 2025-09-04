import { useState, useEffect } from "react";
import { db } from "../../Components/Firebase/Firebase";
import { doc, getDoc } from "firebase/firestore";
import { List, ListItem, Typography, Tooltip } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
import ReYaz from "../../assets/ReYaz.jpg";
import { YoSoy } from "../../Data/Data";
import { useTheme } from "@mui/material/styles";

const ProfileContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(3),
  paddingLeft: 0,
  [theme.breakpoints.up("991")]: { paddingLeft: "8.5vw" },
  [theme.breakpoints.up("lg")]: { paddingLeft: "5.5vw" },
  // border: "2px solid #000",

  [theme.breakpoints.up(763)]: {
    flexWrap: "nowrap",
    flexDirection: "row",
    justifyContent: "space-between",
  },

  [theme.breakpoints.up("md")]: {
    justifyContent: "flex-start",
  },

  "@media print": {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: "0.5rem",
    paddingBottom: "2rem",
  },
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: "none",
  borderRadius: "1rem",
  display: "block",
  margin: "auto",
  order: 2,
  // border: "2px solid #000",

  [theme.breakpoints.up(763)]: {
    flexShrink: 0,
    width: "45%",
    maxWidth: 300,
    order: -1,
  },

  [theme.breakpoints.up("md")]: {
    width: "40%",
    maxWidth: 380,
  },

  [theme.breakpoints.up("lg")]: {
    width: "60%",
    maxWidth: 370,
  },

  "@media print": {
    width: "40%",
    maxWidth: 200,
  },
}));

const ProfileList = styled(List)(({ theme }) => ({
  width: "100%",
  maxWidth: "none",
  margin: "auto",
  // border: "2px solid #000",
  order: 1,

  [theme.breakpoints.up(763)]: {
    flexGrow: 1,
    width: "55%",
    maxWidth: "none",
  },

  "@media print": {
    width: "60%",
    maxWidth: "none",
    lineHeight: "1",
    padding: "0",
    margin: "0",
    fontSize: "0.7rem",
  },
}));

export default function Profile() {
  const [cvUrl, setCvUrl] = useState("");
  const theme = useTheme();

  useEffect(() => {
    const fetchCV = async () => {
      const docRef = doc(db, "config", "cv");
      const snapshot = await getDoc(docRef);
      if (snapshot.exists()) {
        setCvUrl(snapshot.data().url);
      }
    };
    fetchCV();
  }, []);


  const handleDownload = () => {
    const link = document.createElement("a");
    link.href = cvUrl;
    link.setAttribute("download", "CV-HernandoRey.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };


  return (
    <ProfileContainer>
      <ProfileImage src={ReYaz} alt="Hernando Rey" />
      <ProfileList>
        {YoSoy.map((item, index) => (
          <ListItem
            key={index}
            sx={{
              ...(item.mostrarEn === "solo-pantalla"
                ? { "@media print": { display: "none" } }
                : {}),
              ...(item.mostrarEn === "solo-imprimir"
                ? {
                    visibility: "hidden",
                    position: "absolute",
                    "@media print": {
                      visibility: "visible",
                      position: "static",
                    },
                  }
                : {}),
              display: "flex",
              alignItems: "center",
              gap: 1.2,
              minHeight: "unset",
            }}
          >
            <FiberManualRecordIcon
              sx={{
                fontSize: 11,
                color: theme.palette.mode === "dark" ? "#fcfcfc" : "#282c34",
              }}
            />
            {item.text === "CV" ? (
              <Tooltip title="¡Aquí tienes mi CV!" arrow>
                <Typography
                  variant="body2"
                  component="a"
                  href={cvUrl}
                  download="CV-HernandoRey.pdf"
                  sx={{
                    textDecoration: "underline",
                    color: "#08c",
                    "&:hover": {
                      color: "#e7762e",
                    },
                  }}
                >
                  {item.text}
                </Typography>
              </Tooltip>
            ) : item.text.startsWith("http") ? (
              <Typography
                variant="body2"
                component="a"
                href={item.text}
                target="_blank"
                rel="noopener noreferrer"
                sx={{ textDecoration: "underline", color: "blue" }}
              >
                {item.text}
              </Typography>
            ) : (
              <Typography variant="body2" sx={{ lineHeight: 0.8 }}>
                {item.text}
              </Typography>
            )}
          </ListItem>
        ))}
      </ProfileList>
    </ProfileContainer>
  );
}
