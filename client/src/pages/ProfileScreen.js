import React, {useEffect, useState} from 'react';
import './styles/ProfileScreen.css'
import {Sidebar} from '../components/app'
import Main from "../components/profile/Main";
import {user} from "../functions";
import {useParams} from "react-router-dom";
import {useUser} from "../context/user";

const ProfileScreen = ({self}) => {
    const {id} = useUser();
    let {profileID} = useParams();
    if (self) profileID = id;
    const [loading, setLoading] = useState(true);
    const [profileData, setProfileData] = useState({});
    const [tweetsData, setTweetsData] = useState([]);
    const [followerData, setFollowerData] = useState([]);
    const [followingData, setFollowingData] = useState([]);

    const reload = async () => {
        const {profile,tweets} = await user.getProfile(profileID);
        setProfileData(profile);
        setTweetsData(tweets);
        const data = await user.getProfiles(profile.followerList);
        setFollowerData(data.profiles);
        const dataF = await user.getProfiles(profile.followingList);
        setFollowingData(dataF.profiles);
        setLoading(false)
    };


    useEffect(()=>{
        reload().then()
    },[profileID]);

    if (loading) return null;

    return(
        <div className={'profileScreen'}>
            <Sidebar />
            <Main profile={profileData} tweets={tweetsData} followers={followerData} followings={followingData} />
        </div>)
};

export default ProfileScreen;