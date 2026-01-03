import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './LegalPages.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import useSeo from '../../utils/useSeo';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

function ContractSubscription() {
  useSeo({
    title: 'Contrato de Assinatura | MultiAlmeida Softwares',
    description: 'Leia o Contrato de Assinatura (Aluguel) da MultiAlmeida Softwares.',
  });

  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [doc, setDoc] = useState(null);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    let alive = true;

    async function load() {
      setLoading(true);
      setError('');
      try {
        const res = await fetch(`${API_BASE}/api/legal/documents/contract_subscription`);
        const data = await res.json();
        if (!res.ok) throw new Error(data?.message || 'Erro ao carregar contrato.');
        if (alive) setDoc(data);
      } catch (e) {
        if (alive) setError(String(e?.message || e));
      } finally {
        if (alive) setLoading(false);
      }
    }

    load();
    return () => {
      alive = false;
    };
  }, []);

  return (
    <div className={styles.pageWrapper}>
      <Header onMenuToggle={() => {}} menuOpen={false} onOpenQuote={() => navigate('/')} />

      <div className={styles.legalContainer}>
        <div className={styles.legalContent}>
          <button onClick={() => navigate(-1)} className={styles.backButton}>
            ← Voltar
          </button>

          <h1 className={styles.title}>{doc?.title || 'Contrato de Assinatura'}</h1>
          <p className={styles.lastUpdate}>
            Última atualização: {doc?.version || '—'}
          </p>

          {loading && <p className={styles.lastUpdate}>Carregando…</p>}
          {error && <p className={styles.lastUpdate}>{error}</p>}

          {!loading && !error && doc?.content && (
            <pre className={styles.legalPre}>{doc.content}</pre>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ContractSubscription;
