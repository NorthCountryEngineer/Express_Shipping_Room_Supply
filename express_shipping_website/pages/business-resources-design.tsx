import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';

export default function BusinessResources() {
  return (
    <Box mt={4}>
      <Typography variant="h4" component="h1" gutterBottom>
        Business Resources
      </Typography>
      <List>
        {/* TODO: replace placeholders with actual services/tools */}
        <ListItem>Internal API Gateway & Authentication</ListItem>
        <ListItem>CI/CD pipelines on GitHub Actions</ListItem>
        <ListItem>CloudFormation/CDK for infra as code</ListItem>
      </List>
    </Box>
  );
}
