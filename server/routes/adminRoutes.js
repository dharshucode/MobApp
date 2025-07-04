const express=require('express');
const {pendingApprovals}=require('../controllers/adminController');
const router=express.Router();

router.get('/pendindapprovals',pendingApprovals)

module.exports=router;