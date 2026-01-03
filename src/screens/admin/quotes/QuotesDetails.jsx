import { useNavigate } from "react-router-dom";
import detailsStyles from "./QuotesDetails.module.css";
function getChannelLabel(value) {
  return value === "email" ? "E-mail" : "WhatsApp";
}

export default function OrcamentoDetalhes({ id, backTo }) {
  const navigate = useNavigate();
  return (
    <section className={detailsStyles.page} aria-label="Detalhes do orçamento">
      <header className={detailsStyles.header}>
        <div>
          <h1 className={detailsStyles.title}>Detalhes do Orçamento</h1>
          <p className={detailsStyles.subtitle}>
            Modo detalhes desativado para o teste do frontend.
          </p>
        </div>

        <div className={detailsStyles.headerActions}>
          <button className={detailsStyles.backBtn} onClick={() => navigate(backTo)}>
            Voltar
          </button>
        </div>
      </header>

      <div className={detailsStyles.grid}>
        <article className={detailsStyles.card}>
          <h2 className={detailsStyles.cardTitle}>Teste de Layout</h2>
          <p className={detailsStyles.subtitle}>
            ID recebido pela rota: <strong>{id}</strong>
          </p>
          <p className={detailsStyles.hint}>
            Se quiser reativar detalhes depois, a gente volta com a integração.
          </p>
        </article>
      </div>
    </section>
  );
}
