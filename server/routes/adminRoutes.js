const express = require('express');
const { pendingApprovals, adminApproval } = require('../controllers/adminController');
const router = express.Router();

router.get('/pendingapprovals', pendingApprovals);
router.post('/adminapproval', adminApproval);

module.exports = router;