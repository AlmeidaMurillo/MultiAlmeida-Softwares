import { useEffect } from "react";
import styles from "./Spinner.module.css";

function Spinner({ loading }) {
    useEffect(() => {
        const savedTheme = localStorage.getItem("theme") || "dark";
        document.documentElement.setAttribute("data-theme", savedTheme);
    }, []);

    return (
        <div className={`${styles.spinnerOverlay} ${!loading ? styles.hidden : ""}`}>
            <div className={styles.spinnerContainer}>
                <div className={styles.logo}>MultiAlmeida</div>
                <h2 className={styles.subtitle}>Softwares</h2>
            </div>
        </div>
    );
}

export default Spinner;
