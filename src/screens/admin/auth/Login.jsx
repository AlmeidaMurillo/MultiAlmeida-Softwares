import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import styles from './Login.module.css';
import useSeo from '../../../utils/useSeo';
import { ADMIN_CREDENTIALS, isAdminAuthenticated, loginAdmin } from '../../../data/auth';

function Login() {
    const navigate = useNavigate();

    useSeo({
        title: 'Login Administrativo | MultiAlmeida Softwares',
        description: 'Área administrativa da MultiAlmeida Softwares.',
        noindex: true,
    });


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState('');


    const hasError = Boolean(error);
    const canSubmit = useMemo(() => {
        if (isLoading) return false;
        return email.trim().length > 0 && password.length > 0;
    }, [isLoading, email, password]);

    const clearErrorOnInput = () => {
        if (error) setError('');
    };

    useEffect(() => {
        if (isAdminAuthenticated()) {
            navigate('/admin/dashboard', { replace: true });
        }
    }, [navigate]);

    const handleDemoFill = () => {
        setEmail(ADMIN_CREDENTIALS.email);
        setPassword(ADMIN_CREDENTIALS.password);
        setError('');
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setIsLoading(true);

        const result = loginAdmin(email, password);

        window.setTimeout(() => {
            setIsLoading(false);

            if (!result.ok) {
                setError(result.message);
                return;
            }

            navigate('/admin/dashboard', { replace: true });
        }, 350);
    };

    return (
        <div className={styles.loginPage}>
            <Header simplifiedMode={true} />

            <main className={styles.mainContent}>
                <section className={styles.hero} aria-label="Login Administrativo">
                    <div className={styles.heroContent}>
                        <div className={styles.copy}>
                            <span className={styles.kicker}>Painel administrativo local</span>
                            <h1 className={styles.heroTitle}>MultiAlmeida Softwares</h1>
                            <p className={styles.heroSubtitle}>
                                Acesse o painel para acompanhar orçamentos, registrar respostas e organizar o funil comercial sem backend.
                            </p>
                        </div>

                        <div className={styles.loginForm}>
                            <div className={styles.formHeader}>
                                <h2 className={styles.formTitle}>Entrar no painel</h2>
                                <p className={styles.formText}>Sessão salva somente neste navegador.</p>
                            </div>

                            <form className={styles.form} onSubmit={handleSubmit}>
                                <div className={styles.inputWrapper}>
                                    <FaUser className={styles.inputIcon} aria-hidden="true" />
                                    <input
                                        id="username"
                                        name="username"
                                        type="email"
                                        placeholder="E-mail"
                                        className={styles.input}
                                        value={email}
                                        onChange={(e) => {
                                            setEmail(e.target.value);
                                            clearErrorOnInput();
                                        }}
                                        autoComplete="username"
                                        inputMode="email"
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

                                <button type="submit" className={styles.button} disabled={!canSubmit}>
                                    {isLoading ? 'Entrando...' : 'Entrar'}
                                </button>
                            </form>

                            <div className={styles.demoCard}>
                                <div>
                                    <strong>Acesso local</strong>
                                    <p>{ADMIN_CREDENTIALS.email} / {ADMIN_CREDENTIALS.password}</p>
                                </div>
                                <button type="button" className={styles.demoButton} onClick={handleDemoFill}>
                                    Preencher
                                </button>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Login;
