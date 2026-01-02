import { useMemo, useState } from "react";
import Sidebar from "../../components/Sidebar/Sidebar";
import useSeo from "../../utils/useSeo";
import styles from "./OrcamentosListaShared.module.css";
function formatDateTimePtBR(iso) {
  if (!iso) return "";
  try {
    return new Intl.DateTimeFormat("pt-BR", {
      dateStyle: "short",
      timeStyle: "short",
    }).format(new Date(iso));
  } catch {
    return String(iso);
  }
}

function typeServicoLabel(value) {
  switch (value) {
    case "site":
      return "Site Institucional";
    case "sistema":
      return "Sistema Personalizado";
    case "ecommerce":
      return "E-commerce";
    case "manutencao":
      return "Manutenção & Suporte";
    case "outro":
      return "Outro";
    default:
      return value || "—";
  }
}

function createMockItems() {
  const now = Date.now();
  const tipos = ["site", "sistema", "ecommerce", "manutencao", "outro"];
  return Array.from({ length: 20 }, (_, index) => {
    const i = index + 1;
    const tipoServico = tipos[index % tipos.length];
    return {
      id: `mock-${i}`,
      createdAt: new Date(now - i * 60 * 60 * 1000).toISOString(),
      nome: `Cliente ${i}`,
      tipoServico,
      descricao:
        tipoServico === "site"
          ? "Site institucional (Home, Sobre, Serviços e Contato)."
          : tipoServico === "sistema"
          ? "Sistema simples para gestão interna e relatórios."
          : tipoServico === "ecommerce"
          ? "Loja online com catálogo e checkout."
          : tipoServico === "manutencao"
          ? "Manutenção e melhorias no sistema existente."
          : "Projeto personalizado: alinhar escopo e prioridades.",
    };
  });
}

function ListaOrcamentosNovos() {
  const items = useMemo(() => createMockItems(), []);

  const [query, setQuery] = useState("");
  const [tipo, setTipo] = useState("todos");
  const [ordenacao, setOrdenacao] = useState("recentes");

  const filteredItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    let next = items;

    if (normalizedQuery) {
      next = next.filter((q) => String(q.nome || "").toLowerCase().includes(normalizedQuery));
    }

    if (tipo !== "todos") {
      next = next.filter((q) => q.tipoServico === tipo);
    }

    const direction = ordenacao === "antigos" ? 1 : -1;
    return next
      .slice()
      .sort((a, b) => direction * (new Date(a.createdAt) - new Date(b.createdAt)));
  }, [items, ordenacao, query, tipo]);

  const totalText = useMemo(() => {
    const value = filteredItems.length;
    return value === 1 ? "1 solicitação" : `${value} solicitações`;
  }, [filteredItems.length]);

  return (
    <section className={styles.page} aria-label="Orçamentos (Novos)">
      <header className={styles.header}>
        <div>
          <h1 className={styles.title}>Orçamentos (Novos)</h1>
          <p className={styles.subtitle}>Solicitações que ainda não foram respondidas.</p>
        </div>
        <div className={styles.counter} aria-label="Total">
          {totalText}
        </div>
      </header>

      <div className={styles.controls} aria-label="Pesquisa e filtros">
        <div className={`${styles.control} ${styles.controlGrow}`}>
          <input
            className={styles.input}
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Pesquisar por nome..."
            aria-label="Pesquisar por nome"
            autoComplete="off"
          />
        </div>

        <div className={`${styles.control} ${styles.controlFixed}`}>
          <select
            className={styles.select}
            value={tipo}
            onChange={(e) => setTipo(e.target.value)}
            aria-label="Filtrar por tipo de serviço"
          >
            <option value="todos">Todos os tipos</option>
            <option value="site">Site Institucional</option>
            <option value="sistema">Sistema Personalizado</option>
            <option value="ecommerce">E-commerce</option>
            <option value="manutencao">Manutenção & Suporte</option>
            <option value="outro">Outro</option>
          </select>
        </div>

        <div className={`${styles.control} ${styles.controlFixed}`}>
          <select
            className={styles.select}
            value={ordenacao}
            onChange={(e) => setOrdenacao(e.target.value)}
            aria-label="Ordenar"
          >
            <option value="recentes">Mais recentes</option>
            <option value="antigos">Mais antigos</option>
          </select>
        </div>
      </div>

      <div className={styles.scrollArea}>
        {filteredItems.length === 0 ? (
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Nada por aqui</h2>
            <p className={styles.emptyText}>
              Nenhuma solicitação encontrada com esses filtros.
            </p>
          </div>
        ) : (
          <div className={styles.list} role="list">
            {filteredItems.map((q) => (
              <article
                key={q.id}
                className={styles.card}
                role="listitem"
                tabIndex={0}
              >
                <div className={styles.cardTop}>
                  <div className={styles.cardMain}>
                    <div className={styles.cardTitleRow}>
                      <strong className={styles.cardTitle}>{q.nome || "Sem nome"}</strong>
                      <span className={styles.badge}>Novo</span>
                    </div>
                    <div className={styles.meta}>
                      <span className={styles.metaItem}>
                        {typeServicoLabel(q.tipoServico)}
                      </span>
                      <span className={styles.metaDot} aria-hidden="true">
                        •
                      </span>
                      <span className={styles.metaItem}>
                        {formatDateTimePtBR(q.createdAt)}
                      </span>
                    </div>
                  </div>
                  <button type="button" className={styles.openBtn}>
                    Ver detalhes
                  </button>
                </div>

                <p className={styles.preview}>
                  {(q.descricao || "").trim() || "Sem descrição"}
                </p>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function OrcamentosNovos({ theme = "light", toggleTheme = () => {} }) {
  useSeo({
    title: "Orçamentos (Novos) | Admin",
    description: "Solicitações de orçamento (mock) para testar o layout do frontend.",
    noindex: true,
  });

  return (
    <Sidebar theme={theme} toggleTheme={toggleTheme}>
      <ListaOrcamentosNovos />
    </Sidebar>
  );
}

export default OrcamentosNovos;
