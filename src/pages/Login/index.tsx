import { ChangeEvent, useContext, useState } from 'react';
import s from "./styles.module.scss";

import logo from '../../assets/logo.png';
import { AuthContext } from "../../context/AuthContext";

export function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(false);

    const { signin } = useContext(AuthContext);

    // Acessando value do input email
    function handleInputEmail(event: ChangeEvent<HTMLInputElement>) {
        setEmail(event.target.value)
    }

    // Acessando value do input password
    function handleInputPassword(event: ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value)
    }

    // Função para logar no servidor
    // Passa os parâmetros para o contexto signin
    async function handleLogin() {
        if(email && password) {
            await signin(email, password);
        }
    }

    return (
        <div className={s.login}>
            <div className={s.form}>
                <header>
                    <img src={logo} alt="logo" />
                    <h1>Books</h1>
                </header>
                <label>
                    <span>Email</span>
                    <input 
                        type="text" 
                        placeholder='books@appnoz.com.br'
                        value={email}
                        onChange={handleInputEmail}
                        />
                </label>
                <label className={s.labelButton}>
                    <div>
                        <span>Senha</span>
                        <input 
                            type="password" 
                            placeholder='********'
                            value={password}
                            onChange={handleInputPassword}
                        />
                    </div>
                <button onClick={() => {handleLogin(); setError(true)}}>Entrar</button>
                </label>
                {
                    // Exibe mensagem se usuário não colocar 
                    // ou colocar errado o email e a senha
                    error ?
                    <div className={s.error}>
                        Email e/ou senha incorretos
                    </div> : null
                }
            </div>
        </div>
    )
}