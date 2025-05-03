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
    MenuItem,
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

function RecepcionistaForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apiClient } = useAuth();
    const isEditMode = Boolean(id);

    const [recepcionista, setRecepcionista] = useState({
        nome: '',
        cpf: '',
        telefone1: '',
        telefone2: '',
        email: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            apiClient.get(`/recepcionistas/${id}`)
                .then(response => {
                    const data = response.data;
                    setRecepcionista(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erro ao buscar recepcionista:", err);
                    setError('Falha ao carregar dados do recepcionista.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode, apiClient]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setRecepcionista(prevState => ({
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
                await apiClient.put(`/recepcionistas/${id}`, recepcionista);
            } else {
                await apiClient.post('/recepcionistas', recepcionista);
            }
            navigate('/recepcionistas');
        } catch (err) {
            console.error("Erro ao salvar recepcionista:", err);
            setError(isEditMode ? 'Falha ao atualizar recepcionista.' : 'Falha ao criar recepcionista.');
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditMode ? 'Editar Recepcionista' : 'Novo Recepcionista'}
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
                                value={recepcionista.nome}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="cpf"
                                label="CPF"
                                name="cpf"
                                value={recepcionista.cpf}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="telefone1"
                                label="Telefone1"
                                name="telefone1"
                                value={recepcionista.telefone1}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="telefone2"
                                label="Telefone2"
                                name="telefone2"
                                value={recepcionista.telefone2}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="email"
                                label="Email"
                                name="email"
                                type="email"
                                value={recepcionista.email}
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
                            onClick={() => navigate('/recepcionistas')}
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
                            {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Salvar Alterações' : 'Criar Recepcionista')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default RecepcionistaForm;

