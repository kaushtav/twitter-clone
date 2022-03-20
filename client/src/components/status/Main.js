import React, {useState} from 'react';
import './styles/Main.css'
import Tweet from "./Tweet";
import CreateReply from "./CreateReply";
import {Header, TweetsList} from "../app";
import {tweet, user} from "../../functions";
import {useUser} from "../../context/user";

const Main = ({tweetData, profileData, replies, reload}) => {

    const {likedList, retweetList} = useUser();
    const likeCheck = likedList.includes(tweetData._id);
    const retweetCheck = retweetList.includes(tweetData._id);
    const [liked, setLiked] = useState(likeCheck)
    const [retweeted, setRetweeted] = useState(retweetCheck)

    const handleLike = () => {
        liked?tweetData.likes--:tweetData.likes++;
        liked?tweet.unlikeTweet(tweetData._id):tweet.likeTweet(tweetData._id);
        setLiked(!liked)
    };

    const handleRetweet = () => {
        if(retweeted) {return false}
        user.createTweet({text:tweetData.text, images:tweetData.images,retweetFrom:tweetData._id}).then(()=>{
            tweetData.retweets++
            setRetweeted(true)
        })
    }

    const tweetDetails = {
        _id:tweetData._id,
        text:tweetData.text,
        images:tweetData.images,
        timestamp:tweetData.timestamp,
        retweets:tweetData.retweets,
        likes:tweetData.likes,
        replies:tweetData.replies,
        name: profileData.name,
        handle:profileData.handle,
        picture: profileData.picture
    };
    return(
        <div className={'status__main'}>
            <Header text={'Tweet'}/>
            <Tweet user={profileData} tweet={tweetDetails} liked={liked} retweeted={retweeted} handleLike={handleLike} handleRetweet={handleRetweet}/>
            <CreateReply profile={profileData} tweet={tweetDetails} reload={reload}/>
            <TweetsList tweets={replies}/>
        </div>
    )
};

export default Main;