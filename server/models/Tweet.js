const mongoose = require("mongoose");
const TweetSchema = new mongoose.Schema({
    userName: {
        type: String,
        required:true,
    },
    userID: {
        type: String,
        required:true,
    },
    userPicture: {
        type: String
    },
    userHandle: {
        type: String,
        required:true,
    },
    text: {
        type: String,
    },
    images: {
        type:Array,
    },
    tags: {
        type:Array,
    },
    mentions: {
        type:Array,
    },
    timestamp: {
        type:Date,
    },
    likes: {
        type:Number,
    },
    retweets: {
        type:Number,
    },
    replies: {
        type:Number,
    },
    repliedTo: {
        type:String
    },
    repliesList: {
        type: Array
    }
});

const Tweet = mongoose.model('tweets', TweetSchema)

module.exports = Tweet;
