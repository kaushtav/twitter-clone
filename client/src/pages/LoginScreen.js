import React, {useEffect} from "react";
import './styles/LoginScreen.css'
import LoginForm from "../components/login/loginForm";
import {useNavigate} from "react-router-dom";

const LoginScreen = () => {
    const navigate = useNavigate();
    useEffect(()=>{
        if (localStorage.getItem('authToken')) {
            navigate('/')
        }
    },[navigate])
    return(
        <div className={'loginScreen'}>
            <LoginForm/>
        </div>
    )
}

export default LoginScreen;
