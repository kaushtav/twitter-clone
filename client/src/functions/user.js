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