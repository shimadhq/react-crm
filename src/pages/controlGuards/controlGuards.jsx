import React, { useRef, useState, useEffect } from "react";
import { OpenLayersMap } from "../../components/openLayersMap/openLayersMap";
import { GetUsersLocations } from "../../utils/api";
import { useSidebar } from '../../components/sidebar/sidebarContext';
import Sidebar from '../../components/sidebar/sidebar';
import Header from '../../components/header/header';
import './controlGuards.css';

export const ControlGuards = () => {
    const mapRef = useRef();
    const [users, setUsers] = useState([]);
    const { setSidebarType, setIsSidebarOpen, sidebarType, isSidebarOpen } = useSidebar();

    //Checking admin token
    /* useEffect(() => {
      const token = localStorage.getItem('adminToken');
      if (!token) {
        navigate('/');
      }
    }, [navigate]); */

    useEffect(() => {
      GetUsersLocations()
        .then(data => setUsers(data))
        .catch(err => {
          console.error(err);
          setUsers([]);
        });
    }, []);
        
    useEffect(() => {
        console.log('ControlGuards useEffect: Setting sidebarType to guard, isSidebarOpen to true');
        setSidebarType('guard');
        setIsSidebarOpen(true);
    }, [setSidebarType, setIsSidebarOpen]);

    console.log('ControlGuards render: isSidebarOpen =', isSidebarOpen, 'sidebarType =', sidebarType);

    const handleUserSelect = (user) => {
        if (mapRef.current) {
          mapRef.current.selectUserOnMap(user);
        }
    };

    return(
        <div className="control-guards-container">
            <Header isMinimal={true} title="کنترل نگهبانان" />

            <div style={{ flex: 1 }}>
             <Sidebar
              initialUsers={users}
              onSelectUser={handleUserSelect}
              isMinimal={true}
              />

             <OpenLayersMap initialUsers={users} ref={mapRef} />
            </div>
        </div>
    );
}