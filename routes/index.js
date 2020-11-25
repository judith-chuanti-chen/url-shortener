const express = require('express');
const router = express.Router();
const urlModel = require('../models/url.schema');
const path = require('path');

router.get('/:urlCode', async (req, res) =>{
    const urlCode = req.params.urlCode;
    try{
        const resultUrl = await urlModel.findOne({ urlCode });
        if(resultUrl){
            console.log("redirecting to" + resultUrl.longUrl);
            res.redirect(resultUrl.longUrl);
        }else{
            return res.status(404).json('Cannot find urlCode');
        }
    }catch(err){
        console.log(err);
        return res.status(500).json('Server error');
    }
});

if (process.env.NODE_ENV === "production"){
    router.get("/*", (req, res) => {
        console.log('Works');
      res.sendFile(path.resolve(__dirname, "../client", "build", "index.html"));
    });
}

module.exports = router;