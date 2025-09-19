const twilioSdk = require("twilio");
const { accountSid, authToken, fromNumber, serviceSid } =
  require("../config/config").twilio;

console.log("🚀 Initializing Twilio Client");
console.log(`   accountSid: ${accountSid ? "✔️ loaded" : "❌ missing"}`);
console.log(`   authToken: ${authToken ? "✔️ loaded" : "❌ missing"}`);
console.log(`   fromNumber: ${fromNumber ? fromNumber : "❌ not set"}`);
console.log(`   serviceSid: ${serviceSid ? "✔️ loaded" : "❌ missing"}`);

const client = twilioSdk(accountSid, authToken);

const SmsService = {
  // ✅ Direct SMS (Messages API)
  sendMessage: async (to, body) => {
    console.log("📲 [SmsService.sendMessage] Start");
    console.log(`   ➡️ To: ${to}`);
    console.log(`   📡 From: ${fromNumber}`);
    console.log(`   📝 Body: ${body}`);

    try {
      const message = await client.messages.create({
        body,
        from: fromNumber,
        to,
      });

      console.log("✅ SMS sent successfully!");
      console.log(`   📌 Message SID: ${message.sid}`);
      console.log(`   🕒 Date Created: ${message.dateCreated}`);
      console.log(`   📬 Status: ${message.status}`);

      return { success: true, sid: message.sid, status: message.status };
    } catch (error) {
      console.error("❌ [SmsService.sendMessage] Error occurred");
      console.error(`   ⚠️ Error Message: ${error.message}`);
      console.error(`   📜 Full Error Object:`, error);

      return { success: false, error: error.message };
    } finally {
      console.log("🏁 [SmsService.sendMessage] Finished execution\n");
    }
  },

  // ✅ Send OTP (Verify API)
  sendVerification: async (to) => {
    console.log("📲 [SmsService.sendVerification] Start");
    console.log(`   ➡️ Destination number (to): ${to}`);
    console.log(`   📡 Channel: sms`);
    console.log(`   🛠 Using Service SID: ${serviceSid}`);

    try {
      const verification = await client.verify.v2
        .services(serviceSid)
        .verifications.create({ to, channel: "sms" });

      console.log("✅ Verification SMS sent successfully!");
      console.log(`   📌 Verification SID: ${verification.sid}`);
      console.log(`   📬 Status: ${verification.status}`);
      console.log(`   🕒 Date Created: ${verification.dateCreated}`);

      return { success: true, sid: verification.sid, status: verification.status };
    } catch (error) {
      console.error("❌ [SmsService.sendVerification] Error occurred");
      console.error(`   ⚠️ Error Message: ${error.message}`);
      console.error(`   📜 Full Error Object:`, error);

      return { success: false, error: error.message };
    } finally {
      console.log("🏁 [SmsService.sendVerification] Finished execution\n");
    }
  },

  // ✅ Verify OTP (Verify API)
  checkVerification: async (to, code) => {
    console.log("📲 [SmsService.checkVerification] Start");
    console.log(`   ➡️ Destination number (to): ${to}`);
    console.log(`   🔑 Code to check: ${code}`);
    console.log(`   🛠 Using Service SID: ${serviceSid}`);

    try {
      const verificationCheck = await client.verify.v2
        .services(serviceSid)
        .verificationChecks.create({ to, code });

      console.log("✅ Verification check completed!");
      console.log(`   📌 SID: ${verificationCheck.sid}`);
      console.log(`   📬 Status: ${verificationCheck.status}`);
      console.log(`   🕒 Date Created: ${verificationCheck.dateCreated}`);

      return { success: true, status: verificationCheck.status };
    } catch (error) {
      console.error("❌ [SmsService.checkVerification] Error occurred");
      console.error(`   ⚠️ Error Message: ${error.message}`);
      console.error(`   📜 Full Error Object:`, error);

      return { success: false, error: error.message };
    } finally {
      console.log("🏁 [SmsService.checkVerification] Finished execution\n");
    }
  },
};

module.exports = SmsService;
