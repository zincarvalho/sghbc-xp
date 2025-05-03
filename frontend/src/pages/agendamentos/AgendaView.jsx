import React, { useState, useEffect, useContext } from 'react';
import {
    Container, Typography, Box, Paper, Grid, CircularProgress, Alert,
    FormControl, InputLabel, Select, MenuItem, Button
} from '@mui/material';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFnsV3';
import { ptBR } from 'date-fns/locale/pt-BR';
import { AuthContext } from '../../context/AuthContext';
import api from '../../services/api';

const AgendaView = () => {
    const { user } = useContext(AuthContext);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedMedico, setSelectedMedico] = useState('');
    const [medicos, setMedicos] = useState([]);
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    // Horários de consulta disponíveis (8h às 18h, intervalos de 30min)
    const horarios = Array.from({ length: 20 }, (_, i) => {
        const hour = 8 + Math.floor(i / 2);
        const minute = (i % 2) * 30;
        return `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
    });

    // Buscar lista de médicos
    useEffect(() => {
        const fetchMedicos = async () => {
            try {
                const response = await api.get('/api/medicos');
                setMedicos(response.data || []);
                // Se houver médicos e nenhum selecionado, selecione o primeiro
                if (response.data?.length > 0 && !selectedMedico) {
                    setSelectedMedico(response.data[0].id);
                }
            } catch (err) {
                console.error("Erro ao buscar médicos:", err);
                setError("Falha ao carregar lista de médicos.");
            }
        };
        fetchMedicos();
    }, []);

    // Buscar agendamentos quando a data ou médico mudar
    useEffect(() => {
        if (!selectedMedico) return;

        const fetchAgendamentos = async () => {
            setLoading(true);
            setError(null);
            try {
                // Formatar data para YYYY-MM-DD
                const formattedDate = selectedDate.toISOString().split('T')[0];
                // Buscar agendamentos do médico na data selecionada
                const response = await api.get(`/api/agendamentos/medico/${selectedMedico}/data/${formattedDate}`);
                setAgendamentos(response.data || []);
            } catch (err) {
                console.error("Erro ao buscar agendamentos:", err);
                setError("Falha ao carregar agendamentos para a data selecionada.");
            } finally {
                setLoading(false);
            }
        };

        fetchAgendamentos();
    }, [selectedDate, selectedMedico]);

    // Verificar se um horário específico tem agendamento
    const getAgendamentoForHorario = (horario) => {
        const [hour, minute] = horario.split(':').map(Number);
        const dataHora = new Date(selectedDate);
        dataHora.setHours(hour, minute, 0, 0);
        
        return agendamentos.find(ag => {
            const agDate = new Date(ag.dataHora);
            return agDate.getHours() === hour && agDate.getMinutes() === minute;
        });
    };

    // Determinar cor do slot baseado no status do agendamento
    const getSlotColor = (agendamento) => {
        if (!agendamento) return '#f5f5f5'; // Vazio
        
        switch (agendamento.status) {
            case 'AGENDADO': return '#e3f2fd'; // Azul claro
            case 'CONFIRMADO': return '#e8f5e9'; // Verde claro
            case 'CANCELADO': return '#ffebee'; // Vermelho claro
            case 'REALIZADO': return '#e0f2f1'; // Turquesa claro
            default: return '#f5f5f5';
        }
    };

    return (
        <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
            <Container maxWidth="lg">
                <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 3 }}>
                    Visualização de Agenda
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Grid container spacing={3}>
                    {/* Seleção de data e médico */}
                    <Grid item xs={12} md={4}>
                        <Paper sx={{ p: 2, height: '100%' }}>
                            <Typography variant="h6" gutterBottom>
                                Selecione a Data
                            </Typography>
                            <DateCalendar 
                                value={selectedDate}
                                onChange={(newDate) => setSelectedDate(newDate)}
                                disablePast
                            />

                            <FormControl fullWidth sx={{ mt: 2 }}>
                                <InputLabel id="medico-select-label">Médico</InputLabel>
                                <Select
                                    labelId="medico-select-label"
                                    id="medico-select"
                                    value={selectedMedico}
                                    label="Médico"
                                    onChange={(e) => setSelectedMedico(e.target.value)}
                                >
                                    {medicos.map((medico) => (
                                        <MenuItem key={medico.id} value={medico.id}>
                                            {medico.nome} ({medico.especialidade?.nome || 'N/A'})
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Paper>
                    </Grid>

                    {/* Visualização de horários */}
                    <Grid item xs={12} md={8}>
                        <Paper sx={{ p: 2 }}>
                            <Typography variant="h6" gutterBottom>
                                Horários - {selectedDate.toLocaleDateString('pt-BR')}
                            </Typography>
                            
                            {loading ? (
                                <CircularProgress sx={{ display: 'block', margin: 'auto', my: 4 }} />
                            ) : (
                                <Box sx={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 1 }}>
                                    {horarios.map((horario) => {
                                        const agendamento = getAgendamentoForHorario(horario);
                                        return (
                                            <Paper
                                                key={horario}
                                                elevation={1}
                                                sx={{
                                                    p: 1.5,
                                                    textAlign: 'center',
                                                    backgroundColor: getSlotColor(agendamento),
                                                    cursor: agendamento ? 'default' : 'pointer',
                                                    '&:hover': {
                                                        backgroundColor: agendamento ? getSlotColor(agendamento) : '#e0e0e0'
                                                    }
                                                }}
                                            >
                                                <Typography variant="body2" fontWeight="bold">
                                                    {horario}
                                                </Typography>
                                                {agendamento ? (
                                                    <>
                                                        <Typography variant="body2" noWrap>
                                                            {agendamento.paciente?.nome || 'Paciente'}
                                                        </Typography>
                                                        <Typography variant="caption" color="textSecondary">
                                                            {agendamento.status}
                                                        </Typography>
                                                    </>
                                                ) : (
                                                    <Typography variant="body2" color="textSecondary">
                                                        Disponível
                                                    </Typography>
                                                )}
                                            </Paper>
                                        );
                                    })}
                                </Box>
                            )}

                            <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                                <Button 
                                    variant="contained" 
                                    color="primary"
                                    onClick={() => window.location.href = '/agendamentos/novo'}
                                >
                                    Novo Agendamento
                                </Button>
                            </Box>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </LocalizationProvider>
    );
};

export default AgendaView;
