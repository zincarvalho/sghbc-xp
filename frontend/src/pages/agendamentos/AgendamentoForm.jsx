import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import {
    Container, Typography, TextField, Button, Box, CircularProgress, Alert,
    FormControl, InputLabel, Select, MenuItem, Autocomplete
} from '@mui/material';
import { DateTimePicker } from '@mui/x-date-pickers/DateTimePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale/pt-BR'; // Import pt-BR locale
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api';

const AgendamentoForm = () => {
    const { id } = useParams(); // Get ID from URL for editing
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);
    const isEditMode = Boolean(id);

    const [pacientes, setPacientes] = useState([]);
    const [medicos, setMedicos] = useState([]);
    const [selectedPaciente, setSelectedPaciente] = useState(null);
    const [selectedMedico, setSelectedMedico] = useState(null);
    const [dataHora, setDataHora] = useState(new Date());
    const [observacoes, setObservacoes] = useState('');
    const [status, setStatus] = useState('AGENDADO'); // Default status for new
    const [loading, setLoading] = useState(false);
    const [formLoading, setFormLoading] = useState(isEditMode); // Load form data if editing
    const [error, setError] = useState(null);

    // Fetch Pacientes and Medicos for Autocomplete/Select
    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [pacientesRes, medicosRes] = await Promise.all([
                    api.get('/api/pacientes'), // Adjust endpoint if needed
                    api.get('/api/medicos')    // Adjust endpoint if needed
                ]);
                setPacientes(pacientesRes.data || []);
                setMedicos(medicosRes.data || []);
            } catch (err) {
                console.error("Erro ao buscar pacientes/médicos:", err);
                setError("Falha ao carregar dados necessários para o formulário.");
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    // Fetch Agendamento data if in edit mode
    useEffect(() => {
        if (isEditMode && pacientes.length > 0 && medicos.length > 0) { // Ensure dependencies are loaded
            setFormLoading(true);
            api.get(`/api/agendamentos/${id}`)
                .then(response => {
                    const agendamento = response.data;
                    const paciente = pacientes.find(p => p.id === agendamento.paciente?.id) || null;
                    const medico = medicos.find(m => m.id === agendamento.medico?.id) || null;

                    setSelectedPaciente(paciente);
                    setSelectedMedico(medico);
                    setDataHora(new Date(agendamento.dataHora));
                    setStatus(agendamento.status);
                    setObservacoes(agendamento.observacoes || '');
                    setFormLoading(false);
                })
                .catch(err => {
                    console.error("Erro ao buscar agendamento para edição:", err);
                    setError("Falha ao carregar dados do agendamento.");
                    setFormLoading(false);
                });
        }
    }, [id, isEditMode, pacientes, medicos]); // Add dependencies

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError(null);

        if (!selectedPaciente || !selectedMedico || !dataHora) {
            setError("Paciente, Médico e Data/Hora são obrigatórios.");
            setLoading(false);
            return;
        }

        const agendamentoData = {
            paciente: { id: selectedPaciente.id },
            medico: { id: selectedMedico.id },
            dataHora: dataHora.toISOString(), // Send in ISO format
            observacoes,
            status // Include status, especially for edits
        };

        try {
            if (isEditMode) {
                // Update existing agendamento (using PUT or PATCH)
                // Assuming PATCH for status updates and PUT for full updates
                // Let's use PUT here for simplicity, assuming full object update
                await api.put(`/api/agendamentos/${id}`, agendamentoData); // Adjust endpoint/method if needed
                alert('Agendamento atualizado com sucesso!');
            } else {
                // Create new agendamento
                await api.post('/api/agendamentos', agendamentoData);
                alert('Agendamento criado com sucesso!');
            }
            navigate('/agendamentos'); // Redirect to list page after success
        } catch (err) {
            console.error("Erro ao salvar agendamento:", err);
            let errorMsg = "Falha ao salvar agendamento.";
            if (err.response?.data) {
                 // Check for specific backend error messages (like availability conflict)
                 if (typeof err.response.data === 'string') {
                    errorMsg += ` Detalhes: ${err.response.data}`;
                 } else if (err.response.data.message) {
                    errorMsg += ` Detalhes: ${err.response.data.message}`;
                 }
            }
            setError(errorMsg);
             if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError("Você não tem permissão para salvar agendamentos.");
            }
        } finally {
            setLoading(false);
        }
    };

    // Check user role for permissions (example)
    const canSave = user?.roles?.includes('ADMIN') || user?.roles?.includes('RECEPCIONISTA');

    if (!canSave) {
        return (
            <Container maxWidth="sm">
                <Alert severity="error" sx={{ mt: 4 }}>Você não tem permissão para acessar esta página.</Alert>
                <Button component={Link} to="/" sx={{ mt: 2 }}>Voltar para Home</Button>
            </Container>
        );
    }

    if (formLoading && isEditMode) {
        return <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />;
    }

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Container maxWidth="md">
                <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 3 }}>
                    {isEditMode ? 'Editar Agendamento' : 'Novo Agendamento'}
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                    <Autocomplete
                        options={pacientes}
                        getOptionLabel={(option) => `${option.nome} (${option.cpf})` || ''}
                        value={selectedPaciente}
                        onChange={(event, newValue) => {
                            setSelectedPaciente(newValue);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Paciente"
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                        disabled={loading}
                    />

                    <Autocomplete
                        options={medicos}
                        getOptionLabel={(option) => `${option.nome} (${option.especialidade?.nome || 'N/A'})` || ''}
                        value={selectedMedico}
                        onChange={(event, newValue) => {
                            setSelectedMedico(newValue);
                        }}
                        isOptionEqualToValue={(option, value) => option.id === value.id}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                label="Médico"
                                margin="normal"
                                required
                                fullWidth
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: (
                                        <React.Fragment>
                                            {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                            {params.InputProps.endAdornment}
                                        </React.Fragment>
                                    ),
                                }}
                            />
                        )}
                        disabled={loading}
                    />

                    <DateTimePicker
                        label="Data e Hora"
                        value={dataHora}
                        onChange={(newValue) => setDataHora(newValue)}
                        renderInput={(params) => <TextField {...params} margin="normal" required fullWidth />}
                        ampm={false} // Use 24-hour format
                        sx={{ width: '100%', mt: 2, mb: 1 }} // Ensure full width and proper margin
                        disabled={loading}
                    />

                    {isEditMode && (
                         <FormControl fullWidth margin="normal" required disabled={loading}>
                            <InputLabel id="status-label">Status</InputLabel>
                            <Select
                                labelId="status-label"
                                id="status"
                                value={status}
                                label="Status"
                                onChange={(e) => setStatus(e.target.value)}
                            >
                                <MenuItem value="AGENDADO">Agendado</MenuItem>
                                <MenuItem value="CONFIRMADO">Confirmado</MenuItem>
                                <MenuItem value="CANCELADO">Cancelado</MenuItem>
                                <MenuItem value="REALIZADO">Realizado</MenuItem>
                                {/* Add other statuses as needed */}
                            </Select>
                        </FormControl>
                    )}

                    <TextField
                        margin="normal"
                        fullWidth
                        id="observacoes"
                        label="Observações"
                        name="observacoes"
                        multiline
                        rows={4}
                        value={observacoes}
                        onChange={(e) => setObservacoes(e.target.value)}
                        disabled={loading}
                    />

                    <Box sx={{ mt: 3, mb: 2, display: 'flex', justifyContent: 'flex-end', gap: 1 }}>
                         <Button
                            component={Link}
                            to="/agendamentos"
                            variant="outlined"
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                        <Button
                            type="submit"
                            variant="contained"
                            disabled={loading || formLoading}
                        >
                            {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Salvar Alterações' : 'Criar Agendamento')}
                        </Button>
                    </Box>
                </Box>
            </Container>
        </LocalizationProvider>
    );
};

export default AgendamentoForm;

