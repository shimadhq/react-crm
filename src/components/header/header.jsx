import React, { useCallback } from 'react';
import { FiAlignRight, FiX } from 'react-icons/fi';
import { IoIosExit } from 'react-icons/io';
import { useSidebar } from '../sidebar/sidebarContext';
import profile from '../../assets/images/profile.png';
import './header.css';

const Header = ({ username, onLogout, isMinimal = false, title = 'پنل مدیریت' }) => {
    const context = useSidebar();
    const { isSidebarOpen, toggleSidebar } = context;

    const handleToggleSidebar = useCallback((e) => {
        e.stopPropagation();
        toggleSidebar();
    }, [toggleSidebar]);

    console.log('Header render: isSidebarOpen =', isSidebarOpen, 'isMinimal =', isMinimal, 'title =', title);

    if (!context) {
        console.error('Sidebar Context is undefined');
        return <div>Error: Sidebar Context is undefined</div>;
    }

    return (
        <header className={isMinimal ? 'control-header' : 'header'}>
            <div className="header-content">
                {!isMinimal && (
                    <div className="leftSection">
                        <IoIosExit className="logout" onClick={onLogout} />
                        <img src={profile} alt="Profile" className="profile" />
                        <h2 className="profileName">{username || 'مدیر کل'}</h2>
                    </div>
                )}
                <div className={isMinimal ? 'control-rightSection' : 'rightSection'}>
                    <button
                        onClick={handleToggleSidebar}
                        className={isMinimal ? 'header-icon' : 'sidebar-toggle'}
                    >
                        {isSidebarOpen ? <FiX size={24} /> : <FiAlignRight size={24} />}
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;