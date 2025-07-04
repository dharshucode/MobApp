const sql = require('../config/db.js')
const { notifyAdmin } = require('./adminController.js');
const { firebaseInit } = require('../config/firebase.js');

const bookingReq = async (req, res) => {

    const { customer_id, worker_id } = req.body;

    try {

        const req_id = await sql`INSERT INTO BookingRequests (customer_id, worker_id) VALUES (${customer_id}, ${worker_id}) RETURNING id`;
        const request_id = req_id[0].id;

        await notifyAdmin(request_id);

    }
    catch (err) {

        console.log(err);
        res.status(500).json({ message: "Server Error", data: err });

    }

};

const notifyUser = async (customer_id, request_id, message) => {
    try {

        const fcmToken = await sql``;

        await firebaseInit.messaging().send({
            token: fcmToken,
            notification: {
                title: 'Booking Status',
                body: message
            },
            data: {
                requestId: String(request_id)
            }
        });

    }
    catch (err) {
        console.log(err);
    }
}

module.exports = { bookingReq, notifyUser }