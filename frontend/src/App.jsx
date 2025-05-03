import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import HomePage from './pages/HomePage';
import PacienteListPage from './pages/pacientes/PacienteListPage';
import PacienteForm from './pages/pacientes/PacienteForm';
import MedicoListPage from './pages/medicos/MedicoListPage'; // Import Medico list
import MedicoForm from './pages/medicos/MedicoForm'; // Import Medico form
import AgendamentoListPage from './pages/agendamentos/AgendamentoListPage'; // Import Agendamento list
import AgendamentoForm from './pages/agendamentos/AgendamentoForm'; // Import Agendamento form
import EnfermeiroListPage from './pages/enfermeiros/EnfermeiroListPage';
import EnfermeiroForm from './pages/enfermeiros/EnfermeiroForm';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import ConsultaPage from './pages/consultas/ConsultaPage';
import RecepcionistaListPage from './pages/recepcionistas/RecepcionistaListPage';
import RecepcionistaForm from './pages/recepcionistas/RecepcionistaForm';
import EspecialidadesListPage from './pages/especialidades/EspecialidadesListPage';
import EspecialidadesForm from './pages/especialidades/EspecialidadesForm';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          <Route path="/login" element={<LoginPage />} />

          {/* Routes wrapped by Layout and ProtectedRoute */}
          <Route
            path="/"
            element={
              <ProtectedRoute>
                <Layout>
                  <HomePage />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Pacientes Module Routes */}
          <Route
            path="/pacientes"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA', 'MEDICO', 'ENFERMEIRO']}>
                <Layout>
                  <PacienteListPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pacientes/novo"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <PacienteForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/pacientes/:id/editar"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <PacienteForm />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Médicos Module Routes */}
          <Route
            path="/medicos"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <MedicoListPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/medicos/novo"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Layout>
                  <MedicoForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/medicos/:id/editar"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Layout>
                  <MedicoForm />
                </Layout>
              </ProtectedRoute>
            }
          />

          {/* Agendamentos Module Routes */}
          <Route
            path="/agendamentos"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA', 'MEDICO', 'ENFERMEIRO']}>
                <Layout>
                  <AgendamentoListPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agendamentos/novo"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <AgendamentoForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/agendamentos/editar/:id"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <AgendamentoForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/consultas"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <ConsultaPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/enfermeiros"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <EnfermeiroListPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/enfermeiros/novo" 
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <EnfermeiroForm />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/enfermeiros/editar/:id"
            element={
              <ProtectedRoute requiredRoles={['ADMIN', 'RECEPCIONISTA']}>
                <Layout>
                  <EnfermeiroForm />
                </Layout>
              </ProtectedRoute>
            } 
          />
          <Route
            path="/recepcionistas"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Layout>
                  <RecepcionistaListPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recepcionistas/novo"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Layout>
                  <RecepcionistaForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/recepcionistas/editar/:id"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Layout>
                  <RecepcionistaForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/especialidades"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Layout>
                  <EspecialidadesListPage />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/especialidades/novo"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Layout>
                  <EspecialidadesForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route
            path="/especialidades/editar/:id"
            element={
              <ProtectedRoute requiredRoles={['ADMIN']}>
                <Layout>
                  <EspecialidadesForm />
                </Layout>
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;

