import React, {useState} from "react";
import './styles/signupForm.css'
import {useNavigate} from "react-router-dom";
import {auth} from '../../functions'
import {useUser} from "../../context/user";

const SignupForm = () => {
    const navigate = useNavigate()
    const {handleLogin} = useUser()
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [handle, setHandle] = useState("");
    const [name, setName] = useState("");
    const [error, setError] = useState("")

    const register = (e) => {
        e.preventDefault()
        if(!name) {
            setError('You must enter a name.')
            return false;
        }
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if(!email||!re.test(email)) {
            setError('You must enter a valid email address.')
            return false;
        }
        if (!handle){
            setError('You must enter a valid handle.')
            return false;
        }
        if(!password) {
            setError('You must enter a password.')
            return false;
        }
        auth.signUp({name, handle, email, password}).then((data) => {
            setError('')
            localStorage.setItem('authToken', data.token);
            handleLogin(data.user)
            navigate('/home')
        }).catch((error) => {
            console.error(error)
            setError(`Email ID or username already exists. Try logging in`)
        })
    }

    return(
        <div className={'signupScreen__form'}>
          <h1>Sign Up</h1>
            <input
                value={name}
                onChange={(e)=>setName(e.target.value)}
                type={'text'}
                placeholder={'Name'}
            />
            <input
                value={'@'+handle}
                onChange={(e)=>setHandle(e.target.value.substring(1))}
                type={'text'}
            />
          <input
              value={email}
              onChange={(e)=>setEmail(e.target.value)}
              type={'email'}
              placeholder={'Email'}
          />
          <input
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              type={'password'}
              placeholder={'Password'}
          />
          <p id={'signupScreen__error'}>{error}</p>
          <button onClick={register}>Sign Up</button>
          <div/>
          <p>Already a user?
              <span onClick={()=>{navigate('/login')}}>Sign in now</span>
          </p>
        </div>
    )
}

export default SignupForm;
