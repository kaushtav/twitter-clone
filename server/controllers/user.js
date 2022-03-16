const {User,Tweet} = require("../models");
const ErrorResponse = require('../utils/errorResponse');

exports.getUser = async (req, res, next)=>{
    return res.status(200).json({
        success:true,
        user:req.user,
    });
}
exports.createTweet = async (req, res, next)=>{
    const {text, images} = req.body;
    //TODO: extract mentions and tags
    try {
        const {_id} = await Tweet.create({
            userID:req.user.id,
            userName:req.user.name,
            userHandle:req.user.handle,
            userPicture:req.user.picture,
            user:req.user.name,
            text,
            images,
            tags:[],
            mentions:[],
            timestamp: Date.now(),
            likes:0,
            retweets:0,
            replies:0,
            repliedTo:null,
            repliesList:[]
        });
        return res.status(200).json({id:_id})
    } catch (error) {
        console.log(error)
        error.status = 403
        next(error);
    }
}
