import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box, IconButton, Badge } from '@mui/material';
import { PawPrint, ShoppingCart, User, Menu, Heart } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  favoritesCount: number;
  onOpenCart: () => void;
  onOpenFavorites: () => void;
}

const Navbar: React.FC<NavbarProps> = ({ cartCount, favoritesCount, onOpenCart, onOpenFavorites }) => {
  return (
    <AppBar position="sticky" elevation={0} sx={{ bgcolor: 'white', borderBottom: '1px solid', borderColor: 'slate.100', width: '100%' }}>
      <Container maxWidth={false} sx={{ px: { xs: 2, md: 4 } }}>
        <Toolbar disableGutters sx={{ height: 80 }}>
          <Box 
            onClick={() => window.location.reload()}
            sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'primary.main', cursor: 'pointer' }}
          >
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
            <IconButton sx={{ color: '#475569' }} onClick={onOpenFavorites}>
              <Badge badgeContent={favoritesCount} color="error">
                <Heart size={22} />
              </Badge>
            </IconButton>
            <IconButton sx={{ color: '#475569' }} onClick={onOpenCart}>
              <Badge badgeContent={cartCount} color="secondary">
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
