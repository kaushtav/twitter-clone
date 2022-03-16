import React from 'react';
import './styles/Tweet.css'
import Replies from '../../assets/icons/tweet/replies.svg'
import Retweets from '../../assets/icons/tweet/retweets.svg'
import Likes from '../../assets/icons/tweet/likes.svg'
import Share from '../../assets/icons/tweet/share.svg'


const Tweet = ({tweet}) => {

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
    ]
    return(
      <div className={'tweet'}>
          <img src={tweet.picture} alt={tweet.handle}/>
          <div className={'tweet__details'}>
              <span>{tweet.name} @{tweet.handle} {tweet.timestamp}</span>
              <div className={'tweet__content'}>
                  <span>{tweet.text}</span>
                  <span>{tweet.images[0]}</span>
              </div>
          </div>
          <div className={'tweet__footer'}>
              {tweetFooter.map(item => {
                  return(
                      <div>
                          <img src={item.image} alt={item.name}/>
                          <span>{item.number}</span>
                      </div>
                  )
              })}
          </div>
      </div>
    )
}

export default Tweet;