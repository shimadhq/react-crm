import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiX } from 'react-icons/fi';
import { SlArrowDown } from "react-icons/sl";
import { SlArrowUp } from "react-icons/sl";
import { ThemeSwitcher } from '../themeProvider/themeSwitcher';
import { useSidebar } from './sidebarContext'; 
import logo from '../../assets/images/logo.png';
import './sidebar.css';

const Sidebar = ({ initialUsers = [], onSelectUser = () => {}, isMinimal = false }) => {
    const { sidebarType, setSidebarType, isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
    const [activeSubmenu, setActiveSubmenu] = useState(null);

    const handleReturnToProfile = useCallback(() => {
        console.log('Returning to dashboard');
        setSidebarType('profile');
        setIsSidebarOpen(true);
    }, [setSidebarType, setIsSidebarOpen]);

    const handleToggleSidebar = useCallback((e) => {
        e.stopPropagation(); 
        toggleSidebar();
    }, [toggleSidebar]);

    const toggleSubmenu = (menuId) => {
        setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
    };

    if (!useSidebar) {
        console.error('useSidebar is undefined, Sidebar cannot render');
        return null; 
    }

    return (
        <div className={isSidebarOpen ? (sidebarType === 'profile' ? 'sidebar' : 'guard-sidebar') : 'sidebar-deactive'}>
            {sidebarType === 'profile' && (
                <>
                    <div className="logo-div" style={isMinimal ? {justifyContent: 'space-between', gap: 7} : {justifyContent: 'center'}}>
                        {isMinimal && (
                            <div className="close-btn">
                              <FiX className="close-icon" onClick={handleToggleSidebar} />
                            </div>
                        )}
                        <div className='container'>
                            <h2 className="control-panel">پنل مدیریت</h2>
                            <img src={logo} alt="Logo" className="logo" />
                        </div>
                    </div>
                    <div className="side-menu">
                        <ul>
                            <li className='simple-li'><Link to="/profile">داشبورد</Link></li>
                            <li className='simple-li'>
                                <Link
                                    to="/profile/control-guards"
                                    onClick={() => setSidebarType('guard')}
                                >
                                    نگهبان‌ها
                                </Link>
                            </li>
                            <li className='simple-li'><Link to="#">ماموریت</Link></li>
                            <li className='simple-li'><Link to="#">عملیات</Link></li>
                            <li className='drop-down-li'>
                                <div className='drop-down-content' onClick={() => toggleSubmenu('clients')}>
                                    <p className='drop-down-text'>مشتریان</p>
                                    {activeSubmenu === 'clients' ? (
                                        <SlArrowUp size={14} />
                                    ) : (
                                        <SlArrowDown size={14} />
                                    )}
                                </div>
                                {activeSubmenu === 'clients' && (
                                    <div className='submenu'>
                                        <p className='submenu-text'><Link to="/profile/create-clients" style={{padding: 0}}>ثبت مشتری جدید</Link></p>
                                        <p className='submenu-text'><Link to="#" style={{padding: 0}}>لیست مشتریان</Link></p>
                                    </div>
                                )}
                            </li>
                            <li className='simple-li'><Link to="#">قراردادها</Link></li>
                            <li className='simple-li'>
                                <div className='drop-down-content' onClick={() => toggleSubmenu('reports')}>
                                    <p className='drop-down-text'>گزارشات</p>
                                    {activeSubmenu === 'reports' ? (
                                        <SlArrowUp size={14} />
                                    ) : (
                                        <SlArrowDown size={14} />
                                    )}
                                </div>
                                {activeSubmenu === 'reports' && (
                                   <div className='submenu'>
                                    <p className='submenu-text'>گزارش بازدید</p>
                                    <p className='submenu-text'>گزارش سرقت</p>
                                    <p className='submenu-text'>گزارش خرابی</p>
                                   </div>
                                )}
                            </li>
                            <li className='drop-down-li'>
                                <div className='drop-down-content' onClick={() => toggleSubmenu('assets')}>
                                    <p className='drop-down-text'>اموال</p>
                                    {activeSubmenu === 'assets' ? (
                                        <SlArrowUp size={14} />
                                    ) : (
                                        <SlArrowDown size={14} />
                                    )}
                                </div>
                                {activeSubmenu === 'assets' && (
                                    <div className='submenu'>
                                        <p className='submenu-text'>وسایل نقلیه</p>
                                        <p className='submenu-text'>تسلیحات</p>
                                        <p className='submenu-text'>تجهیزات امنیتی</p>
                                    </div>
                                )}
                            </li>
                            <li className='simple-li'><Link to="#">امور مالی</Link></li>
                            <li className='simple-li'><Link to="#">تنظیمات</Link></li>
                        </ul>
                    </div>
                    <div className="theme">
                        <ThemeSwitcher />
                    </div>
                </>
            )}
            {sidebarType === 'guard' && (
                <>
                    <div className="h-sidebar">
                        <div className="close-btn">
                            <FiX className="close-icon" onClick={handleToggleSidebar} />
                        </div>
                        <div className="tl-container">
                            <h2 className="h-text">نگهبانان</h2>
                            <img src={logo} className="h-logo" alt="Logo" />
                        </div>
                    </div>
                    {initialUsers.length > 0 ? (
                        <div className="guards-list">
                            <ul className="guards-info">
                                {initialUsers.map((user) => (
                                    <li
                                        key={user.userId}
                                        className="guard"
                                        onClick={() => onSelectUser(user)}
                                    >
                                        {user.firstName} {user.lastName}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ) : (
                        <div className="no-guards">
                            <p className="no-guards-text">هیچ نگهبانی فعال نیست</p>
                        </div>
                    )}
                    <div className="return-div">
                        <button className="return" onClick={handleReturnToProfile}>
                          بازگشت به منوی داشبورد
                        </button>
                    </div>
                </>
            )}
        </div>
    );
};

export default Sidebar;