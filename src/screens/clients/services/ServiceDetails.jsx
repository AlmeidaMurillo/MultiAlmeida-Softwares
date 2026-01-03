import { useEffect, useMemo, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./ServiceDetails.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import useSeo from "../../../utils/useSeo";

const API_BASE = import.meta.env.VITE_API_BASE_URL || "http://localhost:3001";

function formatBRLFromCents(cents) {
  if (cents == null) return null;
  const value = Number(cents) / 100;
  return value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

const servicesCatalog = [
  {
    id: "sites-institucionais",
    slug: "sites-institucionais",
    title: "Sites Institucionais",
    tagline: "Aplicações modernas e responsivas",
    icon: "</>",
    summary:
      "Sites modernos, rápidos e responsivos para apresentar sua empresa com clareza e gerar oportunidades.",
    businessModel: {
      type: "sale",
      title: "Venda (projeto fechado)",
      description:
        "Sites institucionais são vendidos por projeto, com escopo e prazo definidos. Manutenção e suporte contínuos são opcionais e podem ser contratados à parte.",
    },
    paraQuem: [
      "Empresas que precisam de presença digital profissional",
      "Negócios locais que querem gerar leads no WhatsApp",
      "Marcas que precisam melhorar SEO e performance",
    ],
    entregaveis: [
      "Página Home com foco em conversão",
      "Páginas institucionais (Sobre, Contato e outras do escopo)",
      "Formulário/CTA (WhatsApp, e-mail, links)",
      "Configuração de SEO básico (metatags, headings, performance)",
    ],
    technologies: ["React", "Vite", "SEO", "Acessibilidade"],
    highlights: ["Desenvolvimento ágil", "Segurança avançada", "Performance otimizada"],
    included: [
      "Design responsivo (mobile-first)",
      "Páginas institucionais (Home, Sobre, Contato, etc.)",
      "SEO básico (metatags, headings, performance)",
      "Formulário de contato e integrações (quando aplicável)",
      "Publicação e orientações de manutenção",
    ],
    naoIncluido: [
      "Criação de identidade visual / logo (pode ser contratado à parte)",
      "Produção de fotos e vídeos profissionais",
      "Redação completa de conteúdo (podemos revisar e orientar)",
      "Hospedagem e domínio (quando não contratados)",
    ],
    processo: [
      "Briefing e levantamento do conteúdo",
      "Proposta de layout e ajustes",
      "Implementação e validação",
      "Publicação e checklist final",
    ],
    responsabilidadesEmpresa: [
      "Desenvolver e configurar o site conforme o escopo aprovado",
      "Garantir responsividade, performance e boas práticas de SEO",
      "Realizar ajustes durante o período de validação",
      "Publicar (quando acessos e infraestrutura forem fornecidos)",
    ],
    responsabilidadesCliente: [
      "Fornecer conteúdo (textos, imagens, logotipo) e acessos necessários",
      "Aprovar layout e funcionalidades em tempo hábil",
      "Validar informações e responsabilidade legal do conteúdo publicado",
    ],
    suporteEGarantia: [
      "Correções de bugs relacionados ao escopo entregue",
      "Ajustes finos pós-publicação conforme combinado",
      "Evoluções e novas páginas via orçamento adicional",
    ],
    garantia: {
      prazo: "30 dias após a entrega (padrão)",
      perdeSe: [
        "O cliente permitir que outro desenvolvedor/terceiro altere o projeto durante o período de garantia",
        "Houver alteração direta no código, servidor, banco de dados ou configurações sem validação conosco",
        "O problema for causado por plugins/serviços externos adicionados depois da entrega",
      ],
      naoCobre: [
        "Novas funcionalidades ou mudanças de escopo após a aprovação/entrega",
        "Conteúdo incorreto fornecido pelo cliente (textos, imagens, dados)",
        "Custos de serviços de terceiros (domínio, hospedagem, APIs pagas)",
      ],
    },
  },
  {
    id: "sistemas-personalizados",
    slug: "sistemas-personalizados",
    title: "Sistemas Personalizados",
    tagline: "Soluções sob medida",
    icon: "≡",
    summary:
      "Sistemas sob medida para automatizar processos, reduzir retrabalho e dar visibilidade ao seu negócio.",
    businessModel: {
      type: "rental",
      title: "Aluguel (assinatura)",
      description:
        "Sistemas são oferecidos no modelo de assinatura: normalmente há uma implantação (setup) e uma mensalidade para uso, suporte e evolução contínua.",
    },
    paraQuem: [
      "Empresas com processos manuais e retrabalho",
      "Equipes que precisam de controle de acesso e auditoria",
      "Negócios que precisam integrar serviços (pagamentos, ERPs, etc.)",
    ],
    entregaveis: [
      "Mapeamento de fluxo e requisitos",
      "Interface web com perfis de acesso",
      "API/back-end (quando aplicável)",
      "Relatórios e dashboards (conforme escopo)",
    ],
    technologies: ["React", "Node.js", "MySQL"],
    highlights: ["Eficiência operacional", "Controle total", "Workflow otimizado"],
    included: [
      "Levantamento de requisitos e fluxo do sistema",
      "Painel administrativo (quando aplicável)",
      "Perfis de acesso e permissões",
      "Relatórios e dashboards (conforme escopo)",
      "Integrações com serviços externos",
    ],
    naoIncluido: [
      "Infraestrutura de servidores (quando não contratada)",
      "Licenças pagas de terceiros (quando necessárias)",
      "Suporte 24/7 (pode ser contratado via plano)",
    ],
    processo: [
      "Descoberta (requisitos + prioridades)",
      "Protótipo/fluxos e aprovação",
      "Implementação por entregas",
      "Homologação e treinamento",
    ],
    responsabilidadesEmpresa: [
      "Implementar o sistema conforme requisitos aprovados",
      "Definir e documentar regras e integrações acordadas",
      "Garantir segurança básica (autenticação, permissões, logs) no escopo",
      "Apoiar na implantação e transição",
    ],
    responsabilidadesCliente: [
      "Participar do levantamento de requisitos e validar entregas",
      "Disponibilizar regras de negócio e usuários-chave",
      "Fornecer dados de teste e acessos para integrações",
    ],
    suporteEGarantia: [
      "Correções de bugs do escopo durante a garantia",
      "Acompanhamento de evolução via backlog/contrato",
    ],
    garantia: {
      prazo: "45 dias após a entrega/homologação (padrão)",
      perdeSe: [
        "O cliente passar o sistema para outro desenvolvedor/terceiro mexer durante a garantia",
        "Alterações em regras, permissões, banco, servidor ou integrações sem alinhamento conosco",
        "Uso fora do combinado (ex.: volumes extremos) sem ajuste de infraestrutura/escopo",
      ],
      naoCobre: [
        "Funcionalidades que não estavam no escopo e forem solicitadas após a entrega",
        "Demandas que surgem por mudança de processo interno do cliente",
        "Erros causados por dados inválidos ou integrações externas fora do nosso controle",
      ],
    },
  },
  {
    id: "ecommerce",
    slug: "ecommerce",
    title: "E-commerce",
    tagline: "Venda online com eficiência",
    icon: "🛒",
    summary:
      "Lojas virtuais completas para vender online com checkout otimizado e gestão de catálogo.",
    businessModel: {
      type: "rental",
      title: "Aluguel (assinatura)",
      description:
        "O e-commerce é disponibilizado por assinatura, com atualizações e suporte conforme o plano. Integrações e evoluções podem ser contratadas conforme necessidade.",
    },
    paraQuem: [
      "Negócios que querem vender online com estabilidade",
      "Empresas que precisam integrar frete e pagamentos",
      "Marcas que querem melhorar conversão e performance",
    ],
    entregaveis: [
      "Catálogo de produtos e categorias",
      "Carrinho e checkout",
      "Área administrativa para pedidos e produtos",
      "Integrações (pagamento/frete) conforme viabilidade",
    ],
    technologies: ["React", "Node.js", "MySQL", "Checkout", "Pagamentos", "Integrações"],
    highlights: ["Conversão otimizada", "Pagamentos seguros", "Gestão de vendas"],
    included: [
      "Catálogo de produtos e categorias",
      "Carrinho e checkout",
      "Integração com pagamento e frete (quando aplicável)",
      "Área administrativa para pedidos e produtos",
      "Otimização para conversão e performance",
    ],
    naoIncluido: [
      "Operação diária (separação/envio/atendimento)",
      "Custos de gateway de pagamento e antifraude",
      "Taxas de frete e transportadoras",
    ],
    processo: [
      "Definição de regras (frete, pagamento, política de troca)",
      "Setup do layout e páginas essenciais",
      "Integrações e testes de compra",
      "Publicação e checklist de conversão",
    ],
    responsabilidadesEmpresa: [
      "Implementar a loja com foco em performance e conversão",
      "Configurar integrações combinadas (pagamento/frete)",
      "Garantir segurança no fluxo de autenticação e checkout no escopo",
    ],
    responsabilidadesCliente: [
      "Cadastrar produtos (descrições, preços, fotos) e políticas comerciais",
      "Manter meios de pagamento e configurações comerciais",
      "Operar pedidos e atendimento ao cliente",
    ],
    suporteEGarantia: [
      "Ajustes finos no checkout no período de estabilização",
      "Evoluções via backlog (novas features, campanhas, etc.)",
    ],
    garantia: {
      prazo: "30 dias após a publicação (padrão)",
      perdeSe: [
        "Outro desenvolvedor/terceiro alterar a loja durante a garantia",
        "Mudanças em gateway, frete, pixel/trackings, temas/plugins sem validação",
        "Edição de configurações críticas (checkout/segurança) fora do combinado",
      ],
      naoCobre: [
        "Operação do e-commerce (cadastro/precificação/logística/atendimento)",
        "Taxas e instabilidades de serviços de terceiros (pagamento, frete, antifraude)",
        "Novas integrações e funcionalidades não previstas no escopo",
      ],
    },
  },
  {
    id: "sistema-agendamento",
    slug: "sistema-agendamento",
    title: "Sistema de Agendamento",
    tagline: "Agenda online e gestão de horários",
    icon: "📅",
    summary:
      "Sistema para agendamentos com controle de horários, clientes e rotinas do seu negócio, com acesso pela web.",
    businessModel: {
      type: "rental",
      title: "Aluguel (assinatura)",
      description:
        "O sistema de agendamento é oferecido por assinatura: normalmente há uma implantação (setup) e uma mensalidade para uso, suporte e evolução contínua.",
    },
    paraQuem: [
      "Clínicas, salões e profissionais que trabalham por horário",
      "Negócios que querem reduzir faltas e organizar atendimento",
      "Empresas que precisam de painel administrativo e relatórios",
    ],
    entregaveis: [
      "Agenda com horários e disponibilidade",
      "Cadastro de clientes e serviços",
      "Painel administrativo",
      "Relatórios básicos (conforme escopo)",
    ],
    technologies: ["React", "Node.js", "MySQL"],
    highlights: ["Organização", "Menos faltas", "Atendimento mais rápido"],
    included: [
      "Agenda e disponibilidade",
      "Cadastro de clientes e serviços",
      "Painel administrativo",
      "Notificações e confirmações (quando aplicável)",
      "Relatórios básicos (conforme escopo)",
    ],
    naoIncluido: [
      "Envio de SMS/WhatsApp pago (dependendo do provedor)",
      "Infraestrutura/hospedagem (quando não contratada)",
      "Suporte 24/7 (pode ser contratado via plano)",
    ],
    processo: [
      "Levantamento do fluxo de agendamento",
      "Definição das regras (horários, serviços, bloqueios)",
      "Implementação e testes",
      "Publicação e treinamento",
    ],
    responsabilidadesEmpresa: [
      "Implementar o sistema conforme o escopo aprovado",
      "Configurar regras de agenda e permissões (quando aplicável)",
      "Apoiar na implantação e validação",
    ],
    responsabilidadesCliente: [
      "Fornecer regras de atendimento e horários",
      "Validar telas e fluxos",
      "Indicar usuários-chave para homologação",
    ],
    suporteEGarantia: [
      "Correções de bugs relacionados ao escopo entregue",
      "Acompanhamento de evolução via backlog/contrato",
    ],
    garantia: {
      prazo: "30 dias após a homologação (padrão)",
      perdeSe: [
        "Outro desenvolvedor/terceiro alterar o projeto durante a garantia",
        "Alterações no servidor/banco sem alinhamento",
      ],
      naoCobre: [
        "Mudanças de escopo após aprovação/entrega",
        "Custos de serviços de terceiros (SMS/WhatsApp, domínio, hospedagem)",
      ],
    },
  },
  {
    id: "sistema-delivery",
    slug: "sistema-delivery",
    title: "Sistema Delivery",
    tagline: "Pedidos online e gestão de entregas",
    icon: "🛵",
    summary:
      "Sistema de pedidos online para delivery com gestão de cardápio, pedidos e operação, focado em velocidade e clareza.",
    businessModel: {
      type: "rental",
      title: "Aluguel (assinatura)",
      description:
        "O sistema delivery é oferecido por assinatura: normalmente há uma implantação (setup) e uma mensalidade para uso, suporte e evolução contínua.",
    },
    paraQuem: [
      "Restaurantes e negócios que fazem entregas",
      "Operações que precisam organizar pedidos por status",
      "Empresas que querem canal próprio (sem depender só de marketplaces)",
    ],
    entregaveis: [
      "Cardápio / catálogo",
      "Fluxo de pedidos (recebimento e status)",
      "Painel administrativo",
      "Relatórios básicos (conforme escopo)",
    ],
    technologies: ["React", "Node.js", "MySQL"],
    highlights: ["Pedidos rápidos", "Operação organizada", "Controle de vendas"],
    included: [
      "Cardápio / catálogo",
      "Fluxo de pedidos (recebimento e status)",
      "Painel administrativo",
      "Cupons e promoções (quando aplicável)",
      "Relatórios básicos (conforme escopo)",
    ],
    naoIncluido: [
      "Operação de entrega (motoboys/logística)",
      "Integrações pagas com marketplaces (quando não previstas)",
      "Custos de provedores de pagamento (quando aplicável)",
    ],
    processo: [
      "Definição das regras (área de entrega, retirada, horários)",
      "Configuração do cardápio e categorias",
      "Implementação e testes de pedido",
      "Publicação e checklist operacional",
    ],
    responsabilidadesEmpresa: [
      "Implementar o sistema conforme escopo aprovado",
      "Garantir performance e estabilidade do fluxo de pedidos",
      "Apoiar na implantação e validação",
    ],
    responsabilidadesCliente: [
      "Fornecer dados do cardápio e políticas comerciais",
      "Validar o fluxo de pedidos e operação",
      "Operar pedidos e atendimento",
    ],
    suporteEGarantia: [
      "Correções de bugs relacionados ao escopo entregue",
      "Acompanhamento de evolução via backlog/contrato",
    ],
    garantia: {
      prazo: "30 dias após a publicação (padrão)",
      perdeSe: [
        "Outro desenvolvedor/terceiro alterar o projeto durante a garantia",
        "Mudanças críticas na infraestrutura sem alinhamento",
      ],
      naoCobre: [
        "Operação diária (atendimento/logística)",
        "Custos e instabilidades de serviços de terceiros",
      ],
    },
  },
  {
    id: "manutencao-suporte",
    slug: "manutencao-suporte",
    title: "Manutenção & Suporte",
    tagline: "Estabilidade e evolução contínua",
    icon: "🛠",
    summary:
      "Evolução contínua, correções e melhorias para manter seu site/sistema rápido, seguro e atualizado.",
    businessModel: {
      type: "addon",
      title: "Adicional (mensal)",
      description:
        "Suporte e manutenção são contratados mensalmente (quando aplicável) para manter o projeto atualizado, estável e com acompanhamento contínuo.",
    },
    paraQuem: [
      "Sites/sistemas que precisam de melhorias contínuas",
      "Projetos que precisam reduzir riscos de indisponibilidade",
      "Empresas que precisam de atualizações e correções recorrentes",
    ],
    entregaveis: [
      "Plano de manutenção (rotina e prioridades)",
      "Correções e melhorias por demanda",
      "Atualizações de dependências",
      "Recomendações de segurança e performance",
    ],
    technologies: ["Monitoramento", "Correções", "Atualizações", "Boas práticas"],
    highlights: ["Resposta rápida", "Qualidade contínua", "Risco reduzido"],
    included: [
      "Correções de bugs e ajustes",
      "Atualizações de dependências",
      "Melhorias de performance",
      "Backups e recomendações de segurança",
      "Suporte por demanda ou recorrente",
    ],
    naoIncluido: [
      "Novas funcionalidades grandes fora do combinado (tratamos como projeto)",
      "Intervenções emergenciais fora do horário (quando não contratado)",
    ],
    processo: [
      "Diagnóstico e priorização",
      "Execução e testes",
      "Publicação e monitoramento",
      "Relatório do que foi feito",
    ],
    responsabilidadesEmpresa: [
      "Executar manutenções preventivas e corretivas",
      "Sugerir melhorias de segurança e performance",
      "Comunicar impactos e janelas de manutenção",
    ],
    responsabilidadesCliente: [
      "Reportar problemas com contexto (prints, passos, horário)",
      "Aprovar intervenções críticas quando necessário",
      "Fornecer acessos e permissões temporárias quando aplicável",
    ],
    suporteEGarantia: [
      "Atendimento conforme plano/contrato",
      "Registro de mudanças e histórico de intervenções",
    ],
    garantia: {
      prazo: "Conforme plano/contrato (sob demanda ou recorrente)",
      perdeSe: [
        "Intervenções por terceiros sem alinhamento (pode exigir auditoria antes de retomar suporte)",
      ],
      naoCobre: [
        "Mudanças grandes de escopo sem contratação adicional",
        "Custos de infraestrutura e serviços de terceiros",
      ],
    },
  },
];

function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const service = useMemo(() => servicesCatalog.find((s) => s.slug === slug), [slug]);
  const [plans, setPlans] = useState([]);

  useSeo({
    title: service ? `${service.title} | MultiAlmeida Softwares` : "Serviço não encontrado | MultiAlmeida Softwares",
    description: service?.summary || "Detalhes do serviço. Verifique o link ou volte para a lista de serviços.",
  });

 

  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);

  useEffect(() => {
    let cancelled = false;

    async function loadPlans() {
      try {
        const res = await fetch(`${API_BASE}/api/plans?active=true`);
        const data = await res.json();
        if (!res.ok) return;
        if (!cancelled) setPlans(Array.isArray(data) ? data : []);
      } catch {
        // backend desligado: sem planos dinâmicos
      }
    }

    loadPlans();
    return () => {
      cancelled = true;
    };
  }, []);

  const relevantPlans = useMemo(() => {
    if (!service?.businessModel?.type) return [];
    const type = service.businessModel.type;

    const byKey = plans.filter((p) => p?.system_key && p.system_key === service.slug && p.model === type);
    if (byKey.length > 0) return byKey;

    return plans.filter((p) => p?.model === type);
  }, [plans, service]);

  function formatPlanLine(p) {
    if (!p) return "";
    if (p.model === "sale") {
      const oneTime = formatBRLFromCents(p.price_one_time_cents);
      return oneTime ? `${p.name} — ${oneTime}` : p.name;
    }

    const monthly = formatBRLFromCents(p.price_monthly_cents);
    const setup = formatBRLFromCents(p.price_setup_cents);
    const monthlyPart = monthly ? `${monthly}/mês` : "";
    const setupPart = setup && Number(p.price_setup_cents) > 0 ? ` + setup ${setup}` : "";
    const pricePart = monthlyPart ? ` — ${monthlyPart}${setupPart}` : setupPart ? ` — ${setupPart.trim()}` : "";
    return `${p.name}${pricePart}`;
  }

  if (!service) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.container}>
              <span className={styles.badge}>Serviços</span>
              <h1 className={styles.title}>Serviço não encontrado</h1>
              <p className={styles.subtitle}>
                Verifique o link ou volte para a lista de serviços.
              </p>

              <div className={styles.actions}>
                <button className={styles.secondaryBtn} onClick={() => navigate("/servicos")}>
                  Voltar para Serviços
                </button>
              </div>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.container}>
            <span className={styles.badge}>Serviços</span>
            <h1 className={styles.title}>{service.title}</h1>
            <p className={styles.subtitle}>{service.summary}</p>

            <div className={styles.heroMeta}>
              <div className={styles.metaCard}>
                <div className={styles.metaLabel}>Objetivo</div>
                <div className={styles.metaValue}>{service.tagline}</div>
              </div>
              <div className={styles.metaCard}>
                <div className={styles.metaLabel}>Destaques</div>
                <div className={styles.metaValue}>{service.highlights.join(" • ")}</div>
              </div>
              <div className={styles.metaCard}>
                <div className={styles.metaLabel}>Garantia</div>
                <div className={styles.metaValue}>{service.garantia?.prazo || "Conforme contrato"}</div>
              </div>
            </div>

            <div className={styles.actions}>
              <Link className={styles.secondaryBtn} to="/servicos">
                Voltar para Serviços
              </Link>
              <button
                className={styles.primaryBtn}
                onClick={() => navigate("/servicos", { state: { scrollToService: service.slug } })}
              >
                Ver o serviço na lista
              </button>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.grid}>
              {service.businessModel && (
                <article className={styles.card}>
                  <h2 className={styles.cardTitle}>Modelo de contratação</h2>
                  <div className={styles.note}>
                    <div className={styles.noteTitle}>{service.businessModel.title}</div>
                    <div className={styles.noteText}>{service.businessModel.description}</div>
                  </div>

                  {relevantPlans.length > 0 && (
                    <>
                      <h3 className={styles.subTitle}>Planos e valores (referência)</h3>
                      <ul className={styles.list}>
                        {relevantPlans.slice(0, 4).map((p) => (
                          <li key={p.id} className={styles.listItem}>
                            {formatPlanLine(p)}
                          </li>
                        ))}
                      </ul>
                    </>
                  )}
                </article>
              )}

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Para quem é</h2>
                <ul className={styles.list}>
                  {service.paraQuem.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Entregáveis</h2>
                <ul className={styles.list}>
                  {service.entregaveis.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>O que está incluído</h2>
                <ul className={styles.list}>
                  {service.included.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>O que não está incluído</h2>
                <ul className={styles.list}>
                  {service.naoIncluido.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Como funciona</h2>
                <ol className={styles.steps}>
                  {service.processo.map((item) => (
                    <li key={item} className={styles.stepItem}>
                      {item}
                    </li>
                  ))}
                </ol>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Responsabilidades</h2>
                <div className={styles.twoCols}>
                  <div className={styles.col}>
                    <h3 className={styles.subTitle}>Da MultiAlmeida</h3>
                    <ul className={styles.list}>
                      {service.responsabilidadesEmpresa.map((item) => (
                        <li key={item} className={styles.listItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={styles.col}>
                    <h3 className={styles.subTitle}>Do Cliente</h3>
                    <ul className={styles.list}>
                      {service.responsabilidadesCliente.map((item) => (
                        <li key={item} className={styles.listItem}>
                          {item}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Detalhes técnicos</h2>
                <div className={styles.chips} aria-label="Tecnologias e tópicos">
                  {service.technologies.map((tech) => (
                    <span key={tech} className={styles.chip}>
                      {tech}
                    </span>
                  ))}
                </div>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Suporte e garantia</h2>
                <ul className={styles.list}>
                  {service.suporteEGarantia.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Garantia: condições e perda</h2>
                <div className={styles.note}>
                  <div className={styles.noteTitle}>Tempo de garantia</div>
                  <div className={styles.noteText}>{service.garantia?.prazo || "Conforme contrato"}</div>
                </div>

                <h3 className={styles.subTitle}>Você perde a garantia se</h3>
                <ul className={styles.list}>
                  {(service.garantia?.perdeSe || []).map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>

                <h3 className={styles.subTitle}>A garantia não cobre</h3>
                <ul className={styles.list}>
                  {(service.garantia?.naoCobre || []).map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Escopo e adicionais</h2>
                <p className={styles.paragraph}>
                  Se após a entrega surgir algo que ficou faltando porque não foi informado no briefing, ou se você quiser
                  adicionar novas funcionalidades/mudanças, isso entra como <strong>melhoria</strong> e é orçado à parte.
                  Assim a gente mantém o projeto organizado, com prazo e valor bem definidos.
                </p>
                <p className={styles.paragraph}>
                  Independente do prazo de garantia, caso seja identificado que um bug/erro foi causado por falha de
                  desenvolvimento da MultiAlmeida, a correção é por nossa conta, desde que o projeto não tenha sido mexido
                  por outro desenvolvedor/terceiro e não tenham sido feitas alterações nos arquivos do sistema (código,
                  servidor, banco de dados ou configurações) sem validação conosco.
                </p>
                <p className={styles.paragraph}>
                  Caso a garantia seja perdida (por alterações de terceiros, por exemplo), podemos retomar o suporte, mas
                  pode ser necessário um diagnóstico/ajuste inicial antes.
                </p>
              </article>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}

export default ServiceDetails;
