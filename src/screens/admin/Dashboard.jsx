import styles from "./Dashboard.module.css";
import useSeo from "../../utils/useSeo";
import Sidebar from "../../components/Sidebar/Sidebar";

const STORAGE_KEY = "ma_quotes_v1";

function safeJsonParse(value, fallback) {
  try {
    return JSON.parse(value);
  } catch {
    return fallback;
  }
}

function loadAll() {
  const raw = localStorage.getItem(STORAGE_KEY);
  const data = safeJsonParse(raw, null);
  if (!data || typeof data !== "object" || !Array.isArray(data.items)) {
    return { version: 1, items: [] };
  }
  return data;
}

function getQuoteStats() {
  const { items } = loadAll();

  const counts = {
    total: items.length,
    novo: 0,
    aguardando_cliente: 0,
    aceito: 0,
    recusado: 0,
  };

  for (const q of items) {
    if (q.status === "novo") counts.novo += 1;
    if (q.status === "aguardando_cliente") counts.aguardando_cliente += 1;
    if (q.status === "aceito") counts.aceito += 1;
    if (q.status === "recusado") counts.recusado += 1;
  }

  const decisions = counts.aceito + counts.recusado;
  const acceptanceRate = decisions > 0 ? counts.aceito / decisions : null;

  return {
    counts,
    acceptanceRate,
  };
}

function Dashboard({ theme = "light", toggleTheme = () => {} }) {
  useSeo({
    title: "Dashboard | MultiAlmeida Softwares",
    description: "Painel administrativo da MultiAlmeida Softwares.",
    noindex: true,
  });

  const stats = getQuoteStats();

  const acceptanceText =
    stats.acceptanceRate == null
      ? "—"
      : `${Math.round(stats.acceptanceRate * 100)}%`;

  return (
    <Sidebar theme={theme} toggleTheme={toggleTheme}>
      <section className={styles.page} aria-label="Dashboard Administrativo">
        <header className={styles.header}>
          <h1 className={styles.title}>Dashboard</h1>
          <p className={styles.subtitle}>Estatísticas gerais do sistema.</p>
        </header>

        <div className={styles.grid}>
          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Total de Orçamentos</h2>
            <p className={styles.cardText}>{stats.counts.total}</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Novos</h2>
            <p className={styles.cardText}>{stats.counts.novo}</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Aguardando Cliente</h2>
            <p className={styles.cardText}>{stats.counts.aguardando_cliente}</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Aceitos</h2>
            <p className={styles.cardText}>{stats.counts.aceito}</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Recusados</h2>
            <p className={styles.cardText}>{stats.counts.recusado}</p>
          </div>

          <div className={styles.card}>
            <h2 className={styles.cardTitle}>Taxa de Aceite</h2>
            <p className={styles.cardText}>{acceptanceText}</p>
          </div>
        </div>
      </section>
    </Sidebar>
  );
}

export default Dashboard;
