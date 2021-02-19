import React from 'react'
import { Link } from 'react-router-dom'

import '../css/global.css'
import '../css/pages/landing.css'

import logoImg from '../images/logo.svg'
import { FiArrowRight } from 'react-icons/fi'

function Landing() {
    document.title = 'Happy'

    return (
        <div id="landing">
            <div className="content-wrapper">
                <img src={logoImg} alt="Happy Logo"/>
    
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
        
                <div className="location">
                    <strong>Palmares do Sul</strong>
                    <span>Rio Grande do Sul</span>
                </div>
        
                <Link to="/orphanages" className="enter-app">
                    <FiArrowRight size={26} color='rgba(0, 0, 0, .6)' />
                </Link>
            </div>
        </div>
    )
}

export default Landing