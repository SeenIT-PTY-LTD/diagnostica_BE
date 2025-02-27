const CommentServices = require("../services/comment_service");


exports.create = async(req, res, next)=>{
    try{
        const{email,comment} = req.body;

        const successRes = await CommentServices.range(email,comment);

        res.json({status: true, success: " Submittted Successfully"});

    }catch(error){
        throw error
    }
}

exports.Update = async (req,res, next) => {
    try {
        const { email,comment} = req.body;
        const updateData = await CommentServices.update(email,comment);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }
}

exports.getData = async(req,res,next) => {
    try {
        const {email} = req.query;
        const User = await CommentServices.getemail(email);
        res.status(200).json(User)
    } catch (error) {
        next(error);
    }
}

exports.delete = async(req, res, next)=>{
    try{
        const{email} = req.query;
        const comment = await CommentServices.deletecomment(email);
        res.status(200).json(comment)
    }catch(error){
        next(error)
    }
}