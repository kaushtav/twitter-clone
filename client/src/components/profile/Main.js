import React, {useEffect, useState} from 'react';
import './styles/Main.css'
import ProfileBanner from "./ProfileBanner";
import {TweetsList, ProfilesList, Header} from "../app";
import {useUser} from "../../context/user";
import {user} from "../../functions";

const Main = ({profile, tweets, followers, followings}) => {
    const {id,name,handle,picture, followingList,updateUser} = useUser();
    const followCheck = followingList.includes(profile._id);
    const [following, setFollowing] = useState(followCheck);
    const [view, setView] = useState('tweets');

    useEffect(()=>{
        setView('tweets')
    },[profile._id])

    const handleFollow = () => {
        user.followUser(profile._id).then(() => {});
        followers.push({_id:id,name,handle,picture});
        profile.followers++;
        updateUser();
        setFollowing(true)
    };
    const handleUnfollow = async ()=> {
        user.unfollowUser(profile._id).then(() => {});
        profile.followers--;
        const index = followers.map(function(item) {
            return item._id
        }).indexOf(id);
        followers.splice(index, 1);
        updateUser();
        setFollowing(false)
    };

    return(
        <div className={'profile__main'}>
            <Header text={'Profile'}/>
            <ProfileBanner
                profile={profile}
                following={following}
                handleFollow={handleFollow}
                handleUnfollow={handleUnfollow}
            />
            <div className={'profile__profileStats'}>
                <span><span>{profile.tweets}</span> tweets</span>
                <span><span>{profile.followers}</span> followers</span>
                <span><span>{profile.following}</span> following</span>
            </div>
            <div className={'profile__profileViews'}>
                <span
                    onClick={()=>{setView('tweets')}}
                    style={{background:view==='tweets'?'rgba(0,0,0,0.2)':null}}>
                    Tweets
                </span>
                <span
                    onClick={()=>{setView('followers')}}
                    style={{background:view==='followers'?'rgba(0,0,0,0.2)':null}}>
                    Followers
                </span>
                <span
                    onClick={()=>{setView('followings')}}
                    style={{background:view==='followings'?'rgba(0,0,0,0.2)':null}}>
                    Followings
                </span>
            </div>
            {(()=>{
                switch(view){
                    case 'tweets':
                        return <TweetsList tweets={tweets}/>
                    case 'followers':
                        return <ProfilesList profiles={followers}/>
                    case 'followings':
                        return <ProfilesList profiles={followings}/>
                }
            })()}
        </div>
    )
};

export default Main;