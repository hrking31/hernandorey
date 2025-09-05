 import { Box } from "@mui/material";
 import CardPost from "../CardPost/CardPost";

export default function CardsPost({ posts }) {
  const sortedPosts = [...posts].sort(
    (a, b) => (a.order || 0) - (b.order || 0)
  );

  return (
    <Box>
      {sortedPosts.map((post) => (
        <Box key={post.id}>
          <CardPost id={post.id} text={post.text} logo={post.logoUrl} />
        </Box>
      ))}
    </Box>
  );
}
