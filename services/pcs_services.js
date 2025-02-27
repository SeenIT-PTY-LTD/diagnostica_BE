const PcsModel = require("../model/pcs_model");

class PcsServices{
    static async pcsAnswers(email,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,date,time){
        try{
            const createPcsAnswer = new PcsModel({email,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,date,time});
            return await createPcsAnswer.save();
        }catch(err){
            throw err;
        }
    }
    static async checkuser(email){
        try{
            return await PcsModel.findOne({email});

        }catch(error){
            throw error;
        }
    }

    static async update(email,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,S11,S12,S13,date,time) {
        try {
            var query = { email: email };
            var values = { $set: { S1 :S1,S2 :S2,S3 :S3,S4 :S4,S5 :S5,S6 :S6,S7 :S7,S8 :S8,S9 :S9,S10 :S10,S11 :S11,S12 :S12,S13 :S13,date:date,time:time} };

            return await PcsModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

    static async getpcs(email){
        try {
            
            return await PcsModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    static async deletepcs(email){
        try{
            var query = {email : email};
            return await PcsModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }

    static async  getDataByEmail(email) {
        try {
          const detail = await PcsModel.find({ email: email });
          return detail;
        } catch (error) {
          throw new Error(error.message);
        }
      }
}

module.exports = PcsServices;