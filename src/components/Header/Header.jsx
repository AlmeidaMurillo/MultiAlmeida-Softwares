import { useState } from 'react';
import styles from './Header.module.css';

function Header({ theme, toggleTheme, onMenuToggle, menuOpen, onNavigate }) {
    const [servicesOpen, setServicesOpen] = useState(false);

    const handleServiceClick = (section) => {
        onNavigate(section);
        setServicesOpen(false);
    };

    return (
        <header className={styles.header}>
            <div className={styles.headerContent}>
                <div className={styles.logoContainer} onClick={() => onNavigate('home')}>
                    <div className={styles.logo}>MultiAlmeida</div>
                    <h2 className={styles.subtitle}>Softwares</h2>
                </div>

                {/* Navigation Desktop */}
                <nav className={styles.desktopNav}>
                    <button onClick={() => onNavigate('home')} className={styles.navLink}>
                        Início
                    </button>
                    <div 
                        className={styles.navItem}
                        onMouseEnter={() => {
                            console.log('Mouse enter - abrindo dropdown');
                            setServicesOpen(true);
                        }}
                        onMouseLeave={() => {
                            console.log('Mouse leave - fechando dropdown');
                            setServicesOpen(false);
                        }}
                    >
                        <button className={`${styles.navLink} ${servicesOpen ? styles.activeNav : ''}`}>
                            Serviços <span className={styles.dropdownArrow}>▼</span>
                        </button>
                        {servicesOpen && (
                            <div className={styles.dropdown}>
                                <button onClick={() => handleServiceClick('services')} className={styles.dropdownLink}>
                                    <span className={styles.dropdownIcon}>🌐</span>
                                    <span>Sites Institucionais</span>
                                </button>
                                <button onClick={() => handleServiceClick('services')} className={styles.dropdownLink}>
                                    <span className={styles.dropdownIcon}>⚙️</span>
                                    <span>Sistemas Personalizados</span>
                                </button>
                                <button onClick={() => handleServiceClick('services')} className={styles.dropdownLink}>
                                    <span className={styles.dropdownIcon}>🛒</span>
                                    <span>E-commerce</span>
                                </button>
                                <button onClick={() => handleServiceClick('services')} className={styles.dropdownLink}>
                                    <span className={styles.dropdownIcon}>📱</span>
                                    <span>Aplicações Web</span>
                                </button>
                                <button onClick={() => handleServiceClick('services')} className={styles.dropdownLink}>
                                    <span className={styles.dropdownIcon}>🔧</span>
                                    <span>Manutenção & Suporte</span>
                                </button>
                                <button onClick={() => handleServiceClick('services')} className={styles.dropdownLink}>
                                    <span className={styles.dropdownIcon}>🚀</span>
                                    <span>Consultoria Tech</span>
                                </button>
                            </div>
                        )}
                    </div>
                    <button onClick={() => onNavigate('portfolio')} className={styles.navLink}>
                        Portfólio
                    </button>
                    <button onClick={() => onNavigate('about')} className={styles.navLink}>
                        Sobre Nós
                    </button>
                    <button onClick={() => onNavigate('contact')} className={styles.navLink}>
                        Contato
                    </button>
                </nav>

                <div className={styles.headerActions}>
                    <button 
                        className={styles.themeToggle} 
                        onClick={toggleTheme}
                        aria-label="Alternar tema"
                        title={theme === 'light' ? 'Modo Escuro' : 'Modo Claro'}
                    >
                        {theme === 'light' ? '🌙' : '☀️'}
                    </button>
                    <button className={styles.ctaButton} onClick={() => onNavigate('contact')}>
                        Solicitar Orçamento
                    </button>
                    
                    <button 
                        className={`${styles.menuToggle} ${menuOpen ? styles.menuToggleOpen : ''}`}
                        onClick={onMenuToggle}
                        aria-label="Menu"
                    >
                        <span></span>
                        <span></span>
                        <span></span>
                    </button>
                </div>
            </div>
        </header>
    );
}

export default Header;
