const ImageServices = require("../services/image_services");

exports.documents = async (req, res, next) => {
  try {
    const { email, date, time } = req.body;
    const { img1, img2, img3, img4, img5, img6 } = req.files;

    const document = await ImageServices.documents(
      email,
      img1[0].filename,
      img2[0].filename,
      img3[0].filename,
      img4[0].filename,
      img5[0].filename,
      img6[0].filename,
      date,
      time
    );

    res.status(200).json("true");
  } catch (error) {
    next(error);
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
