import { useEffect, useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import Sidebar from "../../../components/Sidebar/Sidebar";
import useSeo from "../../../utils/useSeo";
import styles from "./AtendimentoContratos.module.css";
import { apiFetch } from "../../../utils/auth";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

const TEMPLATE_KEYS = {
  venda: "contract_site_sale",
  aluguel: "contract_subscription",
};

function normalizeNumber(value) {
  const only = String(value ?? "").replace(/[^0-9]/g, "");
  return only;
}

function buildMailto({ to, subject, body }) {
  const params = new URLSearchParams();
  if (subject) params.set("subject", subject);
  if (body) params.set("body", body);
  const query = params.toString();
  return `mailto:${encodeURIComponent(to || "")}${query ? `?${query}` : ""}`;
}

function normalizeWhatsAppPhone(value) {
  const digits = normalizeNumber(value);
  if (!digits) return "";

  // Se vier com 55 + DDD + número, usa como está
  if (digits.startsWith("55") && (digits.length === 12 || digits.length === 13)) {
    return digits;
  }

  // Se vier só DDD + número (10/11 dígitos), assume Brasil e prefixa 55
  if (digits.length === 10 || digits.length === 11) {
    return `55${digits}`;
  }

  // Caso diferente, manda como o usuário digitou (ainda pode funcionar)
  return digits;
}

function makeContractText(data) {
  const today = new Date().toLocaleDateString("pt-BR");

  const clientLabel = data.clientName?.trim() || "CLIENTE";
  const company = data.companyName?.trim() || "";
  const clientDoc = data.clientDoc?.trim() || "";
  const address = data.address?.trim() || "";
  const email = data.email?.trim() || "";
  const phone = data.phone?.trim() || "";

  const projectType = data.projectType?.trim() || "Sistema / Site";
  const packageName = data.packageName?.trim() || "Pacote";
  const scope = data.scope?.trim() || "(Descrever escopo fechado: funcionalidades e páginas incluídas)";
  const deadline = data.deadline?.trim() || "(Prazo a combinar)";
  const value = data.value?.trim() || "(Valor a combinar)";
  const payment = data.payment?.trim() || "(Forma de pagamento a combinar)";

  const warrantyDays = normalizeNumber(data.warrantyDays) || "30";
  const supportAfter = data.supportAfter?.trim() || "Suporte pós-entrega será orçado à parte (se desejado).";

  const devName = data.providerName?.trim() || "MultiAlmeida Softwares";

  if (data.contractType === "aluguel") {
    const monthlyValue = data.monthlyValue?.trim() || "(Mensalidade a combinar)";
    const contractTerm = data.contractTerm?.trim() || "(Prazo mínimo, se houver)";

    return `CONTRATO DE LICENÇA DE USO (ALUGUEL) + PRESTAÇÃO DE SERVIÇOS

Data: ${today}

1) PARTES
CONTRATADA: ${devName}
CONTRATANTE (CLIENTE): ${clientLabel}${company ? ` (${company})` : ""}${clientDoc ? `, Documento: ${clientDoc}` : ""}${address ? `, Endereço: ${address}` : ""}${email ? `, E-mail: ${email}` : ""}${phone ? `, Telefone: ${phone}` : ""}

2) OBJETO
2.1. A CONTRATADA concede ao CLIENTE uma licença de uso (aluguel) do produto: ${projectType}, no modelo ${packageName}.
2.2. A CONTRATADA também presta os serviços inclusos no pacote de aluguel, conforme descrito neste contrato.

3) O QUE ESTÁ INCLUSO NO ALUGUEL
3.1. Hospedagem e infraestrutura necessárias para o funcionamento do sistema.
3.2. Domínio e configurações correlatas (quando aplicável), conforme plano contratado.
3.3. Manutenção corretiva e preventiva.
3.4. Atualizações do sistema/base, melhorias técnicas e correções.
3.5. Suporte ao CLIENTE dentro do escopo do produto.

4) ESCOPO DO PRODUTO/ENTREGA
4.1. O produto coberto por este contrato inclui:
${scope}
4.2. Qualquer solicitação fora do escopo acima será tratada como melhoria e poderá ser orçada à parte.

5) PRAZO E MENSALIDADE
5.1. Mensalidade: ${monthlyValue}
5.2. Prazo/condição mínima (se aplicável): ${contractTerm}
5.3. O uso do sistema permanece ativo enquanto a mensalidade estiver em dia.

6) RESPONSABILIDADES
6.1. Da CONTRATADA: manter o sistema operacional, realizar atualizações e suporte conforme o pacote.
6.2. Do CLIENTE: fornecer informações corretas e colaborar com acessos/dados quando necessário.

7) GARANTIA E SUPORTE
7.1. Por se tratar de aluguel, as correções e manutenção estão incluídas enquanto o contrato estiver ativo.
7.2. Alterações solicitadas que mudem escopo/funcionalidades podem ser cobradas à parte.

8) CONFIDENCIALIDADE
8.1. As partes comprometem-se a manter sigilo sobre dados e informações sensíveis trocadas durante a execução.

9) RESCISÃO
9.1. Em caso de cancelamento, o acesso ao sistema poderá ser suspenso após o encerramento do período pago.

10) DISPOSIÇÕES FINAIS
10.1. Este é um modelo simples para formalizar a contratação. Recomenda-se revisão jurídica conforme sua realidade.

ASSINATURAS

____________________________________
CONTRATADA: ${devName}

____________________________________
CONTRATANTE: ${clientLabel}
`;
  }

  const githubTransfer = data.githubTransfer === "sim";
  const githubText = githubTransfer
    ? "Ao final do projeto (após quitação), a CONTRATADA transferirá o repositório/organização do projeto para a conta do GitHub indicada pelo CLIENTE."
    : "O código-fonte permanecerá sob gestão da CONTRATADA, salvo acordo/contrato específico em contrário.";

  return `CONTRATO DE DESENVOLVIMENTO E VENDA DE SITE INSTITUCIONAL

Data: ${today}

1) PARTES
CONTRATADA: ${devName}
CONTRATANTE (CLIENTE): ${clientLabel}${company ? ` (${company})` : ""}${clientDoc ? `, Documento: ${clientDoc}` : ""}${address ? `, Endereço: ${address}` : ""}${email ? `, E-mail: ${email}` : ""}${phone ? `, Telefone: ${phone}` : ""}

2) OBJETO
2.1. Desenvolvimento e entrega de ${projectType} (site institucional), no modelo ${packageName}, conforme escopo fechado.

3) ESCOPO (FECHADO)
3.1. Itens incluídos:
${scope}
3.2. Qualquer funcionalidade/página/integração fora do escopo será orçada à parte mediante aprovação do CLIENTE.

4) PRAZO
4.1. Prazo estimado/previsto: ${deadline}
4.2. O prazo pode depender do envio de informações e aprovações pelo CLIENTE.

5) VALOR E PAGAMENTO
5.1. Valor: ${value}
5.2. Forma de pagamento: ${payment}

6) CÓDIGO-FONTE E REPOSITÓRIO (GIT)
6.1. Regra: a base/arquitetura utilizada é propriedade intelectual da CONTRATADA.
6.2. ${githubText}

7) HOSPEDAGEM E INFRAESTRUTURA
7.1. No modelo de venda (projeto fechado), a hospedagem é de responsabilidade do CLIENTE (criação de conta e pagamento), salvo acordo específico.
7.2. A CONTRATADA poderá auxiliar na configuração/publicação, quando combinado.

8) DOMÍNIO
8.1. O domínio (registro e titularidade) deve ficar no nome do CLIENTE (CPF/CNPJ e e-mail do CLIENTE).
8.2. A CONTRATADA poderá auxiliar no registro e configuração de DNS.

9) GARANTIA
9.1. Garantia de ${warrantyDays} dias para correções relacionadas ao que foi entregue dentro do escopo.
9.2. Se o CLIENTE tiver esquecido de informar algo e isso estiver dentro da garantia e do escopo, a CONTRATADA poderá incluir sem custo, salvo se for algo complexo (nesse caso, será avaliado e orçado).
9.3. Se outro desenvolvedor ou o próprio CLIENTE alterar arquivos/código do sistema, a garantia poderá ser considerada perdida.
9.4. Após o período de garantia, pequenos ajustes simples (ex.: ortografia) podem ser corrigidos pela CONTRATADA por conta própria, quando aplicável.

10) SUPORTE E MELHORIAS (PÓS-ENTREGA)
10.1. ${supportAfter}

11) CONFIDENCIALIDADE
11.1. As partes comprometem-se a manter sigilo sobre dados e informações sensíveis.

12) DISPOSIÇÕES FINAIS
12.1. Este é um modelo simples para formalizar a contratação. Recomenda-se revisão jurídica conforme sua realidade.

ASSINATURAS

____________________________________
CONTRATADA: ${devName}

____________________________________
CONTRATANTE: ${clientLabel}
`;
}

function renderTemplate(template, vars) {
  return String(template || "").replace(/\{\{\s*([a-zA-Z0-9_]+)\s*\}\}/g, (_m, key) => {
    const v = vars?.[key];
    return v == null ? "" : String(v);
  });
}

function AtendimentoContratos() {
  useSeo({
    title: "Atendimento & Contratos | Admin | MultiAlmeida Softwares",
    description:
      "Roteiro de atendimento, checklist de onboarding e gerador de contrato (venda/aluguel).",
    noindex: true,
  });

  const [contractType, setContractType] = useState("venda");
  const [sendingEmail, setSendingEmail] = useState(false);
  const [sendStatus, setSendStatus] = useState(null);

  const [templates, setTemplates] = useState({
    venda: null,
    aluguel: null,
  });

  const [templateForm, setTemplateForm] = useState({ title: "", version: "", content: "" });
  const [savingTemplate, setSavingTemplate] = useState(false);
  const [templateStatus, setTemplateStatus] = useState(null);

  useEffect(() => {
    let alive = true;

    async function loadTemplates() {
      try {
        const [saleRes, subRes] = await Promise.all([
          fetch(`${API_BASE}/api/legal/documents/contract_site_sale`),
          fetch(`${API_BASE}/api/legal/documents/contract_subscription`),
        ]);

        const saleData = await saleRes.json();
        const subData = await subRes.json();

        if (!alive) return;
        setTemplates({
          venda: saleRes.ok ? saleData : null,
          aluguel: subRes.ok ? subData : null,
        });
      } catch {
        if (!alive) return;
        setTemplates({ venda: null, aluguel: null });
      }
    }

    loadTemplates();
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const t = contractType === "aluguel" ? templates.aluguel : templates.venda;
    if (!t) return;
    setTemplateForm({
      title: t?.title || "",
      version: t?.version || "",
      content: t?.content || "",
    });
  }, [contractType, templates.aluguel, templates.venda]);

  async function handleSaveTemplate() {
    const docKey = TEMPLATE_KEYS[contractType];
    if (!docKey) return;

    setSavingTemplate(true);
    setTemplateStatus(null);
    try {
      if (!templateForm.title.trim()) throw new Error("Informe o título do modelo.");
      if (!templateForm.content.trim()) throw new Error("Informe o conteúdo do modelo.");

      const res = await apiFetch(`/api/legal/admin/documents/${docKey}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: templateForm.title,
          version: templateForm.version || undefined,
          content: templateForm.content,
        }),
      });

      const data = await res.json().catch(() => null);
      if (!res.ok) throw new Error(data?.message || data?.error || "Erro ao salvar modelo.");

      setTemplates((prev) => {
        const next = { ...prev };
        if (contractType === "aluguel") next.aluguel = data;
        else next.venda = data;
        return next;
      });
      setTemplateStatus({ type: "success", message: "Modelo salvo com sucesso." });
    } catch (e) {
      setTemplateStatus({ type: "error", message: String(e?.message || e) });
    } finally {
      setSavingTemplate(false);
    }
  }
  const [form, setForm] = useState({
    contractType: "venda",
    providerName: "MultiAlmeida Softwares",

    clientName: "",
    companyName: "",
    clientDoc: "",
    address: "",
    email: "",
    phone: "",
    whatsappPhone: "",

    projectType: "Site Institucional",
    packageName: "Padrão (base + personalização)",
    scope:
      "- Home (com CTA/WhatsApp)\n- Sobre\n- Serviços\n- Contato\n- SEO básico (metatags e headings)\n- Publicação e checklist final",

    deadline: "",
    value: "",
    payment: "",

    warrantyDays: "30",
    supportAfter:
      "Manutenção e suporte pós-entrega podem ser contratados como adicional mensal. Novas funcionalidades/alterações fora do escopo serão orçadas à parte, mediante aprovação.",

    githubTransfer: "sim",

    monthlyValue: "",
    contractTerm: "",
  });

  const contractText = useMemo(() => {
    const today = new Date().toLocaleDateString("pt-BR");

    const clientLabel = form.clientName?.trim() || "CLIENTE";
    const company = form.companyName?.trim() || "";
    const clientDoc = form.clientDoc?.trim() || "";
    const address = form.address?.trim() || "";
    const email = form.email?.trim() || "";
    const phone = form.phone?.trim() || "";

    const githubTransfer = form.githubTransfer === "sim";
    const githubText = githubTransfer
      ? "Ao final do projeto (após quitação), a CONTRATADA transferirá o repositório/organização do projeto para a conta do GitHub indicada pelo CLIENTE."
      : "O código-fonte permanecerá sob gestão da CONTRATADA, salvo acordo/contrato específico em contrário.";

    const vars = {
      today,
      providerName: form.providerName?.trim() || "MultiAlmeida Softwares",
      clientLabel,
      companyBlock: company ? ` (${company})` : "",
      clientDocBlock: clientDoc ? `, Documento: ${clientDoc}` : "",
      addressBlock: address ? `, Endereço: ${address}` : "",
      emailBlock: email ? `, E-mail: ${email}` : "",
      phoneBlock: phone ? `, Telefone: ${phone}` : "",
      projectType: form.projectType?.trim() || "Sistema / Site",
      packageName: form.packageName?.trim() || "Pacote",
      scope: form.scope?.trim() || "(Descrever escopo fechado: funcionalidades e páginas incluídas)",
      deadline: form.deadline?.trim() || "(Prazo a combinar)",
      value: form.value?.trim() || "(Valor a combinar)",
      payment: form.payment?.trim() || "(Forma de pagamento a combinar)",
      warrantyDays: normalizeNumber(form.warrantyDays) || "30",
      supportAfter:
        form.supportAfter?.trim() || "Suporte pós-entrega será orçado à parte (se desejado).",
      githubText,
      monthlyValue: form.monthlyValue?.trim() || "(Mensalidade a combinar)",
      contractTerm: form.contractTerm?.trim() || "(Prazo mínimo, se houver)",
    };

    const template = templateForm.content;

    if (template) return renderTemplate(template, vars);

    // fallback (se o backend não estiver disponível)
    return makeContractText({ ...form, contractType });
  }, [form, contractType, templateForm.content, templates.aluguel?.content, templates.venda?.content]);

  function updateField(key, value) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleCopy() {
    await navigator.clipboard.writeText(contractText);
  }

  const emailConfig = useMemo(() => {
    return {
      serviceId: import.meta.env.VITE_EMAILJS_SERVICE_ID,
      templateId: import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
      publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
    };
  }, []);

  const emailConfigOk =
    Boolean(emailConfig.serviceId) &&
    Boolean(emailConfig.templateId) &&
    Boolean(emailConfig.publicKey);

  async function handleSendEmail() {
    if (contractType !== "venda") {
      setSendStatus({
        type: "error",
        message: "Envio de contrato está disponível apenas para venda de sites.",
      });
      return;
    }

    if (!emailConfigOk) {
      setSendStatus({
        type: "error",
        message:
          "Envio automático por e-mail não configurado (faltam variáveis VITE_EMAILJS_*).",
      });
      return;
    }

    if (!form.email?.trim()) {
      setSendStatus({ type: "error", message: "Preencha o e-mail do cliente." });
      return;
    }

    setSendingEmail(true);
    setSendStatus(null);
    try {
      const subject = "Contrato de Venda do Site Institucional";

      // Observação: os nomes dos campos precisam existir no template do EmailJS
      await emailjs.send(
        emailConfig.serviceId,
        emailConfig.templateId,
        {
          to_email: form.email.trim(),
          subject,
          client_name: form.clientName?.trim() || "Cliente",
          provider_name: form.providerName?.trim() || "MultiAlmeida Softwares",
          contract_type: contractType,
          contract_text: contractText,
        },
        {
          publicKey: emailConfig.publicKey,
        }
      );

      setSendStatus({ type: "success", message: "E-mail enviado com sucesso." });
    } catch {
      setSendStatus({
        type: "error",
        message:
          "Não foi possível enviar o e-mail agora. Verifique a configuração do EmailJS.",
      });
    } finally {
      setSendingEmail(false);
    }
  }

  function handlePrint() {
    const w = window.open("", "_blank", "noopener,noreferrer");
    if (!w) return;

    const escaped = contractText
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");

    w.document.open();
    w.document.write(`<!doctype html>
<html lang="pt-BR">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Contrato</title>
  <style>
    :root { color-scheme: light dark; }
    body { font-family: Inter, system-ui, -apple-system, Segoe UI, Roboto, Arial, sans-serif; padding: 24px; }
    pre { white-space: pre-wrap; line-height: 1.35; font-size: 13px; }
    @media print { body { padding: 0; } }
  </style>
</head>
<body>
  <pre>${escaped}</pre>
  <script>window.print();</script>
</body>
</html>`);
    w.document.close();
  }

  const mailtoHref = useMemo(() => {
    return buildMailto({
      to: form.email,
      subject:
        "Contrato de Venda do Site Institucional",
      body: contractText,
    });
  }, [form.email, contractText]);

  const whatsappHref = useMemo(() => {
    const phoneCandidate = form.whatsappPhone?.trim() || form.phone?.trim();
    const phone = normalizeWhatsAppPhone(phoneCandidate);
    if (!phone) return "";
    const text = encodeURIComponent(contractText);
    return `https://wa.me/${phone}?text=${text}`;
  }, [form.whatsappPhone, form.phone, contractText]);

  return (
    <Sidebar>
      <section className={styles.page} aria-label="Atendimento e Contratos">
        <header className={styles.header}>
          <h1 className={styles.title}>Atendimento & Contratos</h1>
          <p className={styles.subtitle}>
            Roteiro do primeiro contato + checklist de onboarding + modelo de
            contrato (Venda/Aluguel).
          </p>
        </header>

        <div className={styles.columns}>
          <article className={styles.card}>
            <h2 className={styles.cardTitle}>Roteiro do atendimento (do início ao “sim”)</h2>

            <h3 className={styles.h3}>1) Diagnóstico (obrigatório)</h3>
            <ul className={styles.list}>
              <li>Entender o negócio e o objetivo.</li>
              <li>Entender urgência e orçamento.</li>
              <li>Confirmar: padrão (base + personalização) ou design exclusivo.</li>
              <li>Você direciona o cliente (não o contrário).</li>
            </ul>

            <h3 className={styles.h3}>2) Fechar ESCOPO (lista fechada)</h3>
            <ul className={styles.list}>
              <li>
                Transformar “quero um sistema completo” em lista objetiva
                (funcionalidades + páginas).
              </li>
              <li>
                Frase padrão: “Qualquer funcionalidade fora do escopo será orçada
                à parte.”
              </li>
            </ul>

            <h3 className={styles.h3}>3) Proposta por pacotes (modelo profissional)</h3>
            <ul className={styles.list}>
              <li>
                <strong>Pacote Padrão</strong>: seu layout base + personalização
                (mais rápido e mais barato).
              </li>
              <li>
                <strong>Pacote Personalizado</strong>: ajustes maiores e/ou design
                exclusivo.
              </li>
              <li>
                <strong>Sob medida</strong>: sistema totalmente customizado, por
                etapas.
              </li>
            </ul>

            <h3 className={styles.h3}>4) Projetos-base (vale a pena?)</h3>
            <ul className={styles.list}>
              <li>Sim: base pronta + personalização (escala e padrão de qualidade).</li>
              <li>Você vende “produtos-base” (não “site engessado”).</li>
              <li>Entrega rápida, menos retrabalho, mais lucro.</li>
            </ul>
          </article>

          <article className={styles.card}>
            <h2 className={styles.cardTitle}>Checklist do que pedir (após orçamento aceito)</h2>

            <h3 className={styles.h3}>Dados da empresa</h3>
            <ul className={styles.list}>
              <li>Nome / Nome fantasia</li>
              <li>CNPJ (se houver) e endereço</li>
              <li>Logo (se não tiver: provisória)</li>
              <li>Cores (se quiser sair do padrão)</li>
            </ul>

            <h3 className={styles.h3}>Dados técnicos</h3>
            <ul className={styles.list}>
              <li>Quantidade de usuários</li>
              <li>Tipos de usuário (admin, funcionário, etc.)</li>
              <li>Regras especiais (permissões, descontos, etc.)</li>
            </ul>

            <h3 className={styles.h3}>Dados do sistema</h3>
            <ul className={styles.list}>
              <li>Produtos/serviços</li>
              <li>Fluxo de venda/atendimento</li>
              <li>Relatórios desejados</li>
              <li>Integrações (se houver)</li>
            </ul>

            <div className={styles.note}>
              Se o cliente não passar algo, entra o padrão da sua base (isso te
              protege contra “escopo infinito”).
            </div>

            <h3 className={styles.h3}>Regras de ouro (pra deixar claro)</h3>
            <ul className={styles.list}>
              <li>Domínio sempre no nome do cliente.</li>
              <li>Venda: hospedagem por conta do cliente (você auxilia).</li>
              <li>Aluguel: cliente não se preocupa com nada (tudo incluso).</li>
              <li>Sem contrato = não começa.</li>
            </ul>
          </article>
        </div>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Modelo do contrato (editável)</h2>
          <p className={styles.small}>
            Use a seleção abaixo para editar o modelo de <strong>Assinatura</strong> ou de <strong>Venda</strong>. O cliente
            deve ver e aceitar o contrato de assinatura antes do pagamento.
          </p>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Tipo de contrato</label>
              <select
                className={styles.input}
                value={contractType}
                onChange={(e) => setContractType(e.target.value)}
                disabled={savingTemplate}
              >
                <option value="aluguel">Assinatura (Aluguel)</option>
                <option value="venda">Venda (Projeto fechado)</option>
              </select>
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Versão</label>
              <input
                className={styles.input}
                value={templateForm.version}
                onChange={(e) => setTemplateForm((p) => ({ ...p, version: e.target.value }))}
                placeholder="Ex.: 2026-01-03"
                disabled={savingTemplate}
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label className={styles.label}>Título</label>
              <input
                className={styles.input}
                value={templateForm.title}
                onChange={(e) => setTemplateForm((p) => ({ ...p, title: e.target.value }))}
                disabled={savingTemplate}
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label className={styles.label}>Conteúdo do modelo (texto)</label>
              <textarea
                className={styles.textarea}
                value={templateForm.content}
                onChange={(e) => setTemplateForm((p) => ({ ...p, content: e.target.value }))}
                rows={10}
                disabled={savingTemplate}
              />
              <div className={styles.small}>
                Placeholders: {`{{clientLabel}}`} {`{{companyBlock}}`} {`{{scope}}`} etc.
              </div>
            </div>
          </div>

          <div className={styles.actions}>
            <button className={styles.button} onClick={handleSaveTemplate} disabled={savingTemplate}>
              {savingTemplate ? "Salvando…" : "Salvar modelo"}
            </button>
          </div>

          {templateStatus && (
            <div
              className={`${styles.status} ${
                templateStatus.type === "success" ? styles.statusSuccess : styles.statusError
              }`}
            >
              {templateStatus.message}
            </div>
          )}
        </article>

        <article className={styles.card}>
          <h2 className={styles.cardTitle}>Gerador de contrato (Venda x Aluguel)</h2>
          <p className={styles.small}>
            Modelo simples para agilizar. Recomendo revisão jurídica antes de usar
            em escala.
          </p>

          <div className={styles.formGrid}>
            <div className={styles.field}>
              <label className={styles.label}>Sua empresa (Contratada)</label>
              <input
                className={styles.input}
                value={form.providerName}
                onChange={(e) => updateField("providerName", e.target.value)}
                placeholder="MultiAlmeida Softwares"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Nome do cliente (responsável)</label>
              <input
                className={styles.input}
                value={form.clientName}
                onChange={(e) => updateField("clientName", e.target.value)}
                placeholder="Nome do cliente"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Empresa / Nome fantasia</label>
              <input
                className={styles.input}
                value={form.companyName}
                onChange={(e) => updateField("companyName", e.target.value)}
                placeholder="Empresa"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Documento (CPF/CNPJ)</label>
              <input
                className={styles.input}
                value={form.clientDoc}
                onChange={(e) => updateField("clientDoc", e.target.value)}
                placeholder="CPF/CNPJ"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Endereço</label>
              <input
                className={styles.input}
                value={form.address}
                onChange={(e) => updateField("address", e.target.value)}
                placeholder="Endereço"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>E-mail (para enviar)</label>
              <input
                className={styles.input}
                value={form.email}
                onChange={(e) => updateField("email", e.target.value)}
                placeholder="cliente@email.com"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Telefone</label>
              <input
                className={styles.input}
                value={form.phone}
                onChange={(e) => updateField("phone", e.target.value)}
                placeholder="(00) 00000-0000"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>WhatsApp (com DDD)</label>
              <input
                className={styles.input}
                value={form.whatsappPhone}
                onChange={(e) => updateField("whatsappPhone", e.target.value)}
                placeholder="Ex.: 11999990000 (ou +55...)"
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Tipo do projeto</label>
              <input
                className={styles.input}
                value={form.projectType}
                onChange={(e) => updateField("projectType", e.target.value)}
                placeholder="Sistema, Site, E-commerce..."
              />
            </div>

            <div className={styles.field}>
              <label className={styles.label}>Pacote</label>
              <input
                className={styles.input}
                value={form.packageName}
                onChange={(e) => updateField("packageName", e.target.value)}
                placeholder="Padrão / Personalizado / Sob medida"
              />
            </div>

            <div className={`${styles.field} ${styles.full}`}>
              <label className={styles.label}>Escopo (cole a lista fechada)</label>
              <textarea
                className={styles.textarea}
                value={form.scope}
                onChange={(e) => updateField("scope", e.target.value)}
                rows={6}
              />
            </div>

            {contractType === "venda" ? (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Prazo</label>
                  <input
                    className={styles.input}
                    value={form.deadline}
                    onChange={(e) => updateField("deadline", e.target.value)}
                    placeholder="Ex.: 20 dias úteis"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Valor</label>
                  <input
                    className={styles.input}
                    value={form.value}
                    onChange={(e) => updateField("value", e.target.value)}
                    placeholder="Ex.: R$ 4.500"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Pagamento</label>
                  <input
                    className={styles.input}
                    value={form.payment}
                    onChange={(e) => updateField("payment", e.target.value)}
                    placeholder="Ex.: 50% entrada + 50% entrega"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Garantia (dias)</label>
                  <input
                    className={styles.input}
                    inputMode="numeric"
                    value={form.warrantyDays}
                    onChange={(e) => updateField("warrantyDays", e.target.value)}
                    placeholder="30"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Transferir GitHub do cliente?</label>
                  <select
                    className={styles.input}
                    value={form.githubTransfer}
                    onChange={(e) => updateField("githubTransfer", e.target.value)}
                  >
                    <option value="sim">Sim</option>
                    <option value="nao">Não</option>
                  </select>
                </div>

                <div className={`${styles.field} ${styles.full}`}>
                  <label className={styles.label}>Regra de suporte pós-entrega</label>
                  <textarea
                    className={styles.textarea}
                    value={form.supportAfter}
                    onChange={(e) => updateField("supportAfter", e.target.value)}
                    rows={3}
                  />
                </div>
              </>
            ) : (
              <>
                <div className={styles.field}>
                  <label className={styles.label}>Mensalidade</label>
                  <input
                    className={styles.input}
                    value={form.monthlyValue}
                    onChange={(e) => updateField("monthlyValue", e.target.value)}
                    placeholder="Ex.: R$ 199/mês"
                  />
                </div>

                <div className={styles.field}>
                  <label className={styles.label}>Prazo mínimo (se houver)</label>
                  <input
                    className={styles.input}
                    value={form.contractTerm}
                    onChange={(e) => updateField("contractTerm", e.target.value)}
                    placeholder="Ex.: 6 meses"
                  />
                </div>
              </>
            )}
          </div>

          <div className={styles.actions}>
            <button className={styles.button} type="button" onClick={handleCopy}>
              Copiar contrato
            </button>
            <button className={styles.buttonSecondary} type="button" onClick={handlePrint}>
              Imprimir / Salvar PDF
            </button>

            {contractType === "venda" && (
              <>
                <button
                  className={styles.button}
                  type="button"
                  onClick={handleSendEmail}
                  disabled={sendingEmail}
                  aria-busy={sendingEmail}
                  title={
                    emailConfigOk
                      ? "Enviar e-mail automaticamente"
                      : "Configure o EmailJS (variáveis VITE_EMAILJS_*)"
                  }
                >
                  {sendingEmail ? "Enviando e-mail..." : "Enviar por e-mail (automático)"}
                </button>

                <a
                  className={styles.linkButton}
                  href={whatsappHref || "#"}
                  onClick={(e) => {
                    if (!whatsappHref) e.preventDefault();
                  }}
                  title={
                    whatsappHref
                      ? "Abrir WhatsApp com o contrato pronto"
                      : "Preencha o WhatsApp/telefone para enviar"
                  }
                  target="_blank"
                  rel="noreferrer"
                >
                  Enviar no WhatsApp
                </a>

                <a className={styles.linkButton} href={mailtoHref} title="Abrir e-mail no seu aplicativo">
                  E-mail (manual)
                </a>
              </>
            )}
          </div>

          {!emailConfigOk && (
            <div className={styles.note}>
              Para ativar o envio automático por e-mail, configure as variáveis:
              <strong> VITE_EMAILJS_SERVICE_ID</strong>,
              <strong> VITE_EMAILJS_TEMPLATE_ID</strong> e
              <strong> VITE_EMAILJS_PUBLIC_KEY</strong>.
            </div>
          )}

          {sendStatus?.message && (
            <div
              className={`${styles.status} ${
                sendStatus.type === "success" ? styles.statusSuccess : styles.statusError
              }`}
              role="status"
            >
              {sendStatus.message}
            </div>
          )}

          <div className={styles.preview}>
            <h3 className={styles.h3}>Prévia</h3>
            <pre className={styles.pre}>{contractText}</pre>
          </div>
        </article>
      </section>
    </Sidebar>
  );
}

export default AtendimentoContratos;
