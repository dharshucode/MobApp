const sql = require('../config/db.js')
const { notifyUser } = require('./workerController.js');
const { firebaseInit } = require('../config/firebase.js');

const getWorkersList = async (req, res) => {

  const { profession } = req.query;

  try {

    const result = await sql` SELECT * FROM Users u RIGHT JOIN Workers w ON u.id=w.user_id WHERE w.profession=${profession} AND w.is_online='T'`;
    console.log(result);

    res.status(200).json({ message: "Retrived Successfully", data: result });

  }
  catch (err) {

    console.log(err);
    res.status(500).json({ message: "Server Error", data: err });

  }
};



const notifyWorker = async (request_id) => {
  try {
    await sql` INSERT INTO BookingApprovals (request_id, approver_role, status) VALUES (${request_id}, 'WORKER', 'PENDING') `;

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
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", data: err });
  }
}


const pendingApprovals = async (req, res) => {

  try {
    const results = await sql` SELECT * FROM BookingApprovals WHERE approver_role='WORKER' AND status='PENDING' `;

    res.status(200).json({ message: "Success", data: results });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", data: err });
  }
}

const workerApproval = async (req, res) => {

  const { request_id, approval, reason } = req.body;
  let status = approval ? "Approved" : "Denied";
  let message;
  try {

    await sql`UPDATE BookingApprovals SET status=${status}, reason=${reason} WHERE request_id=${request_id}`;

    const [customer_id, worker_id] = await sql` SELECT r.customer_id, r.worker_id FROM BookingRequests WHERE id=${request_id}`;

    if (status) {
      await sql`INSERT INTO Bookings(worker_id, customer_id) VALUES (${worker_id},${customer_id})`;

      message = "Your request have been approved and the booking is made";
      notifyUser(customer_id, request_id, message)

      return;
    }
    message = "Your request have been denied and the booking can't be done , kindly look into other workers";

    notifyUser(customer_id, request_id, message);
  }
  catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server Error", data: err });
  }
}


module.exports = { getWorkersList, notifyWorker, pendingApprovals, workerApproval }