import { useEffect } from 'react';
import styles from './Spinner.module.css';

function Spinner({ loading }){
    useEffect(() => {
        const theme = localStorage.getItem('theme') || 'dark';
        document.documentElement.setAttribute('data-theme', theme);
    }, []);

    return (
        <div className={`${styles.spinnerOverlay} ${!loading ? styles.hidden : ''}`}>
            <div className={styles.spinnerContainer}>
                <div className={styles.spinnerCircle}></div>
                <div className={styles.spinnerCircle}></div>
                <div className={styles.spinnerCircle}></div>
                <div className={styles.spinnerCircle}></div>
            </div>
        </div>
    );
}

export default Spinner;
