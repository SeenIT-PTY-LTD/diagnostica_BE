const MoxfqModel = require("../model/moxfq_model");

class MoxfqServices{
    static async moxfqAnswers(email,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15,m16,date,time){
        try{
            const createMoxfqAnswer = new MoxfqModel({email,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15,m16,date,time});
            return await createMoxfqAnswer.save();
        }catch(err){
            throw err;
        }
    }
    static async checkuser(email){
        try{
            return await MoxfqModel.findOne({email});

        }catch(error){
            throw error;
        }
    }

    static async update(email,m1,m2,m3,m4,m5,m6,m7,m8,m9,m10,m11,m12,m13,m14,m15,m16) {
        try {
            var query = { email: email };
            var values = { $set: { m1 : m1,m2 : m2,m3 : m3,m4 : m4,m5 : m5,m6 : m6,m7 : m7,m8 : m8,m9 : m9,m10 : m10,m11 : m11,m12 : m12,m13 : m13,m14 : m14,m15 : m15,m16 : m16} };

            return await MoxfqModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    } 

    static async  getmoxfq(email) {
        try {
          const detail = await MoxfqModel.find({ email: email });
          return detail;
        } catch (error) {
          throw new Error(error.message);
        }
      }

    static async deletemoxfq(email){
        try{
            var query = {email : email};
            return await MoxfqModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }
}
module.exports = MoxfqServices;