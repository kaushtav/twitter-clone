import React, {useState} from "react";
import './styles/loginForm.css'
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/user";
import {auth} from "../../functions";

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
        auth.signIn({handle, password}).then((data)=> {
            localStorage.setItem('authToken', data.token);
            handleLogin(data.user)
            navigate('/')
        }).catch((error) => {
            console.error(error.message)
            setError("Wrong username/password")
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
          <p id={'loginScreen__error'}>{error}</p>
          <button onClick={()=>userLogin()}>Sign In</button>
          <p>New to Twitter?
              <span onClick={()=>{navigate('/signup')}}>Sign up now</span>
          </p>
      </div>
  )
}

export default LoginForm;
