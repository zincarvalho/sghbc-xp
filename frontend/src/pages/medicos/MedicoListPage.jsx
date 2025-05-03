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

function MedicoListPage() {
    const [medicos, setMedicos] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { apiClient } = useAuth();

    useEffect(() => {
        fetchMedicos();
    }, []);

    const fetchMedicos = async (term = '') => {
        setLoading(true);
        setError('');
        try {
            // Adjust API endpoint as needed
            const endpoint = term ? `/medicos/search?termo=${encodeURIComponent(term)}` : '/medicos';
            const response = await apiClient.get(endpoint);
            setMedicos(response.data);
        } catch (err) {
            console.error("Erro ao buscar médicos:", err);
            setError('Falha ao carregar médicos. Tente novamente mais tarde.');
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (window.confirm('Tem certeza que deseja excluir este médico?')) {
            try {
                await apiClient.delete(`/medicos/${id}`);
                fetchMedicos(searchTerm);
            } catch (err) {
                console.error("Erro ao excluir médico:", err);
                setError('Falha ao excluir médico.');
            }
        }
    };

    const handleSearchChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleSearchSubmit = (event) => {
        event.preventDefault();
        fetchMedicos(searchTerm);
    };

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h4" component="h1">
                    Gestão de Médicos
                </Typography>
                <Button 
                    variant="contained" 
                    startIcon={<AddIcon />} 
                    component={RouterLink} 
                    to="/medicos/novo"
                >
                    Novo Médico
                </Button>
            </Box>

            <Paper sx={{ mb: 3 }}>
                <Box component="form" onSubmit={handleSearchSubmit} sx={{ p: 2, display: 'flex', alignItems: 'center' }}>
                    <TextField
                        fullWidth
                        variant="outlined"
                        placeholder="Buscar por nome, CPF ou CRM..."
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
                    <Table sx={{ minWidth: 650 }} aria-label="tabela de médicos">
                        <TableHead>
                            <TableRow>
                                <TableCell>Nome</TableCell>
                                <TableCell>E-mail</TableCell>
                                <TableCell>CRM</TableCell>
                                <TableCell>Especialidade</TableCell>
                                <TableCell>Telefone1</TableCell>
                                <TableCell>Telefone2</TableCell>
                                <TableCell>Ações</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {medicos.length === 0 ? (
                                <TableRow>
                                    <TableCell colSpan={6} align="center">Nenhum médico encontrado.</TableCell>
                                </TableRow>
                            ) : (
                                medicos.map((medico) => (
                                    <TableRow key={medico.id}>
                                        <TableCell>{medico.nome}</TableCell>
                                        <TableCell>{medico.email}</TableCell>
                                        <TableCell>{medico.crm}</TableCell>
                                        <TableCell>{medico.especialidade?.nome || 'N/A'}</TableCell> {/* Assuming especialidade is an object */}
                                        <TableCell>{medico.telefone}</TableCell>
                                        <TableCell>{medico.telefone2}</TableCell>
                                        <TableCell>
                                            <IconButton 
                                                aria-label="editar" 
                                                color="primary" 
                                                component={RouterLink} 
                                                to={`/medicos/${medico.id}/editar`}
                                            >
                                                <EditIcon />
                                            </IconButton>
                                            <IconButton 
                                                aria-label="excluir" 
                                                color="error" 
                                                onClick={() => handleDelete(medico.id)}
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

export default MedicoListPage;
