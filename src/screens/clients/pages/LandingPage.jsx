import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import headerStyles from '../../../components/Header/Header.module.css';
import { FaCloud, FaRocket, FaCogs, FaChartLine } from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import QuoteModal from '../../../components/QuoteModal/QuoteModal';
import useSeo from '../../../utils/useSeo';
import { FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const CONTACT_EMAIL = 'contato@multialmeida.com.br';
const CONTACT_EMAIL_GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;

import pdvImg from '../../../images/MultiAlmeidaPDV.png';

const SAAS_PRODUCTS = [
    {
        key: 'pdv e gestao',
        subtitle: 'ERP SaaS PDV',
        title: 'PDV & Gestão Inteligente',
        description: 'Automatize vendas, estoque e gestão em tempo real com o ERP PDV mais completo e fácil de usar. 100% online, seguro e escalável.',
        features: [
            'Indicadores em tempo real',
            'Vendas + estoque integrados',
            'NF-e, relatórios e usuários',
        ],
        url: import.meta.env.VITE_SAAS_GESTAO_URL || '',
        image: pdvImg,
    },
    {
        key: 'gestao',
        subtitle: 'Gestão Empresarial',
        title: 'Sistema de Gestão Empresarial',
        description: 'SaaS para gestão do negócio: cadastros, processos e visibilidade operacional.',
        features: ['Estrutura para múltiplos módulos', 'Perfis e permissões', 'Painel de indicadores'],
        url: import.meta.env.VITE_SAAS_GESTAO_URL || '',
        image: pdvImg,
    },
    {
        key: 'agenda',
        subtitle: 'Agendamentos',
        title: 'Sistema de Agendamentos',
        description: 'SaaS de agendamento para organizar horários, rotina e atendimento.',
        features: ['Agenda e disponibilidade', 'Cadastro de clientes', 'Rotinas de atendimento'],
        url: import.meta.env.VITE_SAAS_AGENDA_URL || '',
        image: pdvImg,
    },
];

const SERVICE_OPTIONS = [
    { key: 'sites-institucionais', label: 'Sites Institucionais (Projeto)', icon: '🌐' },
    { key: 'sistemas-personalizados', label: 'Sistemas (Sob Medida)', icon: '💻' },
    { key: 'manutencao-suporte', label: 'Manutenção & Suporte', icon: '🔧' },
];

const SERVICE_COPY = {
    'sites-institucionais': {
        title: 'Sites Institucionais',
        description: 'Sites modernos e responsivos para apresentar sua empresa com clareza e gerar oportunidades.',
        features: ['Design responsivo (mobile-first)', 'SEO básico', 'Alta performance'],
    },
    'sistemas-personalizados': {
        title: 'Sistemas Personalizados',
        description: 'Sistemas sob medida para automatizar processos, reduzir retrabalho e dar visibilidade ao seu negócio.',
        features: ['Painel administrativo (quando aplicável)', 'Perfis de acesso e permissões', 'Relatórios e dashboards'],
    },
    'manutencao-suporte': {
        title: 'Manutenção & Suporte',
        description: 'Correções, melhorias e acompanhamento para manter seu site/sistema estável, rápido e atualizado.',
        features: ['Correções e ajustes', 'Melhorias contínuas', 'Recomendações de segurança'],
    },
};

function LandingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);

    useSeo({
        title: 'MultiAlmeida Softwares | Desenvolvimento de Sites e Sistemas',
        description: 'Criamos sites modernos e sistemas sob medida com foco em performance, segurança e conversão.',
    });

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleOpenModal = () => setModalOpen(true);
    const handleCloseModal = () => setModalOpen(false);

    const goToSaas = (product) => {
        const url = String(product?.url || '').trim();
        if (url) {
            window.open(url, '_blank', 'noopener,noreferrer');
            return;
        }
        // Se não tiver URL, abre o modal de orçamento
        handleOpenModal();
    };

    useEffect(() => {
        const sectionId = location.state?.scrollTo;
        if (!sectionId) return;

        requestAnimationFrame(() => {
            document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
            navigate(location.pathname, { replace: true, state: null });
        });
    }, [location.pathname, location.state, navigate]);

    return (
        <div className={styles.landingContainer}>
            <Header onOpenQuote={handleOpenModal} />

            {/* Hero Section */}
            <section id="home" className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>
                            Transformamos suas <span className={styles.highlight}>ideias</span> em
                            <span className={styles.highlight}> soluções digitais</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Desenvolvimento de sites institucionais e sistemas personalizados
                            para impulsionar seu negócio com clareza e performance.
                        </p>
                        <div className={styles.heroButtons}>
                            <button onClick={handleOpenModal} className={styles.primaryBtn}>
                                Solicitar Orçamento
                            </button>
                            <button onClick={() => scrollToSection('saas')} className={styles.secondaryBtn}>
                                Ver SaaS
                            </button>
                            <button onClick={() => scrollToSection('services')} className={styles.secondaryBtn}>
                                Ver serviços
                            </button>
                        </div>
                    </div>
                    <div className={styles.heroImage}>
                        <div className={styles.floatingCard}>
                            <div className={styles.cardIcon}>💻</div>
                            <div>Sistemas Web</div>
                        </div>
                        <div className={styles.floatingCard}>
                            <div className={styles.cardIcon}>🎨</div>
                            <div>Design Moderno</div>
                        </div>
                        <div className={styles.floatingCard}>
                            <div className={styles.cardIcon}>⚡</div>
                            <div>Alta Performance</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Produtos SaaS Section */}
            <section id="saas" className={`${styles.services} ${styles.saasSection}`}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Produtos SaaS</h2>
                    <p className={styles.sectionSubtitle}>
                        Produtos SaaS da MultiAlmeida Softwares: soluções prontas desenvolvidas e mantidas pela nossa equipe
                    </p>
                    <div className={styles.saasGrid}>
                        {SAAS_PRODUCTS.map((p, idx) => {
                            const icons = [<FaCloud />, <FaRocket />, <FaCogs />, <FaChartLine />];
                            return (
                                <article key={p.key} className={styles.saasCard}>
                                    <div className={`${styles.saasCardLogoBox} ${headerStyles.logoContainer}`}>
                                        <span className={headerStyles.logo}>MultiAlmeida</span>
                                        <span className={headerStyles.subtitle}>{p.subtitle}</span>
                                    </div>
                                    <div className={styles.saasCardImageArea}>
                                        <img src={p.image} alt={p.title} className={styles.saasCardImage} />
                                        <span className={styles.saasCardIcon}>{icons[idx % icons.length]}</span>
                                    </div>
                                    <div className={styles.saasCardContent}>
                                        <h3 className={styles.saasCardTitle}>{p.title}</h3>
                                        <p className={styles.saasCardDesc}>{p.description}</p>
                                        <ul className={styles.saasCardFeatures}>
                                            {(p.features || []).map((f) => (
                                                <li key={f} className={styles.saasCardFeatureItem}>
                                                    <span className={styles.saasCardFeatureIcon}><FaRocket /></span>
                                                    {f}
                                                </li>
                                            ))}
                                        </ul>
                                        <div className={styles.saasCardActions}>
                                            <button
                                                className={`${styles.primaryBtn} ${styles.saasCardCtaPrimary}`}
                                                onClick={() => goToSaas(p)}
                                            >
                                                Acessar
                                            </button>
                                            <button
                                                className={`${styles.secondaryBtn} ${styles.saasCardCtaSecondary}`}
                                                onClick={handleOpenModal}
                                            >
                                                Fale conosco
                                            </button>
                                        </div>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Services / Produtos Section */}
            <section id="services" className={`${styles.services} ${styles.customServicesSection}`}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Serviços sob medida</h2>
                    <p className={styles.sectionSubtitle}>
                        Projetos personalizados: desenvolvimento sob demanda conforme seu objetivo
                    </p>

                    <div className={styles.planShowcaseGrid}>
                        {SERVICE_OPTIONS.map((o) => {
                            const copy = SERVICE_COPY[o.key];
                            return (
                                <article key={o.key} className={styles.planCard}>
                                    <div className={styles.planCardTop}>
                                        <div className={styles.planCardName}>{copy?.title || o.label}</div>
                                    </div>

                                    <div className={styles.planCardPrice}>
                                        <span className={styles.planCardPriceValue}>Sob consulta</span>
                                    </div>

                                    <ul className={styles.planCardHighlights}>
                                        {(copy?.features || []).map((f) => (
                                            <li key={f}>{f}</li>
                                        ))}
                                    </ul>

                                    <div className={styles.planCardActions}>
                                        <button className={`${styles.primaryBtn} ${styles.planCardPrimaryBtn}`} onClick={handleOpenModal}>
                                            Solicitar orçamento
                                        </button>
                                        <button
                                            className={styles.planCardSecondaryBtn}
                                            onClick={() => navigate(`/servicos/${o.key}`)}
                                        >
                                            Saiba mais
                                        </button>
                                    </div>
                                </article>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* About Section */}
            <section id="about" className={styles.about}>
                <div className={styles.sectionContainer}>
                    <div className={styles.aboutContent}>
                        <div className={styles.aboutText}>
                            <div className={styles.aboutKicker}>
                                Software sob medida • Processo claro • Entrega contínua
                            </div>
                            <h2 className={styles.aboutTitle}>
                                Sobre a <span className={styles.highlight}>MultiAlmeida</span> Softwares
                            </h2>
                            <p className={styles.aboutDescription}>
                                Na MultiAlmeida Softwares, você fala direto com quem constrói. A gente traduz suas necessidades em
                                soluções digitais que funcionam no dia a dia — com desempenho, segurança e experiência do usuário.
                            </p>
                            <p className={styles.aboutDescription}>
                                Antes de escrever código, alinhamos objetivos, escopo e prioridades. Assim, você sabe o que será
                                entregue, por quê, e qual o próximo passo — sem promessas vagas.
                            </p>
                            <p className={styles.aboutDescription}>
                                <strong>Nosso compromisso:</strong> comunicação clara, prazos realistas e entregas evolutivas —
                                com qualidade onde realmente importa.
                            </p>

                            <div className={styles.aboutActions}>
                                <button onClick={handleOpenModal} className={styles.primaryBtn}>
                                    Solicitar Orçamento
                                </button>
                            </div>
                        </div>
                        <div className={styles.aboutImage}>
                            <div className={styles.techStack}>
                                <h3 className={styles.techTitle}>Stack moderna, escolhida por projeto</h3>
                                <p className={styles.techDescription}>
                                    Usamos stacks modernas e estáveis — sem modismo. O foco é reduzir risco e acelerar entregas.
                                </p>
                                <div className={styles.techGrid}>
                                    <div className={styles.techItem}>React</div>
                                    <div className={styles.techItem}>Node.js</div>
                                    <div className={styles.techItem}>MySQL</div>
                                    <div className={styles.techItem}>JavaScript</div>
                                </div>
                                <p className={styles.techFootnote}>
                                    Já tem um sistema rodando? A gente audita, corrige e evolui com segurança.
                                </p>
                            </div>
                        </div>

                        <div className={styles.aboutStats}>
                            <div className={styles.stat}>
                                <div className={styles.statNumber}>📌</div>
                                <div className={styles.statText}>
                                    <div className={styles.statTitle}>Escopo bem definido</div>
                                    <div className={styles.statDescription}>
                                        Do objetivo ao backlog: o que entra, o que fica para depois e por quê.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.stat}>
                                <div className={styles.statNumber}>⚙️</div>
                                <div className={styles.statText}>
                                    <div className={styles.statTitle}>Entrega com método</div>
                                    <div className={styles.statDescription}>
                                        Entregas em etapas, validação rápida e evolução contínua.
                                    </div>
                                </div>
                            </div>
                            <div className={styles.stat}>
                                <div className={styles.statNumber}>🤝</div>
                                <div className={styles.statText}>
                                    <div className={styles.statTitle}>Suporte e evolução</div>
                                    <div className={styles.statDescription}>
                                        Ajustes, melhorias e acompanhamento pós-entrega.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* Modal de Orçamento */}
            <QuoteModal isOpen={modalOpen} onClose={handleCloseModal} />
        </div>
    );
}

export default LandingPage;