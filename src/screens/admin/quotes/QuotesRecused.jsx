import Sidebar from "../../../components/Sidebar/Sidebar";
import useSeo from "../../../utils/useSeo";
import QuoteListBase from "./QuoteListBase";
import styles from "./QuotesRecused.module.css";

function OrcamentosRecusados() {
  useSeo({
    title: "Orçamentos Recusados | Admin",
    description: "Solicitações recusadas ou pausadas pelo cliente.",
    noindex: true,
  });

  return (
    <Sidebar>
      <QuoteListBase
        status="recusado"
        title="Orçamentos Recusados"
        subtitle="Propostas que não avançaram, úteis para histórico e revisão comercial."
        styles={styles}
      />
    </Sidebar>
  );
}

export default OrcamentosRecusados;
