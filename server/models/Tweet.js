const mongoose = require("mongoose");
const TweetSchema = new mongoose.Schema({
    userID: {
        type: mongoose.Schema.Types.ObjectId,
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
        type:mongoose.Schema.Types.ObjectId,
    },
    retweetFrom: {
        type:mongoose.Schema.Types.ObjectId,
    },
    repliesList: {
        type: Array,
        default:[]
    }
});

const Tweet = mongoose.model('tweets', TweetSchema);

module.exports = Tweet;
