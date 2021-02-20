import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowRight } from 'react-icons/fi'

import '../css/global.css'
import '../css/pages/landing.css'

import logoImg from '../images/logo.svg'
import SecondaryButton from '../components/secondaryButton'

export default function Landing() {
    document.title = 'Happy'

    return (
        <div id="landing">
            <div className="content-wrapper">
                <div className="logo-location">
                    <img src={logoImg} alt="Happy Logo"/>
            
                    <div className="location">
                        <strong>Palmares do Sul</strong>
                        <span>Rio Grande do Sul</span>
                    </div>
                </div>
    
                <main>
                    <h1>Leve felicidade para o mundo</h1>
                    <p>Visite orfanatos e mude o dia de muitas crianças.</p>
                </main>
                
                <Link to="/login" className="go-to-login">
                    <SecondaryButton>
                        Acesso Restrito
                    </SecondaryButton>
                </Link>
        
                <Link to="/orphanages" className="enter-app">
                    <FiArrowRight size={26} color='rgba(0, 0, 0, .6)' />
                </Link>
            </div>
        </div>
    )
}