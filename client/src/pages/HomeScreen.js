import React, {useEffect} from 'react';
import './styles/HomeScreen.css'
import {Tweets, More} from '../components/home'
import {Sidebar} from '../components/app'
import {useNavigate} from "react-router-dom";

/*

TODO:
    1. ✅Create post tweet with mongo schema of tweet
    2. Create "tweet" screen
    3. Create User Profile
    4. Crate "Who to Follow"
    5. Create Settings
    6. Create follow user logic
    7. List tweets from user followings
    8. create tweet reply+retweet+bookmark and cascading replies
    9. Setup Navbar
    10. create hashtag logic? + explore page
    11. Search functionality across tweets?
    12. Messaging?


*/



const HomeScreen = () => {
    const tweetsList = ['62325a05f2de49f9ac701cab','62324724d1a28ef533d621ff', '6232480b557e151aa46426fd','623249ad542369d34ed7579c','62325640aceb1bf485e8164f']
    const navigate = useNavigate();
    useEffect(()=>{
        if (!localStorage.getItem('authToken')) {
            navigate('/')
        }
    },[navigate])
    return(
        <div className={'homeScreen'}>
            <Sidebar />
            <Tweets tweets={tweetsList}/>
            <More/>
        </div>)
}

export default HomeScreen;