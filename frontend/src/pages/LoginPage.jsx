import React from 'react';
import { 
  Container, 
  Box, 
  TextField, 
  Button, 
  Typography, 
  Paper, 
  Avatar,
  CssBaseline
} from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';

function LoginPage() {
    const [username, setUsername] = React.useState('');
    const [password, setPassword] = React.useState('');
    const [error, setError] = React.useState('');
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    // Get the path the user was trying to access, or default to '/' 
    const from = location.state?.from?.pathname || "/";

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(''); // Clear previous errors
        
        if (!username.trim() || !password.trim()) {
            setError('Por favor, preencha todos os campos.');
            return;
        }
        
        try {
            const success = await auth.login(username, password);
            if (success) {
                navigate(from, { replace: true }); // Redirect to the originally requested page or home
            } else {
                setError('Falha no login. Verifique seu usuário e senha.');
            }
        } catch (err) {
            setError('Erro ao conectar com o servidor. Tente novamente mais tarde.');
            console.error(err);
        }
    };

    return (
        
        <Container component="main" sx={{ height: '100vh', minWidth: '100%', width: '100vw', justifyContent: 'center', alignItems: 'center', backgroundColor: '#ABCDF9', display: 'flex' }}>
            
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    
                }}
            >
                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Login - SGHBC-XP
                </Typography>
                <Paper elevation={4} sx={{
                    p: 4,
                    width: '100%',
                    maxWidth: '400px',
                    backgroundColor: 'white',
                    borderRadius: '12px', // Bordas arredondadas
                    boxShadow: '4px 4px 0px rgba(0,0,0,0.4)' }}>
                    <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            id="username"
                            label="Usuário"
                            name="username"
                            autoComplete="username"
                            autoFocus
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <TextField
                            margin="normal"
                            required
                            fullWidth
                            name="password"
                            label="Senha"
                            type="password"
                            id="password"
                            autoComplete="current-password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        {error && (
                            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                                {error}
                            </Typography>
                        )}
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{
                                backgroundColor: '#007BFF',
                                fontFamily: 'Roboto, sans-serif',
                                fontWeight: 'bold',
                                color: 'white',
                                padding: '12px 0',
                                borderRadius: '8px',
                                boxShadow: '0px 4px 8px rgba(0,0,0,0.3)',
                                '&:hover': { backgroundColor: '#0056b3' },
                            }}
                        >
                            Entrar
                        </Button>
                    </Box>
                </Paper>
                <Box mt={8}>
                    <Typography variant="body2" color="text.secondary" align="center">
                        5º Período ADS - Sistema de Gestão Hospitalar - SGHBC-XP © {new Date().getFullYear()}
                    </Typography>
                </Box>
            </Box>
           
        </Container>

    );
}
export default LoginPage;
