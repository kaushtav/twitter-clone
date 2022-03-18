import React, {useEffect, useState} from 'react';
import './styles/StatusScreen.css'
import {Main} from '../components/status'
import {Sidebar} from '../components/app'
import {tweet} from "../functions";
import {useParams} from "react-router-dom";


const StatusScreen = () => {

    const {tweetID} = useParams();
    const [tweetData, setTweetData] = useState({});
    const [profileData, setProfileData] = useState({});
    const [tweetReplies, setTweetReplies] = useState({});
    const [loading, setLoading] = useState(true);

    const reload = async (id) => {
        setLoading(true);
        const {data} = await tweet.getTweet(id);
        setTweetData(data.tweet);
        setProfileData(data.user);
        const {tweets} = await tweet.getTweets(data.tweet.repliesList);
        setTweetReplies(tweets);
        setLoading(false)
    };

    useEffect(()=>{
        reload(tweetID).then()
    },[tweetID]);

    if (loading) return null;

    return(
        <div className={'statusScreen'}>
            <Sidebar />
            <Main tweetData={tweetData} replies={tweetReplies} profileData={profileData}/>
        </div>)
};

export default StatusScreen;