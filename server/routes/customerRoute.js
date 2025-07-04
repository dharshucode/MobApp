const express=require('express');
const {bookingReq}=require('../controllers/customerController');
const router=express.Router();

router.post('/book',bookingReq)

module.exports=router;