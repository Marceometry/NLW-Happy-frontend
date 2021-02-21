import React from 'react'
import { Link } from 'react-router-dom'

import '../css/pages/success.css'

import SecondaryButton from '../components/secondaryButton'
import SuccessImg from '../images/success.svg'

export default function Success() {
    document.title = 'Happy | Pronto!'

    return (
        <div id="success">    
            <main>
                <div className="success-message">
                    <h1>Ebaaa!</h1>
                    <p>O cadastro deu certo e foi enviado
                       ao administrador para ser aprovado.
                       Agora é só esperar :)</p>

                    <Link to="/orphanages" className="back-to-map">
                        <SecondaryButton>
                            Voltar para o mapa
                        </SecondaryButton>
                    </Link>
                </div>

            <img src={SuccessImg} alt="Sucesso"/>
            </main>
        </div>
    )
}