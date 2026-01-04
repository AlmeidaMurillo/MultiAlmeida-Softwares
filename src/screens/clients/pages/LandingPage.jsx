import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import QuoteModal from '../../../components/QuoteModal/QuoteModal';
import useSeo from '../../../utils/useSeo';
import headerStyles from '../../../components/Header/Header.module.css';
import { FaEnvelope, FaMapMarkerAlt, FaWhatsapp } from 'react-icons/fa';

const CONTACT_EMAIL = 'contato@multialmeida.com.br';
const CONTACT_EMAIL_GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;

const SAAS_PRODUCTS = [
    {
        key: 'gestao',
        subtitle: 'Gestão Empresarial',
        title: 'Sistema de Gestão Empresarial',
        description: 'SaaS para gestão do negócio: cadastros, processos e visibilidade operacional.',
        features: ['Estrutura para múltiplos módulos', 'Perfis e permissões', 'Painel de indicadores'],
        url: import.meta.env.VITE_SAAS_GESTAO_URL || '',
    },
    {
        key: 'commerce',
        subtitle: 'E-Commerce',
        title: 'Plataforma de E-commerce',
        description: 'SaaS para vender online com operação organizada e base pronta para evolução.',
        features: ['Catálogo e variações', 'Fluxos de pedidos', 'Base para integrações'],
        url: import.meta.env.VITE_SAAS_COMMERCE_URL || '',
    },
    {
        key: 'agenda',
        subtitle: 'Agendamentos',
        title: 'Sistema de Agendamentos',
        description: 'SaaS de agendamento para organizar horários, rotina e atendimento.',
        features: ['Agenda e disponibilidade', 'Cadastro de clientes', 'Rotinas de atendimento'],
        url: import.meta.env.VITE_SAAS_AGENDA_URL || '',
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
        scrollToSection('contact');
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

                    <div className={styles.planShowcaseGrid}>
                        {SAAS_PRODUCTS.map((p) => (
                            <article key={p.key} className={styles.planCard}>
                                <div className={styles.planCardTop}>
                                    <div className={headerStyles.logoContainer}>
                                        <div className={headerStyles.logo}>MultiAlmeida</div>
                                        <h2 className={headerStyles.subtitle}>{p.subtitle}</h2>
                                    </div>
                                    <div className={styles.planCardBadge}>SaaS</div>
                                </div>

                                <div className={styles.planCardPrice}>
                                    <span className={styles.planCardPriceValue}>{p.title}</span>
                                </div>

                                <ul className={styles.planCardHighlights}>
                                    {(p.features || []).map((f) => (
                                        <li key={f}>{f}</li>
                                    ))}
                                </ul>

                                <div className={styles.planCardActions}>
                                    <button
                                        className={styles.planCardPrimaryBtn}
                                        onClick={() => goToSaas(p)}
                                    >
                                        Acessar
                                    </button>
                                    <button
                                        className={styles.planCardSecondaryBtn}
                                        onClick={handleOpenModal}
                                    >
                                        Falar com a gente
                                    </button>
                                </div>
                            </article>
                        ))}
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
                                        <button className={styles.planCardPrimaryBtn} onClick={handleOpenModal}>
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
                                <button onClick={() => scrollToSection('contact')} className={styles.secondaryBtn}>
                                    Falar com a gente
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

            {/* Contact Section */}
            <section id="contact" className={styles.contact}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Entre em Contato</h2>
                    <p className={styles.sectionSubtitle}>
                        Vamos conversar sobre seu projeto e como podemos ajudar
                    </p>
                    <div className={styles.contactContent}>
                        <div className={styles.contactInfo}>
                            <div
                                className={`${styles.contactItem} ${styles.contactItemWithSend}`}
                                role="link"
                                tabIndex={0}
                                onClick={() => {
                                    const newTab = window.open(CONTACT_EMAIL_GMAIL_COMPOSE_URL, '_blank', 'noopener,noreferrer');
                                    if (!newTab) window.location.href = `mailto:${CONTACT_EMAIL}`;
                                }}
                                onKeyDown={(event) => {
                                    if (event.key === 'Enter' || event.key === ' ') {
                                        event.preventDefault();
                                        const newTab = window.open(CONTACT_EMAIL_GMAIL_COMPOSE_URL, '_blank', 'noopener,noreferrer');
                                        if (!newTab) window.location.href = `mailto:${CONTACT_EMAIL}`;
                                    }
                                }}
                            >
                                <div className={styles.contactIcon} aria-hidden="true">
                                    <FaEnvelope />
                                </div>
                                <div>
                                    <h3>Email</h3>
                                    <p>{CONTACT_EMAIL}</p>
                                </div>
                                <a
                                    className={styles.contactSend}
                                    href={CONTACT_EMAIL_GMAIL_COMPOSE_URL}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label={`Enviar e-mail para ${CONTACT_EMAIL}`}
                                    onClick={(event) => event.stopPropagation()}
                                >
                                    Enviar
                                </a>
                            </div>

                            <div className={`${styles.contactItem} ${styles.contactItemWithSend}`}>
                                <div className={styles.contactIcon} aria-hidden="true">
                                    <FaWhatsapp />
                                </div>
                                <div>
                                    <h3>WhatsApp</h3>
                                    <p style={{ marginBottom: '8px', fontWeight: '500' }}>Atendimento rápido e direto com desenvolvedor responsável.</p>
                                    <p>(11) 97054-3189</p>
                                </div>
                                <a
                                    className={styles.contactSend}
                                    href="https://wa.me/5511970543189"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    aria-label="Enviar mensagem no WhatsApp"
                                >
                                    Enviar
                                </a>
                            </div>

                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon} aria-hidden="true">
                                    <FaMapMarkerAlt />
                                </div>
                                <div>
                                    <h3>Localização</h3>
                                    <p>Brasil - Atendimento Nacional</p>
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