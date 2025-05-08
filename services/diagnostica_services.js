const DiagnosticaModel = require('../model/diagnostica_model');

class DiagnosticaServices {
    static async data(data,email,comment,doctor,date,time){
        try{
            const Data = new DiagnosticaModel({data,email,comment,doctor,date,time});
            return await Data.save();
        }catch(err){
            throw err;
        }
    }

    // static async updateData(email, updateFields) {
    //     try {
    //         return await DiagnosticaModel.findOneAndUpdate(
    //             {email: email},
    //             {$set: updateFields},
    //             {new: true} // Return the updated document
    //         );
    //     } catch(error) {
    //         throw error;
    //     }
    // }

    static async updateDataById(id, updateFields) {
        try {
          return await DiagnosticaModel.findByIdAndUpdate(
            id,
            { $set: updateFields },
            { new: true }
          );
        } catch (error) {
          throw error;
        }
      }
    

    static async  getDataByEmail(email) {
        try {
          const detail = await DiagnosticaModel.find({ email: email });
          return detail;
        } catch (error) {
          throw new Error(error.message);
        }
      }
      static async deletedata(email){
        try{
            var query = {email : email};
            return await DiagnosticaModel.deleteMany(query);

        }catch(error){
            throw error;
        }
    }

}

module.exports = DiagnosticaServices;