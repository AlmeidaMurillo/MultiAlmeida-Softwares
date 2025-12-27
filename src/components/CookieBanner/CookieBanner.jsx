import { useState } from 'react';
import styles from './CookieBanner.module.css';

function CookieBanner() {
    // Verifica se o usuário já aceitou os cookies
    const cookiesAccepted = localStorage.getItem('cookiesAccepted');
    const [showBanner, setShowBanner] = useState(!cookiesAccepted);

    const handleAccept = () => {
        localStorage.setItem('cookiesAccepted', 'true');
        setShowBanner(false);
    };

    const handleReject = () => {
        localStorage.setItem('cookiesAccepted', 'false');
        setShowBanner(false);
    };

    if (!showBanner) return null;

    return (
        <div className={styles.cookieBanner}>
            <div className={styles.content}>
                <div className={styles.text}>
                    <h3>🍪 Cookies e Privacidade</h3>
                    <p>
                        Usamos cookies para melhorar sua experiência, analisar o tráfego do site e personalizar conteúdo. 
                        Ao continuar navegando, você concorda com nossa{' '}
                        <a href="/politica-privacidade" target="_blank" rel="noopener noreferrer">
                            Política de Privacidade
                        </a>.
                    </p>
                </div>
                <div className={styles.buttons}>
                    <button 
                        className={styles.rejectBtn}
                        onClick={handleReject}
                    >
                        Recusar
                    </button>
                    <button 
                        className={styles.acceptBtn}
                        onClick={handleAccept}
                    >
                        Aceitar Todos
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieBanner;
