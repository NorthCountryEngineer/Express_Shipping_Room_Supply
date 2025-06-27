import React, { ReactNode } from 'react';
import Toolbar from '@mui/material/Toolbar';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import AppBar from '@/components/AppBar';

interface LayoutProps { children: ReactNode; }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppBar />
      <Toolbar variant="dense" />
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={1} sx={{ p: 4, backgroundColor: 'background.default' }}>
          {children}
        </Paper>
      </Container>
    </>
  );
}
