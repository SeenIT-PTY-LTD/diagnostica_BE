const EqModel = require("../model/eq_model");


class EqServices{
    static async eqAnswers(email,eq1,eq2,eq3,eq4,eq5,eq6,date,time){
        try{
            const createEqAnswer = new EqModel({email,eq1,eq2,eq3,eq4,eq5,eq6,date,time});
            return await createEqAnswer.save();
        }catch(err){
            throw err;
        }
    }

    static async checkuser(email){
        try{
            return await EqModel.findOne({email});

        }catch(error){
            throw error;
        }
    }

    static async update(email,eq1,eq2,eq3,eq4,eq5,eq6,date,time) {
        try {
            var query = { email: email };
            var values = { $set: { eq1 : eq1, eq2 : eq2, eq3 : eq3, eq : eq4, eq5 : eq5, eq6 : eq6,date : date,time :time} };

            return await EqModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

    static async  geteq(email) {
        try {
          const detail = await EqModel.find({ email: email });
          return detail;
        } catch (error) {
          throw new Error(error.message);
        }
      }

    static async deleteeq(email){
        try{
            var query = {email : email};
            return await EqModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }
}
module.exports = EqServices;