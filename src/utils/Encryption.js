const bcrypt = require('bcrypt');
const crypto = require('crypto');

async function encrypt( string ){
    let salt = await bcrypt.genSalt(10);
    let hasString = await bcrypt.hash( string , salt );
    return hasString
}

async function compare( string , compareString ){
    
    let check = await bcrypt.compare( string , compareString )

    if(check){
        return {
            status : true
        }
    }else{
        return{
            status : false
        }
    }
}

async function randomKey(){
    return await crypto.randomBytes(16).toString('hex')
}

module.exports = {
  encrypt, 
  compare,
  randomKey
}