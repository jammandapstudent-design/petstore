import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { ShoppingCart, Heart } from 'lucide-react';
import { Pet } from '../api/petApi';

interface PetCardProps {
  pet: Pet;
}

const PetCard: React.FC<PetCardProps> = ({ pet }) => {
  return (
    <Card 
      sx={{ 
        height: '100%', 
        display: 'flex', 
        flexDirection: 'column',
        borderRadius: 4,
        overflow: 'hidden',
        transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 12px 24px rgba(0,0,0,0.1)',
        },
      }}
    >
      <Box sx={{ position: 'relative' }}>
        <CardMedia
          component="img"
          height="240"
          image={pet.imageUrl || 'https://via.placeholder.com/400x300?text=Pet'}
          alt={pet.name}
          sx={{ objectFit: 'cover', height: 240 }}
        />
        <Chip 
          label={pet.category} 
          size="small" 
          sx={{ 
            position: 'absolute', 
            top: 12, 
            right: 12, 
            bgcolor: 'rgba(255, 255, 255, 0.9)',
            fontWeight: 600,
            color: 'primary.main'
          }} 
        />
      </Box>
      <CardContent sx={{ flexGrow: 1, p: 3 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
          <Typography variant="h6" component="h2" sx={{ fontWeight: 700, color: 'slate.900' }}>
            {pet.name}
          </Typography>
          <Typography variant="h6" color="primary" sx={{ fontWeight: 800 }}>
            ${pet.price.toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontWeight: 500 }}>
          {pet.breed}
        </Typography>
        <Typography variant="body2" color="text.secondary" className="line-clamp-2" sx={{ mb: 2 }}>
          {pet.description}
        </Typography>
        <Box sx={{ display: 'flex', gap: 1, mt: 'auto' }}>
          <Button 
            variant="contained" 
            fullWidth 
            startIcon={<ShoppingCart size={18} />}
            sx={{ 
              borderRadius: 2, 
              textTransform: 'none', 
              fontWeight: 600,
              boxShadow: 'none',
              '&:hover': { boxShadow: 'none' }
            }}
          >
            Add to Cart
          </Button>
          <Button 
            variant="outlined" 
            sx={{ 
              minWidth: 'auto', 
              borderRadius: 2, 
              borderColor: 'slate.200',
              color: 'slate.600'
            }}
          >
            <Heart size={18} />
          </Button>
        </Box>
      </CardContent>
    </Card>
  );
};

export default PetCard;
