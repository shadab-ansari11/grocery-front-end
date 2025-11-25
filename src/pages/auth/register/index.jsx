import { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Link,
  Divider,
  Grid,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useRegister } from './hooks/useRegister';
import AppRoutes from '../../../navigation/appRoutes';
import useForm from './hooks/useForm';

const initialValues = {
  name: '',
  email: '',
  phone: '',
  address: '',
  city: '',
  state: '',
  pincode: '',
  password: '',
  confirmPassword: '',
};

export default function Register() {
  const navigate = useNavigate();
  const { tryRegister } = useRegister();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await tryRegister(values);
      if (res) {
        setTimeout(() => {
          setLoading(false);
          navigate(AppRoutes.LOGIN);
        }, 1000);
      } else {
        setLoading(false);
      }
    } catch (error) {
      console.log('error-->', error);
      setLoading(false);
    }
  };

  const formik = useForm(onSubmit, initialValues);
  const { handleSubmit, values, errors, touched, handleChange, handleBlur } = formik;

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          top: '-100px',
          right: '-100px',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          bottom: '-50px',
          left: '-50px',
        }}
      />

      {/* Left side - Illustration */}
      <Box
        sx={{
          flex: 1,
          display: { xs: 'none', md: 'flex' },
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Box sx={{ textAlign: 'center', color: 'white' }}>
          <Typography variant="h2" fontWeight={700} mb={2}>
            Join Us Today!
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Create an account and start shopping
          </Typography>
          <Box
            component="img"
            src="https://img.icons8.com/clouds/400/add-shopping-cart.png"
            alt="Shopping"
            sx={{
              width: '300px',
              height: '300px',
              mt: 4,
              filter: 'drop-shadow(0 10px 20px rgba(0,0,0,0.2))',
            }}
          />
        </Box>
      </Box>

      {/* Right side - Register Form */}
      <Box
        sx={{
          flex: 1,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 4,
        }}
      >
        <Card
          sx={{
            width: '100%',
            maxWidth: '550px',
            padding: '48px 40px',
            borderRadius: '24px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.3)',
            background: 'rgba(255, 255, 255, 0.95)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Typography
            variant="h4"
            fontWeight={700}
            mb={1}
            sx={{
              color: '#10b981',
            }}
          >
            Sign Up
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Create your account to get started
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Name and Email in one row */}
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                  Full Name*
                </Typography>
                <TextField
                  fullWidth
                  name="name"
                  placeholder="Enter your name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f8f9fa',
                      '&:hover': {
                        backgroundColor: '#fff',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10b981',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                  Email Address*
                </Typography>
                <TextField
                  fullWidth
                  name="email"
                  placeholder="Enter your email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f8f9fa',
                      '&:hover': {
                        backgroundColor: '#fff',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10b981',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Phone Number */}
            <Box mb={3}>
              <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                Phone Number*
              </Typography>
              <TextField
                fullWidth
                name="phone"
                placeholder="Enter 10-digit phone number"
                value={values.phone}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.phone && Boolean(errors.phone)}
                helperText={touched.phone && errors.phone}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fa',
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#10b981',
                    },
                  },
                }}
              />
            </Box>

            {/* Address */}
            <Box mb={3}>
              <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                Address*
              </Typography>
              <TextField
                fullWidth
                name="address"
                placeholder="Enter your street address"
                value={values.address}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.address && Boolean(errors.address)}
                helperText={touched.address && errors.address}
                multiline
                rows={2}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fa',
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#10b981',
                    },
                  },
                }}
              />
            </Box>

            {/* City, State, Pincode in one row */}
            <Grid container spacing={2} mb={3}>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                  City*
                </Typography>
                <TextField
                  fullWidth
                  name="city"
                  placeholder="City"
                  value={values.city}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.city && Boolean(errors.city)}
                  helperText={touched.city && errors.city}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f8f9fa',
                      '&:hover': {
                        backgroundColor: '#fff',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10b981',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                  State*
                </Typography>
                <TextField
                  fullWidth
                  name="state"
                  placeholder="State"
                  value={values.state}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.state && Boolean(errors.state)}
                  helperText={touched.state && errors.state}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f8f9fa',
                      '&:hover': {
                        backgroundColor: '#fff',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10b981',
                      },
                    },
                  }}
                />
              </Grid>
              <Grid item xs={12} sm={4}>
                <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                  Pincode*
                </Typography>
                <TextField
                  fullWidth
                  name="pincode"
                  placeholder="6-digit PIN"
                  value={values.pincode}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.pincode && Boolean(errors.pincode)}
                  helperText={touched.pincode && errors.pincode}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      backgroundColor: '#f8f9fa',
                      '&:hover': {
                        backgroundColor: '#fff',
                      },
                      '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                        borderColor: '#10b981',
                      },
                    },
                  }}
                />
              </Grid>
            </Grid>

            {/* Password */}
            <Box mb={3}>
              <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                Password*
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Create a password"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.password && Boolean(errors.password)}
                helperText={touched.password && errors.password}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowPassword(!showPassword)} edge="end">
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fa',
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#10b981',
                    },
                  },
                }}
              />
            </Box>

            {/* Confirm Password */}
            <Box mb={3}>
              <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                Confirm Password*
              </Typography>
              <TextField
                fullWidth
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                placeholder="Confirm your password"
                value={values.confirmPassword}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.confirmPassword && Boolean(errors.confirmPassword)}
                helperText={touched.confirmPassword && errors.confirmPassword}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton onClick={() => setShowConfirmPassword(!showConfirmPassword)} edge="end">
                        {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: '12px',
                    backgroundColor: '#f8f9fa',
                    '&:hover': {
                      backgroundColor: '#fff',
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#10b981',
                    },
                  },
                }}
              />
            </Box>

            {/* Sign Up Button */}
            <Button
              fullWidth
              type="submit"
              variant="contained"
              disabled={loading}
              sx={{
                padding: '14px',
                borderRadius: '12px',
                fontSize: '16px',
                fontWeight: 700,
                textTransform: 'none',
                backgroundColor: '#10b981',
                boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
                '&:hover': {
                  backgroundColor: '#059669',
                  boxShadow: '0 12px 28px rgba(16, 185, 129, 0.5)',
                },
                mb: 3,
              }}
            >
              {loading ? 'Creating Account...' : 'Create Account'}
            </Button>

            {/* Divider */}
            <Divider sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Login Link */}
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Already have an account?{' '}
                <Link
                  onClick={() => navigate('/login')}
                  sx={{
                    color: '#10b981',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      color: '#059669',
                      textDecoration: 'underline',
                    },
                  }}
                >
                  Log In
                </Link>
              </Typography>
            </Box>
          </form>
        </Card>
      </Box>
    </Box>
  );
}
