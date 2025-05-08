const DiagnosticaServices = require('../services/diagnostica_services');

exports.create = async (req, res, next) => {
  try {
      console.log("Received body:", req.body); // See what you're getting

      const entries = req.body; // Expecting an array directly

      if (!Array.isArray(entries) || entries.length === 0) {
          return res.status(400).json({ status: false, message: "Entries must be a non-empty array" });
      }

      let newEntries = [];
      let existingEntries = [];

      for (const entry of entries) {
          const { data, email, comment, doctor, date, time } = entry;

          const existing = await DiagnosticaServices.getDataByEmail(email);
          if (existing.length > 0) {
              existingEntries.push(...existing);
          }

          const saved = await DiagnosticaServices.data(data, email, comment, doctor, date, time);
          newEntries.push(saved);
      }

      res.json({
          status: true,
          message: "Submitted Successfully",
          newEntries,
          existingEntries,
      });

  } catch (error) {
      console.error("Error in /data route:", error);
      res.status(500).json({ status: false, message: "Server Error", error: error.message });
  }
};


// exports.update = async(req, res, next) => {
//   try {
//       const {email} = req.query;
//       const {data, comment, doctor, date, time} = req.body;

//       const updatedData = await DiagnosticaServices.updateData(
//           email,
//           {data, comment, doctor, date, time}
//       );

//       if (!updatedData) {
//           return res.status(404).json({
//               status: false,
//               message: "No document found with that email"
//           });
//       }

//       res.json({
//           status: true,
//           success: "Updated Successfully",
//           data: updatedData
//       });

//   } catch(error) {
//       next(error);
//   }
// }

exports.update = async (req, res, next) => {
  try {
    const { id } = req.query;
    const { data, comment, doctor, date, time } = req.body;

    const updatedData = await DiagnosticaServices.updateDataById(
      id,
      { data, comment, doctor, date, time }
    );

    if (!updatedData) {
      return res.status(404).json({
        status: false,
        message: "No document found with that ID"
      });
    }

    res.json({
      status: true,
      success: "Updated Successfully",
      data: updatedData
    });

  } catch (error) {
    next(error);
  }
};


exports.getData = async(req, res) => {
    try {
      const email = req.query.email;
      const detail = await DiagnosticaServices.getDataByEmail(email);
      res.status(200).send(detail);
    } catch (error) {
      res.status(400).send(error.message);
    }
  }

  exports.delete = async(req, res, next)=>{
    try{
        const{email} = req.query;
        const data = await DiagnosticaServices.deletedata(email);
        res.status(200).json(data)
    }catch(error){
        next(error)
    }
}