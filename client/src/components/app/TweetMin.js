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
import ReactTooltip from "react-tooltip";

const TweetMin = ({tweet, retweet, reply}) => {
    const navigate = useNavigate();
    const {likedList, retweetList, updateUser} = useUser();
    const likeCheck = likedList.includes(tweet._id);
    const retweetCheck = retweetList.includes(tweet._id);
    const [liked, setLiked] = useState(likeCheck)
    const [retweeted, setRetweeted] = useState(retweetCheck)
    console.log(tweet)
    const handleLike = () => {
        liked?tweet.likes--:tweet.likes++;
        liked?tweetFunc.unlikeTweet(tweet._id):tweetFunc.likeTweet(tweet._id);
        updateUser()
        setLiked(!liked)
    };

    const handleRetweet = () => {
        if(retweeted) {return false}
        user.createTweet({text:tweet.text, images:tweet.images,retweetFrom:tweet._id}).then(()=>{
            tweet.retweets++
            updateUser();
            setRetweeted(true)
        })
    }

    return(
      <div className={retweet?'tweet retweet':reply?'tweet reply':'tweet'} >
          <ReactTooltip
              className={'tweet__reactTooltip'}
              place={'bottom'}
              backgroundColor={'rgba(0,0,0)'}
          />
          {tweet.repliedTo && Object.keys(tweet.repliedTo).length>0?<TweetMin tweet={tweet.repliedTo} reply/>:null}
          <div className={'reply__line'}/>
          <div className={'tweet__container'}>

              <img src={tweet.picture} alt={tweet.handle}  onClick={()=>navigate(`/user/${tweet.userID}`)}/>
              <div className={'tweet__details'}>
                  <span className={'tweet__userName'}  onClick={()=>navigate(`/user/${tweet.userID}`)}>{tweet.name}</span>
                  <span onClick={()=>navigate(`/user/${tweet.userID}`)}> @{tweet.handle}</span>
                  <span>{'  ·  '+format(new Date(tweet.timestamp), 'hh:mmaa d MMM')}</span>
                  {tweet.retweetFrom&&Object.keys(tweet.retweetFrom).length?
                      <div className={'tweet__content'}>
                        <span className={'tweet__retweeted'}>
                          Retweeted
                          <img src={Retweets} alt={'re'}/>
                          <br />
                        </span>
                          <TweetMin retweet classname={'tweet__retweet'} tweet={tweet.retweetFrom}/>
                      </div>
                      :
                      <div className={'tweet__content'} onClick={()=>navigate(`/status/${tweet._id}`)}>
                          <span style={{minHeight:tweet.images.length?'0px':'40px'}}>
                              {tweet.text}
                              <br/>
                              {tweet.images.length?<img className={'tweet__image'} src={tweet.images[0]} alt={'tweet'}/>:null}
                            </span>
                      </div>
                  }
              </div>
          </div>
          <div className={'tweet__footer'}>
              <div data-tip={'Reply'}>
                  <img src={Replies} alt={'reply'} onClick={()=>{navigate(`/status/${tweet._id}`)}}/>
                  <span>{tweet.replies}</span>
              </div>
              <div data-tip={'Retweet'}>
                  <img src={Retweets} alt={'retweet'} style={{background:retweeted?'#bcccea':'transparent'}} onClick={handleRetweet}/>
                  <span>{tweet.retweets}</span>
              </div>
              <div data-tip={'Like'}>
                  <img src={Likes} alt={'likes'} onClick={handleLike} style={{background:liked?'#f3c3c3':'transparent'}}/>
                  <span>{tweet.likes}</span>
              </div>
              <div data-tip={'Bookmark'}>
                  <img src={Share} alt={'share'}/>
              </div>
          </div>
      </div>
    )
};

export default TweetMin;