import React from 'react';

import './styles/ProfilesList.css'
import ProfileMin from "./ProfileMin";

const ProfilesList = ({profiles}) => {
    return(
        <div className={'tweets'}>
            {profiles.map(profile => {
                return <ProfileMin user={profile} button={false} key={profile._id}/>
            })}
        </div>
    )
};

export default ProfilesList;