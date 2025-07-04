const sql = require('../config/db.js');
const { notifyWorker } = require('./workerController.js');
const { notifyUser } = require('./workerController.js');
const { firebaseInit } = require('../config/firebase.js');

const notifyAdmin = async (request_id) => {
    try {

        await sql` INSERT INTO BookingApprovals (request_id, approver_role, status) VALUES (${request_id}, 'ADMIN', 'PENDING') `;

        const fcmToken = await sql``;

        await firebaseInit.messaging().send({
            token: fcmToken,
            notification: {
                title: 'New Booking Request',
                body: 'A customer has requested your approval.'
            },
            data: {
                requestId: String(request_id)
            }
        });
    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", data: err });
    }

};


const pendingApprovals = async (req, res) => {

    try {
        const results = await sql` SELECT * FROM BookingApprovals WHERE approver_role='ADMIN' AND status='PENDING' `;

        res.status(200).json({ message: "Success", data: results })

    } catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", data: err });
    }

}


const adminApproval = async (req, res) => {

    const { request_id, approval, reason } = req.body;
    let status = approval ? "Approved" : "Denied";
    let message;
    try {
        await sql`UPDATE BookingApprovals SET status=${status},reason=${reason} WHERE request_id=${request_id}`;
        if (status) {
            notifyWorker(id);
            message = "Your request have been approved and the booking is made";
            notifyUser(customer_id, request_id, message);
            return;
        }
        const [customer_id] = await sql` SELECT r.customer_id FROM BookingRequests WHERE id=${request_id}`;
        message = "Your request have been denied and the booking can't be done , kindly look into other workers";

        notifyUser(customer_id, request_id,message);
    }
    catch (err) {
        console.log(err);
        res.status(500).json({ message: "Server Error", data: err });
    }
}






module.exports = { notifyAdmin, pendingApprovals, adminApproval };