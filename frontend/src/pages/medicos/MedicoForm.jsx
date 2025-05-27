import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function MedicoForm() {
    const { id } = useParams();
    const navigate = useNavigate();
    const { apiClient } = useAuth();
    const isEditMode = Boolean(id);

    const [medico, setMedico] = useState({
        nome: '',
        crm: '',
        telefone: '',
        telefone2: '',
        email: '',
        especialidadeId: '',
        // Campos de endereço
        cep: '',
        logradouro: '',
        numero: '',
        complemento: '',
        cidade: '',
        bairro: '',
        estado: ''
    });
    const [especialidades, setEspecialidades] = useState([]);
    const [loading, setLoading] = useState(false);
    const [loadingEspecialidades, setLoadingEspecialidades] = useState(true);
    const [error, setError] = useState('');

    // Fetch especialidades for the dropdown
    useEffect(() => {
        apiClient.get('/especialidades')
            .then(response => {
                setEspecialidades(response.data);
                setLoadingEspecialidades(false);
            })
            .catch(err => {
                console.error("Erro ao buscar especialidades:", err);
                setError('Falha ao carregar especialidades.');
                setLoadingEspecialidades(false);
            });
    }, [apiClient]);

    // Fetch medico se estiver em modo de edição
    useEffect(() => {
        if (isEditMode) {
            setLoading(true);
            apiClient.get(`/medicos/${id}`)
                .then(response => {
                    const data = response.data;
                    data.especialidadeId = data.especialidade?.id || ''; 
                    setMedico(data);
                    setLoading(false);
                })
                .catch(err => {
                    console.error("Erro ao buscar médico:", err);
                    setError('Falha ao carregar dados do médico.');
                    setLoading(false);
                });
        }
    }, [id, isEditMode, apiClient]);

    const handleChange = (event) => {
        const { name, value } = event.target;
        setMedico(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        const dataToSend = {
            ...medico,
            especialidade: medico.especialidadeId ? { id: medico.especialidadeId } : null,
        };
        delete dataToSend.especialidadeId; 

        try {
            if (isEditMode) {
                await apiClient.put(`/medicos/${id}`, dataToSend);
            } else {
                await apiClient.post('/medicos', dataToSend);
            }
            navigate('/medicos');
        } catch (err) {
            console.error("Erro ao salvar médico:", err);
            setError(isEditMode ? 'Falha ao atualizar médico.' : 'Falha ao criar médico.');
            setLoading(false);
        }
    };

    const handleCancel = () => {
        navigate('/medicos');
    };

    const handleVoltar = () => {
        navigate('/medicos');
    };

    if ((loading && isEditMode) || loadingEspecialidades) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '200px',
                fontSize: '18px',
                color: '#267FF0'
            }}>
                Carregando...
            </div>
        );
    }

    return (
        <div style={{
            margin: 0,
            padding: 0,
            boxSizing: 'border-box',
            fontFamily: "'Roboto', sans-serif"
        }}>

            {/* Main Content */}
            <main style={{
                margin: '37px 38px 50px 38px',
                color: '#267FF0'
            }}>
                <h1 style={{
                    marginBottom: '30px',
                    fontSize: '28px'
                }}>
                    {isEditMode ? 'EDITAR MÉDICO' : 'CADASTRO DE MÉDICO'}
                </h1>

                <form onSubmit={handleSubmit} style={{
                    maxWidth: '100%',
                    width: '90%',
                    display: 'flex',
                    flexWrap: 'wrap'
                }}>
                    {/* Linha 1 - Nome e Especialidade */}
                    <div className="linha" style={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}>
                        <div className="campo grande" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '500px'
                        }}>
                            <label htmlFor="nome">Nome Completo</label>
                            <input
                                type="text"
                                id="nome"
                                name="nome"
                                value={medico.nome}
                                onChange={handleChange}
                                required
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div className="campo medio" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '335px'
                        }}>
                            <label htmlFor="especialidadeId">Especialidade</label>
                            <select
                                id="especialidadeId"
                                name="especialidadeId"
                                value={medico.especialidadeId}
                                onChange={handleChange}
                                required
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="">Selecione uma especialidade</option>
                                {especialidades.map((esp) => (
                                    <option key={esp.id} value={esp.id}>
                                        {esp.nome}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Linha 2 - Email e CRM */}
                    <div className="linha" style={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={medico.email}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="crm">CRM</label>
                            <input
                                type="text"
                                id="crm"
                                name="crm"
                                value={medico.crm}
                                onChange={handleChange}
                                required
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Linha 3 - Telefones */}
                    <div className="linha" style={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="telefone">Telefone</label>
                            <input
                                type="text"
                                id="telefone"
                                name="telefone"
                                value={medico.telefone}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="telefone2">Telefone 2</label>
                            <input
                                type="text"
                                id="telefone2"
                                name="telefone2"
                                value={medico.telefone2}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Linha 4 - CEP */}
                    <div className="linha" style={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="cep">CEP</label>
                            <input
                                type="text"
                                id="cep"
                                name="cep"
                                value={medico.cep}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Linha 5 - Logradouro, Número e Complemento */}
                    <div className="linha" style={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="logradouro">Logradouro</label>
                            <input
                                type="text"
                                id="logradouro"
                                name="logradouro"
                                value={medico.logradouro}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="numero">Número</label>
                            <input
                                type="text"
                                id="numero"
                                name="numero"
                                value={medico.numero}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="complemento">Complemento</label>
                            <input
                                type="text"
                                id="complemento"
                                name="complemento"
                                value={medico.complemento}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Linha 6 - Cidade, Bairro e Estado */}
                    <div className="linha" style={{
                        display: 'flex',
                        gap: '40px',
                        marginBottom: '20px',
                        flexWrap: 'wrap',
                        width: '100%'
                    }}>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="cidade">Cidade</label>
                            <input
                                type="text"
                                id="cidade"
                                name="cidade"
                                value={medico.cidade}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="bairro">Bairro</label>
                            <input
                                type="text"
                                id="bairro"
                                name="bairro"
                                value={medico.bairro}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                        <div className="campo pequeno" style={{
                            display: 'flex',
                            flexDirection: 'column',
                            width: '254px'
                        }}>
                            <label htmlFor="estado">Estado</label>
                            <input
                                type="text"
                                id="estado"
                                name="estado"
                                value={medico.estado}
                                onChange={handleChange}
                                style={{
                                    marginTop: '5px',
                                    height: '53px',
                                    borderRadius: '16px',
                                    border: '2px solid #B3D3FC',
                                    paddingLeft: '10px',
                                    fontSize: '16px'
                                }}
                            />
                        </div>
                    </div>

                    {/* Error Message */}
                    {error && (
                        <div style={{
                            width: '100%',
                            color: '#b00000',
                            marginBottom: '20px',
                            fontSize: '16px'
                        }}>
                            {error}
                        </div>
                    )}

                    {/* Botões */}
                    <div className="botoes" style={{
                        width: '100%',
                        display: 'flex',
                        justifyContent: 'flex-end',
                        gap: '15px',
                        marginTop: '30px'
                    }}>
                        <button
                            type="submit"
                            disabled={loading}
                            style={{
                                fontSize: '20px',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                backgroundColor: '#267FF0',
                                color: 'white',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            {loading ? 'Salvando...' : 'Salvar'}
                        </button>
                        <button
                            type="button"
                            onClick={handleCancel}
                            disabled={loading}
                            style={{
                                fontSize: '20px',
                                padding: '10px 20px',
                                borderRadius: '10px',
                                border: 'none',
                                cursor: loading ? 'not-allowed' : 'pointer',
                                fontWeight: 'bold',
                                backgroundColor: '#b00000',
                                color: 'white',
                                opacity: loading ? 0.7 : 1
                            }}
                        >
                            Cancelar
                        </button>
                    </div>
                </form>
            </main>
        </div>
    );
}

export default MedicoForm;