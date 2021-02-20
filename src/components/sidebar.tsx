import React from 'react'
import { useHistory } from 'react-router-dom'
import { FiArrowLeft } from 'react-icons/fi'

import mapMarker from '../images/map-marker.svg'
import '../css/components/sidebar.css'

export default function Sidebar() {
    const { goBack } = useHistory()

    return (
        <aside className="sidebar">
            <img src={mapMarker} alt=""/>

            <footer>
                <button type="button" onClick={goBack}>
                    <FiArrowLeft size={24} color='#fff' />
                </button>
            </footer>
        </aside>
    )
}