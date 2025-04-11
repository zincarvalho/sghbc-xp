import { useState } from "react";

function App() {
  const [usuario, setUsuario] = useState("");
  const [senha, setSenha] = useState("");

  const handleSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    console.log("Login com:", usuario, senha);
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-[#ABCDF9]">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-lg shadow-[4px_4px_0_0_rgba(0,0,0,0.4)] p-8">
          <h1 className="text-center text-2xl font-roboto font-bold text-azul-principal mb-8">
            LOGIN
          </h1>

          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="text"
                value={usuario}
                onChange={(e) => setUsuario(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none font-roboto focus:border-azul-principal placeholder:text-azul-principal/60 placeholder:font-bold"
                placeholder="Usuário"
              />
            </div>

            <div className="mb-4">
              <input
                type="password"
                value={senha}
                onChange={(e) => setSenha(e.target.value)}
                className="w-full border-b border-gray-300 py-2 focus:outline-none font-roboto focus:border-azul-principal placeholder:text-azul-principal/60 placeholder:font-bold"
                placeholder="Senha"
              />
            </div>

            <div className="mb-8">
              <a
                href="#"
                className="text-azul-principal font-roboto text-sm hover:underline"
              >
                Esqueceu a Senha?
              </a>
            </div>

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-azul-principal font-roboto font-bold text-white py-2 px-12 rounded-md hover:bg-blue-600 transition-colors cursor-pointer shadow-lg"
              >
                Entrar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default App;
