import Image from 'next/image';
import Box from '@mui/material/Box';

export default function Logo() {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
      <Image
        src="/logo.svg"
        alt="Express Shipping Room Supply"
        width={100}    // tweak to your logo’s natural aspect
        height={100}
        priority        // loads immediately
      />
    </Box>
  );
}
