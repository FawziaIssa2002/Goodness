import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const containerStyle = {
  width: '100%',
  height: '100vh',
};

const center = {
  lat: 36.200207,
  lng: 37.110502,
};

const initialMarkers = [
  { lat: 36.200207, lng: 37.110502 },
  // يمكنك إضافة دبابيس أخرى هنا إذا أردت
];

export default function Map() {
  const [markers, setMarkers] = useState(initialMarkers);
  const [newMarker, setNewMarker] = useState({ lat: '', lng: '' });

  const handleAddMarker = () => {
    if (newMarker.lat && newMarker.lng) {
      setMarkers([...markers, { lat: parseFloat(newMarker.lat), lng: parseFloat(newMarker.lng) }]);
      setNewMarker({ lat: '', lng: '' });
    } else {
      alert('Please enter valid coordinates');
    }
  };

  return (
    <div>
      <p>أماكن تواجد مراكزنا</p>
      <iframe src="https://www.google.com/maps/d/u/0/embed?mid=1_ep4mrjo8yyz1nW2Lwh8AYz_hhG2_-U&ehbc=2E312F" width="640" height="480"></iframe>
      {/* <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY"> */}
        {/* <GoogleMap
          mapContainerStyle={containerStyle}
          center={center}
          zoom={14}
        >
          {markers.map((marker, index) => (
            <Marker key={index} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap> */}
      {/* </LoadScript> */}
      <div style={{ marginTop: '20px' }}>
    
      </div>
    </div>
  );
}
