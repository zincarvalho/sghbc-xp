import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ListaPacientesPage from './pages/ListaPacientesPage';
import CadastroPacientesPage from './pages/CadastroPacientesPage';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<ListaPacientesPage />} />
        <Route path="/cadastro" element={<CadastroPacientesPage />} />
      </Routes>
    </Router>
  );
}
