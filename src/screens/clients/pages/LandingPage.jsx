import { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import styles from './LandingPage.module.css';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import QuoteModal from '../../../components/QuoteModal/QuoteModal';
import useSeo from '../../../utils/useSeo';

const API_BASE = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

function formatBRLFromCents(cents) {
    if (cents == null) return null;
    const value = Number(cents) / 100;
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function LandingPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const [modalOpen, setModalOpen] = useState(false);
    const [plans, setPlans] = useState([]);

    useSeo({
        title: 'MultiAlmeida Softwares | Desenvolvimento de Sites e Sistemas',
        description: 'Criamos sites modernos, sistemas sob medida e e-commerce com foco em performance, segurança e conversão.',
    });

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const goToService = (serviceSlug) => {
        navigate('/servicos', { state: { scrollToService: serviceSlug } });
    };

    useEffect(() => {
        let cancelled = false;

        async function loadPlans() {
            try {
                const res = await fetch(`${API_BASE}/api/plans?active=true`);
                const data = await res.json();
                if (!res.ok) return;
                if (!cancelled) setPlans(Array.isArray(data) ? data : []);
            } catch {
                // Se o backend estiver desligado, apenas não mostra preços dinâmicos
            }
        }

        loadPlans();
        return () => {
            cancelled = true;
        };
    }, []);

    const groupedPlans = useMemo(() => {
        const by = {
            rental: [],
            sale: [],
            addon: [],
        };

        for (const p of plans) {
            if (p.model === 'rental') by.rental.push(p);
            if (p.model === 'sale') by.sale.push(p);
            if (p.model === 'addon') by.addon.push(p);
        }

        return by;
    }, [plans]);

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
            {/* Header */}
            <Header 
                onOpenQuote={handleOpenModal}
            />

            {/* Hero Section */}
            <section id="home" className={styles.hero}>
                <div className={styles.heroContent}>
                    <div className={styles.heroText}>
                        <h1 className={styles.heroTitle}>
                            Transformamos suas <span className={styles.highlight}>ideias</span> em 
                            <span className={styles.highlight}> soluções digitais</span>
                        </h1>
                        <p className={styles.heroSubtitle}>
                            Desenvolvimento de sistemas personalizados e sites modernos  
                            que impulsionam seu negócio para o próximo nível.
                        </p>
                        <div className={styles.heroButtons}>
                            <button onClick={handleOpenModal} className={styles.primaryBtn}>
                                Solicitar Orçamento
                            </button>
                            <button onClick={() => scrollToSection('services')} className={styles.secondaryBtn}>
                                Conheça nossos serviços
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

            {/* Services Section */}
            <section id="services" className={styles.services}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Nossos Serviços</h2>
                    <p className={styles.sectionSubtitle}>
                        Soluções completas para transformar sua presença digital
                    </p>
                    <div className={styles.servicesGrid}>
                        <div
                            className={styles.serviceCard}
                            onClick={() => goToService('sites-institucionais')}
                        >
                            <div className={styles.serviceIcon}>🌐</div>
                            <h3 className={styles.serviceTitle}>Sites Institucionais</h3>
                            <p className={styles.serviceDescription}>
                                Sites modernos e responsivos que representam sua marca com profissionalismo 
                                e atraem mais clientes.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Design responsivo</li>
                                <li>SEO otimizado</li>
                                <li>Carregamento rápido</li>
                            </ul>
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => { e.stopPropagation(); goToService('sites-institucionais'); }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>

                        <div
                            className={styles.serviceCard}
                            onClick={() => goToService('sistemas-personalizados')}
                        >
                            <div className={styles.serviceIcon}>⚙️</div>
                            <h3 className={styles.serviceTitle}>Sistemas Personalizados</h3>
                            <p className={styles.serviceDescription}>
                                Desenvolvimento de sistemas sob medida para otimizar os processos 
                                do seu negócio.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Automação de processos</li>
                                <li>Controle total do negócio</li>
                                <li>Integração com sistemas e plataformas externas</li>
                            </ul>
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => { e.stopPropagation(); goToService('sistemas-personalizados'); }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>

                        <div
                            className={styles.serviceCard}
                            onClick={() => goToService('ecommerce')}
                        >
                            <div className={styles.serviceIcon}>🛒</div>
                            <h3 className={styles.serviceTitle}>E-commerce</h3>
                            <p className={styles.serviceDescription}>
                                Lojas virtuais completas com sistema de pagamento integrado e 
                                gestão de produtos.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Carrinho de compras</li>
                                <li>Pagamento integrado</li>
                                <li>Painel administrativo</li>
                            </ul>
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => { e.stopPropagation(); goToService('ecommerce'); }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>

                        <div
                            className={styles.serviceCard}
                            onClick={() => goToService('sistema-agendamento')}
                        >
                            <div className={styles.serviceIcon}>📅</div>
                            <h3 className={styles.serviceTitle}>Sistema de Agendamento</h3>
                            <p className={styles.serviceDescription}>
                                Sistema para agenda online, controle de horários e gestão de clientes para otimizar o atendimento.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Agenda e disponibilidade</li>
                                <li>Painel administrativo</li>
                                <li>Relatórios básicos</li>
                            </ul>
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => { e.stopPropagation(); goToService('sistema-agendamento'); }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>

                        <div
                            className={styles.serviceCard}
                            onClick={() => goToService('sistema-delivery')}
                        >
                            <div className={styles.serviceIcon}>🛵</div>
                            <h3 className={styles.serviceTitle}>Sistema Delivery</h3>
                            <p className={styles.serviceDescription}>
                                Sistema de pedidos online com gestão de cardápio e fluxo de pedidos para delivery, com operação mais rápida.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Pedidos online</li>
                                <li>Gestão de cardápio</li>
                                <li>Status e acompanhamento</li>
                            </ul>
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => { e.stopPropagation(); goToService('sistema-delivery'); }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>

                        <div
                            className={styles.serviceCard}
                            onClick={() => goToService('manutencao-suporte')}
                        >
                            <div className={styles.serviceIcon}>🔧</div>
                            <h3 className={styles.serviceTitle}>Manutenção & Suporte</h3>
                            <p className={styles.serviceDescription}>
                                Suporte técnico contínuo e manutenção para manter seus sistemas 
                                sempre atualizados.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Suporte 24/7</li>
                                <li>Atualizações regulares</li>
                                <li>Backup automático</li>
                            </ul>
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => { e.stopPropagation(); goToService('manutencao-suporte'); }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing / Plans */}
            <section id="plans" className={styles.services}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Planos e Preços</h2>
                    <p className={styles.sectionSubtitle}>
                        Aqui fica bem claro: <strong>sistemas são alugados por assinatura</strong> e <strong>sites institucionais são vendidos por projeto</strong>.
                    </p>

                    <div className={styles.servicesGrid}>
                        <div className={styles.serviceCard} onClick={() => goToService('ecommerce')}>
                            <div className={styles.serviceIcon}>🟦</div>
                            <h3 className={styles.serviceTitle}>Sistemas por assinatura (Aluguel)</h3>
                            <p className={styles.serviceDescription}>
                                E-commerce e sistemas com login, dados e rotina: você paga mensalmente e recebe suporte e atualizações.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>E-commerce</li>
                                <li>Sistemas Personalizados</li>
                                <li>Sistemas Agendamentos</li>
                                <li>Sistemas Delivery</li>
                            </ul>
                            {groupedPlans.rental.length > 0 && (
                                <ul className={styles.serviceFeatures}>
                                    {groupedPlans.rental.slice(0, 3).map((p) => (
                                        <li key={p.id}>
                                            {p.name}
                                            {p.price_monthly_cents != null ? ` — ${formatBRLFromCents(p.price_monthly_cents)}/mês` : ''}
                                            {p.price_setup_cents != null && p.price_setup_cents > 0
                                                ? ` + setup ${formatBRLFromCents(p.price_setup_cents)}`
                                                : ''}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToService('sistemas-personalizados');
                                }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>

                        <div className={styles.serviceCard} onClick={() => goToService('sites-institucionais')}>
                            <div className={styles.serviceIcon}>🟨</div>
                            <h3 className={styles.serviceTitle}>Sites institucionais (Venda)</h3>
                            <p className={styles.serviceDescription}>
                                Site é produto: projeto fechado com escopo definido. Manutenção é opcional.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Site institucional</li>
                                <li>Landing page</li>
                                <li>Site vitrine</li>
                            </ul>
                            {groupedPlans.sale.length > 0 && (
                                <ul className={styles.serviceFeatures}>
                                    {groupedPlans.sale.slice(0, 2).map((p) => (
                                        <li key={p.id}>
                                            {p.name}
                                            {p.price_one_time_cents != null ? ` — ${formatBRLFromCents(p.price_one_time_cents)}` : ''}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToService('sites-institucionais');
                                }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>

                        <div className={styles.serviceCard} onClick={() => goToService('manutencao-suporte')}>
                            <div className={styles.serviceIcon}>🔧</div>
                            <h3 className={styles.serviceTitle}>Suporte & Manutenção</h3>
                            <p className={styles.serviceDescription}>
                                Pode ser contratado à parte para sites vendidos e para sistemas (quando aplicável), com valor mensal.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Correções e pequenas melhorias</li>
                                <li>Atualizações e estabilidade</li>
                                <li>Atendimento contínuo</li>
                            </ul>
                            {groupedPlans.addon.length > 0 && (
                                <ul className={styles.serviceFeatures}>
                                    {groupedPlans.addon.slice(0, 2).map((p) => (
                                        <li key={p.id}>
                                            {p.name}
                                            {p.price_monthly_cents != null ? ` — ${formatBRLFromCents(p.price_monthly_cents)}/mês` : ''}
                                        </li>
                                    ))}
                                </ul>
                            )}
                            <button
                                className={styles.serviceMore}
                                onClick={(e) => {
                                    e.stopPropagation();
                                    goToService('manutencao-suporte');
                                }}
                            >
                                Saiba mais <span className={styles.serviceMoreArrow}>→</span>
                            </button>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className={styles.portfolio}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Tipos de Projetos que Desenvolvemos</h2>
                    <p className={styles.sectionSubtitle}>
                        Exemplos de soluções que podemos criar para seu negócio
                    </p>
                    <div className={styles.portfolioGrid}>
                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <div className={styles.portfolioPlaceholder}>🏢</div>
                            </div>
                            <div className={styles.portfolioInfo}>
                                <h3>Sistema de Gestão Empresarial</h3>
                                <p>Plataforma completa para gerenciamento de vendas, estoque e finanças</p>
                                <div className={styles.portfolioTags}>
                                    <span>React.js</span>
                                    <span>Node.js</span>
                                    <span>MySQL</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <div className={styles.portfolioPlaceholder}>🛍️</div>
                            </div>
                            <div className={styles.portfolioInfo}>
                                <h3>E-commerce de Moda</h3>
                                <p>Loja virtual com mais de 1000 produtos e sistema de gestão integrado</p>
                                <div className={styles.portfolioTags}>
                                    <span>React.js</span>
                                    <span>Node.js</span>
                                    <span>MySQL</span>
                                </div>
                            </div>
                        </div>

                        <div className={styles.portfolioItem}>
                            <div className={styles.portfolioImage}>
                                <div className={styles.portfolioPlaceholder}>📊</div>
                            </div>
                            <div className={styles.portfolioInfo}>
                                <h3>Dashboard Analytics</h3>
                                <p>Plataforma de análise de dados com visualizações interativas em tempo real</p>
                                <div className={styles.portfolioTags}>
                                    <span>React.js</span>
                                    <span>Node.js</span>
                                    <span>JavaScript</span>
                                </div>
                            </div>
                        </div>
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
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>📧</div>
                                <div>
                                    <h3>Email</h3>
                                    <p>contato@multialmeida.com.br</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>📱</div>
                                <div>
                                    <h3>WhatsApp</h3>
                                    <p style={{ marginBottom: '8px', fontWeight: '500' }}>Atendimento rápido e direto com desenvolvedor responsável.</p>
                                    <p>(11) 97054-3189</p>
                                </div>
                            </div>
                            <div className={styles.contactItem}>
                                <div className={styles.contactIcon}>📍</div>
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