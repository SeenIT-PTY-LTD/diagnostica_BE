
const twilioSdk = require("twilio");
const { accountSid, authToken, fromNumber, serviceSid } =
require("../config/config").twilio;

const client = twilioSdk(accountSid, authToken);

const SmsService = {
    
    // ✅ Direct SMS (Messages API)
    sendMessage: async (to) => {

        try {
            const message = await client.verify.v2.services("VAc12f7b5889a414fe29c8d8f114547efb")
            .verifications.
            create({ to: to, channel: "sms" })
            return { success: true, sid: message.sid, status: message.status };

        } catch (error) {

        return { success: false, error: error.message };
    }
    },

    // ✅ Send OTP (Verify API)
    sendVerification: async (to) => {

        try {
            const message = await client.verify.v2.services("VAc12f7b5889a414fe29c8d8f114547efb")
            .verifications.
            create({ to: to, channel: "sms" })
            return { success: true, sid: message.sid, status: message.status };

        } catch (error) {

            return { success: false, error: error.message };
        }
    },

    checkVerification: async (to, code) => {
        try {

            const verificationCheck = await client.verify.v2
            .services(serviceSid)
            .verificationChecks.create({ to, code });

            return { success: true, status: verificationCheck.status };
        } catch (error) {

            return { success: false, error: error.message };
        }
}

};

module.exports = SmsService;