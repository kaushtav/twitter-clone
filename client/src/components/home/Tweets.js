import React, {useState} from 'react';

import './styles/Tweets.css'
import {Tweet} from  '../app'
import {useUser} from '../../context/user'
import CreateTweet from './CreateTweet'

const Tweets = ({tweets}) => {
    const {id,name,handle} = useUser()
    const user = {
        picture: 'https://pbs.twimg.com/profile_images/657118778707218432/t54TjLw6_400x400.jpg',
        name: name,
        handle: handle
    }
    return(
        <div className={'tweets'}>
            <h2>Home</h2>
            <CreateTweet/>
            {tweets.map(tweetID => {
                return <Tweet tweetID={tweetID} key={tweetID}/>
            })}
        </div>
    )
}

export default Tweets;