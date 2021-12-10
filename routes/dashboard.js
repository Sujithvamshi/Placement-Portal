const router = require('express').Router();
const Post = require('../models/Post');
router.post('/',async (req, res) => {
    try{
        const newPost = new Post(req.body);
        const savedPost = await newPost.save();
        res.status(200).json(savedPost);
    }
    catch(err){
        res.status(500).json(err);
    }
})
router.put('/:id',async (req, res)=>{
    try{
        const post = await Post.findById(req.params.id);
        if(post.userId == req.body.userId){
            await post.updateOne({$set:req.body});
            res.status(200).json("post has been updated")
        }
        else{
            res.status(403).json("You Can Only Edit Your Post")
        }
    }
    catch(err){
        res.status(500).json(err)
    }
})
router.delete('/:id',async (req, res)=>{
    try{
    const post = await Post.findById(req.params.id);
    if(post.userId == req.body.userId){
        await post.deleteOne();
        res.status(200).json("post has been deleted")
    }
    else{
        res.status(403).json("You Can Only delete Your Post")
    }}
    catch(err){
        res.status(500).json(err)
    }
})
// update post 
// dletes post
//like post 
//get post 
//timeline post 

module.exports = router