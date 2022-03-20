import React, {useState} from 'react';
import './styles/TweetMin.css'
import Replies from '../../assets/icons/tweet/replies.svg'
import Retweets from '../../assets/icons/tweet/retweets.svg'
import Likes from '../../assets/icons/tweet/likes.svg'
import Share from '../../assets/icons/tweet/share.svg'
import {useNavigate} from "react-router-dom";
import {useUser} from "../../context/user";
import {tweet as tweetFunc, user} from "../../functions";
import {format} from "date-fns";

const TweetMin = ({tweet}) => {
    const navigate = useNavigate();
    const {likedList} = useUser();
    const likeCheck = likedList.includes(tweet._id);
    const [liked, setLiked] = useState(likeCheck)

    const handleLike = () => {
        liked?tweet.likes--:tweet.likes++;
        liked?tweetFunc.unlikeTweet(tweet._id):tweetFunc.likeTweet(tweet._id);
        setLiked(!liked)
    };

    const handleRetweet = () => {
        user.createTweet({text:tweet.text, images:tweet.images,retweetFrom:tweet._id}).then(()=>{
            setLiked(true)
            tweet.retweets++
            setLiked(false)
        })
    }

    return(
      <div className={'tweet'} >
          <img src={tweet.picture} alt={tweet.handle}  onClick={()=>navigate(`/user/${tweet.userID}`)}/>
          <div className={'tweet__details'} onClick={()=>navigate(`/status/${tweet._id}`)}>
              <span className={'tweet__userName'}>{tweet.name}</span>
              <span> @{tweet.handle}</span>
              <span>{'  ·  '+format(new Date(tweet.timestamp), 'hh:mmaa d MMM')}</span>
              <div className={'tweet__content'}>
                  <span>{tweet.text}</span>
                  {tweet.images.length?<img src={tweet.images[0]} alt={'tweet'}/>:null}
              </div>
          </div>
          <div className={'tweet__footer'}>
              <div>
                  <img src={Replies} alt={'reply'} onClick={()=>{navigate(`/status/${tweet._id}`)}}/>
                  <span>{tweet.replies}</span>
              </div>
              <div>
                  <img src={Retweets} alt={'retweet'} onClick={handleRetweet}/>
                  <span>{tweet.retweets}</span>
              </div>
              <div >
                  <img src={Likes} alt={'likes'} onClick={handleLike} style={{background:liked?'#f3c3c3':'transparent'}}/>
                  <span>{tweet.likes}</span>
              </div>
              <div >
                  <img src={Share} alt={'share'}/>
              </div>
          </div>
      </div>
    )
};

export default TweetMin;