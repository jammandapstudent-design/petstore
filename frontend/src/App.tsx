import React from 'react';
import Navbar from './components/Navbar';
import PetGallery from './components/PetGallery';
import { Box } from '@mui/material';

function App() {
  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%' }}>
      <Navbar />
      <Box component="main" sx={{ flexGrow: 1 }}>
        <PetGallery />
      </Box>
      <Box 
        component="footer" 
        sx={{ 
          py: 6, 
          textAlign: 'center', 
          borderTop: '1px solid', 
          borderColor: 'slate.100',
          bgcolor: 'white'
        }}
      >
        <p className="text-slate-500 font-medium">© 2026 PetStore. All rights reserved.</p>
      </Box>
    </Box>
  );
}

export default App;
