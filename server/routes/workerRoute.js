const express=require('express');
const {getWorkersList}=require('../controllers/workerController');
const router=express.Router();

router.get('/workerlist',getWorkersList)

module.exports=router;