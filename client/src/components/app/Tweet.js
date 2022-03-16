import React, {useEffect, useState} from 'react';
import './styles/Tweet.css'
import Replies from '../../assets/icons/tweet/replies.svg'
import Retweets from '../../assets/icons/tweet/retweets.svg'
import Likes from '../../assets/icons/tweet/likes.svg'
import Share from '../../assets/icons/tweet/share.svg'
import {tweet} from '../../functions'


const Tweet = ({tweetID}) => {
    const [tweetData,setTweetData] = useState({})
    const [loading,setLoading] = useState(true)
    useEffect(()=>{
        tweet.getTweet(tweetID).then(data => {
            setTweetData(data.data)
            setLoading(false)
        });
    },[tweetID])

    const tweetFooter = [
        {
            name:'replies',
            number:tweetData.replies,
            image:Replies
        },
        {
            name:'retweets',
            number:tweetData.retweets,
            image:Retweets
        },
        {
            name:'likes',
            number:tweetData.likes,
            image:Likes
        },
        {
            name:'share',
            number:null,
            image:Share
        },
    ]

    if (loading) return null

    return(
      <div className={'tweet'}>
          <img src={tweetData.userPicture} alt={tweet.userHandle}/>
          <div className={'tweet__details'}>
              <span className={'tweet__userName'}>{tweetData.userName}</span>
              <span> @{tweetData.handle}</span>
              <span>{'    '}5h</span>
              <div className={'tweet__content'}>
                  <span>{tweetData.text}</span>
                  {tweetData.images.length>0&&<img src={tweetData.images[0]} alt={'image'}/>}
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