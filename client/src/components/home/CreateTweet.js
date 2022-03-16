import React, {useState} from 'react';
import './styles/CreateTweet.css'
import {user} from '../../functions'
import {useUser} from '../../context/user'

const CreteTweet = () => {
    const {picture} = useUser();
    const [images, setImages] = useState([]);
    const [tweet, setTweet] = useState('');
    
    const handleSubmit = async event => {
        event.preventDefault();
        console.log()
        if(!tweet&&!images.length) {
            return false;
        }
        user.createTweet(tweet, images)
    }
    
    return(
        <form onSubmit={handleSubmit} className={'tweets__createTweet'} encType='multipart/form-data'>
            <img src={picture} alt={'user'}/>
            <textarea name={'tweet'} value={tweet} placeholder={'What\'s happening?'} onChange={event => setTweet(event.target.value)}/>
            <input
                type="file"
                multiple
                accept=".png, .jpg, .jpeg"
                name="images"
                className={'images'}
                onChange={(e) => {
                    e.preventDefault()
                    setImages(e.target.files)
                }}
            />
            <input className={'button'} type={'submit'} value={'Tweet'}/>
        </form>
    )
}

export default CreteTweet;