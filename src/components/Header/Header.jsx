import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaMoon, FaSun, FaBars, FaTimes } from "react-icons/fa";
import styles from "./Header.module.css";
import MobileSidebar from "../Sidebar/MobileSidebar";

function Header({
  theme,
  toggleTheme,
  onOpenQuote,
  simplifiedMode = false,
  onMenuToggle,
  menuOpen = false,
  menuAriaControls,
}) {
  const navigate = useNavigate();
  const location = useLocation();
  const [servicesOpen, setServicesOpen] = useState(false);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  
  // Detecta se o dispositivo suporta hover (ex: mouse)
  const [isHoverCapable, setIsHoverCapable] = useState(true);

  useEffect(() => {
    // Só roda no navegador
    if (typeof window === "undefined" || typeof window.matchMedia !== "function") return;

    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    // Atualiza o estado quando houver mudança
    const updateHover = () => setIsHoverCapable(media.matches);

    updateHover(); // Checa inicialmente
    media.addEventListener("change", updateHover);
    return () => media.removeEventListener("change", updateHover);
  }, []);

  const goHomeOrScrollTop = () => {
    if (location.pathname === "/") {
      window.scrollTo({ top: 0, left: 0, behavior: "smooth" });
      return;
    }
    navigate("/");
  };

  const goToLandingSection = (sectionId) => {
    if (location.pathname === "/") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" });
      return;
    }

    navigate("/", { state: { scrollTo: sectionId } });
  };

  const goToServicesPage = (hash) => {
    setServicesOpen(false);
    if (hash) {
      navigate("/servicos", { state: { scrollToService: hash } });
      return;
    }
    navigate("/servicos");
  };

  const toggleMobileSidebar = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  // O controle de scroll e do body (modal-open) fica no componente MobileSidebar.

  return (
    <>
      <header
        className={`${styles.headerTop} ${
          simplifiedMode && onMenuToggle ? styles.headerAdmin : ""
        }`}
      >
        {simplifiedMode && onMenuToggle ? (
          <button
            className={`${styles.mobileMenuButton} ${
              menuOpen ? styles.menuOpen : ""
            } ${styles.menuButtonAlways} ${styles.menuButtonLeft}`}
            onClick={onMenuToggle}
            aria-label="Alternar menu"
            aria-expanded={menuOpen}
            aria-controls={menuAriaControls}
          >
            <FaBars />
          </button>
        ) : null}

        <div className={styles.logoContainer} onClick={goHomeOrScrollTop}>
          <div className={styles.logo}>MultiAlmeida</div>
          <h2 className={styles.subtitle}>Softwares</h2>
        </div>

        {/* Navigation Desktop */}
        {!simplifiedMode && (
          <nav className={styles.desktopNav}>
            <button onClick={goHomeOrScrollTop} className={styles.navLink}>
              Início
            </button>
            <div
              className={styles.navItem}
              onMouseEnter={isHoverCapable ? () => setServicesOpen(true) : undefined}
              onMouseLeave={isHoverCapable ? () => setServicesOpen(false) : undefined}
            >
              <button
                className={`${styles.navLink} ${servicesOpen ? styles.activeNav : ""}`}
                onClick={
                  isHoverCapable
                    ? () => {
                        setServicesOpen(false);
                        goToLandingSection("services");
                      }
                    : () => setServicesOpen((open) => !open)
                }
                aria-expanded={servicesOpen}
                aria-haspopup="menu"
              >
                Serviços <span className={styles.dropdownArrow}>▼</span>
              </button>
              {servicesOpen && (
                <div className={styles.dropdown}>
                  <button className={styles.dropdownLink} onClick={() => navigate("/servicos")}>
                    <span className={styles.dropdownIcon}>🌐</span>
                    <span className={styles.dropdownText}>Todos Os Serviços</span>
                    <span className={styles.dropdownCta} aria-hidden="true">
                      Saiba mais <span className={styles.dropdownCtaArrow}>→</span>
                    </span>
                  </button>
                  <button className={styles.dropdownLink} onClick={() => goToServicesPage("sites-institucionais")}>
                    <span className={styles.dropdownIcon}>🏢</span>
                    <span className={styles.dropdownText}>Sites Institucionais</span>
                    <span className={styles.dropdownCta} aria-hidden="true">
                      Saiba mais <span className={styles.dropdownCtaArrow}>→</span>
                    </span>
                  </button>
                  <button className={styles.dropdownLink} onClick={() => goToServicesPage("sistemas-personalizados")}>
                    <span className={styles.dropdownIcon}>⚙️</span>
                    <span className={styles.dropdownText}>Sistemas Personalizados</span>
                    <span className={styles.dropdownCta} aria-hidden="true">
                      Saiba mais <span className={styles.dropdownCtaArrow}>→</span>
                    </span>
                  </button>
                  <button className={styles.dropdownLink} onClick={() => goToServicesPage("ecommerce")}>
                    <span className={styles.dropdownIcon}>🛒</span>
                    <span className={styles.dropdownText}>E-commerce</span>
                    <span className={styles.dropdownCta} aria-hidden="true">
                      Saiba mais <span className={styles.dropdownCtaArrow}>→</span>
                    </span>
                  </button>
                  <button className={styles.dropdownLink} onClick={() => goToServicesPage("manutencao-suporte")}>
                    <span className={styles.dropdownIcon}>🔧</span>
                    <span className={styles.dropdownText}>Manutenção & Suporte</span>
                    <span className={styles.dropdownCta} aria-hidden="true">
                      Saiba mais <span className={styles.dropdownCtaArrow}>→</span>
                    </span>
                  </button>
                </div>
              )}
            </div>
            <button
              className={styles.navLink}
              onClick={() => goToLandingSection("portfolio")}
            >
              Portfólio
            </button>
            <button
              className={styles.navLink}
              onClick={() => goToLandingSection("about")}
            >
              Sobre Nós
            </button>
            <button
              className={styles.navLink}
              onClick={() => goToLandingSection("contact")}
            >
              Contato
            </button>
          </nav>
        )}

        <div
          className={`${styles.actionsContainer} ${
            simplifiedMode ? styles.actionsAlways : ""
          }`}
        >
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
            className={`${styles.mobileMenuButton} ${
              isMobileSidebarOpen ? styles.menuOpen : ""
            }`}
            onClick={toggleMobileSidebar}
          >
            {isMobileSidebarOpen ? <FaTimes /> : <FaBars />}
          </button>
        )}
      </header>

      {!simplifiedMode && (
        <MobileSidebar
          isOpen={isMobileSidebarOpen}
          onClose={closeMobileSidebar}
          theme={theme}
          toggleTheme={toggleTheme}
          onOpenQuote={onOpenQuote}
        />
      )}
    </>
  );
}

export default Header;