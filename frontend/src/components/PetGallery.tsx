import React, { useEffect, useState } from 'react';
import { Grid, Box, Typography, TextField, MenuItem, CircularProgress, Container, Chip } from '@mui/material';
import PetCard from './PetCard';
import { getPets } from '../api/petApi';
import type { Pet } from '../api/petApi';
import { Search } from 'lucide-react';

interface PetGalleryProps {
  onAddToCart: (pet: Pet) => void;
  onToggleFavorite: (pet: Pet) => void;
  favorites: number[];
}

const PetGallery: React.FC<PetGalleryProps> = ({ onAddToCart, onToggleFavorite, favorites }) => {
  const [pets, setPets] = useState<Pet[]>([]);
  const [loading, setLoading] = useState(true);
  const [category, setCategory] = useState('');
  const [search, setSearch] = useState('');

  useEffect(() => {
    const fetchPets = async () => {
      setLoading(true);
      try {
        const data = await getPets(category);
        setPets(data);
      } catch (error) {
        console.error('Error fetching pets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPets();
  }, [category]);

  const filteredPets = pets.filter(pet => 
    pet.name.toLowerCase().includes(search.toLowerCase()) || 
    pet.breed.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <Container maxWidth={false} sx={{ py: 6, px: { xs: 2, md: 4 } }}>
      <Box sx={{ mb: 6 }}>
        <Typography variant="h3" component="h1" sx={{ fontWeight: 800, mb: 2, color: '#1e293b' }}>
          Find Your Perfect Friend
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4, maxWidth: 600 }}>
          Browse through our curated collection of lovable pets waiting for a forever home.
        </Typography>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
          <TextField
            placeholder="Search pets..."
            variant="outlined"
            size="small"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            sx={{ 
              flexGrow: 1, 
              minWidth: 200,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'white'
              }
            }}
            InputProps={{
              startAdornment: <Search size={18} style={{ marginRight: 8, color: '#64748b' }} />,
            }}
          />
          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
            sx={{ 
              minWidth: 150,
              '& .MuiOutlinedInput-root': {
                borderRadius: 3,
                bgcolor: 'white'
              }
            }}
          >
            <MenuItem value="">All Categories</MenuItem>
            <MenuItem value="Dog">Dogs</MenuItem>
            <MenuItem value="Cat">Cats</MenuItem>
            <MenuItem value="Bird">Birds</MenuItem>
          </TextField>
        </Box>

        <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap' }}>
          {['', 'Dog', 'Cat', 'Bird'].map((cat) => (
            <Chip
              key={cat}
              label={cat || 'All'}
              onClick={() => setCategory(cat)}
              color={category === cat ? 'primary' : 'default'}
              sx={{ 
                fontWeight: 600, 
                px: 1,
                cursor: 'pointer',
                transition: 'all 0.2s',
                '&:hover': { transform: 'scale(1.05)' }
              }}
            />
          ))}
        </Box>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 10 }}>
          <CircularProgress size={60} thickness={4} />
        </Box>
      ) : filteredPets.length > 0 ? (
        <Grid container spacing={4}>
          {filteredPets.map((pet) => (
            <Grid item key={pet.id} xs={12} sm={6} md={4} lg={3}>
              <PetCard 
                pet={pet} 
                onAddToCart={onAddToCart}
                onToggleFavorite={onToggleFavorite}
                isFavorite={pet.id ? favorites.includes(pet.id) : false}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 10, bgcolor: 'slate.50', borderRadius: 4 }}>
          <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 600 }}>
            No pets found matching your criteria.
          </Typography>
        </Box>
      )}
    </Container>
  );
};

export default PetGallery;
