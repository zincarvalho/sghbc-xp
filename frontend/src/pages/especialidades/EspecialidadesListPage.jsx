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

function EspecialidadesListPage() {
    const { apiClient } = useAuth();
    const {
        data: especialidades,
        loading,
        error,
        searchTerm,
        setSearchTerm,
        fetchData,
        refetch
    } = useEntityList('/especialidades', 'termo');

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir esta especialidade?')) {
            try {
                await apiClient.delete(`/especialidades/${id}`);
                refetch(searchTerm);
            } catch (err) {
                console.error("Erro ao excluir especialidade:", err);
                alert('Falha ao excluir especialidade.');
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
                    Gestão de Especialidades
                </Typography>
                <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    component={RouterLink}
                    to="/especialidades/novo"
                >
                    Nova Especialidade
                </Button>
            </Box>

            <Paper sx={{ mb: 3 }}>
                <Box component="form" onSubmit={handleSearchSubmit} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar por nome..."
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
                    <Table sx={{ minWidth: 650 }} aria-label="tabela de especialidades">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell align="right">Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {especialidades.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={2} align="center">Nenhuma especialidade encontrada.</TableCell>
                                </TableRow>
                            ) : (
                                especialidades.map((especialidade) => (
                                    <TableRow
                                        key={especialidade.id}
                                        sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                    >
                                        <TableCell component="th" scope="row">
                                            {especialidade.nome}
                                        </TableCell>
                                        <TableCell align="right">
                                            <IconButton
                                                aria-label="editar"
                                                color="primary"
                                                component={RouterLink}
                                                to={`/especialidades/${especialidade.id}/editar`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton
                                                aria-label="excluir"
                                                color="error"
                                                onClick={() => handleDelete(especialidade.id)}
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

export default EspecialidadesListPage;

