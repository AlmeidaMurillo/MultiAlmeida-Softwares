import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaTimes } from "react-icons/fa";
import styles from "./MobileSidebar.module.css";

function MobileSidebar({ isOpen, onClose, theme, toggleTheme, onOpenQuote }) {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isOpen]);

  const handleNavigate = (path) => {
    if (path === "/" && location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      onClose();
      return;
    }

    navigate(path);
    onClose();
  };

  const handleScrollTo = (sectionId) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      onClose();
      return;
    }

    navigate("/", { state: { scrollTo: sectionId } });
    onClose();
  };

  const handleGoToService = (serviceSlug) => {
    navigate("/servicos", { state: { scrollToService: serviceSlug } });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className={styles.mobileSidebarOverlay} onClick={onClose}>
      <div className={styles.mobileSidebar} onClick={(e) => e.stopPropagation()}>
        <div className={styles.mobileSidebarHeader}>
          <div className={styles.mobileLogoContainer}>
            <div className={styles.mobileLogo}>MultiAlmeida</div>
            <h2 className={styles.mobileSubtitle}>Softwares</h2>
          </div>
          <button className={styles.closeButton} onClick={onClose}>
            <FaTimes />
          </button>
        </div>

        <div className={styles.mobileSidebarContent}>
          <div className={styles.menuSection}>
            <span className={styles.menuSectionTitle}>Navegação</span>
            <button 
              className={styles.mobileSidebarItem} 
              onClick={() => handleNavigate("/")}
            >
              <span>🏠</span>
              <span>Início</span>
            </button>
            <button 
              className={styles.mobileSidebarItem} 
              onClick={() => handleScrollTo("about")}
            >
              <span>👥</span>
              <span>Sobre Nós</span>
            </button>
            <button 
              className={styles.mobileSidebarItem} 
              onClick={() => handleScrollTo("contact")}
            >
              <span>📧</span>
              <span>Contato</span>
            </button>
          </div>

          <div className={styles.menuSection}>
            <span className={styles.menuSectionTitle}>Serviços</span>
            <button className={styles.mobileSidebarItem} onClick={() => handleGoToService("sites-institucionais")}>
              <span>🌐</span>
              <span>Sites Institucionais</span>
            </button>
            <button className={styles.mobileSidebarItem} onClick={() => handleGoToService("sistemas-personalizados")}>
              <span>⚙️</span>
              <span>Sistemas Personalizados</span>
            </button>
            <button className={styles.mobileSidebarItem} onClick={() => handleGoToService("manutencao-suporte")}>
              <span>🔧</span>
              <span>Manutenção & Suporte</span>
            </button>
          </div>

          <div className={styles.menuSection}>
            <span className={styles.menuSectionTitle}>Configurações</span>
            <button 
              className={styles.mobileSidebarItem} 
              onClick={toggleTheme}
            >
              <span className={styles.itemIcon}>
                {theme === "dark" ? <FaSun /> : <FaMoon />}
              </span>
              <span>Tema {theme === "dark" ? "Claro" : "Escuro"}</span>
            </button>
          </div>
        </div>

        <div className={styles.mobileSidebarFooter}>
          <button 
            className={styles.mobileCtaButton} 
            onClick={() => { onOpenQuote && onOpenQuote(); onClose(); }}
          >
            📝 Solicitar Orçamento
          </button>
        </div>
      </div>
    </div>
  );
}

export default MobileSidebar;
