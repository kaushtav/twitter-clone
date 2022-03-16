const {Tweet} = require("../models");

exports.getTweet = async (req, res, next) => {
    const {tweetID} = req.body;
    const data = await Tweet.findOne({_id:tweetID})
    return res.status(200).json({
        success:true,
        data
    })
}


