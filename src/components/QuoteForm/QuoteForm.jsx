import { useState } from 'react';
import styles from './QuoteForm.module.css';

function QuoteForm({ onClose }) {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        projectType: '',
        description: '',
        budget: '',
        deadline: ''
    });

    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            const response = await fetch('http://localhost:5001/api/quotes', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) throw new Error('Erro ao enviar solicitação');

            setSuccess(true);
            setTimeout(() => {
                onClose();
            }, 3000);

        } catch (err) {
            setError('Erro ao enviar. Tente novamente ou entre em contato por email.');
            console.error('Erro:', err);
        } finally {
            setLoading(false);
        }
    };

    if (success) {
        return (
            <div className={styles.successMessage}>
                <div className={styles.successIcon}>✓</div>
                <h2>Solicitação Enviada!</h2>
                <p>Entraremos em contato em até 24 horas.</p>
            </div>
        );
    }

    return (
        <form className={styles.quoteForm} onSubmit={handleSubmit}>
            <h2>Solicitar Orçamento</h2>
            <p className={styles.subtitle}>Preencha os dados e entraremos em contato</p>

            <div className={styles.formGrid}>
                <div className={styles.formGroup}>
                    <label htmlFor="name">Nome Completo *</label>
                    <input
                        type="text"
                        id="name"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        placeholder="Seu nome"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="email">Email *</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        placeholder="seu@email.com"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="phone">Telefone *</label>
                    <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        placeholder="(00) 00000-0000"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="company">Empresa</label>
                    <input
                        type="text"
                        id="company"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                        placeholder="Nome da empresa (opcional)"
                    />
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="projectType">Tipo de Projeto *</label>
                    <select
                        id="projectType"
                        name="projectType"
                        value={formData.projectType}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="website">Website Institucional</option>
                        <option value="ecommerce">E-commerce</option>
                        <option value="webapp">Aplicação Web</option>
                        <option value="mobile">App Mobile</option>
                        <option value="system">Sistema Personalizado</option>
                        <option value="api">API/Integração</option>
                        <option value="other">Outro</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="budget">Orçamento Estimado *</label>
                    <select
                        id="budget"
                        name="budget"
                        value={formData.budget}
                        onChange={handleChange}
                        required
                    >
                        <option value="">Selecione...</option>
                        <option value="5k-10k">R$ 5.000 - R$ 10.000</option>
                        <option value="10k-25k">R$ 10.000 - R$ 25.000</option>
                        <option value="25k-50k">R$ 25.000 - R$ 50.000</option>
                        <option value="50k+">Acima de R$ 50.000</option>
                        <option value="unsure">Não tenho certeza</option>
                    </select>
                </div>

                <div className={styles.formGroup}>
                    <label htmlFor="deadline">Prazo Desejado</label>
                    <select
                        id="deadline"
                        name="deadline"
                        value={formData.deadline}
                        onChange={handleChange}
                    >
                        <option value="">Selecione...</option>
                        <option value="urgent">Urgente (1-2 meses)</option>
                        <option value="normal">Normal (3-4 meses)</option>
                        <option value="flexible">Flexível (5+ meses)</option>
                    </select>
                </div>

                <div className={`${styles.formGroup} ${styles.fullWidth}`}>
                    <label htmlFor="description">Descrição do Projeto *</label>
                    <textarea
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        required
                        rows="5"
                        placeholder="Descreva seu projeto, funcionalidades desejadas, público-alvo, etc."
                    />
                </div>
            </div>

            {error && <div className={styles.errorMessage}>{error}</div>}

            <div className={styles.formActions}>
                <button 
                    type="button" 
                    className={styles.cancelBtn}
                    onClick={onClose}
                    disabled={loading}
                >
                    Cancelar
                </button>
                <button 
                    type="submit" 
                    className={styles.submitBtn}
                    disabled={loading}
                >
                    {loading ? 'Enviando...' : 'Enviar Solicitação'}
                </button>
            </div>
        </form>
    );
}

export default QuoteForm;
