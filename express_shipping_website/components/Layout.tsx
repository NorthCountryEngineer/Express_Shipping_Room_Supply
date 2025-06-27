import React, { ReactNode } from 'react';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppAppBar from '@/components/MenuBar';
import { Box } from '@mui/material';

interface LayoutProps { children: ReactNode; }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Box
        aria-hidden="true"
        sx={(theme) => ({
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          zIndex: -1,
          pointerEvents: 'none',
          backgroundImage: 'url("/express_drawing.svg")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          opacity: 0.1,
          filter: theme.palette.mode === 'dark' ? 'invert(1)' : 'none',
        })}
      />
      <AppAppBar />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={1} sx={{ mt:10, p: 4, backgroundColor: 'background.default' }}>
          {children}
        </Paper>
      </Container>
    </>
  );
}
