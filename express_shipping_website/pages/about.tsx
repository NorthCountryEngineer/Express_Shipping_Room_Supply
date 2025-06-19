import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function About() {
  return (
    <Box mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        About North Country Engineer
      </Typography>
      <Typography paragraph>
        North Country Engineer is a consultancy specializing in cloud-native migrations, AWS architecture, and modernization of legacy systems. With deep expertise in on-prem to cloud transformations, we deliver scalable, secure solutions that drive business growth.
      </Typography>
    </Box>
  );
}
