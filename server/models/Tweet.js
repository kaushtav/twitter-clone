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
        default:[]
    },
    mentions: {
        type:Array,
        default:[]
    },
    timestamp: {
        type:Date,
        default:Date.now(),
    },
    likes: {
        type:Number,
        default:0
    },
    retweets: {
        type:Number,
        default:0
    },
    replies: {
        type:Number,
        default:0
    },
    repliedTo: {
        type:String
    },
    repliedUser: {
        type:String,
        default:0
    },
    repliesList: {
        type: Array,
        default:[]
    }
});

const Tweet = mongoose.model('tweets', TweetSchema)

module.exports = Tweet;
