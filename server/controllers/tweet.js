const {Tweet} = require("../models");

exports.getTweet = async (req, res, next) => {
    const {tweetID} = req.body;
    const data = await Tweet.findById(tweetID);
    return res.status(200).json({
        success:true,
        data
    })
};
exports.getTweets = async (req, res, next) => {
    const {tweetArray} = req.body;
    const tweets = await Tweet.find(
        {_id:{$in:tweetArray}},
        {images:1, text:1, userName:1,userPicture:1,userHandle:1,replies:1, retweets:1,likes:1, timestamp:1},
    ).sort({timestamp:-1});
    return res.status(200).json({
        success:true,
        tweets
    })

};


