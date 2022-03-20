import React, {useState} from 'react';
import './styles/CreateReply.css'
import {useUser} from "../../context/user";
import {user} from "../../functions";

const CreateReply = ({profile, tweet, reload}) => {
    const {picture} = useUser();
    const [images, setImages] = useState([]);
    const [text, setText] = useState('');

    const handleSubmit = async event => {
        event.preventDefault();
        if(!text&&!images.length&&profile.handle) {
            return false;
        }
        await user.createTweet({text, images, repliedUser:profile.handle, repliedTo:tweet._id})
        await reload()
    };

    return(
        <form onSubmit={handleSubmit} className={'tweets__createReply'} encType='multipart/form-data'>
            <img src={picture} alt={'user'}/>
            <textarea
                name={'tweet'}
                value={text}
                placeholder={`Reply To @${profile.handle}`} onChange={event => setText(event.target.value)}/>
            <input
                type="file"
                accept=".png, .jpg, .jpeg"
                name="images"
                className={'images'}
                onChange={(e) => {
                    e.preventDefault()
                    setImages(e.target.files)
                }}
            />
            {images.length>0&&<span>Image uploaded.</span>}
            <input className={'button'} type={'submit'} value={'Reply'}/>
        </form>
    )
}

export default CreateReply;