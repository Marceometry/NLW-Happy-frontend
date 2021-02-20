import React from 'react'
import { Link } from 'react-router-dom'

import '../css/pages/delete.css'

import DeleteImg from '../images/delete.svg'
import SecondaryButton from '../components/secondaryButton'

export default function Delete() {
    document.title = 'Happy'

    return (
        <div id="delete">    
            <main>
                <div className="delete-message">
                    <h1>Excluir!</h1>
                    <p>Você tem certeza que quer
                       excluir Orf. Esperança?</p>

                    <div className="delete-options">
                        <SecondaryButton id="no"> Não  </SecondaryButton>
                        <SecondaryButton id="yes"> Sim </SecondaryButton>
                    </div>
                </div>

            <img src={DeleteImg} alt="Sucesso"/>
            </main>
        </div>
    )
}