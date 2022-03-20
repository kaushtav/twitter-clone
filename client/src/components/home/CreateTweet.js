import React, {useState} from 'react';
import './styles/CreateTweet.css'
import {user} from '../../functions'
import {useUser} from '../../context/user'
import axios from "axios";

const CreteTweet = ({reload}) => {
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
                onChange={uploadImage}
            />
            <div className={'uploads'}>
                {images.length>0&&images.map(image => <img src={image} alt={'post'}/>)}
            </div>
            <input className={'button'} type={'submit'} value={'Tweet'}/>

        </form>
    )
}

export default CreteTweet;