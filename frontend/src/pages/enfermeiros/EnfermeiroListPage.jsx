import React, { useState, useEffect } from 'react';
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
    InputAdornment
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import SearchIcon from '@mui/icons-material/Search';
import { useAuth } from '../../context/AuthContext'; // Adjust path

function EnfermeiroListPage() {
    const [enfermeiros, setEnfermeiros] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { apiClient } = useAuth();

    useEffect(() => {
        fetchEnfermeiros();
    }, []);

    const fetchEnfermeiros = async (term = '') => {
        setLoading(true);
        setError('');
        try {
            // Adjust API endpoint as needed
            const endpoint = term ? `/enfermeiros/search?termo=${encodeURIComponent(term)}` : '/enfermeiros';
            const response = await apiClient.get(endpoint);
            setEnfermeiros(response.data);
        } catch (err) {
            console.error("Erro ao buscar enfermeiros:", err);
            setError('Falha ao carregar enfermeiros. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este enfermeiro?')) {
            try {
                await apiClient.delete(`/enfermeiros/${id}`);
                fetchEnfermeiros(searchTerm);
            } catch (err) {
                console.error("Erro ao excluir enfermeiro:", err);
                setError('Falha ao excluir enfermeiro.');
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchEnfermeiros(searchTerm);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Gestão de Enfermeiros
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/enfermeiros/novo"
                >
                    Novo Enfermeiro
                </Button>
            </Box>

            <Paper sx={{ mb: 3 }}>
                <Box component="form" onSubmit={handleSearchSubmit} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar por nome, CPF ou registro..."
                        value={searchTerm}
                        onChange={handleSearchChange}
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                        }}
                    />
                    <Button type="submit" variant="contained" sx={{ ml: 1 }}>Buscar</Button>
                </Box>
            </Paper>

            {loading && <Typography>Carregando...</Typography>}
            {error && <Typography color="error">{error}</Typography>}

            {!loading && !error && (
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="tabela de enfermeiros">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>Registro</TableCell>
                                <TableCell>Telefone</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {enfermeiros.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">Nenhum enfermeiro encontrado.</TableCell>
                                </TableRow>
                            ) : (
                                enfermeiros.map((enfermeiro) => (
                                    <TableRow key={enfermeiro.id}>
                                        <TableCell>{enfermeiro.nome}</TableCell>
                                        <TableCell>{enfermeiro.coren}</TableCell>
                                        <TableCell>{enfermeiro.telefone}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="editar"
                                                color="primary"
                                                component={RouterLink}
                                                to={`/enfermeiros/${enfermeiro.id}/editar`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="excluir"
                                                color="error"
                                                onClick={() => handleDelete(enfermeiro.id)}
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

export default EnfermeiroListPage;

