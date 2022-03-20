const {User,Tweet} = require("../models");
const mongoose = require("mongoose");
const ErrorResponse = require("../utils/errorResponse");

exports.getUser = async (req, res)=>{
    return res.status(200).json({
        success:true,
        user:req.user,
    });
}
exports.createTweet = async (req, res, next)=>{
    const {text, images, repliedTo, retweetFrom} = req.body.tweet;
    //TODO: extract mentions and tags
    try {

        const user = await User.findById(req.user.id);
        const {_id} = await Tweet.create({
            userID:mongoose.Types.ObjectId(req.user.id),
            text,
            images,
            repliedTo,
            retweetFrom,
            timestamp:Date.now()
        });
        if(repliedTo){
            const repliedTweet = await Tweet.findById(repliedTo);
            if (!repliedTweet) {
                Tweet.deleteOne({_id:_id})
                return next(new ErrorResponse('Data not found', 404));
            }
            repliedTweet.replies++;
            repliedTweet.repliesList.push(_id);
            repliedTweet.save()
        }
        if(retweetFrom){
            const reTweet = await Tweet.findById(retweetFrom);
            if (!reTweet) {
                Tweet.deleteOne({_id:_id})
                return next(new ErrorResponse('Data not found', 404));
            }
            reTweet.retweets++;
            reTweet.save()

        }
        user.retweetList.push(retweetFrom)
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
    const perPage = 100
    const page = 1
    try {
        const item = await Tweet.aggregate(
            [
                {$match: {userID: {$in: [...req.user.followingList, req.user._id]}}},
                // {$match: {_id: new mongoose.Types.ObjectId('62374842a12af3d48fc71446') }}, //retweet example
                // {$match: {_id: new mongoose.Types.ObjectId('623708d8d5a3639f68f55a1e') }}, //tweet example
                // {$match: {_id: new mongoose.Types.ObjectId('6237624e140e5bfd9932ced5') }}, //reply example
                {
                    $lookup: {
                        from: 'users',
                        localField: 'userID',
                        foreignField: '_id',
                        as: "profile"
                    }
                },
                {$unwind: "$profile"},
                {$addFields: {"name": "$profile.name", "handle": "$profile.handle", "picture": "$profile.picture"}},
                {
                    $lookup: {
                        from: 'tweets',
                        localField: 'retweetFrom',
                        foreignField: '_id',
                        as: "retweetData"
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'retweetData.userID',
                        foreignField: '_id',
                        as: "retweetProfile"
                    }
                },
                {$unwind: {path:"$retweetData", preserveNullAndEmptyArrays: true}},
                {$unwind: {path:"$retweetProfile", preserveNullAndEmptyArrays: true}},
                {
                    $set: {
                        retweetFrom: {
                            _id:"$retweetData._id",
                            images:"$retweetData.images",
                            text:"$retweetData.text",
                            replies:"$retweetData.replies",
                            retweets:"$retweetData.retweets",
                            likes:"$retweetData.likes",
                            timestamp:"$retweetData.timestamp",
                            name: "$retweetProfile.name",
                            handle: "$retweetProfile.handle",
                            picture: "$retweetProfile.picture",
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'tweets',
                        localField: 'repliedTo',
                        foreignField: '_id',
                        as: "replyData"
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'replyData.userID',
                        foreignField: '_id',
                        as: "replyProfile"
                    }
                },
                {$unwind: {path:"$replyData", preserveNullAndEmptyArrays: true}},
                {$unwind: {path:"$replyProfile", preserveNullAndEmptyArrays: true}},
                {
                    $set: {
                        repliedTo: {
                            _id:"$replyData._id",
                            images:"$replyData.images",
                            text:"$replyData.text",
                            replies:"$replyData.replies",
                            retweets:"$replyData.retweets",
                            likes:"$replyData.likes",
                            timestamp:"$replyData.timestamp",
                            name: "$replyProfile.name",
                            handle: "$replyProfile.handle",
                            picture: "$replyProfile.picture",
                        }
                    }
                },
                {$sort: {timestamp: -1}},
                {
                    $project: {
                        _id: 1,
                        images: 1,
                        text: 1,
                        userID: 1,
                        replies: 1,
                        retweets: 1,
                        likes: 1,
                        timestamp: 1,
                        name: 1,
                        handle: 1,
                        picture: 1,
                        repliedTo:1,
                        retweetFrom:1,
                    }
                },
                {
                    $facet: {
                        metadata: [{$count: "total"}],
                        data: [{$skip: (page - 1) * perPage}, {$limit: perPage}]
                    }
                },
            ]
        );
        console.log(item[0].data)
        return res.status(200).json({
            success: true,
            tweets: item[0].data,
            metadata: item[0].metadata
        })
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};


exports.getProfile = async (req, res, next)=> {

    const perPage = 100
    const page =1
    const {profileID} = req.body;
    try{
        const profile = await User.findById(profileID);
        const item = await Tweet.aggregate(
            [
                { $match: {"userID" : profile._id}},
                {$addFields:{"name":profile.name, "handle":profile.handle, "picture":profile.picture}},
                {
                    $lookup: {
                        from: 'tweets',
                        localField: 'retweetFrom',
                        foreignField: '_id',
                        as: "retweetData"
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'retweetData.userID',
                        foreignField: '_id',
                        as: "retweetProfile"
                    }
                },
                {$unwind: {path:"$retweetData", preserveNullAndEmptyArrays: true}},
                {$unwind: {path:"$retweetProfile", preserveNullAndEmptyArrays: true}},
                {
                    $set: {
                        retweetFrom: {
                            _id:"$retweetData._id",
                            images:"$retweetData.images",
                            text:"$retweetData.text",
                            replies:"$retweetData.replies",
                            retweets:"$retweetData.retweets",
                            likes:"$retweetData.likes",
                            timestamp:"$retweetData.timestamp",
                            name: "$retweetProfile.name",
                            handle: "$retweetProfile.handle",
                            picture: "$retweetProfile.picture",
                        }
                    }
                },
                {
                    $lookup: {
                        from: 'tweets',
                        localField: 'repliedTo',
                        foreignField: '_id',
                        as: "replyData"
                    }
                },
                {
                    $lookup: {
                        from: 'users',
                        localField: 'replyData.userID',
                        foreignField: '_id',
                        as: "replyProfile"
                    }
                },
                {$unwind: {path:"$replyData", preserveNullAndEmptyArrays: true}},
                {$unwind: {path:"$replyProfile", preserveNullAndEmptyArrays: true}},
                {
                    $set: {
                        repliedTo: {
                            _id:"$replyData._id",
                            images:"$replyData.images",
                            text:"$replyData.text",
                            replies:"$replyData.replies",
                            retweets:"$replyData.retweets",
                            likes:"$replyData.likes",
                            timestamp:"$replyData.timestamp",
                            name: "$replyProfile.name",
                            handle: "$replyProfile.handle",
                            picture: "$replyProfile.picture",
                        }
                    }
                },
                {$sort: {timestamp: -1}},
                { $facet: {
                        metadata: [ { $count: "total" } ],
                        data: [ { $skip: (page-1)*perPage }, { $limit: perPage } ]
                    }},
            ]
        );
        return res.status(200).json({
            success:true,
            profile,
            tweets:item[0].data,
            metadata:item[0].metadata
        })
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

exports.getProfiles = async (req, res, next) => {
    const {profileArray} = req.body;
    try{
        if (profileArray) {
            const profiles = await User.find(
                {_id: {$in: profileArray}},
                {handle: 1, name: 1, picture: 1}
            );
            return res.status(200).json({
                success: true,
                profiles
            })
        }

        const profiles = await User.find(
            {_id: {$nin: [...req.user.followingList, req.user._id]}},
            {handle: 1, name: 1, picture: 1}
        );
        return res.status(200).json({
            success: true,
            profiles
        })
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

exports.updateProfile = async (req, res, next) => {
    const {profile} = req.body;
    try {
        const user = await User.findById(req.user);
        user.name = profile.name;
        user.picture = profile.picture;
        user.email = profile.email;
        user.handle = profile.handle;
        user.save()
        return res.status(200).json({
            success: true,
        })
    } catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

exports.followUser = async (req, res, next) => {
    const {profileID} = req.body;
    try {
        const profile = await User.findById(profileID);
        profile.followers++;
        profile.followerList.push(req.user._id);
        profile.save();
        const user = await User.findById(req.user._id);
        user.following++;
        user.followingList.push(profile._id);
        user.save();
        return res.status(200).json({
            success: true,
        })
    }  catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};

exports.unfollowUser = async (req, res, next) => {
    const {profileID} = req.body;
    try{
        const profile = await User.findById(profileID);
        profile.followers--;
        profile.followerList.remove(req.user._id);
        profile.save();
        const user = await User.findById(req.user._id);
        user.following--;
        user.followingList.remove(profile._id);
        user.save();
        return res.status(200).json({
            success: true,
        })
    }  catch (error) {
        console.error(error);
        error.status = 500;
        next(error);
    }
};