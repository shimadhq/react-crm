import React, { useCallback, useState } from 'react';
import { Link } from 'react-router-dom';
import { FiAlignRight, FiX } from 'react-icons/fi';
import { ThemeSwitcher } from '../themeProvider/themeSwitcher';
import { useSidebar } from './sidebarContext'; 
import logo from '../../assets/images/logo.png';
import './sidebar.css';

const Sidebar = ({ initialUsers = [], onSelectUser = () => {}, isMinimal = false }) => {
    const { sidebarType, setSidebarType, isSidebarOpen, toggleSidebar, setIsSidebarOpen } = useSidebar();
    const [ showDropDown, setShowDropDown ] = useState(false);

    const toggleDropDown = () => {
        setShowDropDown(!showDropDown);
    }

    const handleReturnToProfile = useCallback(() => {
        console.log('Returning to dashboard');
        setSidebarType('profile');
        setIsSidebarOpen(true);
    }, [setSidebarType, setIsSidebarOpen]);

    const handleToggleSidebar = useCallback((e) => {
        e.stopPropagation(); 
        toggleSidebar();
    }, [toggleSidebar]);

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
                            <li><Link to="/profile">داشبورد</Link></li>
                            <li>
                                <Link
                                    to="/profile/control-guards"
                                    onClick={() => setSidebarType('guard')}
                                >
                                    نگهبان‌ها
                                </Link>
                            </li>
                            <li><Link to="#">ماموریت</Link></li>
                            <li><Link to="#">عملیات</Link></li>
                            <li><Link to="#">مشتریان</Link></li>
                            <li><Link to="#">قراردادها</Link></li>
                            <li>
                                <Link to="#">
                                  <h6>گزارشات</h6>
                                  {showDropDown ? (
                                    <FiX size={24} onClick={toggleDropDown} />
                                  ) : (
                                    <FiAlignRight size={24} onClick={toggleDropDown} />
                                  )}
                                </Link>
                                {showDropDown && (
                                    <h6>drop down is working</h6>
                                )}
                            </li>
                            <li><Link to="#">اموال</Link></li>
                            <li><Link to="#">امور مالی</Link></li>
                            <li><Link to="#">تنظیمات</Link></li>
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