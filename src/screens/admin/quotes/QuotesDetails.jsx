import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CheckCircle2, Mail, MessageCircle, Save, Trash2 } from "lucide-react";
import Sidebar from "../../../components/Sidebar/Sidebar";
import {
  addQuoteResponse,
  budgetLabel,
  changeQuoteStatus,
  deadlineLabel,
  deleteQuote,
  formatDateTimePtBR,
  getQuoteById,
  serviceTypeLabel,
  statusLabel,
  STATUS_CONFIG,
  STATUS_ORDER,
} from "../../../data/quoteStore";
import detailsStyles from "./QuotesDetails.module.css";

function routeSegmentForStatus(status) {
  if (status === "aguardando_cliente") return "aguardando";
  if (status === "aceito") return "aceitos";
  if (status === "recusado") return "recusados";
  return "novos";
}

function InfoItem({ label, value }) {
  return (
    <div className={detailsStyles.infoItem}>
      <span className={detailsStyles.infoLabel}>{label}</span>
      <strong className={detailsStyles.infoValue}>{value || "Não informado"}</strong>
    </div>
  );
}

export default function OrcamentoDetalhes() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [quote, setQuote] = useState(() => getQuoteById(id));
  const [status, setStatus] = useState(() => quote?.status || "novo");
  const [channel, setChannel] = useState("E-mail");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const backTo = useMemo(() => {
    return `/admin/orcamentos/${routeSegmentForStatus(quote?.status || status)}`;
  }, [quote?.status, status]);

  const handleStatusSave = () => {
    const updated = changeQuoteStatus(id, status);
    if (updated) {
      setQuote(updated);
      setError("");
    }
  };

  const handleResponseSave = () => {
    if (!message.trim()) {
      setError("Escreva uma resposta antes de salvar.");
      return;
    }

    const updated = addQuoteResponse(id, {
      channel,
      message: message.trim(),
    });

    if (updated) {
      setQuote(updated);
      setStatus(updated.status);
      setMessage("");
      setError("");
    }
  };

  const handleDelete = () => {
    const confirmed = window.confirm("Excluir este orçamento do armazenamento local?");
    if (!confirmed) return;

    deleteQuote(id);
    navigate(backTo, { replace: true });
  };

  if (!quote) {
    return (
      <Sidebar>
        <section className={detailsStyles.page} aria-label="Detalhes do orçamento">
          <header className={detailsStyles.header}>
            <div>
              <h1 className={detailsStyles.title}>Orçamento não encontrado</h1>
              <p className={detailsStyles.subtitle}>
                O registro pode ter sido removido ou não existe neste navegador.
              </p>
            </div>
            <button className={detailsStyles.backBtn} onClick={() => navigate("/admin/orcamentos/novos")}>
              Voltar
            </button>
          </header>
        </section>
      </Sidebar>
    );
  }

  return (
    <Sidebar>
      <section className={detailsStyles.page} aria-label="Detalhes do orçamento">
        <header className={detailsStyles.header}>
          <div>
            <span className={detailsStyles.kicker}>{statusLabel(quote.status)}</span>
            <h1 className={detailsStyles.title}>Detalhes do Orçamento</h1>
            <p className={detailsStyles.subtitle}>
              Registro de {quote.nome || "cliente sem nome"} salvo em {formatDateTimePtBR(quote.createdAt)}.
            </p>
          </div>

          <div className={detailsStyles.headerActions}>
            <button className={detailsStyles.backBtn} onClick={() => navigate(backTo)}>
              Voltar
            </button>
            <button className={detailsStyles.deleteBtn} onClick={handleDelete}>
              <Trash2 size={16} aria-hidden="true" />
              Excluir
            </button>
          </div>
        </header>

        <div className={detailsStyles.grid}>
          <article className={detailsStyles.card}>
            <h2 className={detailsStyles.cardTitle}>Cliente</h2>
            <div className={detailsStyles.infoGrid}>
              <InfoItem label="Nome" value={quote.nome} />
              <InfoItem label="Empresa" value={quote.empresa} />
              <InfoItem label="E-mail" value={quote.email} />
              <InfoItem label="WhatsApp" value={quote.telefone} />
            </div>
          </article>

          <article className={detailsStyles.card}>
            <h2 className={detailsStyles.cardTitle}>Projeto</h2>
            <div className={detailsStyles.infoGrid}>
              <InfoItem label="Tipo" value={serviceTypeLabel(quote.tipoServico)} />
              <InfoItem label="Orçamento" value={budgetLabel(quote.orcamento)} />
              <InfoItem label="Prazo" value={deadlineLabel(quote.prazo)} />
              <InfoItem label="Atualizado" value={formatDateTimePtBR(quote.updatedAt)} />
            </div>
          </article>

          <article className={detailsStyles.cardFull}>
            <h2 className={detailsStyles.cardTitle}>Descrição do Projeto</h2>
            <p className={detailsStyles.longText}>{quote.descricao || "Nenhuma descrição informada."}</p>
          </article>

          <article className={detailsStyles.card}>
            <h2 className={detailsStyles.cardTitle}>Status Comercial</h2>
            <p className={detailsStyles.hint}>{STATUS_CONFIG[quote.status]?.description}</p>
            <div className={detailsStyles.row}>
              <select
                className={detailsStyles.select}
                value={status}
                onChange={(event) => setStatus(event.target.value)}
                aria-label="Alterar status"
              >
                {STATUS_ORDER.map((option) => (
                  <option value={option} key={option}>{statusLabel(option)}</option>
                ))}
              </select>
              <button className={detailsStyles.primaryBtn} onClick={handleStatusSave}>
                <CheckCircle2 size={16} aria-hidden="true" />
                Salvar status
              </button>
            </div>
          </article>

          <article className={detailsStyles.card}>
            <h2 className={detailsStyles.cardTitle}>Registrar Resposta</h2>
            <div className={detailsStyles.channelGroup}>
              <label className={detailsStyles.radio}>
                <input
                  type="radio"
                  name="channel"
                  value="E-mail"
                  checked={channel === "E-mail"}
                  onChange={(event) => setChannel(event.target.value)}
                />
                <Mail size={16} aria-hidden="true" />
                E-mail
              </label>
              <label className={detailsStyles.radio}>
                <input
                  type="radio"
                  name="channel"
                  value="WhatsApp"
                  checked={channel === "WhatsApp"}
                  onChange={(event) => setChannel(event.target.value)}
                />
                <MessageCircle size={16} aria-hidden="true" />
                WhatsApp
              </label>
            </div>
            <textarea
              className={detailsStyles.textarea}
              value={message}
              onChange={(event) => setMessage(event.target.value)}
              placeholder="Registre o resumo da resposta enviada, próximos passos ou observações comerciais."
              rows={5}
            />
            <div className={detailsStyles.actions}>
              <button className={detailsStyles.primaryBtn} onClick={handleResponseSave}>
                <Save size={16} aria-hidden="true" />
                Salvar resposta
              </button>
            </div>
            {error && <p className={detailsStyles.error} role="alert">{error}</p>}
          </article>

          <article className={detailsStyles.cardFull}>
            <h2 className={detailsStyles.cardTitle}>Histórico de Respostas</h2>
            {quote.responses.length === 0 ? (
              <p className={detailsStyles.emptyText}>Nenhuma resposta registrada ainda.</p>
            ) : (
              <div className={detailsStyles.timeline}>
                {quote.responses.map((response) => (
                  <div className={detailsStyles.timelineItem} key={response.id}>
                    <div className={detailsStyles.timelineTop}>
                      <span className={detailsStyles.timelineChannel}>{response.channel}</span>
                      <span className={detailsStyles.timelineDate}>{formatDateTimePtBR(response.createdAt)}</span>
                    </div>
                    <p className={detailsStyles.timelineMessage}>{response.message}</p>
                  </div>
                ))}
              </div>
            )}
          </article>
        </div>
      </section>
    </Sidebar>
  );
}
