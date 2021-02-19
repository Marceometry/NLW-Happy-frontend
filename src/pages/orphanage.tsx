import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { FiClock, FiInfo } from "react-icons/fi";
import { Marker, MapContainer, TileLayer } from "react-leaflet";
import L from "leaflet";

import mapMarker from "../images/map-marker.svg";

// import PrimaryButton from "../../components/PrimaryButton";
import Sidebar from "../components/sidebar";
// import Map from "../../components/Map";
import api from "../services/api";

import "../css/pages/orphanage.css";

const MapIcon = L.icon({
  iconUrl: mapMarker,

  iconSize: [58, 68],
  iconAnchor: [29, 68],
  popupAnchor: [0, -60],
});

interface Orphanage {
  lat: number;
  lng: number;
  name: string;
  about: string;
  instructions: string;
  opening_hours: string;
  open_on_weekends: string;
  images: {
    id: number;
    url: string;
  }[];
}

interface OrphanageParams {
  id: string;
}

export default function Orphanage() {
  const params = useParams<OrphanageParams>()
  const [orphanage, setOrphanage] = useState<Orphanage>()
  const [activeImgIndex, setActiveImgIndex] = useState(0)

  useEffect(() => {
    api.get(`orphanages/${params.id}`).then((res) => {
      setOrphanage(res.data);
    });
  }, [params.id]);

  if (!orphanage) {
    return <p>Carregando...</p>;
  }

  document.title = `Happy | ${orphanage.name}`
  
  return (
    <div id="page-orphanage">
      <Sidebar />

      <main>
        <div className="orphanage-details">
          <img src={orphanage.images[activeImgIndex].url} alt={orphanage.name} />

          <div className="images">
            {orphanage.images.map((image, index) => {
              return (
                <button type="button" key={image.id} 
                    onClick={() => {setActiveImgIndex(index)}} 
                    className={activeImgIndex === index ? 'active' : ''}
                >
                  <img src={image.url} alt={orphanage.name} />
                </button>
              );
            })}
          </div>

          <div className="orphanage-details-content">
            <h1>{orphanage.name}</h1>
            <p>{orphanage.about}</p>

            <div className="map-container">
              <MapContainer
                center={[orphanage.lat, orphanage.lng]}
                zoom={16}
                style={{ width: "100%", height: 280 }}
              >
                <TileLayer url='https://a.tile.openstreetmap.org/{z}/{x}/{y}.png' />

                <Marker
                  interactive={false}
                  icon={MapIcon}
                  position={[orphanage.lat, orphanage.lng]}
                />
              </MapContainer>
              <footer>
                <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/dir/?api=1&destination=${orphanage.lat},${orphanage.lng}`}>Ver rotas no Google Maps</a>
              </footer>
            </div>

            <hr />

            <h2>Instruções para visita</h2>
            <p>{orphanage.instructions}</p>

            <div className="open-details">
              <div className="hour">
                <FiClock size={32} color="#15B6D6" />
                Segunda à Sexta <br />
                {orphanage.opening_hours}
              </div>

              {orphanage.open_on_weekends ? (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Atendemos <br />
                  fim de semana
                </div>
              ) : (
                <div className="open-on-weekends">
                  <FiInfo size={32} color="#39CC83" />
                  Não Atendemos <br />
                  fim de semana
                </div>
              )}
            </div>

            {/* <PrimaryButton type="button">
              <FaWhatsapp size={20} color="#FFF" />
              Entrar em contato
            </PrimaryButton> */}
          </div>
        </div>
      </main>
    </div>
  );
}
