import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

export default function Home() {
  return (
    <Box textAlign="center" mt={8}>
      <Typography variant="h2" component="h1" gutterBottom>
        North Country Engineer: Technical Business Plan
      </Typography>
      <Typography variant="body1">
        We modernize legacy on-prem systems into cloud-native solutions on AWS, delivering robust, scalable services and professional consultancy.
      </Typography>
    </Box>
  );
}
