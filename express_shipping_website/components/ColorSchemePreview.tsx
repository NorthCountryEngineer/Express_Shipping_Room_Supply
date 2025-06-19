import React from 'react';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { useTheme } from '@mui/material/styles';

export default function ColorSchemePreview() {
  const theme = useTheme();
  const colors = [
    { name: 'Primary', hex: theme.palette.primary.main },
    { name: 'Secondary', hex: theme.palette.secondary.main },
    { name: 'Background', hex: theme.palette.background.default },
    { name: 'Text', hex: theme.palette.text.primary },
    { name: 'Accent', hex: (theme.palette as any).accent?.main || '#FF6F00' },
  ];

  return (
    <Box display="flex" gap={2} mt={2} justifyContent="center">
      {colors.map(({ name, hex }) => (
        <Paper
          key={name}
          sx={{
            p: 2,
            textAlign: 'center',
            backgroundColor: hex,
            color: theme.palette.getContrastText(hex),
          }}
        >
          <Typography variant="body2">{name}</Typography>
          <Typography variant="caption">{hex}</Typography>
        </Paper>
      ))}
    </Box>
  );
}
