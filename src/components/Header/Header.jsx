import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";

function Header({ theme, toggleTheme, onOpenQuote, simplifiedMode = false }) {
  const navigate = useNavigate();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  useEffect(() => {
    if (isMobileSidebarOpen) {
      document.body.classList.add("modal-open");
    } else {
      document.body.classList.remove("modal-open");
    }

    return () => {
      document.body.classList.remove("modal-open");
    };
  }, [isMobileSidebarOpen]);

  const handleScrollTo = (sectionId) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
    closeMobileSidebar();
  };

  return (
    <>
      <header className={styles.headerTop}>
        <div className={styles.logoContainer} onClick={() => navigate("/")}>
          <div className={styles.logo}>MultiAlmeida</div>
          <h2 className={styles.subtitle}>Softwares</h2>
        </div>

        {/* Navigation Desktop */}
        {!simplifiedMode && (
          <nav className={styles.desktopNav}>
            <button onClick={() => navigate("/")} className={styles.navLink}>
              Início
            </button>
            <div
              className={styles.navItem}
              onMouseEnter={() => setServicesOpen(true)}
              onMouseLeave={() => setServicesOpen(false)}
            >
              <button className={`${styles.navLink} ${servicesOpen ? styles.activeNav : ''}`}>
                Serviços <span className={styles.dropdownArrow}>▼</span>
              </button>
              {servicesOpen && (
                <div className={styles.dropdown}>
                  <button className={styles.dropdownLink}>
                    <span className={styles.dropdownIcon}>🌐</span>
                    <span>Sites Institucionais</span>
                  </button>
                  <button className={styles.dropdownLink}>
                    <span className={styles.dropdownIcon}>⚙️</span>
                    <span>Sistemas Personalizados</span>
                  </button>
                  <button className={styles.dropdownLink}>
                    <span className={styles.dropdownIcon}>🛒</span>
                    <span>E-commerce</span>
                  </button>
                  <button className={styles.dropdownLink}>
                    <span className={styles.dropdownIcon}>🔧</span>
                    <span>Manutenção & Suporte</span>
                  </button>
                </div>
              )}
            </div>
            <button className={styles.navLink}>
              Portfólio
            </button>
            <button className={styles.navLink}>
              Sobre Nós
            </button>
            <button className={styles.navLink}>
              Contato
            </button>
          </nav>
        )}

        <div className={styles.actionsContainer}>
          <button
            className={styles.iconButton}
            onClick={toggleTheme}
            title={theme === "dark" ? "Modo Claro" : "Modo Escuro"}
            aria-label="Alternar tema"
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </button>

          {!simplifiedMode && (
            <button className={styles.ctaButton} onClick={onOpenQuote}>
              Solicitar Orçamento
            </button>
          )}
        </div>

        {!simplifiedMode && (
          <button 
            className={`${styles.mobileMenuButton} ${isMobileSidebarOpen ? styles.menuOpen : ''}`} 
            onClick={toggleMobileSidebar}
          >
            {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </header>

      {!simplifiedMode && isMobileSidebarOpen && (
        <div className={styles.mobileSidebarOverlay} onClick={closeMobileSidebar}>
          <div className={styles.mobileSidebar} onClick={(e) => e.stopPropagation()}>
            <div className={styles.mobileSidebarHeader}>
              <h3>Menu</h3>
              <button className={styles.closeButton} onClick={closeMobileSidebar}>
                <FaTimes />
              </button>
            </div>

            <div className={styles.mobileSidebarContent}>
              <div className={styles.menuSection}>
                <span className={styles.menuSectionTitle}>Navegação</span>

                <button
                  className={styles.mobileSidebarItem}
                  onClick={() => {
                    navigate("/");
                    closeMobileSidebar();
                  }}
                >
                  <span>🏠</span>
                  <span>Início</span>
                </button>

                <button className={styles.mobileSidebarItem} onClick={() => handleScrollTo("services")}>
                  <span>🧩</span>
                  <span>Serviços</span>
                </button>

                <button className={styles.mobileSidebarItem} onClick={() => handleScrollTo("portfolio")}>
                  <span>💼</span>
                  <span>Portfólio</span>
                </button>

                <button className={styles.mobileSidebarItem} onClick={() => handleScrollTo("about")}>
                  <span>👥</span>
                  <span>Sobre Nós</span>
                </button>

                <button className={styles.mobileSidebarItem} onClick={() => handleScrollTo("contact")}>
                  <span>📧</span>
                  <span>Contato</span>
                </button>
              </div>

              <div className={styles.menuSection}>
                <span className={styles.menuSectionTitle}>Configurações</span>

                <button
                  className={styles.mobileSidebarItem}
                  onClick={() => {
                    toggleTheme();
                    closeMobileSidebar();
                  }}
                >
                  {theme === "dark" ? <FaSun /> : <FaMoon />}
                  <span>Tema {theme === "dark" ? "Claro" : "Escuro"}</span>
                </button>

                <button
                  className={styles.mobileSidebarItem}
                  onClick={() => {
                    onOpenQuote?.();
                    closeMobileSidebar();
                  }}
                >
                  <span>📝</span>
                  <span>Solicitar Orçamento</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default Header;