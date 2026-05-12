import { useState } from 'react';
import Navbar from './components/Navbar';
import PetGallery from './components/PetGallery';
import CartDrawer from './components/CartDrawer';
import FavoritesDrawer from './components/FavoritesDrawer';
import CheckoutModal from './components/CheckoutModal';
import { Box, Snackbar, Alert } from '@mui/material';
import type { Pet } from './api/petApi';

function App() {
  const [cartItems, setCartItems] = useState<Pet[]>([]);
  const [favoriteItems, setFavoriteItems] = useState<Pet[]>([]);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isFavoritesOpen, setIsFavoritesOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleOpenCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleOrderComplete = () => {
    setCartItems([]);
  };

  const addToCart = (pet: Pet) => {
    setCartItems(prev => [...prev, pet]);
    setOpenSnackbar(true);
  };

  const removeFromCart = (index: number) => {
    setCartItems(prev => prev.filter((_, i) => i !== index));
  };

  const toggleFavorite = (pet: Pet) => {
    setFavoriteItems(prev =>
      prev.some(f => f.id === pet.id)
        ? prev.filter(f => f.id !== pet.id)
        : [...prev, pet]
    );
  };

  const removeFromFavorites = (id: number) => {
    setFavoriteItems(prev => prev.filter(f => f.id !== id));
  };

  const favoriteIds = favoriteItems.map(f => f.id as number);

  return (
    <Box sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', width: '100%', bgcolor: '#f8fafc' }}>
      <Navbar
        cartCount={cartItems.length}
        favoritesCount={favoriteItems.length}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenFavorites={() => setIsFavoritesOpen(true)}
      />

      <Box component="main" sx={{ flexGrow: 1, width: '100%' }}>
        <PetGallery
          onAddToCart={addToCart}
          onToggleFavorite={toggleFavorite}
          favorites={favoriteIds}
        />
      </Box>

      <CartDrawer
        open={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        items={cartItems}
        onRemove={removeFromCart}
        onCheckout={handleOpenCheckout}
      />

      <FavoritesDrawer
        open={isFavoritesOpen}
        onClose={() => setIsFavoritesOpen(false)}
        items={favoriteItems}
        onRemove={removeFromFavorites}
        onAddToCart={addToCart}
      />

      <CheckoutModal
        open={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        items={cartItems}
        onOrderComplete={handleOrderComplete}
      />

      <Box
        component="footer"
        sx={{
          py: 4,
          textAlign: 'center',
          borderTop: '1px solid',
          borderColor: 'divider',
          bgcolor: 'white',
          width: '100%'
        }}
      >
        <p style={{ color: '#64748b', fontWeight: 500, margin: 0 }}>© 2026 PetStore. All rights reserved.</p>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert onClose={() => setOpenSnackbar(false)} severity="success" sx={{ width: '100%', borderRadius: 3, fontWeight: 600 }}>
          Pet added to your cart! 🐾
        </Alert>
      </Snackbar>
    </Box>
  );
}

export default App;
