import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Marker } from "react-leaflet";
import L from "leaflet";

import { FiArrowLeft, FiAlertCircle, FiTrash } from "react-icons/fi";
import { FaMapMarkerAlt } from "react-icons/fa";

import mapMarker from "../images/map-marker.svg";
import edit from "../images/edit.svg";

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
    const [selector, setSelector] = useState('registered')

    useEffect(() => {
        api.get(`admin/${selector}`).then(res => {
            setOrphanages(res.data)
        })
    }, [selector])

    return (
        <div id="page-admin">
            <aside className="sidebar">
                <img src={mapMarker} alt="Happy"/>

                <div className="show-orphanages">
                    <Link to="/admin/registered">
                        <FaMapMarkerAlt size={48} className={selector === 'registered' ? 'active' : ''} onClick={() => {setSelector('registered')}} />
                    </Link>

                    <Link to="/admin/pending">
                        <FiAlertCircle size={48} className={selector === 'pending' ? 'active' : ''}  onClick={() => {setSelector('pending')}} />
                    </Link>
                </div>

                <footer>
                    <Link to=''>
                        <FiArrowLeft size={24} color='#fff' />
                    </Link>
                </footer>
            </aside>

            <main>
                <div id="orphanages-admin">
                    <header>
                        <div>
                            <h1>{selector === 'registered' ? 'Orfanatos Cadastrados' : 'Cadastros Pendentes'}</h1>

                            <span>{orphanages.length === 0 ? 'Nenhum orfanato cadastrado :(' 
                            : orphanages.length === 1 ? '1 Orfanato' : `${orphanages.length} Orfanatos`}</span>
                        </div>

                        <hr/>
                    </header>

                    <div id="orphanages-container">
                        {orphanages.map(orphanage => {
                            return (
                                <section key={orphanage.id}>
                                    <div className="orphanage">
                                        <div className="map-container">
                                            <Map interactive={false}
                                                center={[orphanage.lat, orphanage.lng]}
                                            >

                                                <Marker interactive={false} icon={MapIcon} position={[orphanage.lat, orphanage.lng]} />
                                            </Map>
                                        </div>

                                        <footer>
                                            <h2>{orphanage.name}</h2>

                                            <div>
                                                <Link to={`/edit/${orphanage.id}`}>
                                                    <img src={edit} />
                                                </Link>

                                                <Link to={`/delete/${orphanage.id}`}>
                                                    <FiTrash size={48} className="delete-orphanage" />
                                                </Link>
                                            </div>
                                        </footer>
                                    </div>
                                </section>
                            )
                        })}
                    </div>
                </div>
            </main>
        </div>
    );
}
