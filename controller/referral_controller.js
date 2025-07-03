const EmailService = require("../services/email_service");
const ReferralServices = require("../services/referral_service");

exports.create = async(req, res, next)=>{
    try{
    
        const response = await ReferralServices.createEntery( req.body );

        if(response['isSuccess']){

            if( req.body['deliveryMethod']['email'] || req.body['deliveryMethod']['both'] ){

                const html = `
                <div>Dear ${req.body.fullName},</div>
                <br>
                <p>You've been invited to join Diagnostica, your digital health companion.<br>
                What you can do:<br>
                    - Track recovery through guided PROMs</br>
                    - View your health progress visually</br>
                    - Receive timely reminders & expert insights<br>
                <br>
                    Click below to get started:<br>
                    <a href="https://play.google.com/store/apps/details?id=com.diagnos.diagnostica_mobile">https://play.google.com/store/apps/details?id=com.diagnos.diagnostica_mobile</a>
                    <br>
                <br>
                    For assistance contact us at support@diagnostica.app.<br>
                <br>
                    Warm regards,<br>
                    Diagnostica

                </p>`;

                const subject = 'Welcome message'
                const to = req.body.email;
                let send = await EmailService.sendEmail( to , subject, html);
                console.log(send,'*****send****')
            }

            if( req.body['deliveryMethod']['sms'] || req.body['deliveryMethod']['both'] ){
                console.log('******* SMS Sending ******')
            }
            
        }
        return res.status(response['statusCode']).send(response)

    }catch(error){

        const response = { isSuccess : false ,statusCode : 500, message : error.message , result : {} }
        return res.status(response['statusCode']).send(response)
    }
}


exports.getEnteries = async(req,res,next) => {
    try {
        const response = await ReferralServices.getEnteriesBasedOnCondition( {} );
        return res.status(response['statusCode']).send(response)
    } catch (error) {
        const response = { isSuccess : false ,statusCode : 500, message : error.message , result : {} }
        return res.status(response['statusCode']).send(response)
    }
}
