import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isMobile, setIsMobile] = useState(window.innerWidth < 1000);

    const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < 1000);
            if (window.innerWidth >= 1000) {
                setIsMenuOpen(false); // Close menu on resize to larger screens
            }
        };

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const mobileHeaderStyle = {
        backgroundColor: '#1E1E2F',
        position: 'sticky',
        top: 0,
        left: 0,
        width: '100%',
        zIndex: 1000,
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
    };

    const mobileNavBarStyle = {
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '10px 20px',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
    };

    const mobileNavListStyle = {
        listStyleType: 'none',
        margin: 0,
        padding: '10px 0',
        backgroundColor: 'rgba(31, 30, 30, 0.9)',
        display: isMenuOpen ? 'flex' : 'none',
        flexWrap: 'wrap', // Allow items to wrap
        transition: 'all 0.3s ease',
    };

    const mobileLinkStyle = {
        display: 'block',
        padding: '12px 20px',
        color: '#FFFFFF',
        textDecoration: 'none',
        fontWeight: 'bold',
        transition: 'color 0.3s ease',
        flex: '1 0 30%', // Allow three items per row
        textAlign: 'center', // Center align text
    };

    const desktopHeaderStyle = {
        position: 'sticky',
        zIndex: 1000,
        left: 0,
        top: 0,
        width: '100%',
        backdropFilter: 'blur(10px)',
        boxShadow: '0 2px 10px rgba(0, 0, 0, 0.5)',
    };

    const desktopNavBarStyle = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: '10px 20px',
        backgroundColor: 'rgba(31, 30, 30, 0.8)',
    };

    const desktopNavListStyle = {
        listStyleType: 'none',
        display: 'flex',
        margin: 0,
        padding: 0,
    };

    const desktopLinkStyle = {
        textDecoration: 'none',
        color: '#fff',
        fontWeight: 600,
        padding: '15px 20px',
        transition: 'background-color 0.3s ease',
        display: 'block',
    };

    return (
        <header style={isMobile ? mobileHeaderStyle : desktopHeaderStyle}>
            <div style={isMobile ? mobileNavBarStyle : desktopNavBarStyle}>
                <img 
                    src="./img/logo.png"
                    alt="ADHENO Logo"
                    style={{
                        width: '50px',
                        height: '50px',
                        borderRadius: '50%',
                        objectFit: 'cover', 
                    }} 
                />

                {isMobile && (
                    <button onClick={toggleMenu} style={{ 
                        background: 'none', 
                        border: 'none', 
                        color: '#FFD700', 
                        fontSize: '30px', 
                        cursor: 'pointer' 
                    }}>
                        {isMenuOpen ? '✖' : '☰'}
                    </button>
                )}

                <nav style={isMobile ? { display: 'block' } : { display: 'flex' }}>
                    <ul style={isMobile ? mobileNavListStyle : desktopNavListStyle}>
                        {['Home', 'About', 'Stories', 'Projects', 'News', 'Contact', 'Donate', 'Get Involved', 'Resources', 'FAQs'].map((item, index) => (
                            <li key={index}>
                                <Link to={`/${item.toLowerCase().replace(/\s+/g, '-')}`} 
                                    style={isMobile ? mobileLinkStyle : desktopLinkStyle}
                                    onMouseEnter={(e) => !isMobile && (e.target.style.color = '#FFD700')}
                                    onMouseLeave={(e) => !isMobile && (e.target.style.color = '#fff')}
                                >
                                    {item}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;