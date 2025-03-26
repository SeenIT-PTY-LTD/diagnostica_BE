const ImageModel = require('../model/image_model');

class ImageServices{

  static async documents(email,img1,img2,img3,img4,img5,img6,date,time) {
    try {
      const newdocuments = new ImageModel({
        email,img1,img2,img3,img4,img5,img6,date,time
      });

      return  await newdocuments.save()

    } catch (error) {
      throw error;
    }
  }
    

    static async  getimage(email) {
        try {
          const detail = await ImageModel.find({ email: email });
          return detail;
        } catch (error) {
          throw new Error(error.message);
        }
      }

    static async deleteimage(email){
        try{
            var query = {email : email};
            return await ImageModel.findOneAndDelete(query);

        }catch(error){
            throw error;
        }
    }
}
module.exports = ImageServices;