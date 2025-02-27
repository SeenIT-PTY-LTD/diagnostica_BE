const CommentModel = require("../model/comment_model");

class CommentServices {
    static async range(email,comment){
        try{
            const Data = new CommentModel({email,comment});
            return await Data.save();
        }catch(err){
            throw err;
        }
    }

    static async update(email,comment) {
        try {
            var query = { email: email };
            var values = { $set: { comment : comment} };

            return await CommentModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

    static async getemail(email) {
        try {

            return await CommentModel.findOne({ email })
        } catch (error) {
            throw error
        }
    }

    static async deletecomment(email){
        try{
            var query = {email : email};
            return await CommentModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }
    
}

module.exports = CommentServices;