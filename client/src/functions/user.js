import {api} from "./index";

const getUser = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    try {
        if(!localStorage.getItem('authToken')){
            return null
        }
        const { data } = await api.get('/api/user', config);
        return data.user
    } catch (error) {
        console.log(error);
        return false
    }
};

const createTweet = async tweet => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    const images=[];
    for (const image of Object.keys(tweet.images)) {
        const formData = new FormData();
        formData.append("file", tweet.images[image]);
        formData.append("tags", `review`);
        formData.append("upload_preset", "e2wh4uwf"); // Replace the preset name with your own
        formData.append("api_key", "1234567"); // Replace API key with your own Cloudinary key

        const response = await api.post("https://api.cloudinary.com/v1_1/dwajyh7fn/image/upload", formData, {
            headers: {"X-Requested-With": "XMLHttpRequest"},
        });
        const {secure_url} = response.data;
        images.push(secure_url);
    }
    tweet.images = images;
    try {
      await api.post('/api/user/createTweet', {tweet},config)
  } catch (error) {
      console.log(error);
      return false
  }
};

const getProfile = async profileID => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    try {
        if(!localStorage.getItem('authToken')){
            return null
        }
        const {data} = await api.post('/api/user/getProfile', {profileID},config);
        return data
    } catch (error) {
        console.error(error);
        return false
    }

};

const getProfiles = async (profileArray) => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    try {
        if(!localStorage.getItem('authToken')){
            return null
        }
        const {data} = await api.post('/api/user/getProfiles', {profileArray},config);
        return data
    } catch (error) {
        console.error(error);
        return false
    }
};

const getHome = async () => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    try {
        const {data} = await api.get('/api/user/getHome',config);
        return data
    } catch (error) {
        console.error(error);
        return false
    }
};

const followUser = async profileID => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    try {
        console.log('here')
        await api.post('/api/user/followUser', {profileID}, config);
        return true
    } catch (error) {
        console.error(error);
        return false
    }
};

const unfollowUser = async profileID => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    try {
        await api.post('/api/user/unfollowUser', {profileID}, config);
        return true
    } catch (error) {
        console.error(error);
        return false
    }
};

const updateProfile = async profile => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    console.log(profile)
    try {
        await api.post('/api/user/updateProfile', {profile}, config);
        return true
    } catch (error) {
        console.error(error);
        return false
    }
};



const user = {getUser, createTweet, getProfile, getProfiles, getHome, followUser, unfollowUser, updateProfile};
export default user