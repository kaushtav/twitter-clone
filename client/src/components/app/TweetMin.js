import React from 'react';
import './styles/TweetMin.css'
import Replies from '../../assets/icons/tweet/replies.svg'
import Retweets from '../../assets/icons/tweet/retweets.svg'
import Likes from '../../assets/icons/tweet/likes.svg'
import Share from '../../assets/icons/tweet/share.svg'
import {useNavigate} from "react-router-dom";


const TweetMin = ({tweet}) => {
    const navigate = useNavigate();

    const tweetFooter = [
        {
            name:'replies',
            number:tweet.replies,
            image:Replies
        },
        {
            name:'retweets',
            number:tweet.retweets,
            image:Retweets
        },
        {
            name:'likes',
            number:tweet.likes,
            image:Likes
        },
        {
            name:'share',
            number:null,
            image:Share
        },
    ];

    return(
      <div className={'tweet'} onClick={()=>navigate(`/status/${tweet._id}`)}>
          <img src={tweet.userPicture} alt={tweet.userHandle}/>
          <div className={'tweet__details'}>
              <span className={'tweet__userName'}>{tweet.userName}</span>
              <span> @{tweet.userHandle}</span>
              <span>{'  ·  '}{tweet.timestamp}</span>
              <div className={'tweet__content'}>
                  <span>{tweet.text}</span>
                  {tweet.images.length?<img src={tweet.images[0]} alt={'tweet'}/>:null}
              </div>
          </div>
          <div className={'tweet__footer'}>
              {tweetFooter.map(item => {
                  return(
                      <div key={item.name}>
                          <img src={item.image} alt={item.name} key={item.name}/>
                          <span>{item.number}</span>
                      </div>
                  )
              })}
          </div>
      </div>
    )
};

export default TweetMin;