import React from 'react';
import {
  Drawer, Box, Typography, IconButton, List, ListItem,
  ListItemAvatar, Avatar, ListItemText, Divider, Button, Chip
} from '@mui/material';
import { X, Heart, ShoppingCart } from 'lucide-react';
import type { Pet } from '../api/petApi';

interface FavoritesDrawerProps {
  open: boolean;
  onClose: () => void;
  items: Pet[];
  onRemove: (id: number) => void;
  onAddToCart: (pet: Pet) => void;
}

const FavoritesDrawer: React.FC<FavoritesDrawerProps> = ({ open, onClose, items, onRemove, onAddToCart }) => {
  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      slotProps={{
        paper: { sx: { width: { xs: '100%', sm: 420 }, p: 0 } }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        {/* Header */}
        <Box sx={{
          p: 3,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          borderBottom: '1px solid',
          borderColor: 'divider',
          background: 'linear-gradient(135deg, #fff1f2 0%, #ffe4e6 100%)'
        }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Heart size={24} color="#e11d48" fill="#e11d48" />
            <Typography variant="h6" sx={{ fontWeight: 800, color: '#be123c' }}>
              My Favorites ({items.length})
            </Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>

        {/* Content */}
        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {items.length === 0 ? (
            <Box sx={{
              height: '100%',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              opacity: 0.5,
              gap: 2
            }}>
              <Heart size={72} strokeWidth={1} />
              <Typography sx={{ fontWeight: 600 }}>No favorites yet</Typography>
              <Typography variant="body2" color="text.secondary" component="p" sx={{ textAlign: 'center' }}>
                Click the heart icon on any pet to save it here!
              </Typography>
            </Box>
          ) : (
            <List disablePadding>
              {items.map((pet, index) => (
                <React.Fragment key={`fav-${pet.id}-${index}`}>
                  <ListItem sx={{ py: 2, px: 1, alignItems: 'flex-start' }}>
                    <ListItemAvatar>
                      <Avatar
                        src={pet.imageUrl}
                        variant="rounded"
                        sx={{ width: 70, height: 70, mr: 2, bgcolor: 'slate.100' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography sx={{ fontWeight: 700 }}>{pet.name}</Typography>
                          <Chip label={pet.category} size="small" sx={{ fontWeight: 600, fontSize: '0.7rem' }} />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary">{pet.breed}</Typography>
                          <Typography variant="body2" color="primary" sx={{ fontWeight: 700, mt: 0.5 }}>
                            ${pet.price.toLocaleString()}
                          </Typography>
                          <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
                            <Button
                              size="small"
                              variant="contained"
                              startIcon={<ShoppingCart size={14} />}
                              onClick={() => onAddToCart(pet)}
                              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, boxShadow: 'none', fontSize: '0.75rem' }}
                            >
                              Add to Cart
                            </Button>
                            <Button
                              size="small"
                              variant="outlined"
                              color="error"
                              onClick={() => pet.id && onRemove(pet.id)}
                              sx={{ textTransform: 'none', fontWeight: 600, borderRadius: 2, fontSize: '0.75rem' }}
                            >
                              Remove
                            </Button>
                          </Box>
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < items.length - 1 && <Divider variant="inset" component="li" sx={{ ml: 10 }} />}
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {/* Footer */}
        {items.length > 0 && (
          <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', bgcolor: '#fff1f2' }}>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, textAlign: 'center' }}>
              {items.length} pet{items.length > 1 ? 's' : ''} saved to your favorites
            </Typography>
            <Button
              variant="contained"
              fullWidth
              color="error"
              size="large"
              startIcon={<ShoppingCart size={18} />}
              onClick={() => items.forEach(pet => onAddToCart(pet))}
              sx={{
                borderRadius: 3,
                py: 1.5,
                textTransform: 'none',
                fontWeight: 700,
                fontSize: '1rem',
                boxShadow: '0 4px 12px rgba(225, 29, 72, 0.3)'
              }}
            >
              Add All to Cart
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default FavoritesDrawer;
