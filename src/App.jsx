import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Spinner from "./components/Spinner/Spinner";

// Lazy loading dos componentes
const LandingPage = lazy(() => import("./screens/clients/LandingPage"));
const Services = lazy(() => import("./screens/clients/Services"));
const Login = lazy(() => import("./screens/admin/Login"));
const Dashboard = lazy(() => import("./screens/admin/Dashboard"));
const OrcamentosNovos = lazy(() => import("./screens/admin/OrcamentosNovos"));
const OrcamentosAguardando = lazy(() => import("./screens/admin/OrcamentosAguardando"));
const OrcamentosAceitos = lazy(() => import("./screens/admin/OrcamentosAceitos"));
const OrcamentosRecusados = lazy(() => import("./screens/admin/OrcamentosRecusados"));
const PrivacyPolicy = lazy(() => import("./screens/universal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./screens/universal/TermsOfService"));
const ServiceDetails = lazy(() => import("./screens/clients/ServiceDetails"));

function App() {
  const [loading, setLoading] = useState(true);
  const [theme, setTheme] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    return savedTheme || 'light';
  });

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };

  return (
    <BrowserRouter>
      <Spinner loading={loading} />
      {!loading && (
        <Suspense fallback={<Spinner loading={true} />}>
          <Routes>
            <Route path="/" element={<LandingPage theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/servicos" element={<Services theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/servicos/:slug" element={<ServiceDetails theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/login" element={<Login theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route path="/admin/dashboard" element={<Dashboard theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/orcamentos" element={<Navigate to="/admin/orcamentos/novos" replace />} />
            <Route path="/admin/orcamentos/novos" element={<OrcamentosNovos theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/orcamentos/novos/detalhes/:id" element={<OrcamentosNovos theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/orcamentos/aguardando" element={<OrcamentosAguardando theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/orcamentos/aguardando/detalhes/:id" element={<OrcamentosAguardando theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/orcamentos/aceitos" element={<OrcamentosAceitos theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/orcamentos/aceitos/detalhes/:id" element={<OrcamentosAceitos theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/orcamentos/recusados" element={<OrcamentosRecusados theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/admin/orcamentos/recusados/detalhes/:id" element={<OrcamentosRecusados theme={theme} toggleTheme={toggleTheme} />} />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-uso" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;
