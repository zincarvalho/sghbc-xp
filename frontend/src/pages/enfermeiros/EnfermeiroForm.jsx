import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    Box,
    Typography,
    TextField,
    Button,
    Paper,
    Grid,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

function EnfermeiroForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apiClient } = useAuth();
    const isEditMode = Boolean(id);

    const [enfermeiro, setEnfermeiro] = useState({
        nome: '',
        coren: '',
        telefone: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            apiClient.get(`/enfermeiros/${id}`)
                .then(response => {
                    const data = response.data;
                    setEnfermeiro(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erro ao buscar enfermeiro:", err);
                    setError('Falha ao carregar dados do enfermeiro.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode, apiClient]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEnfermeiro(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');
        try {
            if (isEditMode) {
                await apiClient.put(`/enfermeiros/${id}`, enfermeiro);
            } else {
                await apiClient.post('/enfermeiros', enfermeiro);
            }
            navigate('/enfermeiros');
        } catch (err) {
            console.error("Erro ao salvar enfermeiro:", err);
            setError(isEditMode ? 'Falha ao atualizar enfermeiro.' : 'Falha ao criar enfermeiro.');
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditMode ? 'Editar Enfermeiro' : 'Novo Enfermeiro'}
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="nome"
                                label="Nome"
                                name="nome"
                                value={enfermeiro.nome}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="coren"
                                label="Coren"
                                name="coren"
                                value={enfermeiro.coren}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="telefone"
                                label="Telefone"
                                name="telefone"
                                value={enfermeiro.telefone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                value={enfermeiro.email}
                                onChange={handleChange}
                            />
                        </Grid>
                    </Grid>
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/enfermeiros')}
                            sx={{ mr: 1 }}
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading}
                        >
                            {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Salvar Alterações' : 'Criar Enfermeiro')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default EnfermeiroForm;

