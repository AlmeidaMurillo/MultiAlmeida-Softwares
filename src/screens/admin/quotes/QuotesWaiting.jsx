import Sidebar from "../../../components/Sidebar/Sidebar";
import useSeo from "../../../utils/useSeo";
import QuoteListBase from "./QuoteListBase";
import styles from "./QuotesWaiting.module.css";

function OrcamentosAguardando() {
  useSeo({
    title: "Orçamentos Aguardando Cliente | Admin",
    description: "Solicitações respondidas e aguardando retorno do cliente.",
    noindex: true,
  });

  return (
    <Sidebar>
      <QuoteListBase
        status="aguardando_cliente"
        title="Aguardando Cliente"
        subtitle="Propostas já respondidas que dependem de confirmação ou alinhamento do cliente."
        styles={styles}
      />
    </Sidebar>
  );
}

export default OrcamentosAguardando;
