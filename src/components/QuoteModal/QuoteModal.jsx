import { useState } from 'react';
import styles from './QuoteModal.module.css';

const STORAGE_KEY = "ma_quotes_v1";

function safeJsonParse(value, fallback) {
    try {
        return JSON.parse(value);
    } catch {
        return fallback;
    }
}

function newId() {
    if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
        return crypto.randomUUID();
    }
    return `${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function loadAll() {
    const raw = localStorage.getItem(STORAGE_KEY);
    const data = safeJsonParse(raw, null);
    if (!data || typeof data !== "object" || !Array.isArray(data.items)) {
        return { version: 1, items: [] };
    }
    return data;
}

function saveAll(data) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
}

function createQuote(payload) {
    const data = loadAll();

    const quote = {
        id: newId(),
        createdAt: new Date().toISOString(),
        status: "novo",
        nome: payload.nome || "",
        email: payload.email || "",
        telefone: payload.telefone || "",
        empresa: payload.empresa || "",
        tipoServico: payload.tipoServico || "",
        descricao: payload.descricao || "",
        orcamento: payload.orcamento || "",
        prazo: payload.prazo || "",
        responses: [],
    };

    data.items.unshift(quote);
    saveAll(data);
    return quote;
}

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
        createQuote(formData);
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
                    <div className={styles.headerContent}>
                        <div className={styles.logoContainer}>
                            <div className={styles.logo}>MultiAlmeida</div>
                            <div className={styles.subtitle}>Softwares</div>
                        </div>
                        <div className={styles.titleSection}>
                            <div className={styles.iconBadge}>
                                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                                    <polyline points="14 2 14 8 20 8"></polyline>
                                    <line x1="16" y1="13" x2="8" y2="13"></line>
                                    <line x1="16" y1="17" x2="8" y2="17"></line>
                                    <polyline points="10 9 9 9 8 9"></polyline>
                                </svg>
                            </div>
                            <div className={styles.titleWrapper}>
                                <h2 className={styles.modalTitle}>Solicitar Orçamento</h2>
                                <p className={styles.titleSubtext}>Preencha o formulário e entraremos em contato</p>
                            </div>
                        </div>
                    </div>
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
