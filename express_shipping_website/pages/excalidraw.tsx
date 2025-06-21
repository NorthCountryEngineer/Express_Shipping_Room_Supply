import dynamic from 'next/dynamic';
import Box from '@mui/material/Box';
import '@excalidraw/excalidraw/index.css';

const Excalidraw = dynamic(
  () => import('@excalidraw/excalidraw').then((mod) => mod.Excalidraw),
  { ssr: false }
);

export default function ExcalidrawPage() {
  return (
    <Box sx={{ height: '80vh' }}>
      <Excalidraw />
    </Box>
  );
}
