import { useState } from "react";
import Header from "../components/Header/Header";
import Input from "../components/Input/Input";
import Select from "../components/Select/Select";
import Button from "../components/Button/Button";

const especialidades = [
  { value: "cardiologia", label: "Cardiologia" },
  { value: "dermatologia", label: "Dermatologia" },
  { value: "neurologia", label: "Neurologia" },
  { value: "ortopedia", label: "Ortopedia" },
];

const medicos = [
  { value: "dr-silva", label: "Dr. Silva" },
  { value: "dra-santos", label: "Dra. Santos" },
  { value: "dr-oliveira", label: "Dr. Oliveira" },
];

const sexos = [
  { value: "masculino", label: "Masculino" },
  { value: "feminino", label: "Feminino" },
  { value: "outro", label: "Outro" },
];

export default function AgendamentoPage() {
  const [codigo, setCodigo] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [rg, setRg] = useState("");
  const [dataNascimento, setDataNascimento] = useState("");
  const [sexo, setSexo] = useState("");
  const [telefone1, setTelefone1] = useState("");
  const [telefone2, setTelefone2] = useState("");
  const [telefoneFamiliar, setTelefoneFamiliar] = useState("");
  const [dataHoraEntrada, setDataHoraEntrada] = useState("");
  const [especialidade, setEspecialidade] = useState("");
  const [medico, setMedico] = useState("");

  const handleVoltar = () => {
    console.log("Voltar");
  };

  const handleSalvar = () => {
    console.log("Dados salvos:", {
      codigo,
      nome,
      cpf,
      rg,
      dataNascimento,
      sexo,
      telefone1,
      telefone2,
      telefoneFamiliar,
      dataHoraEntrada,
      especialidade,
      medico,
    });
  };

  const handleCancelar = () => {
    console.log("Operação cancelada");
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      <Header
        showBackButton
        onBackButtonClick={handleVoltar}
        userName="Usuário"
      />

      <div className="flex flex-col md:flex-row flex-1 p-6">
        <div className="flex flex-col flex-1 pr-0 md:pr-6">
          <h2 className="text-xl text-azul-principal font-bold mb-6">
            AGENDAMENTO DE CONSULTA
          </h2>

          <div className="flex gap-4 mb-4">
            <div className="flex-1">
              <Input
                mask="CPF do paciente"
                value={codigo}
                onChange={(e) => setCodigo(e.target.value)}
                inputType="text"
                sizeBox="custom"
                sizeCustom={800}
              />
            </div>
            <div className="flex-1">
              <Button>Buscar</Button>
            </div>
          </div>

          <Input
            label="Nome Completo"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            sizeBox="custom"
            sizeCustom={1000}
          />

          <div className="flex flex-col md:flex-row gap-4">
            <Select
              label="Sexo"
              options={sexos}
              value={sexo}
              onChange={(e) => setSexo(e.target.value)}
              size="md"
            />

            <Input
              label="Data de Nascimento"
              inputType="date"
              value={dataNascimento}
              onChange={(e) => setDataNascimento(e.target.value)}
              sizeBox="md"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="CPF"
              inputType="text"
              mask="000.000.000-00"
              value={cpf}
              onChange={(e) => setCpf(e.target.value)}
              sizeBox="md"
            />

            <Input
              label="RG"
              inputType="text"
              mask="00.000.000-0"
              value={rg}
              onChange={(e) => setRg(e.target.value)}
              sizeBox="md"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="Telefone"
              inputType="tel"
              mask="(00) 0000-0000"
              value={telefone1}
              onChange={(e) => setTelefone1(e.target.value)}
              sizeBox="md"
            />

            <Input
              label="Telefone 2"
              inputType="tel"
              mask="(00) 0000-0000"
              value={telefone2}
              onChange={(e) => setTelefone2(e.target.value)}
              sizeBox="md"
            />
          </div>

          <div className="flex flex-col md:flex-row gap-4">
            <Input
              label="Telefone Familiar"
              inputType="tel"
              mask="(00) 0000-0000"
              value={telefoneFamiliar}
              onChange={(e) => setTelefoneFamiliar(e.target.value)}
              sizeBox="md"
            />
          </div>

          <Input
            label="Data e hora da entrada"
            inputType="datetime-local"
            value={dataHoraEntrada}
            onChange={(e) => setDataHoraEntrada(e.target.value)}
            sizeBox="md"
          />
        </div>

        <div className="flex flex-col w-full md:w-80 border-t border-azul-principal md:border-t-0 md:border-l md:pl-6 pt-6 md:pt-0 mt-6 md:mt-0">
          <h2 className="text-xl text-azul-principal font-bold mb-6">MÉDICO</h2>

          <Select
            label="Especialidade"
            options={especialidades}
            value={especialidade}
            onChange={(e) => setEspecialidade(e.target.value)}
            size="full"
          />

          <Select
            label="Médico"
            options={medicos}
            value={medico}
            onChange={(e) => setMedico(e.target.value)}
            size="full"
          />

          <div className="flex justify-end gap-4 mt-auto pt-6">
            <Button variant="primary" onClick={handleSalvar}>
              Salvar
            </Button>
            <Button variant="danger" onClick={handleCancelar}>
              Cancelar
            </Button>
          </div>
        </div>
      </div>

      <footer className="p-4">
        <a href="#" className="text-azul-principal">
          @suporte
        </a>
      </footer>
    </div>
  );
}
