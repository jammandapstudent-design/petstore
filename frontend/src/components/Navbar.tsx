import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Badge } from '@mui/material';
import { PawPrint, ShoppingCart, User, Menu } from 'lucide-react';

const Navbar: React.FC = () => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'slate.100' }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ height: 80 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', cursor: 'pointer' }}>
            <PawPrint size={32} strokeWidth={2.5} />
            <Typography
              variant="h5"
              noWrap
              component="div"
              sx={{ fontWeight: 800, letterSpacing: -0.5, color: '#0f172a' }}
            >
              PetStore
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, ml: 6, gap: 4 }}>
            {['Browse', 'Adopt', 'Shop', 'About'].map((page) => (
              <Typography
                key={page}
                sx={{ 
                  color: '#475569', 
                  fontWeight: 600, 
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                {page}
              </Typography>
            ))}
          </Box>

          <Box sx={{ display: 'flex', gap: 1 }}>
            <IconButton sx={{ color: '#475569' }}>
              <Badge badgeContent={2} color="secondary">
                <ShoppingCart size={22} />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: '#475569' }}>
              <User size={22} />
            </IconButton>
            <IconButton sx={{ display: { xs: 'flex', md: 'none' }, color: '#475569' }}>
              <Menu size={22} />
            </IconButton>
            <Button 
              variant="contained" 
              sx={{ 
                ml: 2, 
                display: { xs: 'none', md: 'inline-flex' },
                borderRadius: 2.5,
                textTransform: 'none',
                fontWeight: 600,
                px: 3
              }}
            >
              Contact Us
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar;
