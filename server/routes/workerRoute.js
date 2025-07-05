const express = require('express');
const { getWorkersList, pendingApprovals, workerApproval } = require('../controllers/workerController');
const router = express.Router();

router.get('/workerlist', getWorkersList)
router.get('/pendingapprovals', pendingApprovals);
router.post('/workerapproval', workerApproval);

module.exports = router;