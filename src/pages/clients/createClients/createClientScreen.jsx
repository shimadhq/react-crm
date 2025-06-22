import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSidebar } from '../../../components/sidebar/sidebarContext';
import { CreateClient } from '../../../components/clients/createClient/createClient';
import Sidebar from '../../../components/sidebar/sidebar';
import Header from '../../../components/header/header';
import './createClientScreen.css';

export const CreateClientScreen = () => {
    const { setSidebarType, setIsSidebarOpen, isSidebarOpen } = useSidebar();
    const navigate = useNavigate();
    const username = localStorage.getItem('adminUsername');

    useEffect(() => {
        console.log('AdminProfile useEffect: Setting sidebarType to profile, isSidebarOpen to true');
        setSidebarType('profile');
        setIsSidebarOpen(true);
    }, [setSidebarType, setIsSidebarOpen]);
    
    const handleLogout = () => {
        localStorage.removeItem('adminId');
        localStorage.removeItem('adminUsername');
        navigate('/');
    };

    return(
        <div>
            <div className={isSidebarOpen ? 'mainHeader' : 'main-header'}>
                <Header
                username={username}
                onLogout={handleLogout}
                />
            </div>

            <Sidebar />

            <div className={isSidebarOpen ? 'mainContent' : 'main-content'}>
                <CreateClient />
            </div>
        </div>
    )
}