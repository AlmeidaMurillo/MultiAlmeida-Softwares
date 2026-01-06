import React from "react";
import { useNavigate } from "react-router-dom";
import { FaEnvelope, FaWhatsapp, FaMapMarkerAlt, FaLinkedin, FaInstagram } from "react-icons/fa";
import styles from "./Footer.module.css";

function Footer() {
  const currentYear = new Date().getFullYear();
  const navigate = useNavigate();

  const CONTACT_EMAIL = 'contato@multialmeida.com.br';
  const CONTACT_EMAIL_GMAIL_COMPOSE_URL = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(CONTACT_EMAIL)}`;

  const handleEmailClick = (event) => {
    const newTab = window.open(CONTACT_EMAIL_GMAIL_COMPOSE_URL, '_blank', 'noopener,noreferrer');
    if (!newTab) window.location.href = `mailto:${CONTACT_EMAIL}`;
    event.preventDefault();
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <div className={styles.footerSection}>
          <a className={styles.logoContainer}>
            <div className={styles.logo}>MultiAlmeida</div>
            <h2 className={styles.subtitle}>Softwares</h2>
          </a>
          <div className={styles.footerDescription}>
            <strong className={styles.companyName}>MultiAlmeida Tecnologia LTDA</strong>
            <p className={styles.descriptionText}>CNPJ: 00.000.000/0001-00</p>
            <p className={styles.descriptionText}>Soluções inteligentes em software para impulsionar seu negócio.</p>
            <p className={styles.descriptionText}>Desenvolvemos ferramentas que transformam ideias em realidade.</p>
          </div>
          <div className={styles.socialIcons}>
            <a href="https://linkedin.com/company/multialmeida" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="LinkedIn">
              <FaLinkedin />
            </a>
            <a href="https://instagram.com/multialmeida" target="_blank" rel="noopener noreferrer" className={styles.socialIcon} aria-label="Instagram">
              <FaInstagram />
            </a>
          </div>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Links Rápidos</h3>
          <ul className={styles.footerList}>
            <li>
              <button onClick={() => { window.scrollTo(0, 0); navigate('/'); }} className={styles.footerLink}>
                Início
              </button>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Contato</h3>
          <ul className={styles.contactList}>
            <li className={styles.contactItem}>
              <FaEnvelope className={styles.contactIcon} />
              <a 
                href={CONTACT_EMAIL_GMAIL_COMPOSE_URL}
                onClick={handleEmailClick}
                className={styles.contactLink}
              >
                {CONTACT_EMAIL}
              </a>
            </li>
            <li className={styles.contactItem}>
              <FaWhatsapp className={styles.contactIcon} />
              <a 
                href="https://wa.me/5511970543189"
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactLink}
              >
                (11) 97054-3189
              </a>
            </li>
            <li className={styles.contactItem}>
              <FaMapMarkerAlt className={styles.contactIcon} />
              <span className={styles.contactText}>
                Brasil • Atendimento Nacional
              </span>
            </li>
          </ul>
        </div>

        <div className={styles.footerSection}>
          <h3 className={styles.footerTitle}>Institucional</h3>
          <ul className={styles.footerList}>
            <li>
              <button onClick={() => { window.scrollTo(0, 0); navigate('/politica-privacidade'); }} className={styles.footerLink}>
                Política de Privacidade
              </button>
            </li>
            <li>
              <button onClick={() => { window.scrollTo(0, 0); navigate('/termos-uso'); }} className={styles.footerLink}>
                Termos de Uso
              </button>
            </li>
            <li>
              <button onClick={() => { window.scrollTo(0, 0); navigate('/suporte'); }} className={styles.footerLink}>
                Central de Ajuda
              </button>
            </li>
          </ul>
        </div>
      </div>

      <div className={styles.footerBottom}>
        <div className={styles.footerBottomContent}>
          <p className={styles.copyright}>
            <span className={styles.copyrightMain}>&copy; {currentYear} MultiAlmeida Softwares.</span>
            <span className={styles.copyrightSub}>Todos os direitos reservados.</span>
          </p>
          <p className={styles.developedBy}>
            Desenvolvido por{' '}
            <a 
              href="https://multi-almeida-softwares.vercel.app" 
              target="_blank" 
              rel="noopener noreferrer"
              className={styles.developedByLink}
            >
              <span className={styles.developedByLogo}>MultiAlmeida</span>
              <span className={styles.developedBySubtitle}>Softwares</span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
