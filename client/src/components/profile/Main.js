import React, {useState} from 'react';
import './styles/Main.css'
import ProfileBanner from "./ProfileBanner";
import {TweetsList, ProfilesList, Header} from "../app";
import {useUser} from "../../context/user";
import {user} from "../../functions";

const Main = ({profile, tweets, followers}) => {
    const {id,name,handle,picture, followingList,updateUser} = useUser();
    const followCheck = followingList.includes(profile._id);
    const [following, setFollowing] = useState(followCheck);
    const [view, setView] = useState('tweets');

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
                <span onClick={()=>{setView('tweets')}}>Tweets</span>
                <span onClick={()=>{setView('followers')}}>Followers</span>
            </div>
            {view === 'tweets'?
                <TweetsList tweets={tweets}/>:
                <ProfilesList profiles={followers}/>
            }
        </div>
    )
};

export default Main;