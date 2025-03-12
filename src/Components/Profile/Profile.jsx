import { List, ListItem, Typography } from "@mui/material";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { styled } from "@mui/material/styles";
import ReYaz from "../../assets/ReYaz.jpg";
import { YoSoy } from "../../Data/Data";
import PDF from "../../../public/Hernando Rey.pdf";
import { useTheme } from "@mui/material/styles";

const ProfileContainer = styled("div")(({ theme }) => ({
  width: "100%",
  display: "flex",
  flexWrap: "wrap",
  justifyContent: "center",
  alignItems: "center",
  gap: theme.spacing(2),
  // border: "2px solid #000",
  [theme.breakpoints.up("md")]: {
    flexWrap: "nowrap",
    justifyContent: "flex-start",
  },
}));

const ProfileImage = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: 500,
  borderRadius: "1rem",
  display: "block",
  margin: "auto",
  // border: "2px solid #000",
  order: 2,
  [theme.breakpoints.up("md")]: {
    width: "40%",
    maxWidth: 380,
    order: -1,
    marginLeft: `clamp(5%, 8vw, 12%)`,
  },
  [theme.breakpoints.up("lg")]: {
    width: "60%",
    maxWidth: 370,
    order: -1,
    margin: "0",
    marginLeft: theme.spacing(9),
  },
  [theme.breakpoints.down("md")]: {
    width: "100%", 
    maxWidth: "none", 
    margin: "0",
  },
}));

const ProfileList = styled(List)(({ theme }) => ({
  width: "100%", 
  maxWidth: "500",
  margin: "auto",
  // border: "2px solid #000",

  [theme.breakpoints.up("md")]: {
    width: "100%", 
    maxWidth: "none", 
    order: 1,

  },

  [theme.breakpoints.up("lg")]: {
    width: "100%", 
    maxWidth: 400, 
    margin: "0",
  },

  [theme.breakpoints.down("md")]: {
    width: "100%", 
    maxWidth: "none", 
    margin: "0",
  },
}));

export default function Profile() {
  const theme = useTheme();
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
            }}
          >
            <FiberManualRecordIcon
              sx={{
                fontSize: 11,
                color: theme.palette.mode === "dark" ? "#fcfcfc" : "#282c34",
              }}
            />
            {item.text === "CV" ? (
              <Typography
                variant="body2"
                component="a"
                href={PDF}
                download="CV-HernandoRey.pdf"
                sx={{
                  lineHeight: 0.8,
                  textDecoration: "underline",
                  color: "blue",
                }}
              >
                {item.text}
              </Typography>
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
              <Typography variant="body2">{item.text}</Typography>
            )}
          </ListItem>
        ))}
      </ProfileList>
    </ProfileContainer>
  );
}
