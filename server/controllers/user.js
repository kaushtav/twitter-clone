const {User,Tweet} = require("../models");
const ErrorResponse = require('../utils/errorResponse');

exports.getUser = async (req, res, next)=>{
    return res.status(200).json({
        success:true,
        user:req.user,
    });
}
exports.createTweet = async (req, res, next)=>{
    const {text, images, repliedUser,repliedTo} = req.body.tweet;

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
            repliedTo,
            repliedUser,
        });
        if(repliedTo){
            const repliedTweet = await Tweet.findById(repliedTo);
            repliedTweet.replies++;
            repliedTweet.repliesList.push(_id);
            repliedTweet.save()
        }
        const user = await User.findById(req.user.id);
        user.tweets++;
        user.save();
        return res.status(200).json({id:_id})
    } catch (error) {
        console.log(error);
        error.status = 403;
        next(error);
    }
};


exports.getHome = async (req, res, next)=> {
    const tweets = await Tweet.find(
        {},
        {images:1, text:1, userName:1,userPicture:1,userHandle:1,replies:1, retweets:1,likes:1, timestamp:1},
    ).sort({timestamp:-1});
    return res.status(200).json({
        success:true,
        tweets
    })
};


exports.getProfile = async (req, res, next)=> {
    const {profileID} = req.body;
    const profile = await User.findById(profileID);
    const tweets = await Tweet.find({userID:profileID},
        {images:1, text:1, userName:1,userPicture:1,userHandle:1,replies:1, retweets:1,likes:1, timestamp:1});

    return res.status(200).json({
        success:true,
        profile,
        tweets
    })
};

exports.getProfiles = async (req, res, next) => {
    const {profileArray} = req.body;
    const profiles = await User.find(
        {_id:{$in:profileArray}},
        {handle:1,name:1,picture:1}
    );
    return res.status(200).json({
        success:true,
        profiles
    })

};

exports.updateProfile = async (req, res, next) => {
    const {profile} = req.body;
    const user = await User.findById(req.user);
    user.name = profile.name;
    user.picture = profile.picture;
    user.email = profile.email;
    user.handle = profile.handle;
    user.save()
    return res.status(200).json({
        success:true,
    })

};

exports.followUser = async (req, res, next) => {
    const {profileID} = req.body;
    const profile = await User.findById(profileID);
    profile.followers++;
    profile.followerList.push(req.user._id);
    profile.save();
    const user = await User.findById(req.user._id);
    user.following++;
    user.followingList.push(profile._id);
    user.save();
    return res.status(200).json({
        success:true,
    })
};

exports.unfollowUser = async (req, res, next) => {
    const {profileID} = req.body;
    const profile = await User.findById(profileID);
    profile.followers--;
    profile.followerList.remove(req.user._id);
    profile.save();
    const user = await User.findById(req.user._id);
    user.following--;
    user.followingList.remove(profile._id);
    user.save();
    return res.status(200).json({
        success:true,
    })
};