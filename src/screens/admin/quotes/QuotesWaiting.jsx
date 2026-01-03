import { useMemo } from "react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import useSeo from "../../../utils/useSeo";
import styles from "./QuotesListShared.module.css";

function OrcamentosAguardando() {
  useSeo({
    title: "Orçamentos (Aguardando Cliente) | Admin",
    description: "Tela desativada para teste do frontend em Novos.",
    noindex: true,
  });

  const totalText = useMemo(() => "0 solicitações", []);

  return (
    <Sidebar>
      <section className={styles.page} aria-label="Orçamentos (Aguardando Cliente)">
        <header className={styles.header}>
          <div>
            <h1 className={styles.title}>Orçamentos (Aguardando Cliente)</h1>
            <p className={styles.subtitle}>
              Você já respondeu e está aguardando retorno do cliente.
            </p>
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
              placeholder="Pesquisar por nome..."
              aria-label="Pesquisar por nome"
              disabled
            />
          </div>

          <div className={`${styles.control} ${styles.controlFixed}`}>
            <select
              className={styles.select}
              aria-label="Filtrar por tipo de serviço"
              disabled
            >
              <option>Todos os tipos</option>
            </select>
          </div>

          <div className={`${styles.control} ${styles.controlFixed}`}>
            <select className={styles.select} aria-label="Ordenar" disabled>
              <option>Mais recentes</option>
            </select>
          </div>
        </div>

        <div className={styles.scrollArea}>
          <div className={styles.empty}>
            <h2 className={styles.emptyTitle}>Tela em pausa</h2>
            <p className={styles.emptyText}>
              Para testes agora, use apenas a tela "Orçamentos (Novos)".
            </p>
          </div>
        </div>
      </section>
    </Sidebar>
  );
}

export default OrcamentosAguardando;
