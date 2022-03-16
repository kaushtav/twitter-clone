import {createContext, useContext, useEffect, useReducer, useState} from "react";
import {user} from "../functions";


const UserContext = createContext(undefined);

const actions = {
    UPDATE_NAME: 'UPDATE_NAME',
    UPDATE_HANDLE: 'UPDATE_HANDLE',
    UPDATE_EMAIL: 'UPDATE_EMAIL',
    UPDATE_ID: 'UPDATE_ID',
    UPDATE_PICTURE: 'UPDATE_PICTURE',
};

function reducer(state, action) {
    console.log(action.type);
    switch (action.type) {
        case actions.UPDATE_NAME:
            return {...state,name:action.value}
        case actions.UPDATE_HANDLE:
            return {...state,handle:action.value}
        case actions.UPDATE_ID:
            return {...state,id:action.value}
        case actions.UPDATE_EMAIL:
            return {...state,email:action.value}
        case actions.UPDATE_PICTURE:
            return {...state,picture:action.value}
        default:
            return state;
    }
}


export const UserContextProvider = (props) => {
    const [loading, setLoading] = useState(true)
    const initialState = {
        id:undefined,
        handle:undefined,
        name: undefined,
        email: undefined,
        picture: 'https://abs.twimg.com/sticky/default_profile_images/default_profile_400x400.png',
    }
    const [state, dispatch] = useReducer(reducer, initialState);

    
    const handleLogin = async (user) => {
        await dispatch({type:'UPDATE_NAME', value:user.name})
        await dispatch({type:'UPDATE_ID', value:user._id})
        await dispatch({type:'UPDATE_EMAIL', value:user.email})
        await dispatch({type:'UPDATE_HANDLE', value:user.handle})
        await dispatch({type:'UPDATE_PICTURE', value:user.picture})
        setLoading(false)
    }
    const handleLogout = () => {
        localStorage.removeItem('authToken');
        dispatch({type:'UPDATE_NAME', value:undefined})
        dispatch({type:'UPDATE_ID', value:undefined})
        dispatch({type:'UPDATE_EMAIL', value:undefined})
        dispatch({type:'UPDATE_HANDLE', value:undefined})
        setLoading(false)
    }

    useEffect(()=>{
        user.getUser().then((userData) => {
            console.log(userData)
            userData ? handleLogin(userData) : handleLogout()
    })},[])

    const value = {
        id:state.id,
        name:state.name,
        email:state.email,
        picture:state.picture,
        handle:state.handle,
        handleLogin:handleLogin,
        handleLogout:handleLogout,
    }
    if (loading) return null
    return(
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => useContext(UserContext);


