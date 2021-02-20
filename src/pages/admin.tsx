import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FiArrowLeft, FiAlertCircle } from "react-icons/fi";
import { Marker, MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

import mapMarker from "../images/map-marker.svg";

import Map from "../components/map";
import api from "../services/api";

import "../css/pages/admin.css";

const MapIcon = L.icon({
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface Orphanage {
    id: number,
    lat: number,
    lng: number,
    name: string
}

export default function Admin() {
  document.title = 'Happy | Gerenciar Orfanatos'

  const [orphanages, setOrphanages] = useState<Orphanage[]>([])

  useEffect(() => {
      api.get('orphanages').then(res => {
          setOrphanages(res.data)
      })
  })
  
  return (
    <div id="page-admin">
        <aside className="sidebar">
            <img src={mapMarker} alt=""/>

            <div className="show-orphanages">
                <Link to="/">
                    <FiAlertCircle size={48} color='#fff' />
                </Link>

                <Link to="/">
                    <FiAlertCircle size={48} color='#fff' />
                </Link>
            </div>

            <footer>
                <button type="button">
                    <FiArrowLeft size={24} color='#fff' />
                </button>
            </footer>
        </aside>


        {/* <div id="orphanages-admin">
            <h1>Orfanatos Cadastrados</h1>

            <span>3 orfanatos</span>

            <hr/>

            <div className="orphanages-container">

            </div>
        </div> */}


            {/* <div className="map-container">
              <Map style={{ width: "100%", height: 280 }}
                center={[orphanage.lat, orphanage.lng]}
              >

                <Marker interactive={false} icon={MapIcon} position={[orphanage.lat, orphanage.lng]} />
              </Map>

              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.lat},${orphanage.lng}`}>Ver rotas no Google Maps</a>
              </footer>
            </div> */}
    </div>
  );
}
