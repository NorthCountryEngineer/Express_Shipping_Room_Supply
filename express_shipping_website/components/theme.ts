import { createTheme } from '@mui/material/styles';

// Augment the palette to include an accent color
declare module '@mui/material/styles' {
  interface Palette {
    accent: Palette['primary'];
  }
  interface PaletteOptions {
    accent?: PaletteOptions['primary'];
  }
}

const theme = createTheme({
  palette: {
    primary: { main: '#0B3D91' },
    secondary: { main: '#007C91' },
    background: { default: '#F5F5F5' },
    text: { primary: '#333333' },
    accent: { main: '#FF6F00' },
  },
  typography: {
    fontFamily: ['Inter', 'Roboto', 'Arial', 'sans-serif'].join(','),
    h1: { fontSize: '2.5rem' },
    h2: { fontSize: '2rem' },
    body1: { fontSize: '1rem' },
  },
});

export default theme;
