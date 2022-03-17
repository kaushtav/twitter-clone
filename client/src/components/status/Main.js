import React from 'react';

import './styles/Main.css'
import Tweet from "./Tweet";
import CreateReply from "./CreateReply";
import {TweetsList} from "../app";

const Main = ({tweetData, replies}) => {
    const profile = {
        name: tweetData.userName,
        id: tweetData.userID,
        picture: tweetData.userPicture,
        handle: tweetData.userHandle
    };
    console.log(tweetData);
    const tweetDetails = {
        id:tweetData._id,
        text:tweetData.text,
        images:tweetData.images,
        timestamp:tweetData.timestamp,
        retweets:tweetData.retweets,
        likes:tweetData.likes,
        replies:tweetData.replies
    };
    return(
        <div className={'status__main'}>
            <h2>Back Button & Tweet</h2>
            <Tweet user={profile} tweet={tweetDetails}/>
            <CreateReply profile={profile} tweet={tweetDetails}/>
            <TweetsList tweets={replies}/>
        </div>
    )
}

export default Main;