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
    MenuItem,
    Divider
} from '@mui/material';
import { useAuth } from '../../context/AuthContext';

/**
 * Formulário para criar ou editar um paciente. Utiliza os endpoints `/pacientes` e `/convenios` para
 * buscar e salvar os dados do paciente.
 *
 * @param {Object} props - Props do componente.
 * @param {string} props.id - ID do paciente a ser editado, ou `null` para criar um novo paciente.
 * @returns {ReactElement} O formulário para criar ou editar um paciente.
 */
function PacienteForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apiClient } = useAuth();
    const isEditMode = Boolean(id);

    const [paciente, setPaciente] = useState({
        nome: '',
        cpf: '',
        rg: '', 
        dataNascimento: '',
        sexo: '', 
        telefone1: '', 
        telefone2: '', 
        email: '',
        
        endereco: {
            cep: '',
            logradouro: '',
            numero: '',
            complemento: '',
            bairro: '',
            cidade: '',
            estado: ''
        },
        convenio: null,
    });
    const [convenios, setConvenios] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingConvenios, setLoadingConvenios] = useState(false);
    const [error, setError] = useState('');

    // Fetch convenios for dropdown
    useEffect(() => {
        setLoadingConvenios(true);
        apiClient.get('/convenios') // Assuming /convenios endpoint exists
            .then(response => {
                setConvenios(response.data);
                setLoadingConvenios(false);
            })
            .catch(err => {
                console.error("Erro ao buscar convênios:", err);
                setError('Falha ao carregar lista de convênios.');
                setLoadingConvenios(false);
            });
    }, [apiClient]);

    // Fetch paciente se estiver em modo de edição
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            apiClient.get(`/pacientes/${id}`)
                .then(response => {
                    const data = response.data;
                    // Format date for input type="date"
                    if (data.dataNascimento) {
                        data.dataNascimento = data.dataNascimento.split('T')[0]; // Get YYYY-MM-DD part
                    }
                    // Ensure nested objects exist or provide defaults
                    setPaciente({
                        ...data,
                        endereco: data.endereco || { cep: '', logradouro: '', numero: '', complemento: '', bairro: '', cidade: '', estado: '' },
                        // Set convenio ID for the Select component
                        convenioId: data.convenio?.id || ''
                    });
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erro ao buscar paciente:", err);
                    setError('Falha ao carregar dados do paciente.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode, apiClient]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        if (name.startsWith('endereco.')) {
            const field = name.split('.')[1];
            setPaciente(prevState => ({
                ...prevState,
                endereco: {
                    ...prevState.endereco,
                    [field]: value
                }
            }));
        } else {
            setPaciente(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };

    // Handle Convenio change
    const handleConvenioChange = (event) => {
        const convenioId = event.target.value;
        setPaciente(prevState => ({
            ...prevState,
            convenioId: convenioId,
            // Update convenio object based on ID for submission
            convenio: convenioId ? { id: convenioId } : null
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        // Prepare data for submission, ensuring correct structure
        const dataToSend = {
            ...paciente,
            // Ensure convenio object is structured correctly or null
            convenio: paciente.convenioId ? { id: paciente.convenioId } : null,
        };
        // Remove convenioId helper field before sending
        delete dataToSend.convenioId;

        try {
            if (isEditMode) {
                await apiClient.put(`/pacientes/${id}`, dataToSend);
            } else {
                await apiClient.post('/pacientes', dataToSend);
            }
            navigate('/pacientes'); // Redireciona para a listagem de pacientes 
        } catch (err) {
            console.error("Erro ao salvar paciente:", err);
            const errorMsg = err.response?.data?.message || (isEditMode ? 'Falha ao atualizar paciente.' : 'Falha ao criar paciente.');
            setError(errorMsg);
            setLoading(false);
        }
    };

    // Api viaCep
    const handleCepLookup = async () => {
        const cep = paciente.endereco.cep?.replace(/\D/g, '');
        if (cep && cep.length === 8) {
            setLoading(true); // Consider a specific loading indicator for CEP
            try {
                const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/?callback=meu_callback`);
                if (!response.data.erro) {
                    setPaciente(prevState => ({
                        ...prevState,
                        endereco: {
                            ...prevState.endereco,
                            logradouro: response.data.logradouro,
                            bairro: response.data.bairro,
                            cidade: response.data.localidade,
                            estado: response.data.uf
                        }
                    }));
                    setError(''); // Clear previous CEP errors
                } else {
                    setError('CEP não encontrado.');
                }
            } catch (error) {
                console.error("Erro ao buscar CEP:", error);
                setError('Falha ao buscar CEP.');
            } finally {
                setLoading(false);
            }
        }
    };

    if ((loading && isEditMode) || loadingConvenios) {
        return <CircularProgress />;
    }

    return (
        <Box>
            <Typography variant="h4" component="h1" gutterBottom>
                {isEditMode ? 'Editar Paciente' : 'Novo Paciente'}
            </Typography>
            <Paper sx={{ p: 3 }}>
                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <Grid container spacing={2}>
                        {/* Dados Pessoais */}
                        <Grid item xs={12}>
                            <Typography variant="h6">Dados Pessoais</Typography>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="nome"
                                label="Nome Completo"
                                name="nome"
                                value={paciente.nome}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="cpf"
                                label="CPF"
                                name="cpf"
                                value={paciente.cpf}
                                onChange={handleChange}
                            // TODO: Add mask or validation
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="rg"
                                label="RG"
                                name="rg" // Added RG field
                                value={paciente.rg}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="dataNascimento"
                                label="Data de Nascimento"
                                name="dataNascimento"
                                type="date"
                                InputLabelProps={{ shrink: true }}
                                value={paciente.dataNascimento}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth required>
                                <InputLabel id="sexo-label">Sexo</InputLabel>
                                <Select
                                    labelId="sexo-label"
                                    id="sexo"
                                    name="sexo" // Added Sexo field
                                    value={paciente.sexo}
                                    label="Sexo"
                                    onChange={handleChange}
                                >
                                    <MenuItem value=""><em>Selecione...</em></MenuItem>
                                    <MenuItem value="Masculino">Masculino</MenuItem>
                                    <MenuItem value="Feminino">Feminino</MenuItem>
                                    <MenuItem value="Outro">Outro</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                required // Telefone1 is required in entity
                                fullWidth
                                id="telefone1"
                                label="Telefone Principal"
                                name="telefone1" // Renamed from telefone
                                value={paciente.telefone1}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                id="telefone2"
                                label="Telefone Secundário"
                                name="telefone2" // Added Telefone 2 field
                                value={paciente.telefone2}
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
                                value={paciente.email}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Endereço */}
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6">Endereço</Typography>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="endereco.cep"
                                label="CEP"
                                name="endereco.cep"
                                value={paciente.endereco.cep}
                                onChange={handleChange}
                                onBlur={handleCepLookup} // Add onBlur for CEP lookup
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                id="endereco.logradouro"
                                label="Logradouro"
                                name="endereco.logradouro"
                                value={paciente.endereco.logradouro}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="endereco.numero"
                                label="Número"
                                name="endereco.numero"
                                value={paciente.endereco.numero}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={8}>
                            <TextField
                                fullWidth
                                id="endereco.complemento"
                                label="Complemento"
                                name="endereco.complemento"
                                value={paciente.endereco.complemento}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="endereco.bairro"
                                label="Bairro"
                                name="endereco.bairro"
                                value={paciente.endereco.bairro}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="endereco.cidade"
                                label="Cidade"
                                name="endereco.cidade"
                                value={paciente.endereco.cidade}
                                onChange={handleChange}
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                id="endereco.estado"
                                label="Estado"
                                name="endereco.estado"
                                value={paciente.endereco.estado}
                                onChange={handleChange}
                            />
                        </Grid>

                        {/* Convênio */}
                        <Grid item xs={12}>
                            <Divider sx={{ my: 2 }} />
                            <Typography variant="h6">Convênio</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="convenio-label">Convênio</InputLabel>
                                <Select
                                    labelId="convenio-label"
                                    id="convenioId"
                                    name="convenioId" // Use convenioId for state tracking
                                    value={paciente.convenioId || ''} // Use convenioId from state
                                    label="Convênio"
                                    onChange={handleConvenioChange} // Use specific handler
                                >
                                    <MenuItem value="">
                                        <em>Nenhum</em>
                                    </MenuItem>
                                    {convenios.map((conv) => (
                                        <MenuItem key={conv.id} value={conv.id}>
                                            {conv.nome} {/* Assuming convenio has a 'nome' field */}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>

                    </Grid>
                    {error && (
                        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                            {error}
                        </Typography>
                    )}
                    <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                        <Button
                            variant="outlined"
                            onClick={() => navigate('/pacientes')}
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
                            {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Salvar Alterações' : 'Criar Paciente')}
                        </Button>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
}

export default PacienteForm;


