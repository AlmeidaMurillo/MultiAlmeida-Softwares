import { useState } from 'react';
import styles from './Sidebar.module.css';

function Sidebar({ isOpen, onClose, onNavigate }) {
    const [submenuOpen, setSubmenuOpen] = useState({});

    const toggleSubmenu = (menuKey) => {
        setSubmenuOpen(prev => ({
            ...prev,
            [menuKey]: !prev[menuKey]
        }));
    };

    const handleNavigate = (sectionId) => {
        onNavigate(sectionId);
        onClose();
        setSubmenuOpen({});
    };

    return (
        <>
            {/* Overlay */}
            <div 
                className={`${styles.overlay} ${isOpen ? styles.overlayOpen : ''}`}
                onClick={onClose}
            />

            {/* Sidebar */}
            <nav className={`${styles.sidebar} ${isOpen ? styles.sidebarOpen : ''}`}>
                {/* Botão de Fechar */}
                <button className={styles.closeButton} onClick={onClose} aria-label="Fechar menu">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <line x1="18" y1="6" x2="6" y2="18"></line>
                        <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                </button>

                {/* Sidebar Header Premium */}
                <div className={styles.sidebarHeader}>
                    <div className={styles.sidebarBrand}>
                        <div className={styles.brandIcon}>
                            <span className={styles.iconLetter}>M</span>
                            <span className={styles.iconLetter}>A</span>
                        </div>
                        <div className={styles.brandInfo}>
                            <h3 className={styles.brandName}>MultiAlmeida</h3>
                            <span className={styles.brandTagline}>Software House</span>
                        </div>
                    </div>
                </div>

                {/* Menu de Navegação */}
                <div className={styles.navLinks}>
                    {/* Item Simples: Início */}
                    <button onClick={() => handleNavigate('home')} className={styles.navLink}>
                        <div className={styles.linkIcon}>🏠</div>
                        <span className={styles.linkText}>Início</span>
                        <div className={styles.linkArrow}>›</div>
                    </button>

                    {/* Item com Submenu: Serviços */}
                    <div className={styles.navItem}>
                        <button 
                            onClick={() => toggleSubmenu('services')} 
                            className={`${styles.navLink} ${submenuOpen.services ? styles.navLinkActive : ''}`}
                        >
                            <div className={styles.linkIcon}>⚡</div>
                            <span className={styles.linkText}>Serviços</span>
                            <div className={`${styles.linkArrow} ${styles.submenuArrow} ${submenuOpen.services ? styles.submenuArrowOpen : ''}`}>▼</div>
                        </button>
                        <div className={`${styles.submenu} ${submenuOpen.services ? styles.submenuOpen : ''}`}>
                            <button onClick={() => handleNavigate('services')} className={styles.submenuLink}>
                                <span className={styles.submenuIcon}>🌐</span>
                                <span>Sites Institucionais</span>
                            </button>
                            <button onClick={() => handleNavigate('services')} className={styles.submenuLink}>
                                <span className={styles.submenuIcon}>⚙️</span>
                                <span>Sistemas Personalizados</span>
                            </button>
                            <button onClick={() => handleNavigate('services')} className={styles.submenuLink}>
                                <span className={styles.submenuIcon}>🛒</span>
                                <span>E-commerce</span>
                            </button>
                            <button onClick={() => handleNavigate('services')} className={styles.submenuLink}>
                                <span className={styles.submenuIcon}>📱</span>
                                <span>Aplicações Web</span>
                            </button>
                            <button onClick={() => handleNavigate('services')} className={styles.submenuLink}>
                                <span className={styles.submenuIcon}>🔧</span>
                                <span>Manutenção & Suporte</span>
                            </button>
                            <button onClick={() => handleNavigate('services')} className={styles.submenuLink}>
                                <span className={styles.submenuIcon}>🚀</span>
                                <span>Consultoria Tech</span>
                            </button>
                        </div>
                    </div>

                    {/* Item Simples: Portfólio */}
                    <button onClick={() => handleNavigate('portfolio')} className={styles.navLink}>
                        <div className={styles.linkIcon}>💎</div>
                        <span className={styles.linkText}>Portfólio</span>
                        <div className={styles.linkArrow}>›</div>
                    </button>

                    {/* Item Simples: Sobre Nós */}
                    <button onClick={() => handleNavigate('about')} className={styles.navLink}>
                        <div className={styles.linkIcon}>🎯</div>
                        <span className={styles.linkText}>Sobre Nós</span>
                        <div className={styles.linkArrow}>›</div>
                    </button>

                    {/* Item Simples: Contato */}
                    <button onClick={() => handleNavigate('contact')} className={styles.navLink}>
                        <div className={styles.linkIcon}>💬</div>
                        <span className={styles.linkText}>Contato</span>
                        <div className={styles.linkArrow}>›</div>
                    </button>
                </div>

                {/* Sidebar Footer Premium */}
                <div className={styles.sidebarFooter}>
                    <div className={styles.copyright}>
                        <span>© 2025 MultiAlmeida</span>
                        <span className={styles.copyrightDot}>•</span>
                        <span>Todos os direitos reservados</span>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Sidebar;
