import Sidebar from "../../../components/Sidebar/Sidebar";
import useSeo from "../../../utils/useSeo";
import QuoteListBase from "./QuoteListBase";
import styles from "./QuotesAcepted.module.css";

function OrcamentosAceitos() {
  useSeo({
    title: "Orçamentos Aceitos | Admin",
    description: "Solicitações aprovadas pelo cliente.",
    noindex: true,
  });

  return (
    <Sidebar>
      <QuoteListBase
        status="aceito"
        title="Orçamentos Aceitos"
        subtitle="Propostas aprovadas e prontas para seguir para contrato, agenda ou execução."
        styles={styles}
      />
    </Sidebar>
  );
}

export default OrcamentosAceitos;
