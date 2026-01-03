import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <p className={styles.copyright}>
          &copy; {currentYear} <strong>MultiAlmeida Softwares</strong>
        </p>
        <div className={styles.footerLinks}>
          <button 
            onClick={() => navigate("/politica-privacidade")} 
            className={styles.footerLink}
          >
            Política de Privacidade
          </button>
          <span className={styles.separator}>•</span>
          <button 
            onClick={() => navigate("/termos-uso")} 
            className={styles.footerLink}
          >
            Termos de Uso
          </button>
          <span className={styles.separator}>•</span>
          <button 
            onClick={() => navigate("/contrato-assinatura")} 
            className={styles.footerLink}
          >
            Contrato de Assinatura
          </button>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
