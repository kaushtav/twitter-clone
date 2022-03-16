import React, {useEffect, useState} from "react";
import './styles/LandingScreen.css'
import {ping} from "../functions";
import {useNavigate} from "react-router-dom";
import {useUser} from "../context/user";


const LandingScreen = () => {
    const {id} = useUser()
    const [text, setText] = useState('hello')

    const navigate = useNavigate();
    useEffect(()=>{
        if (localStorage.getItem('authToken')) {
            navigate('/home')
        }
    },[navigate])
    useEffect(()=>{
        document.title = 'Twitter'
        ping().then(data => {
            setText(data===true?'API running':'API not running')
        })
        // ReactGA.event('page_view',{ page_location:window.location.path,client_id:id});
    },[])



    return (
        <div className={'landingScreen'}>
            <div className={'landingScreen__banner'}>
                {/*<ArrowBackIos onClick={()=>{setBannerImage(bannerImage?bannerImage-1:LANDING_SCREEN_BANNER_IMAGES.length-1)}}/>*/}
                {/*<img*/}
                {/*  className="landingScreen__bannerImage"*/}
                {/*  src={LANDING_SCREEN_BANNER_IMAGES[bannerImage]}*/}
                {/*  alt=""*/}
                {/*/>*/}
                <h1>{text}</h1>
                {/*<ArrowForwardIos style={{right:0}} onClick={()=>{setBannerImage(bannerImage===LANDING_SCREEN_BANNER_IMAGES.length-1?0:bannerImage+1)}}/>*/}
            </div>
            {/*<div  className={'landingScreen__body'}>*/}
            {/*    {LANDING_SCREEN_CARDS.map((card, index) => {*/}
            {/*      return <CardContainer card={card} key={index}/>*/}
            {/*    })}*/}
            {/*    {Object.keys(CATEGORIES).map((category, index) => {*/}
            {/*        return <RowContainer categoryID={category} key={index}/>*/}
            {/*    })}*/}
            {/*    {LANDING_SCREEN_CARDS.map((card, index) => {*/}
            {/*        return <CardContainer card={card} key={index}/>*/}
            {/*    })}*/}
            {/*</div>*/}
        </div>
    )}

export default LandingScreen;
