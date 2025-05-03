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

function RecepcionistaListPage() {
    const { apiClient } = useAuth();
    const {
        data: recepcionistas,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        fetchData,
        refetch
    } = useEntityList('/recepcionistas', 'termo');

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este recepcionista?')) {
            try {
                await apiClient.delete(`/recepcionistas/${id}`);
                refetch(searchTerm);
            } catch (err) {
                console.error("Erro ao excluir recepcionista:", err);
                alert('Falha ao excluir recepcionista.');
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

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Gestão de Recepcionistas
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/recepcionistas/novo"
                >
                    Adicionar Recepcionista
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
                    <Table sx={{ minWidth: 650 }} aria-label="tabela de recepcionistas">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>CPF</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Telefone1</TableCell>
                                <TableCell>Telefone2</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {recepcionistas.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">Nenhum recepcionista encontrado.</TableCell>
                                </TableRow>
                            ) : (
                                recepcionistas.map((recepcionista) => (
                                    <TableRow
                                        key={recepcionista.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">{recepcionista.nome}</TableCell>
                                        <TableCell>{recepcionista.cpf}</TableCell>
                                        <TableCell>{recepcionista.email}</TableCell>
                                        <TableCell>{recepcionista.telefone1}</TableCell>
                                        <TableCell>{recepcionista.telefone2}</TableCell>
                                        <TableCell>
                                            <IconButton
                                                aria-label="editar"
                                                color="primary"
                                                component={RouterLink}
                                                to={`/recepcionistas/editar/${recepcionista.id}`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="excluir"
                                                color="error"
                                                onClick={() => handleDelete(recepcionista.id)}
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

export default RecepcionistaListPage;

