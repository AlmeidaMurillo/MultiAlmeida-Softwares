import { useState } from 'react';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Login.module.css';

function Login({ theme, toggleTheme }) {
    const [formData, setFormData] = useState({
        username: '',
        password: ''
    });
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
        // Limpar erro ao digitar
        if (error) setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Validação básica
        if (!formData.username || !formData.password) {
            setError('Por favor, preencha todos os campos');
            return;
        }

        setIsLoading(true);

        // Simular chamada de API
        setTimeout(() => {
            // Aqui você implementará a lógica de autenticação real
            console.log('Login:', formData);
            setIsLoading(false);
            // setError('Credenciais inválidas'); // Exemplo de erro
        }, 1500);
    };

    return (
        <div className={styles.loginPage}>
            <Header 
                theme={theme} 
                toggleTheme={toggleTheme}
                simplifiedMode={true}
            />
            <div className={styles.loginContainer}>
                <div className={styles.loginCard}>
                    <div className={styles.loginHeader}>
                        <div className={styles.logoContainer}>
                            <div className={styles.logoIcon}>
                                <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
                                    <rect width="48" height="48" rx="12" fill="url(#gradient)" />
                                    <path d="M24 14L32 28H16L24 14Z" fill="white" fillOpacity="0.9" />
                                    <circle cx="24" cy="34" r="3" fill="white" fillOpacity="0.9" />
                                    <defs>
                                        <linearGradient id="gradient" x1="0" y1="0" x2="48" y2="48">
                                            <stop offset="0%" stopColor="#667eea" />
                                            <stop offset="100%" stopColor="#764ba2" />
                                        </linearGradient>
                                    </defs>
                                </svg>
                            </div>
                        </div>
                        <h1 className={styles.loginTitle}>Bem-vindo de volta!</h1>
                        <p className={styles.loginSubtitle}>Entre com suas credenciais para acessar o painel administrativo</p>
                    </div>

                    <form onSubmit={handleSubmit} className={styles.loginForm}>
                        {error && (
                            <div className={styles.errorMessage}>
                                <svg className={styles.errorIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 0C4.48 0 0 4.48 0 10C0 15.52 4.48 20 10 20C15.52 20 20 15.52 20 10C20 4.48 15.52 0 10 0ZM11 15H9V13H11V15ZM11 11H9V5H11V11Z" fill="#EF4444"/>
                                </svg>
                                <span>{error}</span>
                            </div>
                        )}

                        <div className={styles.inputGroup}>
                            <label htmlFor="username" className={styles.label}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M8 8C10.21 8 12 6.21 12 4C12 1.79 10.21 0 8 0C5.79 0 4 1.79 4 4C4 6.21 5.79 8 8 8ZM8 10C5.33 10 0 11.34 0 14V16H16V14C16 11.34 10.67 10 8 10Z" fill="currentColor"/>
                                </svg>
                                Usuário
                            </label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10ZM10 12.5C6.66 12.5 0 14.175 0 17.5V20H20V17.5C20 14.175 13.34 12.5 10 12.5Z" fill="#9CA3AF"/>
                                </svg>
                                <input
                                    type="text"
                                    id="username"
                                    name="username"
                                    value={formData.username}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Digite seu nome de usuário"
                                    autoComplete="username"
                                    disabled={isLoading}
                                />
                            </div>
                        </div>

                        <div className={styles.inputGroup}>
                            <label htmlFor="password" className={styles.label}>
                                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                                    <path d="M12.667 7.333H12V5.333C12 3.127 10.207 1.333 8 1.333C5.793 1.333 4 3.127 4 5.333V7.333H3.333C2.593 7.333 2 7.927 2 8.667V13.333C2 14.073 2.593 14.667 3.333 14.667H12.667C13.407 14.667 14 14.073 14 13.333V8.667C14 7.927 13.407 7.333 12.667 7.333ZM8 11.333C7.26 11.333 6.667 10.74 6.667 10C6.667 9.26 7.26 8.667 8 8.667C8.74 8.667 9.333 9.26 9.333 10C9.333 10.74 8.74 11.333 8 11.333ZM10.333 7.333H5.667V5.333C5.667 4.047 6.713 3 8 3C9.287 3 10.333 4.047 10.333 5.333V7.333Z" fill="currentColor"/>
                                </svg>
                                Senha
                            </label>
                            <div className={styles.inputWrapper}>
                                <svg className={styles.inputIcon} width="20" height="20" viewBox="0 0 20 20" fill="none">
                                    <path d="M15.833 9.167H15V6.667C15 3.905 12.762 1.667 10 1.667C7.238 1.667 5 3.905 5 6.667V9.167H4.167C3.247 9.167 2.5 9.913 2.5 10.833V16.667C2.5 17.587 3.247 18.333 4.167 18.333H15.833C16.753 18.333 17.5 17.587 17.5 16.667V10.833C17.5 9.913 16.753 9.167 15.833 9.167ZM10 14.167C9.08 14.167 8.333 13.42 8.333 12.5C8.333 11.58 9.08 10.833 10 10.833C10.92 10.833 11.667 11.58 11.667 12.5C11.667 13.42 10.92 14.167 10 14.167ZM12.917 9.167H7.083V6.667C7.083 5.055 8.388 3.75 10 3.75C11.612 3.75 12.917 5.055 12.917 6.667V9.167Z" fill="#9CA3AF"/>
                                </svg>
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    id="password"
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={styles.input}
                                    placeholder="Digite sua senha"
                                    autoComplete="current-password"
                                    disabled={isLoading}
                                />
                                <button
                                    type="button"
                                    className={styles.togglePassword}
                                    onClick={() => setShowPassword(!showPassword)}
                                    aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                    disabled={isLoading}
                                >
                                    {showPassword ? (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 4C5.83 4 2.27 6.61 1 10.5C2.27 14.39 5.83 17 10 17C14.17 17 17.73 14.39 19 10.5C17.73 6.61 14.17 4 10 4ZM10 15C7.65 15 5.75 13.1 5.75 10.75C5.75 8.4 7.65 6.5 10 6.5C12.35 6.5 14.25 8.4 14.25 10.75C14.25 13.1 12.35 15 10 15ZM10 8C8.34 8 7 9.34 7 11C7 12.66 8.34 14 10 14C11.66 14 13 12.66 13 11C13 9.34 11.66 8 10 8Z" fill="currentColor"/>
                                        </svg>
                                    ) : (
                                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                            <path d="M10 6.5C12.35 6.5 14.25 8.4 14.25 10.75C14.25 11.42 14.09 12.05 13.82 12.61L16.44 15.23C17.63 14.15 18.58 12.77 19 10.5C17.73 6.61 14.17 4 10 4C8.94 4 7.93 4.19 7 4.53L9.17 6.7C9.73 6.43 10.36 6.27 11.03 6.27L10 6.5ZM1 2.77L3.28 5.05C1.91 6.16 0.84 7.63 1 10.5C2.27 14.39 5.83 17 10 17C11.2 17 12.36 16.76 13.43 16.34L16.23 19.14L17.64 17.73L2.41 2.5L1 2.77ZM6.53 8.3L8.08 9.85C8.03 10.06 8 10.28 8 10.5C8 11.88 9.12 13 10.5 13C10.72 13 10.94 12.97 11.15 12.92L12.7 14.47C11.87 14.8 10.96 15 10 15C7.65 15 5.75 13.1 5.75 10.75C5.75 9.79 6.2 8.88 6.53 8.3Z" fill="currentColor"/>
                                        </svg>
                                    )}
                                </button>
                            </div>
                        </div>

                        <div className={styles.formOptions}>
                            <label className={styles.checkboxLabel}>
                                <input
                                    type="checkbox"
                                    className={styles.checkbox}
                                    disabled={isLoading}
                                />
                                <span>Lembrar-me</span>
                            </label>
                        </div>

                        <button
                            type="submit"
                            className={styles.submitButton}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <>
                                    <span className={styles.spinner}></span>
                                    Entrando...
                                </>
                            ) : (
                                <>
                                    <span>Entrar</span>
                                    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                                        <path d="M10 0L8.59 1.41L15.17 8H0V10H15.17L8.59 16.59L10 18L20 8L10 0Z" fill="white"/>
                                    </svg>
                                </>
                            )}
                        </button>
                    </form>

                    <div className={styles.loginFooter}>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}


export default Login;