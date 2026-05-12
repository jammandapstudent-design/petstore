import React from 'react';
import { Drawer, Box, Typography, IconButton, List, ListItem, ListItemAvatar, Avatar, ListItemText, Divider, Button } from '@mui/material';
import { X, Trash2, ShoppingBag } from 'lucide-react';
import type { Pet } from '../api/petApi';

interface CartDrawerProps {
  open: boolean;
  onClose: () => void;
  items: Pet[];
  onRemove: (index: number) => void;
  onCheckout: () => void;
}

const CartDrawer: React.FC<CartDrawerProps> = ({ open, onClose, items, onRemove, onCheckout }) => {
  const total = items.reduce((sum, item) => sum + item.price, 0);

  return (
    <Drawer
      anchor="right"
      open={open}
      onClose={onClose}
      PaperProps={{
        sx: { width: { xs: '100%', sm: 400 }, p: 0 }
      }}
    >
      <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid', borderColor: 'divider' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <ShoppingBag size={24} color="#3b82f6" />
            <Typography variant="h6" sx={{ fontWeight: 800 }}>Your Cart ({items.length})</Typography>
          </Box>
          <IconButton onClick={onClose} size="small">
            <X size={20} />
          </IconButton>
        </Box>

        <Box sx={{ flexGrow: 1, overflowY: 'auto', p: 2 }}>
          {items.length === 0 ? (
            <Box sx={{ height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', opacity: 0.5 }}>
              <ShoppingBag size={64} strokeWidth={1} />
              <Typography sx={{ mt: 2, fontWeight: 600 }}>Your cart is empty</Typography>
            </Box>
          ) : (
            <List disablePadding>
              {items.map((item, index) => (
                <React.Fragment key={`${item.id}-${index}`}>
                  <ListItem 
                    sx={{ py: 2, px: 1 }}
                    secondaryAction={
                      <IconButton edge="end" onClick={() => onRemove(index)} size="small" color="error">
                        <Trash2 size={18} />
                      </IconButton>
                    }
                  >
                    <ListItemAvatar>
                      <Avatar 
                        src={item.imageUrl} 
                        variant="rounded" 
                        sx={{ width: 60, height: 60, mr: 2, bgcolor: 'slate.100' }}
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={<Typography sx={{ fontWeight: 700 }}>{item.name}</Typography>}
                      secondary={
                        <Typography variant="body2" color="primary" sx={{ fontWeight: 700, mt: 0.5 }}>
                          ${item.price.toLocaleString()}
                        </Typography>
                      }
                    />
                  </ListItem>
                  <Divider variant="inset" component="li" sx={{ ml: 9 }} />
                </React.Fragment>
              ))}
            </List>
          )}
        </Box>

        {items.length > 0 && (
          <Box sx={{ p: 3, borderTop: '1px solid', borderColor: 'divider', bgcolor: 'slate.50' }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3 }}>
              <Typography sx={{ fontWeight: 600, color: 'text.secondary' }}>Total Amount</Typography>
              <Typography variant="h5" sx={{ fontWeight: 800, color: 'primary.main' }}>
                ${total.toLocaleString()}
              </Typography>
            </Box>
            <Button 
              variant="contained" 
              fullWidth 
              size="large"
              onClick={onCheckout}
              sx={{ 
                borderRadius: 3, 
                py: 1.5, 
                textTransform: 'none', 
                fontWeight: 700,
                fontSize: '1.1rem',
                boxShadow: '0 4px 12px rgba(59, 130, 246, 0.3)'
              }}
            >
              Checkout Now
            </Button>
          </Box>
        )}
      </Box>
    </Drawer>
  );
};

export default CartDrawer;
