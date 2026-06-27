import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { useState, useEffect, lazy, Suspense } from 'react';
import Spinner from "./components/Spinner/Spinner";
import ScrollToTop from "./components/ScrollToTop";
import { isAdminAuthenticated } from "./data/auth";

// Lazy loading dos componentes
const LandingPage = lazy(() => import("./screens/clients/pages/LandingPage"));
const Services = lazy(() => import("./screens/clients/services/Services"));
const Login = lazy(() => import("./screens/admin/auth/Login"));
const Dashboard = lazy(() => import("./screens/admin/pages/Dashboard"));
const OrcamentosNovos = lazy(() => import("./screens/admin/quotes/QuotesNew"));
const OrcamentosAguardando = lazy(() => import("./screens/admin/quotes/QuotesWaiting"));
const OrcamentosAceitos = lazy(() => import("./screens/admin/quotes/QuotesAcepted"));
const OrcamentosRecusados = lazy(() => import("./screens/admin/quotes/QuotesRecused"));
const OrcamentosDetalhes = lazy(() => import("./screens/admin/quotes/QuotesDetails"));
const PrivacyPolicy = lazy(() => import("./screens/universal/PrivacyPolicy"));
const TermsOfService = lazy(() => import("./screens/universal/TermsOfService"));
const ServiceDetails = lazy(() => import("./screens/clients/services/ServiceDetails"));

function ProtectedAdminRoute({ children }) {
  if (!isAdminAuthenticated()) {
    return <Navigate to="/admin/login" replace />;
  }

  return children;
}

function App() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1500);
  }, []);

  return (
    <BrowserRouter>
      <ScrollToTop />
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
                <ProtectedAdminRoute>
                  <Dashboard />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos"
              element={
                <Navigate to="/admin/orcamentos/novos" replace />
              }
            />
            <Route
              path="/admin/orcamentos/novos"
              element={
                <ProtectedAdminRoute>
                  <OrcamentosNovos />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos/novos/detalhes/:id"
              element={
                <ProtectedAdminRoute>
                  <OrcamentosDetalhes />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos/aguardando"
              element={
                <ProtectedAdminRoute>
                  <OrcamentosAguardando />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos/aguardando/detalhes/:id"
              element={
                <ProtectedAdminRoute>
                  <OrcamentosDetalhes />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos/aceitos"
              element={
                <ProtectedAdminRoute>
                  <OrcamentosAceitos />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos/aceitos/detalhes/:id"
              element={
                <ProtectedAdminRoute>
                  <OrcamentosDetalhes />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos/recusados"
              element={
                <ProtectedAdminRoute>
                  <OrcamentosRecusados />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/orcamentos/recusados/detalhes/:id"
              element={
                <ProtectedAdminRoute>
                  <OrcamentosDetalhes />
                </ProtectedAdminRoute>
              }
            />
            <Route path="/politica-privacidade" element={<PrivacyPolicy />} />
            <Route path="/termos-uso" element={<TermsOfService />} />
          </Routes>
        </Suspense>
      )}
    </BrowserRouter>
  );
}

export default App;
