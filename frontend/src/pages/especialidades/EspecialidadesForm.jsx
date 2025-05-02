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

function EspecialidadesForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apiClient } = useAuth();
    const isEditMode = Boolean(id);

    const [especialidade, setEspecialidade] = useState({
        nome: '',
    });

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            apiClient.get(`/especialidades/${id}`)
                .then(response => {
                    setEspecialidade(response.data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erro ao buscar especialidade:", err);
                    setError('Falha ao carregar especialidade.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode, apiClient]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setEspecialidade(prevState => ({
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
                await apiClient.put(`/especialidades/${id}`, especialidade);
            } else {
                await apiClient.post('/especialidades', especialidade);
            }
            navigate('/especialidades');
        } catch (err) {
            console.error("Erro ao salvar especialidade:", err);
            setError(isEditMode ? 'Falha ao atualizar especialidade.' : 'Falha ao criar especialidade.');
            setLoading(false);
        }
    };

    if (loading) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditMode ? 'Editar Especialidade' : 'Nova Especialidade'}
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
                                value={especialidade.nome}
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
                            onClick={() => navigate('/especialidades')}
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
                            {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Salvar Alterações' : 'Criar Especialidade')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default EspecialidadesForm;

