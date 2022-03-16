import React, {useState} from "react";
import './styles/loginForm.css'
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/user";
import axios from "axios";

const LoginForm = () => {
    const navigate = useNavigate();
    const {handleLogin} = useUser();
    const [handle, setHandle] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const userLogin = () => {
        const re = /^[A-Za-z]+$/;
        if(!handle||!re.test(handle)) {
            setError('You must enter a valid username.')
            return false;
        }
        if(!password) {
            setError('You must enter a password.')
            return false;
        }
        axios.post('/api/auth/signIn', {
            handle, password
        }).then((res)=> {
            localStorage.setItem('authToken', res.data.token);
            handleLogin(res.data.user)
            navigate('/')
        }).catch((error) => {
            setError(error)
        })
    }
  return(
      <div className={'loginScreen__form'}>
          <h1>Sign In</h1>
          <input
              type={'email'}
              placeholder={'Email Address'}
              value={'@'+handle}
              onChange={(e)=>setHandle(e.target.value.substring(1))}
          />
          <input
              type={'password'}
              placeholder={'Password'}
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
          />
          <button onClick={()=>userLogin()}>Sign In</button>
          <p>New to Amazon?
              <span onClick={()=>{navigate('/signup')}}>Sign up now</span>
          </p>
          <p style={{color:'black'}}>{error}</p>
          <p style={{fontSize:'0.8rem', fontFamily: 'ChirpBold'}}>By continuing, you agree to Twitter's Conditions of Use and Privacy Notice.
          </p>
      </div>
  )
}

export default LoginForm;
