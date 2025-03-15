import Grid from "@mui/material/Grid2";
import CardPost from "./CardPost";

export default function CardsPost({ posts }) {
  return (
    <Grid container spacing={3}>
      {posts.map((post, index) => (
        <Grid xs={12} sm={6} md={4} key={index}>
          <CardPost id={post.id} text={post.text} logo={post.logo} />
        </Grid>
      ))}
    </Grid>
  );
}
