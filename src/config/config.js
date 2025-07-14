if(!process.env.NODE_ENV){
    require('dotenv').config({ path: '.env.local' });
}else{
    require('dotenv').config({ path: `./env/.env.${process.env.NODE_ENV}`});
}

let config = {
    mongo : {
        connectionUrl : process.env.MONGO_CONNECTION_URL
    },
    express : {
        port : process.env.EXPRESS_PORT
    },
    ClientHost : process.env.CLIENT_HOST,
    JwtSecretKey : process.env.JWT_SECRET_KEY
}

module.exports = config;