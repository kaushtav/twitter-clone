import React from 'react';

import './styles/Tweets.css'
import {Tweet} from  '../app'

const tweets = [
    {
        name: 'Kaushtav Atri',
        timestamp: '',
        handle: 'kaushtav',
        picture: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640',
        text: 'Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??Mallupura me maar, kisiki hogi haar??',
        images: [],
        likes:10,
        retweets:200,
        replies:30,
        repliedTo:null,
    },
    {
        name: 'Kaushtav Atri',
        timestamp: '',
        handle: 'kaushtav',
        picture: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640',
        text: 'Mallupura me maar, kisiki hogi haar??',
        images: [],
        likes:10,
        retweets:200,
        replies:20,
        repliedTo:null,
    },
    {
        name: 'Kaushtav Atri',
        timestamp: '',
        handle: 'kaushtav',
        picture: 'https://twirpz.files.wordpress.com/2015/06/twitter-avi-gender-balanced-figure.png?w=640',
        text: 'Mallupura me maar, kisiki hogi haar??',
        images: [],
        likes:10,
        retweets:200,
        replies:10,
        repliedTo:null,
    }
]

const Tweets = () => {
    return(
        <div className={'tweets'}>
            <h2>Tweets</h2>
            {tweets.map(tweet => {
                return <Tweet tweet={tweet}/>
            })}
        </div>
    )
}

export default Tweets;