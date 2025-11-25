import { useState } from 'react';
import {
  Box,
  Card,
  TextField,
  Button,
  Typography,
  IconButton,
  InputAdornment,
  Checkbox,
  FormControlLabel,
  Link,
  Divider,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import AppRoutes from '../../../navigation/appRoutes';
import { useNavigate } from 'react-router-dom';
import { useLogin } from './hooks/useLogin';
import useForm from './hooks/useForm';

const initialValues = {
  email: '',
  password: '',
};

export default function Login() {
  const navigate = useNavigate();
  const { tryLogin } = useLogin();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const onSubmit = async (values) => {
    setLoading(true);
    try {
      const res = await tryLogin(values);
      if (res) {
        setTimeout(() => {
          setLoading(false);
          navigate(AppRoutes.HOME);
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
          left: '-100px',
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
          right: '-50px',
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
            Welcome Back!
          </Typography>
          <Typography variant="h6" sx={{ opacity: 0.9 }}>
            Login to access your shopping cart
          </Typography>
          <Box
            component="img"
            src="https://img.icons8.com/clouds/400/shopping-cart.png"
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

      {/* Right side - Login Form */}
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
            maxWidth: '450px',
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
            Log In
          </Typography>
          <Typography variant="body2" color="text.secondary" mb={4}>
            Enter your credentials to continue
          </Typography>

          <form onSubmit={handleSubmit}>
            {/* Email */}
            <Box mb={3}>
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
            </Box>

            {/* Password */}
            <Box mb={2}>
              <Typography variant="body2" fontWeight={600} mb={1} color="text.primary">
                Password*
              </Typography>
              <TextField
                fullWidth
                name="password"
                type={showPassword ? 'text' : 'password'}
                placeholder="Enter your password"
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

            {/* Remember Me & Forgot Password */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
              <FormControlLabel
                control={
                  <Checkbox
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    sx={{
                      color: '#10b981',
                      '&.Mui-checked': {
                        color: '#10b981',
                      },
                    }}
                  />
                }
                label={<Typography variant="body2">Remember Me</Typography>}
              />
              <Link
                href="#"
                underline="none"
                sx={{
                  color: '#10b981',
                  fontWeight: 600,
                  fontSize: '14px',
                  '&:hover': {
                    color: '#059669',
                  },
                }}
              >
                Forgot password?
              </Link>
            </Box>

            {/* Login Button */}
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
              {loading ? 'Logging in...' : 'Log In'}
            </Button>

            {/* Divider */}
            <Divider sx={{ mb: 3 }}>
              <Typography variant="body2" color="text.secondary">
                OR
              </Typography>
            </Divider>

            {/* Sign Up Link */}
            <Box textAlign="center">
              <Typography variant="body2" color="text.secondary">
                Don't have an account?{' '}
                <Link
                  onClick={() => navigate('/register')}
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
                  Sign Up Free
                </Link>
              </Typography>
            </Box>
          </form>
        </Card>
      </Box>
    </Box>
  );
}
