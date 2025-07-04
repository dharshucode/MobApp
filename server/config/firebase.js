const admin = require('firebase-admin');

const firebaseInit = admin.initializeApp({
    credential: admin.credential.cert(require('../firebase_details.json'))
});

module.exports = { firebaseInit }
