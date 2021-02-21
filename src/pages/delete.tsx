import React, { useEffect, useState } from 'react'
import { render } from 'react-dom'
import { Link, useHistory, useParams } from 'react-router-dom'
import { FiEye, FiEyeOff } from 'react-icons/fi'
import { FaArrowRight } from 'react-icons/fa'

import '../css/pages/delete.css'

import DeleteImg from '../images/delete.svg'
import SecondaryButton from '../components/secondaryButton'
import api from '../services/api'

interface Orphanage {
    name: string
}

interface OrphanageParams {
    id: string
}

export default function Delete() {
    const params = useParams<OrphanageParams>()
    const [orphanage, setOrphanage] = useState<Orphanage>()

    useEffect(() => {
        api.get(`orphanages/${params.id}`).then((res) => {
          setOrphanage(res.data);
        });
      }, [params.id]);
      
    if (!orphanage) {
        document.title = 'Happy'
        return <p>Carregando...</p>;
    }

    document.title = 'Happy | Excluir Orfanato'

    function openInput() {
        render (
            <form onSubmit={DeleteOrphanage}>
                <fieldset>
                    <label htmlFor="password">Digite a sua senhar:</label>
                    <input id="password" type="password" placeholder="Sua senha" required/>

                    <div id="eye">
                        <FiEyeOff onClick={showPassword} size={24} color="#8fa7b2" />
                    </div>
                </fieldset>

                <button id="confirm" type="submit">
                    <FaArrowRight  />
                </button>
            </form>,
            document.getElementById('exclude')
        )
    }
    
    function hidePassword() {
        render(
            <FiEyeOff onClick={showPassword} size={24} />,
            document.getElementById('eye')
        )
    }

    function showPassword() {
        render(
            <FiEye onClick={hidePassword} size={24} />,
            document.getElementById('eye')
        )
    }

    function DeleteOrphanage() {
        useHistory().push('/admin')
    }

    return (
        <div id="delete">    
            <main>
                <div className="delete-message">
                    <h1>Excluir!</h1>
                    <p>Você tem certeza que quer
                       excluir o orfanato {orphanage.name}?</p>

                    <div className="delete-options">
                        <div id="exclude">
                            <SecondaryButton id="yes" onClick={openInput}> Excluir </SecondaryButton>
                        </div>

                        <Link to="/admin">
                            <SecondaryButton id="cancel"> Cancelar </SecondaryButton>
                        </Link>
                    </div>
                </div>

                <img src={DeleteImg} alt="Excluir Orf."/>
            </main>
        </div>
    )
}