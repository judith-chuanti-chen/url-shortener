const express = require('express');
const router = express.Router();
const urlModel = require('../models/url.schema');

router.get('/:urlCode', async (req, res) =>{
    const urlCode = req.params.urlCode;
    try{
        const resultUrl = await urlModel.findOne({ urlCode });
        if(resultUrl){
            res.redirect(resultUrl.longUrl);
        }else{
            return res.status(404).json('Cannot find urlCode');
        }
    }catch(err){
        console.log(err);
        return res.status(500).json('Server error');
    }
});
module.exports = router;