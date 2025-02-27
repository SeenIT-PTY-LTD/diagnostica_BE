const PatientServices = require("../services/patient_services")

exports.register = async(req, res, next)=>{
    try{
        const{fname,lname,dob,gender,email,phone,address,state,postcode,password,height,weight,bmi} = req.body;

        const successRes = await PatientServices.registerPatient(fname,lname,dob,gender,email,phone,address,state,postcode,password,height,weight,bmi);
        let tokenData = {fname:fname, lname: lname, dob: dob, gender: gender, email: email, phone: phone, address: address, state: state, postcode: postcode ,height : height, weight : weight,bmi : bmi};
        res.json({status: true, token: tokenData});

    }catch(error){
        res.json({status: false, success: error});
    }
}

exports.login = async(req, res, next)=>{
    try{
        const{email,password} = req.body;
        const patient = await PatientServices.checkuser(email);
        if(!patient){
            res.status(200).json({status:false, message: "User Not Found"})
        }else{
       
        console.log(patient);
        const isMatch = await patient.comparePassword(password);

        if(isMatch === false){
            res.status(200).json({status:false, message: "Invalid Password"})
        }else{
        
        let tokenData = {fname:patient.fname, lname: patient.lname, dob: patient.dob, gender: patient.gender, email: patient.email, phone: patient.phone, address: patient.address, state: patient.state, postcode: patient.postcode,height : patient.height,weight : patient.weight,bmi : patient.bmi};

        
        res.status(200).json({status:true, token: tokenData})
        }
    }
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}
exports.verifyphone = async(req, res, next)=>{
    try{
        const{phone} = req.body;
        const patient = await PatientServices.checkphone(phone);
        if(!patient){
            res.status(200).json({status:false, message: "Phone Number Not Found"})
        }else{
       
        console.log(patient);
        res.status(200).json({status:true, token: patient})
        
    }
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}

exports.update = async(req, res, next)=>{
    try{
        const{email,fname,lname,dob,gender,phone,address,state,postcode,height,weight,bmi} = req.body;
        const successRes = await PatientServices.updatePatient(email,fname,lname,dob,gender,phone,address,state,postcode,height,weight,bmi);
        res.json({status: true, success: successRes});
        console.log(successRes);
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}
exports.resetPassword = async(req, res, next)=>{
    try{
        const{phone,password} = req.body;
        const successRes = await PatientServices.resetPassword(phone,password);
        res.json({status: true, success: successRes});
        
    
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}
exports.changePassword = async(req, res, next)=>{
    try{
        const{email,password} = req.body;
        const successRes = await PatientServices.changePassword(email,password);
        res.json({status: true, success: successRes});
    
    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}

exports.delete = async(req, res, next)=>{
    try{
        const{email} = req.query;
        const patient = await PatientServices.deletePatinet(email);
        res.status(200).json(patient)
    }catch(error){
        res.status(200).json({status:false, message: error})
    }
}

exports.getEmail = async(req,res,next) => {
    try {
        const {email} = req.query;
        const Patient = await PatientServices.getpatient(email);
        res.status(200).json(Patient)
    } catch (error) {
        next(error);
    }
}

exports.getpatients = async(req,res,next) =>{
    try {
        const Admin = await PatientServices.get();
        res.status(200).json(Admin)
    } catch (error) {
        
    }
}