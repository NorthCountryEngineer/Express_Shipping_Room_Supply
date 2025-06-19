import React, { ReactNode } from 'react';
import Link from 'next/link';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';

interface LayoutProps { children: ReactNode; }

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {['Home','Website Design','Business Resources','About'].map((label, i) => {
            const href = ['/', '/website-design', '/business-resources-design', '/about'][i];
            return (
              <Link key={href} href={href} passHref>
                <Button color="inherit">{label}</Button>
              </Link>
            );
          })}
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ my: 4 }}>
        {children}
      </Container>
    </>
  );
}
