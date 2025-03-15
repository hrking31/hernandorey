// import { Link as MuiLink, Typography, Box, Avatar } from "@mui/material";
// import { NavLink } from "react-router-dom";

// const LinkWrapper = ({ href, children }) => {
//   const isInternal = href.startsWith("/");

//   return isInternal ? (
//     <NavLink
//       to={href}
//       style={{ display: "block", textDecoration: "none", color: "inherit" }}
//     >
//       {children}
//     </NavLink>
//   ) : (
//     <MuiLink
//       href={href}
//       target="_blank"
//       rel="noopener noreferrer"
//       underline="none"
//       sx={{ display: "block", textDecoration: "none", color: "inherit" }}
//     >
//       {children}
//     </MuiLink>
//   );
// };

// const LinkItem = ({ href, text, subtext, logo, variant = "default" }) => {
//   return (
//     <LinkWrapper href={href}>
//       <Box
//         sx={{
//           display: "block",
//           borderBottom: "1px solid",
//           borderColor: "divider",
//           paddingY: 1,
//           transition: "all 0.3s ease-in-out",
//           "&:hover": {
//             backgroundColor: "divider",
//             borderBottomColor: "transparent",
//           },
//           cursor: "pointer",
//         }}
//       >
//         <Box display="flex" gap={4} alignItems="center">
//           <Avatar
//             src={logo}
//             sx={{
//               width: { xs: 35, sm: 50, md: 55 },
//               height: { xs: 35, sm: 50, md: 55 },
//               ml: 2,
//             }}
//           />
//           <Box
//             sx={{
//               textAlign: "left",
//               display: "flex",
//               flexDirection: "column",
//               alignItems: variant === "default" ? "flex-start" : "center",
//             }}
//           >
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: "1rem",
//                 fontWeight: variant === "default" ? 700 : 900,
//               }}
//             >
//               {text}
//             </Typography>
//             {variant === "default" && subtext && (
//               <Typography
//                 variant="body2"
//                 sx={{
//                   fontSize: "14px",
//                   color: "text.secondary",
//                   textAlign: "justify",
//                   wordBreak: "break-word",
//                 }}
//               >
//                 {subtext}
//               </Typography>
//             )}
//           </Box>
//         </Box>
//       </Box>
//     </LinkWrapper>
//   );
// };

// export default LinkItem;

// import { Typography, Box, Avatar } from "@mui/material";

// const CardPost = ({ text, subtext, logo }) => {
//   return (
//     <Box
//       sx={{
//         display: "block",
//         borderBottom: "1px solid",
//         borderColor: "divider",
//         paddingY: 1,
//         transition: "all 0.3s ease-in-out",
//         "&:hover": {
//           backgroundColor: "divider",
//           borderBottomColor: "transparent",
//         },
//         cursor: "pointer",
//       }}
//     >
//       <Box display="flex" gap={4} alignItems="center">
//         <Avatar
//           src={logo}
//           sx={{
//             width: { xs: 35, sm: 50, md: 55 },
//             height: { xs: 35, sm: 50, md: 55 },
//             ml: 2,
//           }}
//         />
//         <Box
//           sx={{
//             textAlign: "center",
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography
//             variant="body2"
//             sx={{
//               fontSize: "1rem",
//               fontWeight: 900,
//             }}
//           >
//             {text}
//           </Typography>
//           {subtext && (
//             <Typography
//               variant="body2"
//               sx={{
//                 fontSize: "14px",
//                 color: "text.secondary",
//                 textAlign: "justify",
//                 wordBreak: "break-word",
//               }}
//             >
//               {subtext}
//             </Typography>
//           )}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default CardPost;

import { Card, CardContent, Typography, Box, Avatar } from "@mui/material";
import { Link } from "react-router-dom";

export default function CardPost({ logo, text, id }) {
  return (
    <Card
      sx={{
        maxWidth: 400,
        transition: "all 0.3s ease-in-out",
        "&:hover": { boxShadow: 6 },
      }}
    >
      
      <Link to={`/post/${id}`}>
        <CardContent>
          <Box display="flex" alignItems="center" gap={2}>
            {logo && <Avatar src={logo} sx={{ width: 55, height: 55 }} />}
            <Box>
              <Typography variant="h6" fontWeight={900}>
                {text}
              </Typography>
            </Box>
          </Box>
        </CardContent>
      </Link>
    </Card>
  );
}
