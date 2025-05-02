import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
    Box,
    Typography,
    Button,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    IconButton,
    TextField,
    InputAdornment,
    CircularProgress
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../context/AuthContext'; 
import useEntityList from '../../hooks/useEntityList';

function PacienteListPage() {
    const { apiClient } = useAuth(''); // Pega o token
    const {
        data: pacientes,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        fetchData,
        refetch 
    } = useEntityList('/pacientes', 'termo');

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este paciente?')) {
            try {
                await apiClient.delete(`/pacientes/${id}`);
                refetch(searchTerm);
            } catch (err) {
                console.error("Erro ao excluir paciente:", err);
                
                alert('Falha ao excluir paciente.');
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchData(searchTerm);
    };

    const formatDate = (dateString) => {
        if (!dateString) return '';
        try {
            const date = new Date(dateString);
            const userTimezoneOffset = date.getTimezoneOffset() * 60000;
            const adjustedDate = new Date(date.getTime() + userTimezoneOffset);
            return adjustedDate.toLocaleDateString('pt-BR');
        } catch (e) {
            console.error("Error formatting date:", dateString, e);
            return dateString;
        }
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Gestão de Pacientes
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/pacientes/novo" 
                >
                    Novo Paciente
                </Button>
            </Box>

            <Paper sx={{ mb: 3 }}>
                <Box component="form" onSubmit={handleSearchSubmit} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar por nome ou CPF..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                        disabled={loading}
                    />
                    <Button type="submit" variant="contained" sx={{ ml: 1 }} disabled={loading}>
                        {loading ? <CircularProgress size={24} /> : 'Buscar'}
                    </Button>
                </Box>
            </Paper>

            {loading && <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />}
            {error && <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>}

            {!loading && !error && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabela de pacientes">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>Data Nasc.</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pacientes.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={5} align="center">Nenhum paciente encontrado.</TableCell>
                                </TableRow>
                            ) : (
                                pacientes.map((paciente) => (
                                    <TableRow
                                        key={paciente.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        {/* Use paciente.nomeCompleto ou paciente.nome */}
                                        <TableCell component="th" scope="row">
                                            {paciente.nomeCompleto || paciente.nome}
                                        </TableCell>
                                        <TableCell>{paciente.cpf}</TableCell>
                                        <TableCell>{formatDate(paciente.dataNascimento)}</TableCell>
                                        <TableCell>{paciente.telefone1}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="editar"
                                                color="primary"
                                                component={RouterLink}
                                                to={`/pacientes/${paciente.id}/editar`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="excluir"
                                                color="error"
                                                onClick={() => handleDelete(paciente.id)}
                                            >
                                                <DeleteIcon />
                                            </IconButton>
                                        </TableCell>
                                    </TableRow>
                                ))
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Box>
    );
}

export default PacienteListPage;
