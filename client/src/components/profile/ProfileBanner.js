import React from 'react';

import './styles/ProfileBanner.css'
import {useUser} from "../../context/user";

const ProfileBanner = ({profile, following, handleFollow, handleUnfollow}) => {
    const {id} = useUser();
    return(
        <div className={'profile__banner'}>
            <img src={profile.picture} alt={'profile'}/>
            <div>
                <p>{profile.name}</p>
                <p className={'handle'}>@{profile.handle}</p>
            </div>
            {profile._id!==id&&
                <button
                    onClick={following?handleUnfollow:handleFollow}>
                    {following?'Following':'Follow'}
                </button>
            }
        </div>
    )
}

export default ProfileBanner;