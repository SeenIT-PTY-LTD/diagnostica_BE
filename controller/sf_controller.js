const SfServices = require("../services/sf_services")

exports.submitSfAnswer= async(req, res, next)=>{
    try{
        const{email,sf1,sf2,sf3,sf4,sf5,sf6,sf7,sf8,sf9,sf10,sf11,sf12,sf13,sf14,sf15,sf16,sf17,sf18,sf19,sf20,sf21,sf22,sf23,sf24,sf25,sf26,sf27,sf28,sf29,sf30,sf31,sf32,sf33,sf34,sf35,sf36,date,time} = req.body;

        const successRes = await SfServices.sfAnswers(email,sf1,sf2,sf3,sf4,sf5,sf6,sf7,sf8,sf9,sf10,sf11,sf12,sf13,sf14,sf15,sf16,sf17,sf18,sf19,sf20,sf21,sf22,sf23,sf24,sf25,sf26,sf27,sf28,sf29,sf30,sf31,sf32,sf33,sf34,sf35,sf36,date,time);

        res.json({status: true, success: "Sf 36 Answer Submitted Successfully"});

    }catch(error){
        throw error
    }
}

exports.fetsf = async(req, res, next)=>{
    try{
        const{email} = req.body;
        const patient = await SfServices.checkuser(email);
        if(!patient){
            res.status(200).json({status:false, message: "Not Answer"})
        }else{
        
        res.status(200).json({status:true, id: patient._id})
        
    }

    }catch(error){
        res.status(200).json({status:false, message: error})

    }
}

exports.Update = async (req,res, next) => {
    try {
        const { email,sf1,sf2,sf3,sf4,sf5,sf6,sf7,sf8,sf9,sf10,sf11,sf12,sf13,sf14,sf15,sf16,sf17,sf18,sf19,sf20,sf21,sf22,sf23,sf24,sf25,sf26,sf27,sf28,sf29,sf30,sf31,sf32,sf33,sf34,sf35,sf36,date,time} = req.body;
        const updateData = await SfServices.update(email,sf1,sf2,sf3,sf4,sf5,sf6,sf7,sf8,sf9,sf10,sf11,sf12,sf13,sf14,sf15,sf16,sf17,sf18,sf19,sf20,sf21,sf22,sf23,sf24,sf25,sf26,sf27,sf28,sf29,sf30,sf31,sf32,sf33,sf34,sf35,sf36,date,time);
        res.status(200).json(updateData)
    } catch (error) {
        next (error);
    }
}

exports.getEmail = async(req, res) => {
    try {
      const email = req.query.email;
      const detail = await SfServices.getsf(email);
      res.status(200).send(detail);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

exports.delete = async(req, res, next)=>{
    try{
        const{email} = req.query;
        const sf = await SfServices.deletesf(email);
        res.status(200).json(sf)
    }catch(error){
        next(error)
    }
}