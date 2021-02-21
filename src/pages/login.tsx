import React from 'react'
import { Link } from 'react-router-dom'
import { FiArrowLeft, FiEye, FiEyeOff } from 'react-icons/fi'

import logoColumn from '../images/logo-column.svg'
import PrimaryButton from '../components/primaryButton'

import '../css/global.css'
import '../css/pages/login.css'
import { render } from 'react-dom'

export default function Login() {
    document.title = 'Happy | Login'

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

    return (
        <div id="page-login">
            <div className="space-wrapper">
                <img src={logoColumn} alt="Happy Logo"/>
        
                <div className="location">
                    <strong>Palmares do Sul</strong>
                    <span>Rio Grande do Sul</span>
                </div>
            </div>

            <form className="login-block">
                <Link to="/admin">
                    <FiArrowLeft size={24} color="#15c3d6"/>
                </Link>

                <fieldset className="login">
                    <h2>Fazer login</h2>

                    <div className="input-block">
                        <label htmlFor="email">E-mail</label>
                        <input id="email" type="email" placeholder="seuemail@exemplo.com" required />
                    </div>

                    <div className="input-block">
                        <label htmlFor="password">Senha</label>
                        <input id="password" type="password" placeholder="Sua senha" required />

                        <div id="eye">
                            <FiEyeOff onClick={showPassword} size={24} />
                        </div>
                    </div>

                    <PrimaryButton type="submit"> Entrar </PrimaryButton>
                </fieldset>
            </form>
        </div>
    )
}