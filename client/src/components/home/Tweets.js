import React, {useState} from 'react';

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
        tags:[],
        mentions:[],
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
        tags:[],
        mentions:[],
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
        tags:[],
        mentions:[],
    },
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
        tags:[],
        mentions:[],
    },
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
        tags:[],
        mentions:[],
    },
]
const handleSubmit = () => {

}

const Tweets = () => {
    const [tweet,setTweet] = useState('')
    return(
        <div className={'tweets'}>
            <h2>Home</h2>
            <form onSubmit={handleSubmit} className={'tweets__createTweet'} encType='multipart/form-data'>
                <img src={tweets[0].picture} alt={'user'}/>
                <textarea name={'tweet'} value={tweet} placeholder={'What\'s happening?'} onChange={event => setTweet(event.target.value)}/>
                <input
                    type="file"
                    multiple
                    accept=".png, .jpg, .jpeg"
                    name="images"
                    className={'images'}
                    onChange={(e) => {
                        e.preventDefault()
                        // setImageArray(e.target.files)
                    }}
                />
                <input className={'button'} type={'submit'} value={'Tweet'}/>
            </form>
            {tweets.map(tweet => {
                return <Tweet tweet={tweet}/>
            })}
        </div>
    )
}

export default Tweets;