import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import {
  formatDateTimePtBR,
  loadQuotes,
  serviceTypeLabel,
  statusLabel,
} from "../../../data/quoteStore";

function routeSegmentForStatus(status) {
  if (status === "aguardando_cliente") return "aguardando";
  if (status === "aceito") return "aceitos";
  if (status === "recusado") return "recusados";
  return "novos";
}

function QuoteListBase({ status, title, subtitle, styles }) {
  const navigate = useNavigate();
  const [items, setItems] = useState(() => loadQuotes());
  const [query, setQuery] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("recentes");

  useEffect(() => {
    const refresh = () => setItems(loadQuotes());
    window.addEventListener("ma_quotes_updated", refresh);
    window.addEventListener("storage", refresh);

    return () => {
      window.removeEventListener("ma_quotes_updated", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, []);

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    const direction = ordenacao === "antigos" ? 1 : -1;

    return items
      .filter((quote) => quote.status === status)
      .filter((quote) => {
        if (!normalizedQuery) return true;

        const searchable = [
          quote.nome,
          quote.email,
          quote.telefone,
          quote.empresa,
          quote.descricao,
          serviceTypeLabel(quote.tipoServico),
        ]
          .join(" ")
          .toLowerCase();

        return searchable.includes(normalizedQuery);
      })
      .filter((quote) => tipo === "todos" || quote.tipoServico === tipo)
      .slice()
      .sort((a, b) => direction * (new Date(a.createdAt) - new Date(b.createdAt)));
  }, [items, ordenacao, query, status, tipo]);

  const totalText = useMemo(() => {
    const value = filteredItems.length;
    return value === 1 ? "1 solicitação" : `${value} solicitações`;
  }, [filteredItems.length]);

  const openDetails = (quote) => {
    navigate(`/admin/orcamentos/${routeSegmentForStatus(quote.status)}/detalhes/${quote.id}`);
  };

  return (
    <section className={styles.page} aria-label={title}>
      <header className={styles.header}>
        <div>
          <span className={styles.kicker}>{statusLabel(status)}</span>
          <h1 className={styles.title}>{title}</h1>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        <div className={styles.counter} aria-label="Total">
          {totalText}
        </div>
      </header>

      <div className={styles.controls} aria-label="Pesquisa e filtros">
        <label className={`${styles.control} ${styles.controlGrow}`}>
          <span>Pesquisar</span>
          <div className={styles.searchBox}>
            <Search size={18} aria-hidden="true" />
            <input
              className={styles.input}
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Nome, empresa, e-mail ou descrição..."
              aria-label="Pesquisar orçamento"
              autoComplete="off"
            />
          </div>
        </label>

        <label className={`${styles.control} ${styles.controlFixed}`}>
          <span>Tipo</span>
          <select
            className={styles.select}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            aria-label="Filtrar por tipo de serviço"
          >
            <option value="todos">Todos os tipos</option>
            <option value="site">Site Institucional</option>
            <option value="sistema">Sistema Personalizado</option>
            <option value="manutencao">Manutenção & Suporte</option>
          </select>
        </label>

        <label className={`${styles.control} ${styles.controlFixed}`}>
          <span>Ordem</span>
          <select
            className={styles.select}
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            aria-label="Ordenar"
          >
            <option value="recentes">Mais recentes</option>
            <option value="antigos">Mais antigos</option>
          </select>
        </label>
      </div>

      <div className={styles.scrollArea}>
        {filteredItems.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Nenhum orçamento nesta etapa</h2>
            <p className={styles.emptyText}>
              Quando um orçamento receber este status, ele aparecerá aqui automaticamente.
            </p>
          </div>
        ) : (
          <div className={styles.list} role="list">
            {filteredItems.map((quote) => (
              <article key={quote.id} className={styles.card} role="listitem">
                <div className={styles.cardTop}>
                  <div className={styles.cardMain}>
                    <div className={styles.cardTitleRow}>
                      <strong className={styles.cardTitle}>{quote.nome || "Sem nome"}</strong>
                      <span className={styles.badge}>{statusLabel(quote.status)}</span>
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.metaItem}>{serviceTypeLabel(quote.tipoServico)}</span>
                      <span className={styles.metaDot} aria-hidden="true">|</span>
                      <span className={styles.metaItem}>{formatDateTimePtBR(quote.createdAt)}</span>
                    </div>
                  </div>
                  <button type="button" className={styles.openBtn} onClick={() => openDetails(quote)}>
                    Detalhes
                    <ArrowRight size={16} aria-hidden="true" />
                  </button>
                </div>

                <p className={styles.preview}>
                  {(quote.descricao || "").trim() || "Sem descrição informada."}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default QuoteListBase;
