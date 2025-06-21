import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

export default function Hero() {
  return (
    <Box
      id="hero"
      sx={(theme) => ({
        width: '100%',
        backgroundRepeat: 'no-repeat',
        backgroundImage:
          'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 90%), transparent)',
        ...theme.applyStyles('dark', {
          backgroundImage:
            'radial-gradient(ellipse 80% 50% at 50% -20%, hsl(210, 100%, 16%), transparent)',
        }),
      })}
    >
      <Container
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          pt: { xs: 14, sm: 20 },
          pb: { xs: 8, sm: 12 },
        }}
      >
        <Stack
          spacing={3}
          useFlexGap
          sx={{ alignItems: 'center', width: { xs: '100%', sm: '70%' } }}
        >
          {/* Hero headline */}
          <Typography
            variant="h1"
            sx={{
              fontSize: 'clamp(2.5rem, 8vw, 3rem)',
              textAlign: 'center',
              fontWeight: 'bold',
            }}
          >
            Modernize with a Cloud Native strategy
          </Typography>

          {/* Subheading */}
          <Typography
            variant="subtitle1"
            sx={{
              textAlign: 'center',
              color: 'text.secondary',
              maxWidth: '80%',
            }}
          >
            It's time for your systems to free up the front office.
            Cloud-native containerized services allow for offsite repairs,
            low-cost talent for IT maintenance, and scalability. 
          </Typography>

          {/* Secondary CTA */}
          <Button
            component="a"
            href="#features"
            variant="outlined"
            color="primary"
            size="small"
            sx={{ mt: 1 }}
          >
            Learn More
          </Button>
        </Stack>

      </Container>
    </Box>
  );
}
