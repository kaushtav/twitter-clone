import {api} from "./index";

const config = {
    headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorage.getItem('authToken')}`,
    },
};

const getTweet = async (tweetID) => {
    try {
        if(!localStorage.getItem('authToken')){
            return null
        }
        const { data } = await api.post('/api/tweet/getTweet', {tweetID},config);
        return data
    } catch (error) {
        return false
    }
};
const getTweets = async (tweetArray) => {
    try {
        if(!localStorage.getItem('authToken')){
            return null
        }
        const {data} = await api.post('/api/tweet/getTweets', {tweetArray},config);
        return data
    } catch (error) {
        return false
    }
};

const likeTweet = async tweetID => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    console.log('like')
    try {
        await api.post('/api/tweet/likeTweet', {tweetID}, config);
        return true
    } catch (error) {
        console.error(error);
        return false
    }
};

const unlikeTweet = async tweetID => {
    const config = {
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${localStorage.getItem('authToken')}`,
        },
    };
    try {
        await api.post('/api/tweet/unlikeTweet', {tweetID}, config);
        return true
    } catch (error) {
        console.error(error);
        return false
    }
};

const tweet = {getTweet, getTweets, likeTweet, unlikeTweet};
export default tweet;