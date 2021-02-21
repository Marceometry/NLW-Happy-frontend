import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { FiPlus, FiArrowRight } from 'react-icons/fi'
import { Marker, Popup } from 'react-leaflet'
import Leaflet from 'leaflet'

import 'leaflet/dist/leaflet.css'

import Map from '../components/map'
import api from '../services/api'

import mapMarker from '../images/map-marker.svg'
import '../css/pages/orphanages.css'


const mapIcon = Leaflet.icon({
    iconUrl: mapMarker,
    iconSize: [58, 68],
    iconAnchor: [29, 68],
    popupAnchor: [180, 0]
})

interface Orphanage {
    id: number,
    lat: number,
    lng: number,
    name: string
}

export default function Orphanages() {
    document.title = 'Happy | Orfanatos'

    const [orphanages, setOrphanages] = useState<Orphanage[]>([])

    useEffect(() => {
        api.get('orphanages').then(res => {
            setOrphanages(res.data)
        })
    })

    return (
        <div id="page-map">
            <aside>
                <header>
                    <Link to='/'>
                        <img src={mapMarker} alt="Happy"/>
                    </Link>

                    <h2>Escolha um orfanato no mapa</h2>
                    <p>Muitas crianças estão esperando a sua visita :)</p>
                </header>

                <footer>                    
                    <strong>Palmares do Sul</strong>
                    <span>Rio Grande do Sul</span>
                </footer>
            </aside>

            <Map>
                {orphanages.map(orphanage => {
                    return (
                        <Marker position={[orphanage.lat, orphanage.lng]} icon={mapIcon} key={orphanage.id}>
                            <Popup closeButton={false} minWidth={240} maxWidth={240} className="map-popup">
                                {orphanage.name}
                                <Link to={`/orphanages/${orphanage.id}`}>
                                    <FiArrowRight size={24} color="#fff" />
                                </Link>
                            </Popup>
                        </Marker>
                    )
                })}
            </Map>

            <Link to='/create-orphanage' id='create-orphanage'>
                <FiPlus size={32} color='#fff' />
            </Link>
        </div>
    )
}