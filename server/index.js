const express=require('express');
const cors=require('cors');
const helmet=require('helmet');
const customerRoute=require('./routes/customerRoute');
const workerRoute=require('./routes/workerRoute');
require('dotenv').config();

const app=express();
app.use(express.json());
app.use(cors());
app.use(helmet());


app.use('/api/workers',workerRoute);

port=process.env.PORT;
app.listen(port,()=>{
    console.log(`Listening on PORT ${port}`)
})