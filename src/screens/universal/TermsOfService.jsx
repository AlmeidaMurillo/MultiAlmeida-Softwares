import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import styles from './LegalPages.module.css';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import useSeo from '../../utils/useSeo';

function TermsOfService() {
    useSeo({
        title: 'Termos de Uso | MultiAlmeida Softwares',
        description: 'Leia os Termos de Uso da MultiAlmeida Softwares e entenda as condições de utilização do site e serviços.',
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

                <h1 className={styles.title}>Termos de Uso</h1>
                <p className={styles.lastUpdate}>Última atualização: 02 de janeiro de 2026</p>

                <section className={styles.section}>
                    <h2>1. Aceitação dos Termos</h2>
                    <p>
                        Ao acessar e usar o site da MultiAlmeida Softwares, você concorda em cumprir e estar 
                        vinculado a estes Termos de Uso. Se você não concordar com qualquer parte destes termos, 
                        não deverá usar nosso site ou serviços.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>2. Descrição dos Serviços</h2>
                    <p>
                        A MultiAlmeida Softwares oferece serviços de desenvolvimento de software, incluindo:
                    </p>
                    <ul>
                        <li>Desenvolvimento de sites institucionais</li>
                        <li>Criação de sistemas personalizados</li>
                    </ul>
                    <p>
                        Os detalhes (escopo, prazos, valores, forma de pagamento, garantias e responsabilidades) serão definidos em proposta/contrato específico para cada contratação.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>3. Uso do Site</h2>
                    <h3>3.1 Uso Permitido</h3>
                    <p>Você concorda em usar o site apenas para fins legais e de maneira que não:</p>
                    <ul>
                        <li>Viole direitos de terceiros</li>
                        <li>Seja fraudulenta ou enganosa</li>
                        <li>Prejudique o funcionamento do site</li>
                        <li>Transmita vírus ou códigos maliciosos</li>
                    </ul>

                    <h3>3.2 Proibições</h3>
                    <p>É expressamente proibido:</p>
                    <ul>
                        <li>Copiar ou reproduzir o conteúdo do site sem autorização</li>
                        <li>Fazer engenharia reversa de qualquer parte do site</li>
                        <li>Usar o site para spam ou comunicações não solicitadas</li>
                        <li>Tentar obter acesso não autorizado ao site</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>4. Propriedade Intelectual</h2>
                    <p>
                        Todo o conteúdo do site, incluindo textos, gráficos, logos, ícones e código, 
                        é propriedade da MultiAlmeida Softwares e está protegido por leis de direitos 
                        autorais e propriedade intelectual.
                    </p>
                    <p>
                        Para projetos customizados, a propriedade intelectual será definida em contrato 
                        específico com cada cliente.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>5. Orçamentos e Contratos</h2>
                    <p>
                        Solicitações de orçamento através do site não constituem um contrato vinculativo. 
                        Todos os projetos estarão sujeitos a:
                    </p>
                    <ul>
                        <li>Análise de viabilidade técnica</li>
                        <li>Acordo sobre escopo, prazo e valores</li>
                        <li>Assinatura de contrato formal</li>
                        <li>Pagamento conforme condições acordadas</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>6. Limitação de Responsabilidade</h2>
                    <p>
                        Na extensão máxima permitida pela lei, a MultiAlmeida Softwares não será 
                        responsável por:
                    </p>
                    <ul>
                        <li>Danos indiretos, incidentais ou consequenciais</li>
                        <li>Perda de dados ou lucros</li>
                        <li>Interrupções no serviço do site</li>
                        <li>Erros ou imprecisões no conteúdo do site</li>
                    </ul>
                    <p>
                        Para projetos contratados, as responsabilidades serão definidas no contrato específico.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>7. Links para Sites de Terceiros</h2>
                    <p>
                        Nosso site pode conter links para sites de terceiros. Não nos responsabilizamos 
                        pelo conteúdo ou práticas de privacidade desses sites.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>8. Garantias e Suporte</h2>
                    <p>
                        As condições de garantia e suporte para projetos desenvolvidos serão especificadas 
                        nos contratos individuais. Geralmente, oferecemos:
                    </p>
                    <ul>
                        <li>Período de garantia contra defeitos de desenvolvimento</li>
                        <li>Suporte técnico pós-entrega (conforme contrato)</li>
                        <li>Correção de bugs identificados no período de garantia</li>
                    </ul>
                </section>

                <section className={styles.section}>
                    <h2>9. Confidencialidade</h2>
                    <p>
                        Tratamos todas as informações de projetos com confidencialidade. Acordos de 
                        não divulgação (NDA) podem ser firmados quando necessário.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>10. Modificações dos Termos</h2>
                    <p>
                        Reservamo-nos o direito de modificar estes Termos de Uso a qualquer momento. 
                        Alterações significativas serão comunicadas através do site. O uso continuado 
                        após as alterações constitui aceitação dos novos termos.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>11. Rescisão</h2>
                    <p>
                        Podemos suspender ou encerrar seu acesso ao site imediatamente, sem aviso prévio, 
                        por qualquer violação destes Termos de Uso.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>12. Lei Aplicável</h2>
                    <p>
                        Estes Termos de Uso serão regidos e interpretados de acordo com as leis do Brasil. 
                        Qualquer disputa será submetida à jurisdição exclusiva dos tribunais brasileiros.
                    </p>
                </section>

                <section className={styles.section}>
                    <h2>13. Contato</h2>
                    <p>
                        Para dúvidas sobre estes Termos de Uso, entre em contato:
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

export default TermsOfService;
