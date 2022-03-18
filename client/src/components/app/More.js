import React, {useEffect, useState} from 'react';

import './styles/More.css'
import {user} from "../../functions";
import ProfilesList from "./ProfilesList";

const More = () => {

    const [profilesData, setProfilesData] = useState([])

    useEffect(() => {
        user.getProfiles().then((profiles)=>{
            setProfilesData(profiles.profiles)
        })
    },[])
    return(
        <div className={'more'}>
            <h3>Who to Follow</h3>
            <ProfilesList profiles={profilesData}/>
        </div>
    )
}

export default More;