const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortId = require('shortid');
const config = require('config');
const baseUrl = config.get('baseUrl');
const urlModel = require('../models/url.schema');

//@route GET /api/url/all
router.get('/all', async (req, res) => {
    try{
        let docs = await urlModel.find();
        return res.json(docs);
    }catch(err){
        console.log(err);
        return res.status(500).json('Server error');
    }
})

//@route GET /api/url/:urlCode
router.get('/:urlCode', async (req, res) => {
    const urlCode = req.params.urlCode;
    try{
        let doc = await urlModel.findOne({urlCode});
        if(doc){
            return res.json(doc);
        }else{
            console.log(`Cannot find urlCode: ${urlCode}`);
            return res.status(404).json(`Cannot find urlCode: ${urlCode}`);
        }
    }catch(err){
        console.log(err);
        return res.status(500).json('Server error');
    }
});

//@route POST /api/url/create
router.post('/create', async (req, res) =>{
    const { longUrl, customString } = req.body;
    
    if(!validUrl.isUri(longUrl)){
        return res.status(401).json(`Invalid long url: ${longUrl}`);
    }
    try{
        let doc = await urlModel.findOne({longUrl});
        if(doc){
            console.log('longUrl already exists');
            console.log(doc);
            return res.status(201).json(doc);
        }
    }catch(err){
        console.log(err, `Error finding longUrl: ${longUrl}`);
        return res.status(500).json(`Error finding longUrl: ${longUrl}`);
    }
    //find one documents where longUrl = longUrl 
    // p.s. {longUrl} = {longUrl: longUrl}
   
    try{
        let doc = await urlModel.findOne({urlCode: customString});
        if(doc){
            console.log(`customString: ${customString} already exists`);
            return res.status(409).json(`customString: ${customString} already exists`);
        }
    }catch(err){
        console.log(err, `Error finding customString: ${customString}`);
        return res.status(500).json(`Error finding customString: ${customString}`);
    }
  
    // console.log("About to create new url!");
    const urlCode = customString || shortId.generate();
    let shortUrl = baseUrl + '/url/' + urlCode;
    const url = {
        longUrl,
        shortUrl,
        urlCode,
        date: new Date()
    };
    try{
        await urlModel.create(url);
        res.json(url);
    }catch(err){ 
        console.log(err, 'Cannot create'); 
        res.status(500).json('Server error');
    }
});
//route PATCH /api/url/edit
router.patch('/edit/:urlCode', async (req, res) => {
    const { newLongUrl } = req.body;
    const urlCode = req.params.urlCode;
    //findOneAndUpdate(filter, update, option, callback);
    try{
        let newUrl = await urlModel.findOneAndUpdate({ urlCode }, {longUrl: newLongUrl, date: new Date()}, {new: true});
        if(newUrl){
            res.json(newUrl);
        }else{
            console.log(`Cannot find urlCode:${urlCode} in urlModel`);
            res.status(401).json(`Cannot find urlCode:${urlCode} in urlModel`);
        }
    }catch(err){
        console.log(err);
        res.status(500).json("Server error");
    }
});

//route PATCH /api/url/delete
router.delete('/delete/:urlCode', async (req, res) => {
    const urlCode  = req.params.urlCode;
    try{
        let url = await urlModel.findOne({urlCode});
        if(!url){
            console.log(`${urlCode} cannot be found`);
            return res.status(404).json(`Cannot find urlCode: ${urlCode} to be deleted`);
        }
    }catch(err){
        console.log(err);
        return res.status(500).json("Server error");
    }
    // If urlCode can be found, delete it
    try{
        await urlModel.deleteOne({ urlCode });
        return res.status(200).send(`Successfully deleted ${urlCode}`);
    }catch(err){
        console.log(err);
        return res.status(500).json('Server error');
    }
});



module.exports = router;