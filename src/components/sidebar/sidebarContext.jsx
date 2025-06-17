import { createContext, useContext, useState, useCallback, useMemo } from 'react';

const SidebarContext = createContext();

export const SidebarProvider = ({ children }) => {
    const [sidebarType, setSidebarType] = useState('profile');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = useCallback(() => {
        setIsSidebarOpen((prev) => {
            console.log('Toggling sidebar: new isSidebarOpen =', !prev);
            return !prev;
        });
    }, []);

    const updateSidebarType = useCallback((type) => {
        console.log('Updating sidebarType to:', type);
        setSidebarType(type);
    }, []);

    const updateIsSidebarOpen = useCallback((value) => {
        console.log('Updating isSidebarOpen to:', value);
        setIsSidebarOpen(value);
    }, []);

    const contextValue = useMemo(() => ({
        sidebarType,
        setSidebarType: updateSidebarType,
        isSidebarOpen,
        setIsSidebarOpen: updateIsSidebarOpen,
        toggleSidebar
    }), [sidebarType, isSidebarOpen, updateSidebarType, updateIsSidebarOpen, toggleSidebar]);

    return (
        <SidebarContext.Provider value={contextValue}>
            {children}
        </SidebarContext.Provider>
    );
};

export const useSidebar = () => {
    const context = useContext(SidebarContext);
    if (!context) {
        throw new Error('useSidebar must be used within a SidebarProvider');
    }
    return context;
};