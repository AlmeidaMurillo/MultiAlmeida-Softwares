import Sidebar from "../../../components/Sidebar/Sidebar";
import useSeo from "../../../utils/useSeo";
import QuoteListBase from "./QuoteListBase";
import styles from "./QuotesNew.module.css";

function OrcamentosNovos() {
  useSeo({
    title: "Orçamentos Novos | Admin",
    description: "Solicitações de orçamento recebidas no frontend.",
    noindex: true,
  });

  return (
    <Sidebar>
      <QuoteListBase
        status="novo"
        title="Orçamentos Novos"
        subtitle="Solicitações recebidas pelo formulário e ainda sem resposta comercial."
        styles={styles}
      />
    </Sidebar>
  );
}

export default OrcamentosNovos;
