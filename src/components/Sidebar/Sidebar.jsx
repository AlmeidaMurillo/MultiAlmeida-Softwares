import React, { useState, useEffect, useRef, memo, useCallback } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { FaHome, FaInbox, FaClock, FaCheckCircle, FaTimesCircle, FaFileContract, FaTags } from "react-icons/fa";
import { FaSignOutAlt } from "react-icons/fa";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import styles from "./Sidebar.module.css";

const MenuItem = memo(function MenuItem({
  icon,
  label,
  isActive,
  isCollapsed,
  onClick,
}) {
  return (
    <li
      tabIndex={0}
      role="menuitem"
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onClick();
        }
      }}
      className={`${styles.menuLi} ${isActive ? styles.active : ""}`}
    >
      <span className={styles.icon}>{icon}</span>
      {!isCollapsed && <span className={styles.label}>{label}</span>}
    </li>
  );
});

function Sidebar({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const sidebarRef = useRef(null);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [isCollapsed, setIsCollapsed] = useState(() => {
    const stored = localStorage.getItem("menuCollapsed");
    return stored === "true";
  });

  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    function handleResize() {
      if (window.innerWidth <= 768) {
        setIsCollapsed(true);
      } else {
        const stored = localStorage.getItem("menuCollapsed");
        setIsCollapsed(stored === "true");
      }
    }

    window.addEventListener("resize", handleResize);
    handleResize();
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleSidebar = useCallback(() => {
    if (window.innerWidth <= 768) {
      setMobileOpen((prev) => !prev);
    } else {
      setIsCollapsed((prev) => {
        localStorage.setItem("menuCollapsed", String(!prev));
        return !prev;
      });
    }
  }, []);

  const isActive = useCallback(
    (path) => location.pathname === path,
    [location.pathname]
  );

  const handleMenuItemClick = useCallback(
    (path) => {
      navigate(path);
      if (window.innerWidth <= 768) {
        setMobileOpen(false);
      }
    },
    [navigate]
  );

  const menuItems = [
    { icon: <FaHome />, label: "Dashboard", path: "/admin/dashboard" },
    { icon: <FaTags />, label: "Planos", path: "/admin/planos" },
    { icon: <FaFileContract />, label: "Atendimento & Contratos", path: "/admin/atendimento-contratos" },
    { icon: <FaInbox />, label: "Orçamentos (Novos)", path: "/admin/orcamentos/novos" },
    { icon: <FaClock />, label: "Aguardando Cliente", path: "/admin/orcamentos/aguardando" },
    { icon: <FaCheckCircle />, label: "Aceitos", path: "/admin/orcamentos/aceitos" },
    { icon: <FaTimesCircle />, label: "Recusados", path: "/admin/orcamentos/recusados" },
    { icon: <FaSignOutAlt />, label: "Logout (Teste)", path: "/admin/logout-teste" },
  ];

  // Desabilita rolagem do html apenas quando o menu mobile está aberto
  useEffect(() => {
    const root = document.documentElement;
    if (isMobile && mobileOpen) {
      root.classList.add("modal-open");
    } else {
      root.classList.remove("modal-open");
    }
    return () => root.classList.remove("modal-open");
  }, [isMobile, mobileOpen]);

  const headerMenuOpen = isMobile ? mobileOpen : !isCollapsed;

  return (
    <>
      <Header
        simplifiedMode
        onMenuToggle={toggleSidebar}
        menuOpen={headerMenuOpen}
        menuAriaControls="sidebar-navigation"
      />

      <div
        className={`${styles.container} ${isCollapsed ? styles.collapsed : ""}`}
      >
        <aside
          className={
            `${styles.sidebar} ` +
            `${!isMobile && isCollapsed ? styles.collapsed : ""} ` +
            `${isMobile && mobileOpen ? styles.mobileOpen : ""}`
          }
          ref={sidebarRef}
        >
          <nav className={styles.nav} id="sidebar-navigation">
            <ul className={styles.menuUl}>
              {menuItems.map(({ icon, label, path }) => (
                <MenuItem
                  key={path}
                  icon={icon}
                  label={label}
                  isCollapsed={window.innerWidth <= 768 ? false : isCollapsed}
                  isActive={isActive(path)}
                  onClick={() => {
                    handleMenuItemClick(path);
                  }}
                />
              ))}
            </ul>
          </nav>
        </aside>

        <main
          className={`${styles.pageContent} ${
            !isMobile && isCollapsed ? styles.collapsed : ""
          }`}
        >
          <div className={styles.contentWrapper}>{children}</div>
          <Footer />
        </main>
      </div>
    </>
  );
}

export default Sidebar;
