const {Tweet, User} = require("../models");
const mongoose = require("mongoose");

exports.getTweet = async (req, res, next) => {
    const {tweetID} = req.body;
    try {
        const tweet = await Tweet.findById(tweetID);
        const user = await User.findById(tweet.userID);
        const data = {tweet, user};
        return res.status(200).json({
            success: true,
            data
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            error:e.message
        })
    }
};
exports.getTweets = async (req, res, next) => {
    const tweetArray = req.body.tweetArray.map(function(el) { return mongoose.Types.ObjectId(el) });
    const perPage = 100
    const page = 1
    const item = await Tweet.aggregate(
        [
            { $match: {_id : {$in : [...tweetArray]}}},
            {$lookup: {
                    from: 'users',
                    localField:'userID',
                    foreignField:'_id',
                    as: "profile"
                }},
            {$unwind:"$profile"},
            {$addFields:{"name":"$profile.name", "handle":"$profile.handle", "picture":"$profile.picture"}},
            { $sort: { timestamp:-1 }},
            { $project: {_id:1,
                    images:1,
                    text:1,
                    userID:1,
                    replies:1,
                    retweets:1,
                    likes:1,
                    timestamp:1,
                    name:1,
                    handle:1,
                    picture:1,
                } }
        ]
    );
    console.log(item)
    return res.status(200).json({
        success:true,
        tweets:item
    })
};


exports.likeTweet = async (req, res, next) => {
    const {tweetID} = req.body;
    try {
        const profile = await User.findById(req.user._id);
        profile.likedList.push(tweetID);
        profile.save();
        const tweet = await Tweet.findById(tweetID);
        tweet.likes++;
        tweet.save();
        return res.status(200).json({
            success: true,
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            error:e.message
        })

    }
};

exports.unlikeTweet = async (req, res, next) => {
    const {tweetID} = req.body;
    try{
        const profile = await User.findById(req.user._id);
        profile.likedList.remove(tweetID);
        profile.save();
        const tweet = await Tweet.findById(tweetID);
        tweet.likes--;
        tweet.save();
        return res.status(200).json({
            success: true,
        })
    } catch (e) {
        return res.status(500).json({
            success: false,
            error:e.message
        })

    }
};


