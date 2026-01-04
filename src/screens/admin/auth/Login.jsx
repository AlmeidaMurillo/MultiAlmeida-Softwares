import { useMemo, useState } from 'react';
import { FaUser, FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import Header from '../../../components/Header/Header';
import Footer from '../../../components/Footer/Footer';
import styles from './Login.module.css';
import useSeo from '../../../utils/useSeo';

function Login() {
    useSeo({
        title: 'Login Administrativo | MultiAlmeida Softwares',
        description: 'Área administrativa da MultiAlmeida Softwares.',
        noindex: true,
    });


    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading] = useState(false);
    const [error, setError] = useState('');


    const hasError = Boolean(error);
    const canSubmit = useMemo(() => {
        if (isLoading) return false;
        return email.trim().length > 0 && password.length > 0;
    }, [isLoading, email, password]);

    const clearErrorOnInput = () => {
        if (error) setError('');
    };

    return (
        <div className={styles.loginPage}>
            <Header simplifiedMode={true} />

            <main className={styles.mainContent}>
                <section className={styles.hero} aria-label="Login Administrativo">
                    <div className={styles.heroContent}>
                        <h1 className={styles.heroTitle}>Acesse sua Conta</h1>
                        <p className={styles.heroSubtitle}>Entre para acessar o painel administrativo.</p>

                        <div className={styles.loginForm}>
                            <form className={styles.form}>
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
                        </div>
                    </div>
                </section>
            </main>

            <Footer />
        </div>
    );
}

export default Login;