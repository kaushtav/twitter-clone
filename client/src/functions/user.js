import axios from "axios";

const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
};

const getUser = async () => {
    try {
        if(!localStorage.getItem('authToken')){
            return null
        }
        const { data } = await axios.get('/api/user', config);
        return data.user
    } catch (error) {
        return false
    }
};

const createTweet = async (text, imageArray) => {
    const images=[]
    for (const image of Object.keys(imageArray)) {
        console.log(image)
        const formData = new FormData();
        formData.append("file", imageArray[image]);
        formData.append("tags", `review`);
        formData.append("upload_preset", "e2wh4uwf"); // Replace the preset name with your own
        formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key

        const response = await axios.post("https://api.cloudinary.com/v1_1/dwajyh7fn/image/upload", formData, {
            headers: {"X-Requested-With": "XMLHttpRequest"},
        })
        const {secure_url} = response.data
        images.push(secure_url)
    }
  try {
      await axios.post('/api/user/createTweet', {text, images},config)
  } catch (error) {
      console.log(error)
      return false
  }
}

const user = {getUser, createTweet}
export default user