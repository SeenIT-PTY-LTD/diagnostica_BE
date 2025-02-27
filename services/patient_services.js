const PatientModel = require("../model/user_model");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class PatientServices{
    static async registerPatient(fname,lname,dob,gender,email,phone,address,state,postcode,password,height,weight,bmi){
        try{
            const createPatient = new PatientModel({fname,lname,dob,gender,email,phone,address,state,postcode,password,height,weight,bmi});
            return await createPatient.save();
        }catch(err){
            throw err;
        }
        
    }
    static async checkuser(email){
        try{
            return await PatientModel.findOne({email});

            }catch(error){
                throw error;
        }
    }

    static async checkphone(phone){
        try{
            return await PatientModel.findOne({phone});

        }catch(error){
            throw error;
        }
    }
    static async updatePatient(email,fname,lname,dob,gender,phone,address,state,postcode,height,weight,bmi){
        try {
            var query = { email : email};
            var values = { $set: { fname:fname,lname:lname,dob:dob,gender:gender,phone:phone,address:address,state:state,postcode:postcode,height:height,weight:weight,bmi:bmi} };

            return await PatientModel.updateOne(query, values)

        } catch (error) {
            throw error
        }
    }
    static async changePassword(email,password){
        try{
            var query = { email: email };
            const salt = await(bcrypt.genSalt(10));
            const hashpass = await bcrypt.hash(password,salt);
            var values = { $set: { password: hashpass} };
            return await PatientModel.updateOne(query,values);
        }catch(error){
            print(error);
        }
    }
    static async resetPassword(phone,password){
        try{
            var query = { phone: phone }; 
            const salt = await(bcrypt.genSalt(10));
            const hashpass = await bcrypt.hash(password,salt);
            var values = { $set: { password: hashpass} };
            return await PatientModel.updateOne(query,values);
        }catch(error){
            throw error;
        }
    }
    static async deletePatinet(email){
        try{
            return await PatientModel.findOneAndDelete({email});

        }catch(error){
            throw error;
        }
    }

    static async getpatient(email){
        try {
            
            return await PatientModel.findOne({email})
        } catch (error) {
            throw error
        }
    }

    
    static async get(){
        try {
            return await PatientModel.find();
        } catch (error) {
            throw error
        }
    }
    
}
module.exports = PatientServices;