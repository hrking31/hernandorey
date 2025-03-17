import { Box } from "@mui/material";
import CardPost from "../CardPost/CardPost";

export default function CardsPost({ posts }) {
  return (
    <Box>
      {posts.map((post, index) => (
        <Box key={index}>
          <CardPost id={post.id} text={post.text} logo={post.logo} />
        </Box>
      ))}
    </Box>
  );
}
