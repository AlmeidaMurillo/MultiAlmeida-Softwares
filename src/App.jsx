import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Spinner from "./components/Spinner/Spinner";
import { RequireAdmin } from './utils/auth';

// Lazy loading dos componentes
const LandingPage = lazy(() => import("./screens/clients/pages/LandingPage"));
const Services = lazy(() => import("./screens/clients/services/Services"));
const Login = lazy(() => import("./screens/admin/auth/Login"));
const Dashboard = lazy(() => import("./screens/admin/pages/Dashboard"));
const Planos = lazy(() => import("./screens/admin/pages/Planos"));
const AtendimentoContratos = lazy(() => import("./screens/admin/pages/AtendimentoContratos"));
const ContratosModelo = lazy(() => import("./screens/admin/pages/ContratosModelo"));
const LogoutTest = lazy(() => import("./screens/admin/pages/LogoutTest"));
const OrcamentosNovos = lazy(() => import("./screens/admin/quotes/QuotesNew"));
const OrcamentosAguardando = lazy(() => import("./screens/admin/quotes/QuotesWaiting"));
const OrcamentosAceitos = lazy(() => import("./screens/admin/quotes/QuotesAcepted"));
const OrcamentosRecusados = lazy(() => import("./screens/admin/quotes/QuotesRecused"));
const OrcamentosDetalhes = lazy(() => import("./screens/admin/quotes/QuotesDetails"));
const PrivacyPolicy = lazy(() => import("./screens/universal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./screens/universal/TermsOfService"));
const ContractSubscription = lazy(() => import("./screens/universal/ContractSubscription"));
const ServiceDetails = lazy(() => import("./screens/clients/services/ServiceDetails"));

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <BrowserRouter>
      <Spinner loading={loading} />
      {!loading && (
        <Suspense fallback={<Spinner loading={true} />}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/servicos" element={<Services />} />
            <Route path="/servicos/:slug" element={<ServiceDetails />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
            <Route
              path="/admin/dashboard"
              element={
                //<RequireAdmin>
                  <Dashboard />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/planos"
              element={
                //<RequireAdmin>
                  <Planos />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/atendimento-contratos"
              element={
                //<RequireAdmin>
                  <AtendimentoContratos />
                //</RequireAdmin>
              }
            />

            <Route
              path="/admin/logout-teste"
              element={
                //<RequireAdmin>
                  <LogoutTest />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/contratos-modelo"
              element={
                //<RequireAdmin>
                  <Navigate to="/admin/atendimento-contratos" replace />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos"
              element={
                //<RequireAdmin>
                  <Navigate to="/admin/orcamentos/novos" replace />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos/novos"
              element={
                //<RequireAdmin>
                  <OrcamentosNovos />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos/novos/detalhes/:id"
              element={
                //<RequireAdmin>
                  <OrcamentosDetalhes />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos/aguardando"
              element={
                //<RequireAdmin>
                  <OrcamentosAguardando />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos/aguardando/detalhes/:id"
              element={
                //<RequireAdmin>
                  <OrcamentosDetalhes />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos/aceitos"
              element={
                //<RequireAdmin>
                  <OrcamentosAceitos />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos/aceitos/detalhes/:id"
              element={
                //<RequireAdmin>
                  <OrcamentosDetalhes />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos/recusados"
              element={
                //<RequireAdmin>
                  <OrcamentosRecusados />
                //</RequireAdmin>
              }
            />
            <Route
              path="/admin/orcamentos/recusados/detalhes/:id"
              element={
                //<RequireAdmin>
                  <OrcamentosDetalhes />
                //</RequireAdmin>
              }
            />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-uso" element={<TermsOfService />} />
            <Route path="/contrato-assinatura" element={<ContractSubscription />} />
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;
