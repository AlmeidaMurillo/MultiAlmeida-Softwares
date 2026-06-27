import { useState } from 'react';
import { Building2, Clock, FileText, Mail, Phone, Send, User, Wallet, Wrench, X } from 'lucide-react';
import styles from './QuoteModal.module.css';
import { createQuote } from '../../data/quoteStore';

const INITIAL_FORM = {
    nome: '',
    email: '',
    telefone: '',
    empresa: '',
    tipoServico: '',
    descricao: '',
    orcamento: '',
    prazo: ''
};

function QuoteModal({ isOpen, onClose }) {
    const [formData, setFormData] = useState(INITIAL_FORM);
    const [successMessage, setSuccessMessage] = useState('');

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setSuccessMessage('');
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        createQuote(formData);
        setSuccessMessage('Solicitação salva no painel local com sucesso.');
        setFormData(INITIAL_FORM);

        window.setTimeout(() => {
            setSuccessMessage('');
            onClose();
        }, 900);
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.closeButton} onClick={onClose} aria-label="Fechar">
                    <X size={24} aria-hidden="true" />
                </button>

                <div className={styles.modalHeader}>
                    <div className={styles.headerContent}>
                        <div className={styles.logoContainer}>
                            <div className={styles.logo}>MultiAlmeida</div>
                            <div className={styles.subtitle}>Softwares</div>
                        </div>
                        <div className={styles.titleSection}>
                            <div className={styles.iconBadge}>
                                <FileText size={20} aria-hidden="true" />
                            </div>
                            <div className={styles.titleWrapper}>
                                <h2 className={styles.modalTitle}>Solicitar Orçamento</h2>
                                <p className={styles.titleSubtext}>Preencha os dados do projeto para análise comercial</p>
                            </div>
                        </div>
                    </div>
                </div>

                <form className={styles.modalForm} onSubmit={handleSubmit}>
                    <div className={styles.formGrid}>
                        <div className={styles.formCol}>
                            <div className={styles.formGroup}>
                                <label htmlFor="nome" className={styles.formLabel}>
                                    <User size={16} aria-hidden="true" />
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
                                    <Mail size={16} aria-hidden="true" />
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
                                    <Phone size={16} aria-hidden="true" />
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
                                    <Building2 size={16} aria-hidden="true" />
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
                                    <Wrench size={16} aria-hidden="true" />
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
                                    <option value="site">Site Institucional</option>
                                    <option value="sistema">Sistema Personalizado</option>
                                    <option value="manutencao">Manutenção & Suporte</option>
                                </select>
                            </div>

                            <div className={styles.formGroup}>
                                <label htmlFor="orcamento" className={styles.formLabel}>
                                    <Wallet size={16} aria-hidden="true" />
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
                                    <Clock size={16} aria-hidden="true" />
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
                                    <option value="urgente">Urgente, até 1 mês</option>
                                    <option value="1-3meses">1 a 3 meses</option>
                                    <option value="3-6meses">3 a 6 meses</option>
                                    <option value="flexivel">Flexível</option>
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className={styles.formGroupFull}>
                        <label htmlFor="descricao" className={styles.formLabel}>
                            <FileText size={16} aria-hidden="true" />
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
                            placeholder="Descreva seu projeto, objetivos, funcionalidades desejadas e contexto do negócio..."
                        ></textarea>
                    </div>

                    {successMessage && (
                        <p className={styles.successMessage} role="status">{successMessage}</p>
                    )}

                    <div className={styles.formActions}>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancelar
                        </button>
                        <button type="submit" className={styles.submitButton}>
                            <span>Enviar Solicitação</span>
                            <Send size={20} aria-hidden="true" />
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default QuoteModal;
