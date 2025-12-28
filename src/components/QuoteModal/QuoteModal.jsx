import { useState } from 'react';
import styles from './QuoteModal.module.css';

function QuoteModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState({
        nome: '',
        email: '',
        telefone: '',
        empresa: '',
        tipoServico: '',
        descricao: '',
        orcamento: '',
        prazo: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Aqui você pode adicionar a lógica para enviar o formulário
        console.log('Dados do formulário:', formData);
        alert('Solicitação enviada com sucesso! Entraremos em contato em breve.');
        onClose();
        // Limpar formulário
        setFormData({
            nome: '',
            email: '',
            telefone: '',
            empresa: '',
            tipoServico: '',
            descricao: '',
            orcamento: '',
            prazo: ''
        });
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                <div className={styles.modalHeader}>
                    <div className={styles.iconWrapper}>
                        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                            <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                            <line x1="12" y1="22.08" x2="12" y2="12"></line>
                        </svg>
                    </div>
                    <h2 className={styles.modalTitle}>Solicitar Orçamento</h2>
                    <p className={styles.modalSubtitle}>Preencha os dados abaixo e entraremos em contato em breve</p>
                </div>

                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formCol}>
                            <div className={styles.formGroup}>
                                <label htmlFor="nome" className={styles.formLabel}>
                                    <span className={styles.labelIcon}>👤</span>
                                    Nome Completo *
                                </label>
                                <input
                                    type="text"
                                    id="nome"
                                    name="nome"
                                    value={formData.nome}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                    placeholder="Digite seu nome"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="email" className={styles.formLabel}>
                                    <span className={styles.labelIcon}>📧</span>
                                    E-mail *
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                    placeholder="seu@email.com"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="telefone" className={styles.formLabel}>
                                    <span className={styles.labelIcon}>📱</span>
                                    WhatsApp *
                                </label>
                                <input
                                    type="tel"
                                    id="telefone"
                                    name="telefone"
                                    value={formData.telefone}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    required
                                    placeholder="(00) 00000-0000"
                                />
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="empresa" className={styles.formLabel}>
                                    <span className={styles.labelIcon}>🏢</span>
                                    Empresa
                                </label>
                                <input
                                    type="text"
                                    id="empresa"
                                    name="empresa"
                                    value={formData.empresa}
                                    onChange={handleInputChange}
                                    className={styles.formInput}
                                    placeholder="Opcional"
                                />
                            </div>
                        </div>

                        <div className={styles.formCol}>
                            <div className={styles.formGroup}>
                                <label htmlFor="tipoServico" className={styles.formLabel}>
                                    <span className={styles.labelIcon}>⚙️</span>
                                    Tipo de Serviço *
                                </label>
                                <select
                                    id="tipoServico"
                                    name="tipoServico"
                                    value={formData.tipoServico}
                                    onChange={handleInputChange}
                                    className={styles.formSelect}
                                    required
                                >
                                    <option value="">Selecione um serviço</option>
                                    <option value="site">🌐 Site Institucional</option>
                                    <option value="sistema">💻 Sistema Personalizado</option>
                                    <option value="ecommerce">🛒 E-commerce</option>
                                    <option value="manutencao">🔧 Manutenção & Suporte</option>
                                    <option value="outro">Outro</option>

                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="orcamento" className={styles.formLabel}>
                                    <span className={styles.labelIcon}>💰</span>
                                    Orçamento
                                </label>
                                <select
                                    id="orcamento"
                                    name="orcamento"
                                    value={formData.orcamento}
                                    onChange={handleInputChange}
                                    className={styles.formSelect}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="ate-5k">Até R$ 5k</option>
                                    <option value="5k-10k">R$ 5k - 10k</option>
                                    <option value="10k-20k">R$ 10k - 20k</option>
                                    <option value="20k-50k">R$ 20k - 50k</option>
                                    <option value="acima-50k">Acima de R$ 50k</option>
                                    <option value="a-definir">A definir</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="prazo" className={styles.formLabel}>
                                    <span className={styles.labelIcon}>⏱️</span>
                                    Prazo
                                </label>
                                <select
                                    id="prazo"
                                    name="prazo"
                                    value={formData.prazo}
                                    onChange={handleInputChange}
                                    className={styles.formSelect}
                                >
                                    <option value="">Selecione...</option>
                                    <option value="urgente">⚡ Urgente (Até 1 mês)</option>
                                    <option value="1-3meses">📅 1-3 meses</option>
                                    <option value="3-6meses">📆 3-6 meses</option>
                                    <option value="flexivel">🔄 Flexível</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formGroupFull}>
                        <label htmlFor="descricao" className={styles.formLabel}>
                            <span className={styles.labelIcon}>📝</span>
                            Descrição do Projeto *
                        </label>
                        <textarea
                            id="descricao"
                            name="descricao"
                            value={formData.descricao}
                            onChange={handleInputChange}
                            className={styles.formTextarea}
                            required
                            rows="6"
                            placeholder="Descreva detalhadamente seu projeto, objetivos e funcionalidades desejadas..."
                        ></textarea>
                    </div>

                    <div className={styles.formActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            <span>Enviar Solicitação</span>
                            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <line x1="22" y1="2" x2="11" y2="13"></line>
                                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                            </svg>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuoteModal;
