
const CryptoJS = require('crypto-js');
const crypto = require('crypto');
const Config = require('../config/config');
const config = require('../config/config');

const encryptObject = (encryptValue, SecretKey) => {
    try {
        encryptValue = JSON.stringify(encryptValue)
        let ciphertext = CryptoJS.AES.encrypt(encryptValue, SecretKey).toString();
        // console.log(ciphertext, 'encryptObject')
        return ciphertext
    }
    catch (err) {
        return ''
    }
}


const DefaultencryptObject = (encryptValue) => {
    try {
        encryptValue = JSON.stringify(encryptValue)
        let ciphertext = CryptoJS.AES.encrypt(encryptValue, Config.CryptoSecretKey).toString();
        // console.log(ciphertext, 'DefaultencryptObject')
        return ciphertext
    }
    catch (err) {
        return ''
    }
}

const decryptObject = (decryptValue, SecretKey) => {
    try {
        let bytes = CryptoJS.AES.decrypt(decryptValue, SecretKey);
        let decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
        // console.log(decryptedData, 'decryptObject', bytes.toString(CryptoJS.enc.Utf8))
        return decryptedData
    }
    catch (err) {
        console.log(err, 'decryptObject__err')
        return ''
    }
}
 
const replaceSpecialCharacter = (value, type) => {
    try {
        console.log("encryptString", value, type);
        let textValue = value;
        if (!isEmpty(textValue)) {
            if (type == 'encrypt') {
                // textValue = textValue.toString().replace('+', 'xMl3Jk').replace('/', 'Por21Ld').replace('=', 'Ml32');
                textValue = textValue.toString().replace(/\+/g, 'xMl3Jk').replace(/\//g, 'Por21Ld').replace(/\=/g, 'Ml32');
            } else if (type == 'decrypt') {
                // textValue = textValue.replace('xMl3Jk', '+').replace('Por21Ld', '/').replace('Ml32', '=');
                textValue = textValue.replace(/\xMl3Jk/g, '+').replace(/\Por21Ld/g, '/').replace(/\Ml32/g, "=");
            }
        }
        return textValue
    } catch (err) {
        console.log("replaceSpecialCharacter_err", err);
        return ''
    }
}

const encryptString = (encryptValue, isSpecialCharacters = false) => {
    try {
        encryptValue = encryptValue.toString()
        let ciphertext = CryptoJS.AES.encrypt(encryptValue, Config.CryptoSecretKey).toString();
        if (isSpecialCharacters) {
            return replaceSpecialCharacter(ciphertext, 'encrypt')
        }
        console.log(ciphertext, 'encryptString')
        return ciphertext
    }
    catch (err) {
        console.log("encryptString_err", err);
        return ''
    }
}

const decryptString = (decryptValue, isSpecialCharacters = false) => {
    try {
        console.log("decryptValue, Config.CRYPTOSECRETKEY", decryptValue, Config.CryptoSecretKey);
        if (isSpecialCharacters) {
            decryptValue = replaceSpecialCharacter(decryptValue, 'decrypt')
        }
        decryptValue = decryptValue.toString()

        let bytes = CryptoJS.AES.decrypt(decryptValue, Config.CryptoSecretKey);
        // console.log("bytes",bytes)
        let originalText = bytes.toString(CryptoJS.enc.Utf8);
        console.log("originalText", originalText)
        return originalText
    }
    catch (err) {
        console.log("------err", err)
        return ''
    }
}

const generatesecretKey = (length) => {
    try {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    } catch (err) {
        console.log(err, 'generateKey__err')
    }
}

const randomByte = (byte) => {
    try {
        return crypto.randomBytes(byte).toString('hex');
    } catch (err) {
        return ''
    }
}


const generateSignature = (value, secretKey) => {
    try {
        let hashValue = CryptoJS.HmacSHA256(value, secretKey);
        let hash = CryptoJS.enc.Hex.stringify(hashValue);
        return hash
    } catch (err) {
        console.log(err, 'generateSignature__err')
        return ''
    }
}


module.exports = {
    encryptObject,
    DefaultencryptObject,
    decryptObject,
    encryptString,
    decryptString,
    generateSignature,
    generatesecretKey,
    randomByte
}