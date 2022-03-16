import React, {useEffect} from "react";
import './styles/SignUpScreen.css'
import SignupForm from "../components/signup/signupForm";
import {useNavigate} from "react-router-dom";

const SignUpScreen = () => {

    const navigate = useNavigate();
    useEffect(()=>{
        if (localStorage.getItem('authToken')) {
            navigate('/')
        }
    },[navigate])
    return(
        <div className={'signupScreen'}>
            <SignupForm />
        </div>
    )
}

export default SignUpScreen;
