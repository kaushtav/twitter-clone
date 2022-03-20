import React, {useEffect, useState} from 'react';
import './styles/HomeScreen.css'
import Main from '../components/home/Main'
import {Sidebar,More} from '../components/app'
import {useNavigate} from "react-router-dom";
import {user} from "../functions";

const HomeScreen = () => {
    const navigate = useNavigate();
    const [tweetsData, setTweetsData] = useState([]);
    const [loading, setLoading] = useState(true);

    const reload = async () => {
        setLoading(true);
        const {tweets} = await user.getHome();
        setTweetsData(tweets);
        setLoading(false)
    };

    useEffect(()=>{
        if (!localStorage.getItem('authToken')) {
            navigate('/')
        }
        reload().then()
    },[navigate]);

    if (loading) return null;
    return(
        <div className={'homeScreen'}>
            <Sidebar />
            <Main tweets={tweetsData} reload={reload}/>
            <More/>
        </div>)
};

export default HomeScreen;