import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ArrowRight,
  CheckCircle2,
  Clock3,
  Database,
  Download,
  Inbox,
  Percent,
  Plus,
  Trash2,
  XCircle,
} from "lucide-react";
import styles from "./Dashboard.module.css";
import useSeo from "../../../utils/useSeo";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  clearQuotes,
  formatDateTimePtBR,
  getQuoteStatsFromItems,
  loadQuotes,
  seedDemoQuotes,
  serviceTypeLabel,
  STATUS_CONFIG,
  STATUS_ORDER,
} from "../../../data/quoteStore";

function formatPercent(value) {
  return value == null ? "0%" : `${Math.round(value * 100)}%`;
}

function downloadJson(items) {
  const blob = new Blob([JSON.stringify({ version: 1, items }, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");

  link.href = url;
  link.download = `multialmeida-orcamentos-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

function Dashboard() {
  const navigate = useNavigate();
  const [quotes, setQuotes] = useState(() => loadQuotes());

  useSeo({
    title: "Dashboard | MultiAlmeida Softwares",
    description: "Painel administrativo da MultiAlmeida Softwares.",
    noindex: true,
  });

  useEffect(() => {
    const refresh = () => setQuotes(loadQuotes());
    window.addEventListener("ma_quotes_updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("ma_quotes_updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const stats = useMemo(() => getQuoteStatsFromItems(quotes), [quotes]);
  const latestQuotes = useMemo(() => quotes.slice(0, 4), [quotes]);
  const hasQuotes = stats.counts.total > 0;

  const metricCards = [
    {
      label: "Total de Orçamentos",
      value: stats.counts.total,
      description: "Todos os contatos salvos no navegador.",
      icon: Inbox,
      tone: "neutral",
      path: "/admin/orcamentos/novos",
    },
    {
      label: "Novos",
      value: stats.counts.novo,
      description: STATUS_CONFIG.novo.description,
      icon: Plus,
      tone: "blue",
      path: "/admin/orcamentos/novos",
    },
    {
      label: "Aguardando Cliente",
      value: stats.counts.aguardando_cliente,
      description: STATUS_CONFIG.aguardando_cliente.description,
      icon: Clock3,
      tone: "amber",
      path: "/admin/orcamentos/aguardando",
    },
    {
      label: "Aceitos",
      value: stats.counts.aceito,
      description: STATUS_CONFIG.aceito.description,
      icon: CheckCircle2,
      tone: "green",
      path: "/admin/orcamentos/aceitos",
    },
    {
      label: "Recusados",
      value: stats.counts.recusado,
      description: STATUS_CONFIG.recusado.description,
      icon: XCircle,
      tone: "red",
      path: "/admin/orcamentos/recusados",
    },
    {
      label: "Taxa de Aceite",
      value: formatPercent(stats.acceptanceRate),
      description: "Calculada sobre propostas aceitas e recusadas.",
      icon: Percent,
      tone: "purple",
      path: "/admin/orcamentos/aceitos",
    },
  ];

  const handleSeed = () => {
    seedDemoQuotes();
    setQuotes(loadQuotes());
  };

  const handleClear = () => {
    const confirmed = window.confirm("Limpar todos os orçamentos salvos neste navegador?");
    if (!confirmed) return;

    clearQuotes();
    setQuotes([]);
  };

  return (
    <Sidebar>
      <section className={styles.page} aria-label="Dashboard Administrativo">
        <header className={styles.header}>
          <div>
            <span className={styles.kicker}>Frontend-only</span>
            <h1 className={styles.title}>Dashboard Administrativo</h1>
            <p className={styles.subtitle}>
              Controle local de orçamentos, respostas e status comerciais da MultiAlmeida Softwares.
            </p>
          </div>

          <div className={styles.headerActions}>
            <button type="button" className={styles.secondaryBtn} onClick={handleSeed}>
              <Database size={18} aria-hidden="true" />
              Dados demo
            </button>
            <button type="button" className={styles.secondaryBtn} onClick={() => downloadJson(quotes)} disabled={!hasQuotes}>
              <Download size={18} aria-hidden="true" />
              Exportar
            </button>
            <button type="button" className={styles.dangerBtn} onClick={handleClear} disabled={!hasQuotes}>
              <Trash2 size={18} aria-hidden="true" />
              Limpar
            </button>
          </div>
        </header>

        <div className={styles.grid}>
          {metricCards.map((card) => {
            const Icon = card.icon;

            return (
              <button
                type="button"
                className={`${styles.card} ${styles[card.tone]}`}
                key={card.label}
                onClick={() => navigate(card.path)}
              >
                <span className={styles.cardIcon}>
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span className={styles.cardContent}>
                  <span className={styles.cardTitle}>{card.label}</span>
                  <span className={styles.cardText}>{card.value}</span>
                  <span className={styles.cardDescription}>{card.description}</span>
                </span>
              </button>
            );
          })}
        </div>

        <div className={styles.panelGrid}>
          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2 className={styles.panelTitle}>Funil Comercial</h2>
                <p className={styles.panelText}>Distribuição dos orçamentos por etapa.</p>
              </div>
            </div>

            <div className={styles.funnel}>
              {STATUS_ORDER.map((status) => {
                const count = stats.counts[status];
                const percent = stats.counts.total > 0 ? Math.round((count / stats.counts.total) * 100) : 0;

                return (
                  <div className={styles.funnelRow} key={status}>
                    <div className={styles.funnelTop}>
                      <span>{STATUS_CONFIG[status].label}</span>
                      <strong>{count} | {percent}%</strong>
                    </div>
                    <div className={styles.progressTrack} aria-hidden="true">
                      <span className={`${styles.progressBar} ${styles[status]}`} style={{ width: `${percent}%` }} />
                    </div>
                  </div>
                );
              })}
            </div>
          </article>

          <article className={styles.panel}>
            <div className={styles.panelHeader}>
              <div>
                <h2 className={styles.panelTitle}>Últimos Orçamentos</h2>
                <p className={styles.panelText}>Registros mais recentes salvos localmente.</p>
              </div>
              <button type="button" className={styles.linkBtn} onClick={() => navigate("/admin/orcamentos/novos")}>
                Ver lista
                <ArrowRight size={16} aria-hidden="true" />
              </button>
            </div>

            {latestQuotes.length === 0 ? (
              <div className={styles.emptyState}>
                <strong>Nenhum orçamento salvo ainda.</strong>
                <p>Use o formulário do site ou o botão de dados demo para visualizar o painel preenchido.</p>
              </div>
            ) : (
              <div className={styles.latestList}>
                {latestQuotes.map((quote) => (
                  <button
                    type="button"
                    className={styles.latestItem}
                    key={quote.id}
                    onClick={() => navigate(`/admin/orcamentos/${quote.status === "aguardando_cliente" ? "aguardando" : quote.status === "aceito" ? "aceitos" : quote.status === "recusado" ? "recusados" : "novos"}/detalhes/${quote.id}`)}
                  >
                    <span>
                      <strong>{quote.nome || "Sem nome"}</strong>
                      <small>{serviceTypeLabel(quote.tipoServico)} | {formatDateTimePtBR(quote.createdAt)}</small>
                    </span>
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>
    </Sidebar>
  );
}

export default Dashboard;
