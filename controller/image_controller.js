const ImageServices = require("../services/image_services");

// exports.documents = async (req, res, next) => {
//   try {
//     const { email, date, time } = req.body;
//     const files = req.files || {};

//     const getFileName = (files, field) => {
//       if (files && files[field] && Array.isArray(files[field]) && files[field][0]) {
//         return files[field][0].filename;
//       }
//       return "";
//     };

//     const document = await ImageServices.documents(
//       email,
//       getFileName(files, "img1"),
//       getFileName(files, "img2"),
//       getFileName(files, "img3"),
//       getFileName(files, "img4"),
//       getFileName(files, "img5"),
//       getFileName(files, "img6"),
//       date,
//       time
//     );

//     res.status(200).json("true");
//   } catch (error) {
//     console.error("Upload error:", error);
//     res.status(500).json({ error: error.message });
//   }
// };

exports.documents = async (req, res, next) => {
  try {
    const { email, date, time } = req.body;
    const files = req.files || {};

    const imageFields = {};
    for (let i = 1; i <= 6; i++) {
      const key = `img${i}`;
      if (files[key]?.[0]?.filename) {
        imageFields[key] = files[key][0].filename;
      }
    }

    const document = await ImageServices.documents(
      email,
      imageFields.img1 || '',
      imageFields.img2 || '',
      imageFields.img3 || '',
      imageFields.img4 || '',
      imageFields.img5 || '',
      imageFields.img6 || '',
      date,
      time
    );

    // Build filtered response with only uploaded fields
    const responsePayload = {
      email,
      date,
      time,
      ...imageFields, // only uploaded fields
    };

    res.status(201).json({
      message: "Images uploaded successfully.",
      data: responsePayload,
    });
  } catch (error) {
    console.error("Upload Error:", error);
    res.status(500).json({ error: "Image upload failed." });
  }
};

exports.getEmail = async (req, res) => {
  try {
    const email = req.query.email;
    const detail = await ImageServices.getimage(email);
    res.status(200).send(detail);
  } catch (error) {
    res.status(400).send(error.message);
  }
};

exports.delete = async (req, res, next) => {
  try {
    const { email } = req.query;
    const eq = await ImageServices.deleteimage(email);
    res.status(200).json(eq);
  } catch (error) {
    next(error);
  }
};
