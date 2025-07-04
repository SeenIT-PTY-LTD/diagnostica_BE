const functions = require('firebase-functions');
const admin = require('firebase-admin');
const fetch = require('node-fetch'); // or axios

admin.initializeApp();

exports.sendSmsOnWrite = functions.firestore
  .document('smsQueue/{docId}')
  .onCreate(async (snap, ctx) => {
    const { to, message } = snap.data();
    if (!to || !message) throw new Error('Missing "to" or "message"');

    const apiKey = functions.config().sms.apikey;
    const url = `https://api.fast2sms.com/dev/bulkV2`;

    const resp = await fetch(url, {
      method: 'POST',
      headers: {
        'authorization': apiKey,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: "v3",
        sender_id: "FSTSMS",
        message: message,
        numbers: to
      })
    });

    const data = await resp.json();
    await snap.ref.update({ sentAt: admin.firestore.FieldValue.serverTimestamp(), providerResponse: data });

    return null;
  });
