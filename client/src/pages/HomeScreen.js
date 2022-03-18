import React, {useEffect, useState} from 'react';
import './styles/HomeScreen.css'
import {Main} from '../components/home'
import {Sidebar,More} from '../components/app'
import {useNavigate} from "react-router-dom";
import {user} from "../functions";

/*

TODO:
    1. ✅Create post tweet with mongo schema of tweet
    2. ✅Create "tweet" screen
    3. ✅Create User Profile
    4. ✅Create "Follow"
    5. ✅Create Settings
    6. ✅Create follow user logic
    7. List tweets from user followings
    8. ✅create tweet reply+retweet+bookmark and cascading replies
    9. ✅Setup Navbar
    10. create hashtag logic? + explore page
    11. Search functionality across tweets?
*/



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