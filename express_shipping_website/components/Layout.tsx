import React, { ReactNode } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';

interface LayoutProps { children: ReactNode; }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppBar position="static" color="primary">
        <Toolbar>
          {['Home','Website Design','Business Resources','Marketing','About'].map((label, i) => {
            const href = ['/', '/website-design', '/business-resources-design', '/marketing', '/about'][i];
            return (
              <Link key={href} href={href} passHref>
                <Button color="inherit">{label}</Button>
              </Link>
            );
          })}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
        <Paper elevation={1} sx={{ p: 4, backgroundColor: 'background.default' }}>
          {children}
        </Paper>
      </Container>
    </>
  );
}
