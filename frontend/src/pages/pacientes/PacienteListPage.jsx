import React, { useEffect, useState } from 'react';
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
    TextField,
    InputAdornment,
    CircularProgress
} from '@mui/material';
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
    useEffect(()=>{
        setpacientefiltrado(pacientes);

    },[pacientes])
    const [pacientesfiltrados, setpacientefiltrado]=useState(pacientes);
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
        setpacientefiltrado(pacientes.filter(item =>(item.cpf.includes(searchTerm))||(item.nome==searchTerm)||(item.nomeCompleto==searchTerm)));
        console.log(pacientesfiltrados);
       // fetchData(searchTerm);
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
                <Typography variant="h4" component="h1" sx={{ color: '#007bff' }}>
                    Gestão de Pacientes
                </Typography>
            </Box>

            <Paper sx={{ mb: 3 }}>
                <Box sx={{ p: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    {/* Barra de busca à esquerda */}
                    <Box component="form" onSubmit={handleSearchSubmit} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <TextField
                            sx={{ width: 300 }}
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
                        <Button type="submit" variant="contained" disabled={loading}>
                            {loading ? <CircularProgress size={24} /> : 'Buscar'}
                        </Button>
                    </Box>

                    {/* Botão imagem à direita */}
                    <Box
                        component={RouterLink}
                        to="/pacientes/novo"
                        sx={{ display: 'inline-block', cursor: 'pointer' }}
                    >
                        <img
                            src="public/assets/CP.png"
                            alt="Cadastrar Paciente"
                            style={{ height: '100px' }}
                        />
                    </Box>
                </Box>
            </Paper>

            {loading && <CircularProgress sx={{ display: 'block', margin: 'auto', mt: 4 }} />}
            {error && <Typography color="error" sx={{ mt: 2, textAlign: 'center' }}>{error}</Typography>}

            {!loading && !error && (
                <TableContainer
                    component={Paper}
                    sx={{
                        maxHeight: 440,
                        overflowY: 'auto',
                        '&::-webkit-scrollbar': {
                            width: '8px',
                        },
                        '&::-webkit-scrollbar-thumb': {
                            backgroundColor: '#007bff',
                            borderRadius: '10px',
                        },
                    }}
                >
                    <Table stickyHeader sx={{ minWidth: 650 }} aria-label="tabela de pacientes">
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ fontWeight: 'bold' }}>Nome</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>CPF</TableCell>
                                <TableCell sx={{ fontWeight: 'bold' }}>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {pacientes.length === 0 ? (
                                <TableRow sx={{ height: 55 }}>
                                    <TableCell colSpan={3} align="center">Nenhum paciente encontrado.</TableCell>
                                </TableRow>
                            ) : (
                                pacientesfiltrados.map((paciente, index) => (
                                    <TableRow
                                        key={paciente.id}
                                        sx={{
                                            height: 55,
                                            '&:last-child td, &:last-child th': { border: 0 },
                                            backgroundColor: index % 2 === 0 ? '#e5eff8' : 'white',
                                        }}
                                    >
                                        <TableCell component="th" scope="row" sx={{ color: '#007bff', fontWeight: 'bold' }}>
                                            {paciente.nomeCompleto || paciente.nome}
                                        </TableCell>
                                        <TableCell sx={{ color: '#007bff' }}>
                                            {paciente.cpf}
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                aria-label="editar"
                                                color="primary"
                                                variant="contained"
                                                component={RouterLink}
                                                to={`/pacientes/${paciente.id}/editar`}
                                                sx={{ mr: 1 }}
                                            >
                                                Editar
                                            </Button>
                                            <Button
                                                aria-label="agendar"
                                                color="primary"
                                                variant="contained"
                                                component={RouterLink}
                                                to={`/agendamentos/novo`}
                                                sx={{ mr: 1 }}
                                            >
                                                Agendar
                                            </Button>
                                            <Button
                                                aria-label="excluir"
                                                color="primary"
                                                variant="contained"
                                                onClick={() => handleDelete(paciente.id)}
                                            >
                                                Excluir
                                            </Button>
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
