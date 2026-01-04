import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./Services.module.css";
import Header from "../../../components/Header/Header";
import Footer from "../../../components/Footer/Footer";
import QuoteModal from "../../../components/QuoteModal/QuoteModal";
import { FaRocket, FaShieldAlt, FaChartLine } from "react-icons/fa";
import useSeo from "../../../utils/useSeo";

const servicesCatalog = [
    {
        id: "sites-institucionais",
        slug: "sites-institucionais",
        title: "Sites Institucionais",
        tagline: "Aplicações modernas e responsivas",
        icon: "</>",
        summary:
            "Sites modernos, rápidos e responsivos para apresentar sua empresa com clareza e gerar oportunidades.",
        technologies: ["React", "Vite", "SEO", "Acessibilidade"],
        highlights: ["Desenvolvimento ágil", "Segurança avançada", "Performance otimizada"],
        included: [
            "Design responsivo (mobile-first)",
            "Páginas institucionais (Home, Sobre, Contato, etc.)",
            "SEO básico (metatags, headings, performance)",
            "Formulário de contato e integrações (se necessário)",
            "Publicação e orientações de manutenção",
        ],
    },
    {
        id: "sistemas-personalizados",
        slug: "sistemas-personalizados",
        title: "Sistemas Personalizados",
        tagline: "Soluções sob medida",
        icon: "≡",
        summary:
            "Sistemas sob medida para automatizar processos, reduzir retrabalho e dar visibilidade ao seu negócio.",
        technologies: ["React", "Node.js", "MySQL"],
        highlights: ["Eficiência operacional", "Controle total", "Workflow otimizado"],
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
        icon: "🛠",
        summary:
            "Correções, melhorias e evolução contínua para manter seu site/sistema rápido, seguro e atualizado.",
        technologies: ["Monitoramento", "Correções", "Atualizações", "Boas práticas"],
        highlights: ["Resposta rápida", "Qualidade contínua", "Risco reduzido"],
        included: [
            "Correções de bugs e ajustes",
            "Atualizações de dependências",
            "Melhorias de performance",
            "Recomendações de segurança",
            "Suporte por demanda ou recorrente",
        ],
    },
];

const servicesCatalogFiltered = servicesCatalog;

function getBusinessModelText(slug) {
    if (slug === 'sites-institucionais') return 'Venda (projeto fechado).';
    if (slug === 'manutencao-suporte') return 'Adicional mensal (manutenção e suporte).';
    return 'Sob orçamento (projeto).';
}

function Services() {
    const location = useLocation();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    useSeo({
        title: "Serviços | MultiAlmeida Softwares",
        description: "Conheça nossos serviços: sites institucionais, sistemas personalizados e manutenção/suporte.",
    });

    useEffect(() => {
        document.title = "Serviços | MultiAlmeida Softwares";
    }, []);

    const services = useMemo(() => servicesCatalogFiltered, []);

    useEffect(() => {
        const targetFromState = location.state?.scrollToService;
        const targetFromHash = location.hash?.replace("#", "").trim();
        const target = targetFromState || targetFromHash;
        if (!target) return;

        requestAnimationFrame(() => {
            document.getElementById(target)?.scrollIntoView({ behavior: "smooth", block: "start" });
            navigate(location.pathname, { replace: true, state: null });
        });
    }, [location.hash, location.pathname, location.state, navigate]);

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    return (
        <div className={styles.page}>
            <Header onOpenQuote={handleOpenModal} />

            <main className={styles.main}>
                <section className={styles.hero}>
                    <div className={styles.container}>
                        <div className={styles.badge}>⚙️ Nossos Serviços</div>
                        <h1 className={styles.title}>
                            Soluções Completas Em <span className={styles.titleAccent}>Software</span>
                        </h1>
                        <p className={styles.subtitle}>
                            Do planejamento ao lançamento, entregamos sites e sistemas com foco em performance, segurança e resultado.
                        </p>
                    </div>
                </section>

                <section className={styles.listSection}>
                    <div className={styles.container}>
                        <div className={styles.list}>
                            {services.map((service, index) => (
                                <section
                                    key={service.id}
                                    id={service.slug}
                                    className={`${styles.serviceBlock} ${index % 2 === 1 ? styles.reverse : ""}`}
                                >
                                    <header className={styles.rowHeader}>
                                        <h2 className={styles.rowTitle}>{service.title}</h2>
                                        <p className={styles.rowSubtitle}>{service.tagline}</p>
                                        <div className={styles.rowDivider} aria-hidden="true" />
                                    </header>

                                    <div className={styles.serviceRow}>
                                        <article className={styles.serviceCard}>
                                            <div className={styles.serviceHead}>
                                                <div className={styles.serviceIconBox} aria-hidden="true">
                                                    {service.icon}
                                                </div>
                                                <div className={styles.serviceHeadText}>
                                                    <div className={styles.serviceTitle}>{service.title}</div>
                                                    <div className={styles.serviceTagline}>{service.tagline}</div>
                                                </div>
                                            </div>
                                            <p className={styles.serviceSummary}>{service.summary}</p>

                                            <div className={styles.sectionLabel}>Modelo de contratação</div>
                                            <p className={styles.serviceSummary}>{getBusinessModelText(service.slug)}</p>

                                            <div className={styles.sectionLabel}>Tecnologias</div>
                                            <div className={styles.techWrap} aria-label={`Tecnologias em ${service.title}`}>
                                                {service.technologies.map((tech) => (
                                                    <span key={tech} className={styles.techChip}>
                                                        {tech}
                                                    </span>
                                                ))}
                                            </div>

                                            <div className={styles.featureRow} aria-hidden="true">
                                                <div className={styles.featureItem}>
                                                    <span className={styles.featureIconBox}>
                                                        <FaRocket />
                                                    </span>
                                                    <span className={styles.featureText}>
                                                        {service.highlights?.[0] || "Desenvolvimento ágil"}
                                                    </span>
                                                </div>
                                                <div className={styles.featureItem}>
                                                    <span className={styles.featureIconBox}>
                                                        <FaShieldAlt />
                                                    </span>
                                                    <span className={styles.featureText}>
                                                        {service.highlights?.[1] || "Segurança avançada"}
                                                    </span>
                                                </div>
                                                <div className={styles.featureItem}>
                                                    <span className={styles.featureIconBox}>
                                                        <FaChartLine />
                                                    </span>
                                                    <span className={styles.featureText}>
                                                        {service.highlights?.[2] || "Performance otimizada"}
                                                    </span>
                                                </div>
                                            </div>
                                        </article>

                                        <article className={styles.includedCard}>
                                            <h3 className={styles.includedTitle}>O que está incluído</h3>
                                            <p className={styles.includedSubtitle}>Entregamos uma solução completa e robusta</p>
                                            <ul className={styles.includedList}>
                                                {service.included.map((item) => (
                                                    <li key={item} className={styles.includedItem}>
                                                        {item}
                                                    </li>
                                                ))}
                                            </ul>
                                            <button
                                                className={styles.moreButton}
                                                onClick={() => navigate(`/servicos/${service.slug}`)}
                                            >
                                                <span className={styles.moreLabel}>Saiba Mais</span>
                                                <span className={styles.moreArrow} aria-hidden="true">
                                                    →
                                                </span>
                                            </button>
                                        </article>
                                    </div>
                                </section>
                            ))}
                        </div>
                    </div>
                </section>

                <section className={styles.ctaSection}>
                    <div className={styles.container}>
                        <h2 className={styles.ctaTitle}>
                            Pronto para tirar seu projeto do papel e virar <span className={styles.titleAccent}>realidade</span>?
                        </h2>
                        <p className={styles.ctaSubtitle}>
                            Fale com a gente e receba um plano claro de como vamos construir a melhor solução para o seu negócio.
                        </p>
                        <button className={styles.primaryBtn} onClick={handleOpenModal}>
                            Solicitar Orçamento
                        </button>
                    </div>
                </section>
            </main>

            <Footer />

            <QuoteModal isOpen={modalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default Services;
