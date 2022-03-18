import React from 'react';

import './styles/Main.css'
import {Header, TweetsList} from '../app'
import CreateTweet from './CreateTweet'

const Main = ({tweets, reload}) => {
    return(
        <div className={'main'}>
            <div style={{height:'5vh'}}/>
            <CreateTweet reload={reload}/>
            <TweetsList tweets={tweets}/>
        </div>
    )
}

export default Main;