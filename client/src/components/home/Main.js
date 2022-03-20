import React from 'react';
import './styles/Main.css'
import {TweetsList} from '../app'
import CreateTweet from './CreateTweet'
import {useUser} from "../../context/user";

const Main = ({tweets, reload}) => {
    const {followingList} = useUser()
    return(
        <div className={'main'}>
            <div style={{height:'5vh'}}/>
            <CreateTweet reload={reload}/>
            {followingList.length===0&&<span>Wow this looks empty. <br/>Follow someone to see their tweets in your feed </span>}
            <TweetsList tweets={tweets}/>
        </div>
    )
}

export default Main;