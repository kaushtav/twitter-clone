import React, {useState} from 'react';
import './styles/CreateTweet.css'
import {user} from '../../functions'
import {useUser} from '../../context/user'

const CreteTweet = ({reload}) => {
    const {picture} = useUser();
    const [images, setImages] = useState([]);
    const [text, setText] = useState('');
    
    const handleSubmit = async event => {
        event.preventDefault();
        if(!text&&!images.length) {
            return false;
        }
        await user.createTweet({text, images});
        await reload();
    };
    
    return(
        <form onSubmit={handleSubmit} className={'tweets__createTweet'} encType='multipart/form-data'>
            <img className={'profilePic'} src={picture} alt={'user'}/>
            <textarea name={'tweet'} value={text} placeholder={'What\'s happening?'} onChange={event => setText(event.target.value)}/>
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="images"
                className={'images'}
                onChange={(e) => {
                    e.preventDefault()
                    setImages(e.target.files)
                    console.log(e.target.files)
                }}
            />
            {images.length>0&&<span>Image uploaded.</span>}
            <input className={'button'} type={'submit'} value={'Tweet'}/>

        </form>
    )
}

export default CreteTweet;