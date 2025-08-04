const JWT = require('jsonwebtoken');
const config = require('../config/config')

class JwtAuthToken {

    async createToken( data ) {

        try {

            const secreteKey = config.JwtSecretKey;

            const result = await JWT.sign({
                data
            },secreteKey,{expiresIn:'7d'});
            
            return { status : true , result : result }
            
        } catch (error) {

            return { status : false , error : error.message }

        }
       
    }

      async createTokenWithExpiryMinutes( data , minutes ) {

        try {

            const secreteKey = config.JwtSecretKey;

            const token = await JWT.sign({
                data
            },secreteKey,{expiresIn: minutes + 'm' });

            const expiryTime = Date.now() + ( minutes * 60 )
            
            return { status : true , result : { token : token , expiryTime : expiryTime } }
            
        } catch (error) {

            return { status : false , error : error.message }

        }
       
    }

    async verify( token ) {

        try {

            const result = await JWT.verify(token, config.JwtSecretKey )

            return { status : true , result : result }
            
        } catch (error) {

            console.log(error);
            return { status : false , error : error.message }
        }

       

    }
}

const JwtauthToken = new JwtAuthToken();

module.exports = JwtauthToken;
