import React from 'react';

import './styles/TweetsList.css'
import {TweetMin} from  '../app'

const Tweets = ({tweets}) => {
    console.log(tweets)
    return(
        <div className={'tweets'}>
            {tweets.map(tweet => {
                return <TweetMin tweet={tweet} key={tweet._id}/>
            })}
        </div>
    )
};

export default Tweets;