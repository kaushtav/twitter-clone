import axios from "axios";

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
        const { data } = await axios.post('/api/tweet/getTweet', {tweetID},config);
        return data
    } catch (error) {
        return false
    }
};

const tweet = {getTweet}
export default tweet;