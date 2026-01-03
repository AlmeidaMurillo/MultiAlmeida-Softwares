import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './LegalPages.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import useSeo from '../../utils/useSeo';

function PrivacyPolicy() {
    useSeo({
        title: 'Política de Privacidade | MultiAlmeida Softwares',
        description: 'Leia a Política de Privacidade da MultiAlmeida Softwares e entenda como tratamos seus dados.',
    });

    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, []);

    return (
        <div className={styles.pageWrapper}>
            <Header 
                onMenuToggle={() => {}}
                menuOpen={false}
                onOpenQuote={() => navigate('/')}
            />
            <div className={styles.legalContainer}>
            <div className={styles.legalContent}>
                <button onClick={() => navigate(-1)} className={styles.backButton}>
                    ← Voltar
                </button>

                <h1 className={styles.title}>Política de Privacidade</h1>
                <p className={styles.lastUpdate}>Última atualização: 02 de janeiro de 2026</p>

                <section className={styles.section}>
                    <h2>1. Introdução</h2>
                    <p>
                        A MultiAlmeida Softwares ("nós", "nosso" ou "empresa") está comprometida em proteger 
                        sua privacidade. Esta Política de Privacidade explica como coletamos, usamos, 
                        divulgamos e protegemos suas informações quando você visita nosso site.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Informações que Coletamos</h2>
                    <h3>2.1 Informações Fornecidas por Você</h3>
                    <p>Podemos coletar informações que você nos fornece diretamente, incluindo:</p>
                    <ul>
                        <li>Nome e informações de contato (e-mail, telefone)</li>
                        <li>Informações fornecidas em formulários de orçamento</li>
                        <li>Mensagens enviadas através de nossos canais de comunicação</li>
                        <li>Informações profissionais relevantes ao projeto</li>
                    </ul>

                    <h3>2.2 Informações Coletadas Automaticamente</h3>
                    <p>Quando você acessa nosso site, podemos coletar automaticamente:</p>
                    <ul>
                        <li>Endereço IP e informações do dispositivo</li>
                        <li>Tipo de navegador e sistema operacional</li>
                        <li>Páginas visitadas e tempo de navegação</li>
                        <li>Dados de cookies e tecnologias similares</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>3. Como Usamos Suas Informações</h2>
                    <p>Utilizamos as informações coletadas para:</p>
                    <ul>
                        <li>Responder às suas solicitações de orçamento e dúvidas</li>
                        <li>Fornecer e melhorar nossos serviços</li>
                        <li>Enviar comunicações relacionadas aos nossos serviços</li>
                        <li>Analisar o uso do site e melhorar a experiência do usuário</li>
                        <li>Cumprir obrigações legais e regulatórias</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>4. Compartilhamento de Informações</h2>
                    <p>
                        Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros 
                        para fins de marketing. Podemos compartilhar informações apenas nas seguintes situações:
                    </p>
                    <ul>
                        <li>Com seu consentimento explícito</li>
                        <li>Para cumprir obrigações legais</li>
                        <li>Com prestadores de serviços que nos auxiliam (sob contrato de confidencialidade)</li>
                        <li>Para proteger nossos direitos e segurança</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>5. Cookies</h2>
                    <p>
                        Utilizamos cookies e tecnologias similares para melhorar sua experiência. 
                        Você pode controlar o uso de cookies através das configurações do seu navegador. 
                        Note que desabilitar cookies pode afetar a funcionalidade do site.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>6. Segurança dos Dados</h2>
                    <p>
                        Implementamos medidas técnicas e organizacionais apropriadas para proteger suas 
                        informações contra acesso não autorizado, alteração, divulgação ou destruição. 
                        No entanto, nenhum método de transmissão pela internet é 100% seguro.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>7. Seus Direitos</h2>
                    <p>Você tem o direito de:</p>
                    <ul>
                        <li>Acessar suas informações pessoais que mantemos</li>
                        <li>Solicitar correção de informações incorretas</li>
                        <li>Solicitar exclusão de suas informações</li>
                        <li>Retirar seu consentimento a qualquer momento</li>
                        <li>Opor-se ao processamento de suas informações</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>8. Retenção de Dados</h2>
                    <p>
                        Manteremos suas informações pessoais apenas pelo tempo necessário para cumprir 
                        os propósitos descritos nesta política, a menos que um período de retenção mais 
                        longo seja exigido por lei.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>9. Menores de Idade</h2>
                    <p>
                        Nossos serviços não são direcionados a menores de 18 anos. Não coletamos 
                        intencionalmente informações de menores de idade.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>10. Alterações nesta Política</h2>
                    <p>
                        Podemos atualizar esta Política de Privacidade periodicamente. Notificaremos 
                        sobre mudanças significativas através do site ou por e-mail.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>11. Contato</h2>
                    <p>
                        Para dúvidas sobre esta Política de Privacidade ou para exercer seus direitos, 
                        entre em contato conosco:
                    </p>
                    <ul>
                        <li><strong>Email:</strong> contato@multialmeida.com.br</li>
                        <li><strong>WhatsApp:</strong> (11) 97054-3189</li>
                    </ul>
                </section>
            </div>
            </div>
            <Footer />
        </div>
    );
}

export default PrivacyPolicy;