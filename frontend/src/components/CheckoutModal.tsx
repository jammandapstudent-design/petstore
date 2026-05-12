import React, { useState } from 'react';
import {
  Dialog, DialogContent, Box, Typography, Stepper, Step, StepLabel,
  TextField, Button, Grid, Divider, IconButton, CircularProgress, Avatar, Chip
} from '@mui/material';
import { X, CheckCircle, CreditCard, MapPin, User, ShoppingBag } from 'lucide-react';
import type { Pet } from '../api/petApi';

interface CheckoutModalProps {
  open: boolean;
  onClose: () => void;
  items: Pet[];
  onOrderComplete: () => void;
}

const steps = ['Your Info', 'Shipping', 'Payment', 'Confirmation'];

const CheckoutModal: React.FC<CheckoutModalProps> = ({ open, onClose, items, onOrderComplete }) => {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    firstName: '', lastName: '', email: '', phone: '',
    address: '', city: '', state: '', zip: '',
    cardName: '', cardNumber: '', expiry: '', cvv: ''
  });

  const total = items.reduce((sum, item) => sum + item.price, 0);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleNext = () => {
    if (activeStep === 2) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setActiveStep(3);
        onOrderComplete();
      }, 2000);
    } else {
      setActiveStep(prev => prev + 1);
    }
  };

  const handleClose = () => {
    setActiveStep(0);
    setForm({ firstName: '', lastName: '', email: '', phone: '', address: '', city: '', state: '', zip: '', cardName: '', cardNumber: '', expiry: '', cvv: '' });
    onClose();
  };

  const isStepValid = () => {
    if (activeStep === 0) return form.firstName && form.lastName && form.email && form.phone;
    if (activeStep === 1) return form.address && form.city && form.state && form.zip;
    if (activeStep === 2) return form.cardName && form.cardNumber && form.expiry && form.cvv;
    return true;
  };

  return (
    <Dialog open={open} onClose={handleClose} maxWidth="sm" fullWidth PaperProps={{ sx: { borderRadius: 4, overflow: 'hidden' } }}>
      {/* Header */}
      <Box sx={{ p: 3, pb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', bgcolor: '#f8fafc', borderBottom: '1px solid', borderColor: 'divider' }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <ShoppingBag size={22} color="#3b82f6" />
          <Typography variant="h6" sx={{ fontWeight: 800 }}>Checkout</Typography>
        </Box>
        <IconButton onClick={handleClose} size="small"><X size={20} /></IconButton>
      </Box>

      <DialogContent sx={{ p: 0 }}>
        {/* Stepper */}
        <Box sx={{ px: 3, pt: 3, pb: 2 }}>
          <Stepper activeStep={activeStep} alternativeLabel>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel sx={{ '& .MuiStepLabel-label': { fontSize: '0.75rem', fontWeight: 600 } }}>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>

        <Box sx={{ px: 3, pb: 3 }}>
          {/* Step 0: Personal Info */}
          {activeStep === 0 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <User size={18} color="#3b82f6" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Personal Information</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <TextField fullWidth label="First Name" name="firstName" value={form.firstName} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Last Name" name="lastName" value={form.lastName} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Email Address" name="email" type="email" value={form.email} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Phone Number" name="phone" value={form.phone} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 1: Shipping */}
          {activeStep === 1 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <MapPin size={18} color="#3b82f6" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Shipping Address</Typography>
              </Box>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Street Address" name="address" value={form.address} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="City" name="city" value={form.city} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="State" name="state" value={form.state} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={3}>
                  <TextField fullWidth label="ZIP" name="zip" value={form.zip} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 2: Payment */}
          {activeStep === 2 && (
            <Box>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                <CreditCard size={18} color="#3b82f6" />
                <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Payment Details</Typography>
              </Box>

              {/* Order Summary */}
              <Box sx={{ bgcolor: '#f8fafc', borderRadius: 2, p: 2, mb: 2 }}>
                {items.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 0.5 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 32, height: 32 }} />
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>{item.name}</Typography>
                    </Box>
                    <Typography variant="body2" color="primary" sx={{ fontWeight: 700 }}>${item.price.toLocaleString()}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 700 }}>Total</Typography>
                  <Typography sx={{ fontWeight: 800, color: 'primary.main', fontSize: '1.1rem' }}>${total.toLocaleString()}</Typography>
                </Box>
              </Box>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField fullWidth label="Name on Card" name="cardName" value={form.cardName} onChange={handleChange} size="small" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={12}>
                  <TextField fullWidth label="Card Number" name="cardNumber" value={form.cardNumber} onChange={handleChange} size="small" placeholder="1234 5678 9012 3456" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="Expiry (MM/YY)" name="expiry" value={form.expiry} onChange={handleChange} size="small" placeholder="MM/YY" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
                <Grid item xs={6}>
                  <TextField fullWidth label="CVV" name="cvv" value={form.cvv} onChange={handleChange} size="small" type="password" sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2 } }} />
                </Grid>
              </Grid>
            </Box>
          )}

          {/* Step 3: Confirmation */}
          {activeStep === 3 && (
            <Box sx={{ textAlign: 'center', py: 3 }}>
              <CheckCircle size={72} color="#22c55e" style={{ marginBottom: 16 }} />
              <Typography variant="h5" sx={{ fontWeight: 800, color: '#15803d', mb: 1 }}>Order Confirmed! 🎉</Typography>
              <Typography color="text.secondary" sx={{ mb: 3 }}>
                Thank you, <strong>{form.firstName}</strong>! Your pets are on their way to their new home.
              </Typography>
              <Box sx={{ bgcolor: '#f0fdf4', borderRadius: 3, p: 2, mb: 3, textAlign: 'left' }}>
                <Typography variant="body2" sx={{ fontWeight: 700, mb: 1 }}>Order Summary</Typography>
                {items.map((item, i) => (
                  <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1.5, py: 0.5 }}>
                    <Avatar src={item.imageUrl} variant="rounded" sx={{ width: 36, height: 36 }} />
                    <Typography variant="body2">{item.name}</Typography>
                    <Chip label={item.category} size="small" sx={{ ml: 'auto', fontSize: '0.65rem' }} />
                    <Typography variant="body2" sx={{ fontWeight: 700, color: 'primary.main' }}>${item.price.toLocaleString()}</Typography>
                  </Box>
                ))}
                <Divider sx={{ my: 1.5 }} />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography sx={{ fontWeight: 700 }}>Total Paid</Typography>
                  <Typography sx={{ fontWeight: 800, color: 'success.main', fontSize: '1.1rem' }}>${total.toLocaleString()}</Typography>
                </Box>
              </Box>
              <Typography variant="body2" color="text.secondary">
                A confirmation has been sent to <strong>{form.email}</strong>
              </Typography>
            </Box>
          )}

          {/* Buttons */}
          <Box sx={{ mt: 3, display: 'flex', gap: 2, justifyContent: 'flex-end' }}>
            {activeStep < 3 && activeStep > 0 && (
              <Button variant="outlined" onClick={() => setActiveStep(p => p - 1)} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 600 }}>
                Back
              </Button>
            )}
            {activeStep < 3 ? (
              <Button
                variant="contained"
                onClick={handleNext}
                disabled={!isStepValid() || loading}
                sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, px: 4, minWidth: 140 }}
              >
                {loading ? <CircularProgress size={22} color="inherit" /> : activeStep === 2 ? 'Place Order' : 'Continue'}
              </Button>
            ) : (
              <Button variant="contained" color="success" onClick={handleClose} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700, px: 4 }}>
                Done
              </Button>
            )}
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default CheckoutModal;
