import { useState, useEffect } from 'react';
import styles from './LandingPage.module.css';
import Header from '../../components/Header/Header';
import Sidebar from '../../components/Sidebar/Sidebar';
import Footer from '../../components/Footer/Footer';
import CookieBanner from '../../components/CookieBanner/CookieBanner';
import Modal from '../../components/Modal/Modal';
import QuoteForm from '../../components/QuoteForm/QuoteForm';

function LandingPage({ theme, toggleTheme }) {
    const [menuOpen, setMenuOpen] = useState(false);
    const [quoteModalOpen, setQuoteModalOpen] = useState(false);

    useEffect(() => {
        // Controla o scroll do body quando o sidebar está aberto
        if (menuOpen) {
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
        }

        return () => {
            document.body.classList.remove('sidebar-open');
        };
    }, [menuOpen]);

    const scrollToSection = (sectionId) => {
        document.getElementById(sectionId)?.scrollIntoView({ behavior: 'smooth' });
    };

    const handleMenuToggle = () => {
        setMenuOpen(!menuOpen);
    };

    const handleCloseSidebar = () => {
        setMenuOpen(false);
    };

    return (
        <div className={styles.landingContainer}>
            {/* Header */}
            <Header 
                theme={theme}
                toggleTheme={toggleTheme}
                onMenuToggle={handleMenuToggle}
                menuOpen={menuOpen}
                onNavigate={scrollToSection}
            />

            {/* Sidebar */}
            <Sidebar 
                isOpen={menuOpen}
                onClose={handleCloseSidebar}
                onNavigate={scrollToSection}
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
                            Desenvolvimento de sistemas personalizados, sites modernos e aplicações web 
                            que impulsionam seu negócio para o próximo nível.
                        </p>
                        <div className={styles.heroButtons}>
                            <button onClick={() => setQuoteModalOpen(true)} className={styles.primaryBtn}>
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
                        <div className={styles.serviceCard}>
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
                        </div>

                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>⚙️</div>
                            <h3 className={styles.serviceTitle}>Sistemas Personalizados</h3>
                            <p className={styles.serviceDescription}>
                                Desenvolvimento de sistemas sob medida para otimizar os processos 
                                do seu negócio.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Automação de processos</li>
                                <li>Gestão empresarial</li>
                                <li>Integração de APIs</li>
                            </ul>
                        </div>

                        <div className={styles.serviceCard}>
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
                        </div>

                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>📱</div>
                            <h3 className={styles.serviceTitle}>Aplicações Web</h3>
                            <p className={styles.serviceDescription}>
                                Aplicações web progressivas (PWA) que funcionam como apps nativos 
                                em qualquer dispositivo.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Multiplataforma</li>
                                <li>Offline-first</li>
                                <li>Notificações push</li>
                            </ul>
                        </div>

                        <div className={styles.serviceCard}>
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
                        </div>

                        <div className={styles.serviceCard}>
                            <div className={styles.serviceIcon}>🚀</div>
                            <h3 className={styles.serviceTitle}>Consultoria Tech</h3>
                            <p className={styles.serviceDescription}>
                                Consultoria especializada para ajudar seu negócio a tomar as 
                                melhores decisões tecnológicas.
                            </p>
                            <ul className={styles.serviceFeatures}>
                                <li>Arquitetura de software</li>
                                <li>Escalabilidade</li>
                                <li>Otimização de custos</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </section>

            {/* Portfolio Section */}
            <section id="portfolio" className={styles.portfolio}>
                <div className={styles.sectionContainer}>
                    <h2 className={styles.sectionTitle}>Projetos em Destaque</h2>
                    <p className={styles.sectionSubtitle}>
                        Alguns dos trabalhos que já desenvolvemos
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
                            <h2 className={styles.sectionTitle}>Sobre a MultiAlmeida</h2>
                            <p className={styles.aboutDescription}>
                                Somos uma software house especializada em criar soluções digitais 
                                inovadoras e personalizadas. Com foco em qualidade, performance e 
                                experiência do usuário, transformamos ideias em produtos digitais 
                                que geram resultados reais.
                            </p>
                            <p className={styles.aboutDescription}>
                                Nossa missão é democratizar o acesso à tecnologia de ponta, oferecendo 
                                soluções de alta qualidade com preços justos e prazos realistas.
                            </p>
                            <div className={styles.aboutStats}>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>50+</div>
                                    <div className={styles.statLabel}>Projetos Entregues</div>
                                </div>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>100%</div>
                                    <div className={styles.statLabel}>Clientes Satisfeitos</div>
                                </div>
                                <div className={styles.stat}>
                                    <div className={styles.statNumber}>3+</div>
                                    <div className={styles.statLabel}>Anos de Experiência</div>
                                </div>
                            </div>
                        </div>
                        <div className={styles.aboutImage}>
                            <div className={styles.techStack}>
                                <h3>Tecnologias que dominamos</h3>
                                <div className={styles.techGrid}>
                                    <div className={styles.techItem}>React.js</div>
                                    <div className={styles.techItem}>Node.js</div>
                                    <div className={styles.techItem}>JavaScript</div>
                                    <div className={styles.techItem}>MySQL</div>
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
                        <form className={styles.contactForm}>
                            <input 
                                type="text" 
                                placeholder="Seu nome" 
                                className={styles.formInput}
                            />
                            <input 
                                type="email" 
                                placeholder="Seu email" 
                                className={styles.formInput}
                            />
                            <input 
                                type="tel" 
                                placeholder="Seu telefone" 
                                className={styles.formInput}
                            />
                            <textarea 
                                placeholder="Conte-nos sobre seu projeto" 
                                className={styles.formTextarea}
                                rows="5"
                            ></textarea>
                            <button type="submit" className={styles.formButton}>
                                Enviar Mensagem
                            </button>
                        </form>
                    </div>
                </div>
            </section>

            {/* Footer */}
            <Footer />

            {/* Cookie Banner */}
            <CookieBanner />

            {/* Quote Modal */}
            <Modal isOpen={quoteModalOpen} onClose={() => setQuoteModalOpen(false)}>
                <QuoteForm onClose={() => setQuoteModalOpen(false)} />
            </Modal>
        </div>
    );
}

export default LandingPage;