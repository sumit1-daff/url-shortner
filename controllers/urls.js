const  shortid = require('shortid');
const URL = require('../models/urls');
async function handleGenerateShortId(req, res){
    const body = req.body;
    if(!body.url){
        return res.status(400).json({error : "URL is required"});
    }
    const shortId = shortid();
    await URL.create({
        shortId : shortId,
        redirectURL : body.url,
        visitHistory : [],
    });
    return res.json({id :  shortId});
}
async function handleAnalytics(req, res){
    const shortid = req.params.shortid;
    console.log(shortid);
    
    const result = await URL.findOne({shortId : shortid});
    console.log(result);
    return res.json({totalClicks : result.visitHistory.length,
        analytics : result.visitHistory
    });
}

module.exports = {
    handleGenerateShortId,
    handleAnalytics,
};