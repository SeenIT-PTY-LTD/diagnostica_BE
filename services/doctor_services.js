const IdcodeServices = require('../services/idcode_services')
const DoctorModel = require('../model/doctor_model');
const bcrypt = require('bcrypt');


class DoctorServices {
    static async register(userid, firstname, lastname, email, phone,role, password) {
        try {
            var idcode = await IdcodeServices.generateCode("Doctor");
            const hashedpassword = await bcrypt.hash(password, 10);
            const createdoctor = new DoctorModel({ idcode, userid, firstname, lastname, email, phone,role, password: hashedpassword });
            return await createdoctor.save();
        } catch (err) {
            throw err;
        }
    }

    static async login(email) {
        try {
            return await DoctorModel.findOne({ email });
        } catch (error) {
            throw error;
        }
    }

    static async checkIfUserExists(email) {
        try {
          const user = await DoctorModel.findOne({ email });
          return !!user; 
        } catch (error) {
          throw new Error('Error checking user existence');
        }
      };

    static async update(idcode, userid, firstname, lastname, email, phone) {
        try {
            var query = { idcode: idcode };
            var values = { $set: { userid: userid, firstname: firstname, lastname: lastname, email: email, phone: phone } };

            return await DoctorModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }

    static async delete(idcode) {
        try {
            var query = { idcode: idcode };
            return await DoctorModel.findOneAndDelete(query);

        } catch (error) {
            throw error;
        }
    }

    static async getUser(idcode) {
        try {

            return await DoctorModel.findOne({ idcode })
        } catch (error) {
            throw error
        }
    }

    static async getemail(email) {
        try {

            return await DoctorModel.findOne({ email })
        } catch (error) {
            throw error
        }
    }

    static async getUseradmin() {
        try {
            return await DoctorModel.find();
        } catch (error) {
            throw error
        }
    }

    static async updatePassword(email, newPassword) {
        try {
            const newPasswordHash = await bcrypt.hash(newPassword, 10);

            const updatedDoctor = await DoctorModel.findOneAndUpdate(
                { email: email },
                {
                    $set: {
                        password: newPasswordHash,
                    }
                },
                { new: true }
            );

            return updatedDoctor;
        } catch (err) {
            throw new Error('An error occurred while updating the doctor: ' + err.message);
        }
    };

    static async getALlEnteriesBasedOnCondition( condition ) {
        try {
            return await DoctorModel.find( condition  , { _id : 1 , firstname : 1 , lastname : 1 } );
        } catch (error) {
            throw error
        }
    }
  
}
module.exports = DoctorServices;