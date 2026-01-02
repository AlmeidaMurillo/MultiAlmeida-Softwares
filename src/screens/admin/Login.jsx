import { useEffect, useMemo, useRef, useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/Header/Header';
import Footer from '../../components/Footer/Footer';
import styles from './Login.module.css';
import useSeo from '../../utils/useSeo';

function Login({ theme = 'light', toggleTheme = () => {} }) {
    useSeo({
        title: 'Login Administrativo | MultiAlmeida Softwares',
        description: 'Área administrativa da MultiAlmeida Softwares.',
        noindex: true,
    });

    const navigate = useNavigate();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [rememberMe, setRememberMe] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');

    const timeoutRef = useRef(null);

    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
                timeoutRef.current = null;
            }
        };
    }, []);

    const hasError = Boolean(error);
    const canSubmit = useMemo(() => {
        if (isLoading) return false;
        return username.trim().length > 0 && password.length > 0;
    }, [isLoading, username, password]);

    const clearErrorOnInput = () => {
        if (error) setError('');
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        clearErrorOnInput();

        const safeUsername = username.trim();
        if (!safeUsername || !password) {
            setError('Por favor, preencha usuário e senha.');
            return;
        }

        setIsLoading(true);

        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
            timeoutRef.current = null;
        }

        timeoutRef.current = setTimeout(() => {
            timeoutRef.current = null;
            console.log('Login:', { username: safeUsername, rememberMe });
            setIsLoading(false);
            navigate('/admin/dashboard');
        }, 900);
    };

    return (
        <div className={styles.loginPage}>
            <Header theme={theme} toggleTheme={toggleTheme} simplifiedMode={true} />

            <main className={styles.mainContent}>
                <section className={styles.hero} aria-label="Login Administrativo">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Acesse sua Conta</h1>
                        <p className={styles.heroSubtitle}>Entre para acessar o painel administrativo.</p>

                        <div className={styles.loginForm}>
                            <form className={styles.form} onSubmit={handleSubmit} noValidate>
                                <div className={styles.inputWrapper}>
                                    <FaUser className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        id="username"
                                        name="username"
                                        type="text"
                                        placeholder="Usuário"
                                        className={styles.input}
                                        value={username}
                                        onChange={(e) => {
                                            setUsername(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        autoComplete="username"
                                        inputMode="text"
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
                                        required
                                    />
                                </div>

                                <div className={styles.inputWrapper}>
                                    <FaLock className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        id="password"
                                        name="password"
                                        type={showPassword ? 'text' : 'password'}
                                        placeholder="Senha"
                                        className={styles.input}
                                        value={password}
                                        onChange={(e) => {
                                            setPassword(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        autoComplete="current-password"
                                        disabled={isLoading}
                                        aria-invalid={hasError ? 'true' : 'false'}
                                        required
                                    />

                                    <button
                                        type="button"
                                        className={styles.eyeIcon}
                                        onClick={() => setShowPassword((v) => !v)}
                                        aria-label={showPassword ? 'Ocultar senha' : 'Mostrar senha'}
                                        disabled={isLoading}
                                    >
                                        {showPassword ? <FaEyeSlash /> : <FaEye />}
                                    </button>
                                </div>

                                {hasError && <p className={styles.error} role="alert">{error}</p>}

                                <label className={styles.checkboxLabel}>
                                    <input
                                        type="checkbox"
                                        className={styles.checkbox}
                                        checked={rememberMe}
                                        onChange={(e) => setRememberMe(e.target.checked)}
                                        disabled={isLoading}
                                    />
                                    <span>Lembrar-me</span>
                                </label>

                                <button type="submit" className={styles.button} disabled={!canSubmit}>
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </form>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Login;