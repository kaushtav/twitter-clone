import React, {useRef} from 'react';
import './styles/Tweet.css'
import {ProfileMin} from "../app";
import {ReactComponent as Replies} from '../../assets/icons/tweet/replies.svg'
import {ReactComponent as Retweets} from '../../assets/icons/tweet/retweets.svg'
import {ReactComponent as Likes} from '../../assets/icons/tweet/likes.svg'
import {ReactComponent as Share} from '../../assets/icons/tweet/share.svg'

const Tweet = ({user, tweet, liked, handleLike, handleRetweet}) => {

    return(
        <div className={'status__tweet'} >
            <ProfileMin user={user} button={false} />
            <div className={'status__tweetDetails'}>
                <span>{tweet.text}</span>
                {tweet.images&&tweet.images.length>0&&
                <div className={'status__tweetImages'}>
                    <img src={tweet.images[0]} alt={'tweet'}/>
                </div>}
            </div>
            <div className={'status__tweetStats'}>
                <span><span>{tweet.replies}</span> replies</span>
                <span><span>{tweet.retweets}</span> retweets</span>
                <span><span>{tweet.likes}</span> likes</span>
            </div>
            <div className={'status__buttons'}>
                <Replies/>
                <Retweets onClick={handleRetweet}/>
                <Likes className={liked?'liked':''} onClick={handleLike} fill={liked?'red':'black'}/>
                <Share/>
            </div>
        </div>
    )
}

export default Tweet;