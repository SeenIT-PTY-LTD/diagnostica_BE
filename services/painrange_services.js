const PainrangeModel = require('../model/painrange_model');

class PainrangeServices {
    static async range(email,painrange,session){
        try{
            const Data = new PainrangeModel({email,painrange,session});
            return await Data.save();
        }catch(err){
            throw err;
        }
    }

    static async update(email,painrange,session) {
        try {
            var query = { email: email };
            var values = { $set: { painrange:painrange,session:session} };

            return await PainrangeModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

    static async getemail(email) {
        try {

            return await PainrangeModel.findOne({ email })
        } catch (error) {
            throw error
        }
    }

    static async deletepainrange(email){
        try{
            var query = {email : email};
            return await PainrangeModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }
    
}

module.exports = PainrangeServices;