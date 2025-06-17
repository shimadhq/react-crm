import React, { useEffect, useRef, useState, useImperativeHandle, forwardRef } from 'react';
import { Map, View, Overlay } from 'ol';
import { fromLonLat } from 'ol/proj';
import { Icon, Style } from 'ol/style';
import { Select } from 'ol/interaction';
import { click } from 'ol/events/condition';
import { GetUsersLocations } from '../../utils/api';
import 'ol/ol.css';
import TileLayer from 'ol/layer/Tile';
import OSM from 'ol/source/OSM';
import VectorLayer from 'ol/layer/Vector';
import VectorSource from 'ol/source/Vector';
import Feature from 'ol/Feature';
import Point from 'ol/geom/Point';


export const OpenLayersMap = forwardRef(({ initialUsers = [] }, ref) => {
  const mapRef = useRef(null);
  const overlayRef = useRef(null);
  const mapInstanceRef = useRef(null);
  const overlayInstanceRef = useRef(null);
  const vectorSourceRef = useRef(new VectorSource());
  const [userInfo, setUserInfo] = useState(null);

  const getAddress = async (lat, lon) => {
    try {
      const res = await fetch(`https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json`);
      const data = await res.json();
      return data.display_name || 'آدرس پیدا نشد!';
    } catch {
      return 'آدرس پیدا نشد!';
    }
  };

  // Selecting user on map
  useImperativeHandle(ref, () => ({
    selectUserOnMap: async (user) => {
      if (!mapInstanceRef.current || !overlayInstanceRef.current) return;

      const coords = fromLonLat([user.location.longitude, user.location.latitude]);
      const address = await getAddress(user.location.latitude, user.location.longitude);

      mapInstanceRef.current.getView().animate({
        center: coords,
        zoom: 16,
        duration: 500,
      });

      setUserInfo({
        name: `${user.firstName} ${user.lastName}`,
        mobileNumber: user.mobileNumber,
        accuracy: user.location.accuracy,
        timestamp: user.location.timestamp ? new Date(user.location.timestamp).toLocaleString('fa-IR') : 'نامشخص',
        address,
      });

      overlayInstanceRef.current.setPosition(coords);
    },
  }));

  // Update user's pins
  const updateUserPins = (users) => {
    vectorSourceRef.current.clear();

    if (!Array.isArray(users)) {
      console.warn('updateUserPins: users is not an array', users);
      return;
    }

    users.forEach((user) => {
      const feature = new Feature({
        geometry: new Point(fromLonLat([user.location.longitude, user.location.latitude])),
      });
      feature.set('userData', user);
      feature.setStyle(
        new Style({
          image: new Icon({
            src: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
            scale: 0.075,
            anchor: [0.5, 1],
          }),
        })
      );
      vectorSourceRef.current.addFeature(feature);
    });
  };


  //Getting live data
  useEffect(() => {
    //Initial data
    updateUserPins(initialUsers);

    //Pulling live data every 5 second
    const interval = setInterval(async () => {
      try {
        const users = await GetUsersLocations();
        updateUserPins(users || []);
      } catch (error) {
        console.error('Error fetching live locations:', error);
        updateUserPins([]);
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [initialUsers]);

  //Map
  useEffect(() => {
    const vectorLayer = new VectorLayer({ source: vectorSourceRef.current });

    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer,
      ],
      view: new View({
        center: fromLonLat([59.6062, 36.2970]),
        zoom: 12,
      }),
    });

    mapInstanceRef.current = map;

    const overlay = new Overlay({
      element: overlayRef.current,
      positioning: 'bottom-center',
      stopEvent: false,
      offset: [0, -15],
    });

    map.addOverlay(overlay);
    overlayInstanceRef.current = overlay;
  

    const select = new Select({ condition: click });
    map.addInteraction(select);

    select.on('select', async (e) => {
      const feature = e.selected[0];
      if (!feature) return;

      const user = feature.get('userData');
      const coords = feature.getGeometry().getCoordinates();
      const address = await getAddress(user.location.latitude, user.location.longitude);

      setUserInfo({
        name: `${user.firstName} ${user.lastName}`,
        mobileNumber: user.mobileNumber,
        accuracy: user.location.accuracy,
        timestamp: user.location.timestamp ? new Date(user.location.timestamp).toLocaleString('fa-IR') : 'نامشخص',
        address,
      });

      overlay.setPosition(coords);
    });

    return () => {
      map.setTarget(null);
    };
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', height: '100vh' }}>
      <div ref={mapRef} style={{ width: '100%', height: '100%' }} />
      <div
        ref={overlayRef}
        style={{
          position: 'absolute',
          backgroundColor: '#fff',
          padding: '10px',
          borderRadius: '8px',
          border: '2px dashed red', // add visual marker
          boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
          minWidth: '400px',
          textAlign: 'left',
          pointerEvents: 'none',
        }}
      >
        {userInfo ? (
          <>
            <strong>{userInfo.name}</strong>
            <p style={{ fontSize: '0.85rem' }}>{userInfo.mobileNumber}</p>
            <p style={{ fontSize: '0.85rem' }}>دقت: {userInfo.accuracy} متر</p>
            <p style={{ fontSize: '0.85rem' }}>زمان: {userInfo.timestamp}</p>
            <p style={{ fontSize: '0.85rem' }}>{userInfo.address}</p>
          </>
        ) : (
          <p>برای مشاهده اطلاعات، روی نگهبان کلیک کنید</p>
        )}
      </div>
    </div>
  );
});