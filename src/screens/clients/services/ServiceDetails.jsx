import { useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import styles from "./ServiceDetails.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import useSeo from "../../../utils/useSeo";

const servicesCatalog = [
  {
    id: "sites-institucionais",
    slug: "sites-institucionais",
    title: "Sites Institucionais",
    tagline: "Aplicações modernas e responsivas",
    summary:
      "Sites modernos, rápidos e responsivos para apresentar sua empresa com clareza e gerar oportunidades.",
    businessModel: "Projeto sob orçamento (escopo e prazo definidos).",
    technologies: ["React", "Vite", "SEO", "Acessibilidade"],
    included: [
      "Design responsivo (mobile-first)",
      "Páginas institucionais (Home, Sobre, Contato, etc.)",
      "SEO básico (metatags, headings, performance)",
      "Formulário/CTA (WhatsApp, e-mail, links)",
      "Publicação e orientações de manutenção",
    ],
  },
  {
    id: "sistemas-personalizados",
    slug: "sistemas-personalizados",
    title: "Sistemas Personalizados",
    tagline: "Soluções sob medida",
    summary:
      "Sistemas sob medida para automatizar processos, reduzir retrabalho e dar visibilidade ao seu negócio.",
    businessModel: "Sob orçamento (projeto) ou recorrência (conforme escopo).",
    technologies: ["React", "Node.js", "MySQL"],
    included: [
      "Levantamento de requisitos e fluxo do sistema",
      "Painel administrativo (quando aplicável)",
      "Perfis de acesso e permissões",
      "Relatórios e dashboards (conforme escopo)",
      "Integrações com serviços externos",
    ],
  },
  {
    id: "manutencao-suporte",
    slug: "manutencao-suporte",
    title: "Manutenção & Suporte",
    tagline: "Estabilidade e evolução contínua",
    summary:
      "Correções, melhorias e evolução contínua para manter seu site/sistema rápido, seguro e atualizado.",
    businessModel: "Recorrência mensal (pacote) ou por demanda.",
    technologies: ["Monitoramento", "Correções", "Atualizações", "Boas práticas"],
    included: [
      "Correções de bugs e ajustes",
      "Atualizações de dependências",
      "Melhorias de performance",
      "Recomendações de segurança",
      "Suporte por demanda ou recorrente",
    ],
  },
];

function ServiceDetails() {
  const { slug } = useParams();
  const navigate = useNavigate();

  const service = useMemo(() => {
    const safeSlug = String(slug || "").trim();
    return servicesCatalog.find((s) => s.slug === safeSlug) || null;
  }, [slug]);

  useSeo({
    title: service
      ? `${service.title} | MultiAlmeida Softwares`
      : "Serviço não encontrado | MultiAlmeida Softwares",
    description:
      service?.summary ||
      "Detalhes do serviço. Verifique o link ou volte para a lista de serviços.",
  });

  if (!service) {
    return (
      <div className={styles.page}>
        <Header />
        <main className={styles.main}>
          <section className={styles.hero}>
            <div className={styles.container}>
              <span className={styles.badge}>Serviços</span>
              <h1 className={styles.title}>Serviço não encontrado</h1>
              <p className={styles.subtitle}>Verifique o link ou volte para a lista.</p>
              <div className={styles.actions}>
                <button
                  className={styles.secondaryBtn}
                  onClick={() => navigate("/servicos")}
                >
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
            <p className={styles.subtitle}>{service.tagline}</p>

            <div className={styles.actions}>
              <button
                className={styles.secondaryBtn}
                onClick={() => navigate("/servicos")}
              >
                Voltar
              </button>
              <button
                className={styles.primaryBtn}
                onClick={() => navigate("/", { state: { scrollTo: "contact" } })}
              >
                Solicitar orçamento
              </button>
            </div>
          </div>
        </section>

        <section className={styles.content}>
          <div className={styles.container}>
            <div className={styles.grid}>
              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Sobre</h2>
                <p className={styles.planParagraph}>{service.summary}</p>

                <div className={styles.subTitle}>Modelo de contratação</div>
                <p className={styles.planParagraph}>{service.businessModel}</p>
              </article>

              <article className={styles.card}>
                <h2 className={styles.cardTitle}>Detalhes</h2>

                <div className={styles.subTitle}>Tecnologias</div>
                <div className={styles.chips} aria-label={`Tecnologias em ${service.title}`}>
                  {service.technologies.map((t) => (
                    <span key={t} className={styles.chip}>
                      {t}
                    </span>
                  ))}
                </div>

                <div className={styles.subTitle}>O que está incluído</div>
                <ul className={styles.list}>
                  {service.included.map((item) => (
                    <li key={item} className={styles.listItem}>
                      {item}
                    </li>
                  ))}
                </ul>
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
