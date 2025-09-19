if (!process.env.NODE_ENV) {
  require("dotenv").config({ path: ".env.local" });
} else {
  require("dotenv").config({ path: `./env/.env.${process.env.NODE_ENV}` });
}

let config = {
  mongo: {
    connectionUrl: process.env.MONGO_CONNECTION_URL,
  },
  express: {
    port: process.env.EXPRESS_PORT,
  },
  ServerHost: process.env.SERVER_HOST,
  ClientHost: process.env.CLIENT_HOST,
  SupportAdminEmail: process.env.SUPPORT_ADMIN_EMAIL,
  JwtSecretKey: process.env.JWT_SECRET_KEY,
  CryptoSecretKey: process.env.CRYPTO_SECRET,

  // 🔹 Twilio
  twilio: {
    accountSid: process.env.TWILIO_ACCOUNT_SID,
    authToken: process.env.TWILIO_AUTH_TOKEN,
    serviceSid: process.env.TWILIO_SERVICE_SID, // ✅ correct key name
    fromNumber: process.env.TWILIO_FROM_NUMBER,
  },
};

module.exports = config;
