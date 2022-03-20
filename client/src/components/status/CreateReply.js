import React, {useState} from 'react';
import './styles/CreateReply.css'
import {useUser} from "../../context/user";
import {user} from "../../functions";
import axios from "axios";

const CreateReply = ({profile, tweet, reload}) => {
    const {picture} = useUser();
    const [images, setImages] = useState([]);
    const [text, setText] = useState('');

    const uploadImage = async event => {
        setImages([])
        event.preventDefault()
        const imagesList=[];
        for (const image of Object.keys(event.target.files)) {
            const formData = new FormData();
            formData.append("file", event.target.files[image]);
            formData.append("tags", `review`);
            formData.append("upload_preset", "e2wh4uwf"); // Replace the preset name with your own
            formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key
            const response = await axios.post("https://api.cloudinary.com/v1_1/dwajyh7fn/image/upload", formData, {
                headers: {"X-Requested-With": "XMLHttpRequest"},
            });
            const {secure_url} = response.data;
            imagesList.push(secure_url);
        }
        console.log(imagesList)
        setImages(imagesList)
    }

    const handleSubmit = async event => {
        event.preventDefault();
        if(!text&&!images.length&&profile.handle) {
            return false;
        }
        await user.createTweet({text, images, repliedTo:tweet._id})
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
                onChange={uploadImage}
            />
            <div className={'uploadsReply'}>
                {images.length>0&&images.map(image => <img src={image} alt={'post'}/>)}
            </div>
            <input className={'button'} type={'submit'} value={'Reply'}/>
        </form>
    )
}

export default CreateReply;