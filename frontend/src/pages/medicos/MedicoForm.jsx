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

function MedicoForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apiClient } = useAuth();
    const isEditMode = Boolean(id);

    const [medico, setMedico] = useState({
        nome: '',
        crm: '',
        telefone: '',
        telefone2: '',
        email: '',
        especialidadeId: '',
    });
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingEspecialidades, setLoadingEspecialidades] = useState(true);
    const [error, setError] = useState('');

    // Fetch especialidades for the dropdown
    useEffect(() => {
        apiClient.get('/especialidades') // Adjust API endpoint
            .then(response => {
                setEspecialidades(response.data);
                setLoadingEspecialidades(false);
            })
            .catch(err => {
                console.error("Erro ao buscar especialidades:", err);
                setError('Falha ao carregar especialidades.');
                setLoadingEspecialidades(false);
            });
    }, [apiClient]);

    // Fetch paciente se estiver em modo de edição
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            apiClient.get(`/medicos/${id}`) // Adjust API endpoint
                .then(response => {
                    const data = response.data;
                    // Set especialidadeId from the fetched medico object
                    data.especialidadeId = data.especialidade?.id || ''; 
                    setMedico(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erro ao buscar médico:", err);
                    setError('Falha ao carregar dados do médico.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode, apiClient]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMedico(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        // Prepare data to send, linking especialidade by ID
        const dataToSend = {
            ...medico,
            especialidade: medico.especialidadeId ? { id: medico.especialidadeId } : null,
        };
        // Remove especialidadeId if it exists, as backend expects nested object
        delete dataToSend.especialidadeId; 

        try {
            if (isEditMode) {
                await apiClient.put(`/medicos/${id}`, dataToSend); // Adjust API endpoint
            } else {
                await apiClient.post('/medicos', dataToSend); // Adjust API endpoint
            }
            navigate('/medicos'); // Redirect to list page
        } catch (err) {
            console.error("Erro ao salvar médico:", err);
            setError(isEditMode ? 'Falha ao atualizar médico.' : 'Falha ao criar médico.');
            setLoading(false);
        }
    };

    if ((loading && isEditMode) || loadingEspecialidades) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditMode ? 'Editar Médico' : 'Novo Médico'}
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="nome"
                                label="Nome Completo"
                                name="nome"
                                value={medico.nome}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="crm"
                                label="CRM"
                                name="crm"
                                value={medico.crm}
                                onChange={handleChange}
                            />
                        </Grid>
                         <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="especialidade-label">Especialidade</InputLabel>
                                <Select
                                    labelId="especialidade-label"
                                    id="especialidadeId"
                                    name="especialidadeId"
                                    value={medico.especialidadeId}
                                    label="Especialidade"
                                    onChange={handleChange}
                                >
                                    <MenuItem value="">
                                        <em>Nenhuma</em>
                                    </MenuItem>
                                    {especialidades.map((esp) => (
                                        <MenuItem key={esp.id} value={esp.id}>
                                            {esp.nome}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="telefone"
                                label="Telefone1"
                                name="telefone"
                                value={medico.telefone}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="telefone"
                                label="Telefone2"
                                name="telefone2"
                                value={medico.telefone2}
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
                                value={medico.email}
                                onChange={handleChange}
                            />
                        </Grid>
                        {/* Add fields for Endereco if needed */}
                    </Grid>
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button 
                            variant="outlined" 
                            onClick={() => navigate('/medicos')} 
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
                            {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Salvar Alterações' : 'Criar Médico')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default MedicoForm;
