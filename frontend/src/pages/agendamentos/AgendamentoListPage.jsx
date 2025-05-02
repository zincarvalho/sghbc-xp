import React, { useState, useEffect, useContext } from 'react';
import { Link } from 'react-router-dom';
import {
    Container, Typography, Button, Table, TableBody, TableCell,
    TableContainer, TableHead, TableRow, Paper, IconButton, TextField, Box, CircularProgress, Alert
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../context/AuthContext';
import api from '../../services/api'; // Assuming an api service is configured

const AgendamentoListPage = () => {
    const { user } = useAuth();
    const [agendamentos, setAgendamentos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');

    const fetchAgendamentos = async (term = '') => {
        setLoading(true);
        setError(null);
        try {
            let url = '/api/agendamentos';
            if (term) {
                // Assuming backend supports search by patient name/cpf via /api/agendamentos/paciente/busca?termo=...
                url = `/api/agendamentos/paciente/busca?termo=${encodeURIComponent(term)}`;
            }
            const response = await api.get(url);
            setAgendamentos(response.data);
        } catch (err) {
            console.error("Erro ao buscar agendamentos:", err);
            setError("Falha ao carregar agendamentos. Tente novamente mais tarde.");
            // Handle specific errors like 401/403 if needed
            if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                setError("Você não tem permissão para ver os agendamentos.");
            }
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchAgendamentos();
    }, []);

    const handleSearch = () => {
        fetchAgendamentos(searchTerm);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja cancelar este agendamento?')) {
            try {
                await api.delete(`/api/agendamentos/${id}`);
                // Refetch or filter locally
                setAgendamentos(agendamentos.filter(ag => ag.id !== id));
                alert('Agendamento cancelado com sucesso!');
            } catch (err) {
                console.error("Erro ao cancelar agendamento:", err);
                alert('Falha ao cancelar agendamento.');
                 if (err.response && (err.response.status === 401 || err.response.status === 403)) {
                    alert("Você não tem permissão para cancelar agendamentos.");
                }
            }
        }
    };

    // Check user role for permissions (example)
    const canCreate = user?.roles?.includes('ADMIN') || user?.roles?.includes('RECEPCIONISTA');
    const canEdit = user?.roles?.includes('ADMIN') || user?.roles?.includes('RECEPCIONISTA');
    const canDelete = user?.roles?.includes('ADMIN') || user?.roles?.includes('RECEPCIONISTA');

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2 }}>
                Lista de Agendamentos
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <TextField
                        label="Buscar por Paciente (Nome/CPF)"
                        variant="outlined"
                        size="small"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <IconButton onClick={handleSearch} color="primary">
                        <SearchIcon />
                    </IconButton>
                </Box>
                {canCreate && (
                    <Button
                        variant="contained"
                        color="primary"
                        startIcon={<AddIcon />}
                        component={Link}
                        to="/agendamentos/novo" // Link to the creation form
                    >
                        Novo Agendamento
                    </Button>
                )}
            </Box>

            {loading && <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />}
            {error && <Alert severity="error" sx={{ mt: 2 }}>{error}</Alert>}

            {!loading && !error && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabela de agendamentos">
                        <TableHead>
                            <TableRow>
                                <TableCell>ID</TableCell>
                                <TableCell>Paciente</TableCell>
                                <TableCell>Médico</TableCell>
                                <TableCell>Data/Hora</TableCell>
                                <TableCell>Status</TableCell>
                                <TableCell>Observações</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {agendamentos.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={7} align="center">Nenhum agendamento encontrado.</TableCell>
                                </TableRow>
                            ) : (
                                agendamentos.map((agendamento) => (
                                    <TableRow
                                        key={agendamento.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {agendamento.id}
                                        </TableCell>
                                        <TableCell>{agendamento.paciente?.nome || 'N/A'}</TableCell>
                                        <TableCell>{agendamento.medico?.nome || 'N/A'}</TableCell>
                                        <TableCell>{new Date(agendamento.dataHora).toLocaleString('pt-BR')}</TableCell>
                                        <TableCell>{agendamento.status}</TableCell>
                                        <TableCell>{agendamento.observacoes || '-'}</TableCell>
                                        <TableCell align="right">
                                            {canEdit && (
                                                <IconButton
                                                    size="small"
                                                    color="primary"
                                                    component={Link}
                                                    to={`/agendamentos/editar/${agendamento.id}`} // Link to edit form
                                                >
                                                    <EditIcon />
                                                </IconButton>
                                            )}
                                            {canDelete && (
                                                <IconButton
                                                    size="small"
                                                    color="error"
                                                    onClick={() => handleDelete(agendamento.id)}
                                                >
                                                    <DeleteIcon />
                                                </IconButton>
                                            )}
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default AgendamentoListPage;

