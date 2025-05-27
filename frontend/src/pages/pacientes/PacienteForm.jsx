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
            
            <Grid container spacing={2}>
            <Grid size={8}>
  <Typography variant="h4" component="h1" sx={{ color: '#007bff' }}>
    {isEditMode ? 'Editar Paciente' : 'Cadastro de Pacientes'}
  </Typography>
  <Paper sx={{ p: 3 }}>
    <Box component="form" onSubmit={handleSubmit} noValidate>
      <Grid container spacing={2}>
        {/* Nome Completo */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#007bff' }}>Nome Completo</Typography>
          <TextField
            required
            fullWidth
            id="nome"
            name="nome"
            value={paciente.nome}
            onChange={handleChange}
            variant="outlined"
          />
        </Grid>

        {/* CPF */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#007bff' }}>CPF</Typography>
          <TextField
            required
            fullWidth
            id="cpf"
            name="cpf"
            value={paciente.cpf}
            onChange={handleChange}
          />
        </Grid>

        {/* RG */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#007bff' }}>RG</Typography>
          <TextField
            required
            fullWidth
            id="rg"
            name="rg"
            value={paciente.rg}
            onChange={handleChange}
          />
        </Grid>

        {/* Data de Nascimento */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#007bff' }}>Data de Nascimento</Typography>
          <TextField
            required
            fullWidth
            id="dataNascimento"
            name="dataNascimento"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={paciente.dataNascimento}
            onChange={handleChange}
          />
        </Grid>

        {/* Sexo */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#007bff' }}>Sexo</Typography>
          <FormControl fullWidth required>
            <Select
              id="sexo"
              name="sexo"
              value={paciente.sexo}
              onChange={handleChange}
              displayEmpty
            >
              <MenuItem value=""><em>Selecione...</em></MenuItem>
              <MenuItem value="Masculino">Masculino</MenuItem>
              <MenuItem value="Feminino">Feminino</MenuItem>
              <MenuItem value="Outro">Outro</MenuItem>
            </Select>
          </FormControl>
        </Grid>

        {/* Telefone Principal */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#007bff' }}>Telefone Principal</Typography>
          <TextField
            required
            fullWidth
            id="telefone1"
            name="telefone1"
            value={paciente.telefone1}
            onChange={handleChange}
          />
        </Grid>

        {/* Telefone Secundário */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#007bff' }}>Telefone Secundário</Typography>
          <TextField
            fullWidth
            id="telefone2"
            name="telefone2"
            value={paciente.telefone2}
            onChange={handleChange}
          />
        </Grid>

        {/* Email */}
        <Grid item xs={12} sm={6}>
          <Typography sx={{ color: '#007bff' }}>Email</Typography>
          <TextField
            fullWidth
            id="email"
            name="email"
            type="email"
            value={paciente.email}
            onChange={handleChange}
          />
        </Grid>

        {/* CEP */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ color: '#007bff' }}>CEP</Typography>
          <TextField
            fullWidth
            id="endereco.cep"
            name="endereco.cep"
            value={paciente.endereco.cep}
            onChange={handleChange}
            onBlur={handleCepLookup}
          />
        </Grid>

        {/* Logradouro */}
        <Grid item xs={12} sm={8}>
          <Typography sx={{ color: '#007bff' }}>Logradouro</Typography>
          <TextField
            fullWidth
            id="endereco.logradouro"
            name="endereco.logradouro"
            value={paciente.endereco.logradouro}
            onChange={handleChange}
          />
        </Grid>

        {/* Número */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ color: '#007bff' }}>Número</Typography>
          <TextField
            fullWidth
            id="endereco.numero"
            name="endereco.numero"
            value={paciente.endereco.numero}
            onChange={handleChange}
          />
        </Grid>

        {/* Complemento */}
        <Grid item xs={12} sm={8}>
          <Typography sx={{ color: '#007bff' }}>Complemento</Typography>
          <TextField
            fullWidth
            id="endereco.complemento"
            name="endereco.complemento"
            value={paciente.endereco.complemento}
            onChange={handleChange}
          />
        </Grid>

        {/* Bairro */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ color: '#007bff' }}>Bairro</Typography>
          <TextField
            fullWidth
            id="endereco.bairro"
            name="endereco.bairro"
            value={paciente.endereco.bairro}
            onChange={handleChange}
          />
        </Grid>

        {/* Cidade */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ color: '#007bff' }}>Cidade</Typography>
          <TextField
            fullWidth
            id="endereco.cidade"
            name="endereco.cidade"
            value={paciente.endereco.cidade}
            onChange={handleChange}
          />
        </Grid>

        {/* Estado */}
        <Grid item xs={12} sm={4}>
          <Typography sx={{ color: '#007bff' }}>Estado</Typography>
          <TextField
            fullWidth
            label="Estado"
            id="endereco.estado"
            name="endereco.estado"
            value={paciente.endereco.estado}
            onChange={handleChange}
          />
        </Grid>
      </Grid>

      {/* Erro */}
      {error && (
        <Typography color="error" variant="body2" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}

      {/* Botões */}
      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        {/* Botões futuros aqui */}
      </Box>
    </Box>
  </Paper>
</Grid>

 <Divider orientation="vertical" flexItem sx={{ borderColor: '#007bff' }} />

            <Grid size={3}>
  <Typography variant="h4" component="h1" sx={{ color: '#007bff' }}>
    Convênio
  </Typography>
  <Paper sx={{ p: 3 }}>
    <Grid item xs={12}>
      <FormControl fullWidth>
        <InputLabel id="convenio-label" sx={{ color: '#007bff' }}>Convênio</InputLabel>
        <Select
          labelId="convenio-label"
          id="convenioId"
          name="convenioId"
          value={paciente.convenioId || ''}
          label="Convênio"
          onChange={handleConvenioChange}
        >
          <MenuItem value="">
            <em>Nenhum</em>
          </MenuItem>
          {convenios.map((conv) => (
            <MenuItem key={conv.id} value={conv.id}>
              {conv.nome}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Grid>

    <Grid item xs={12} sx={{ mt: 2 }}>
      <TextField
        fullWidth
        id="cnpjConvenio"
        label="CNPJ"
        name="cnpjConvenio"
        value={paciente.cnpjConvenio || ''}
        onChange={handleChange}
        InputLabelProps={{ shrink: true }}
        sx={{ '& label': { color: '#007bff' } }}
      />
    </Grid>

    <Grid item xs={12}>
      <Divider sx={{ my: 3 }} />
    </Grid>

    {/* Botões abaixo do conteúdo */}
    <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
      <Button
        type="submit"
        variant="contained"
        //onClick={handleSubmit}
        disabled={loading}
        sx={{ bgcolor: '#007bff', '&:hover': { bgcolor: '#0056b3' } }}
      >
        {loading ? <CircularProgress size={24} /> : (isEditMode ? 'Salvar Alterações' : 'Salvar')}
      </Button>

      <Button
        variant="contained"
        onClick={() => navigate('/pacientes')}
        disabled={loading}
        sx={{ bgcolor: 'error.main', '&:hover': { bgcolor: 'error.dark' } }}
      >
        Cancelar
      </Button>
    </Box>
  </Paper>
</Grid>



            </Grid>
        </Box>
        
    );
}

export default PacienteForm;
