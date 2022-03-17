import React from 'react';

import './styles/Main.css'
import {TweetsList} from '../app'
import CreateTweet from './CreateTweet'

const Main = ({tweets}) => {
    return(
        <div className={'main'}>
            <h2>Home</h2>
            <CreateTweet/>
            <TweetsList tweets={tweets}/>
        </div>
    )
}

export default Main;