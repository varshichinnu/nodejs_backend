
const express = require("express");
const dotEnv = require('dotenv');
const mongoose = require('mongoose');
const vendorRoutes = require('./routes/vendorRoutes');
const bodyParser = require("body-parser");
const dairyfarmRoutes = require('./routes/dairyfarmRoutes');
const productRoutes = require('./routes/productRoutes');

const path = require('path');

const app = express()

const PORT = process.env.PORT 5000;

dotEnv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(()=> console.log("mongoDB connected successfully!"))
  .catch((error)=> console.log(error))
 
  app.use(bodyParser.json());
  app.use('/vendor',vendorRoutes);
  app.use('/dairyfarm',dairyfarmRoutes);
  app.use('/product', productRoutes);
  app.use('/uploads',express.static('uploads'));

app.listen(PORT, ()=>{
  console.log(`server started and running at ${PORT}`); 
});
app.use('/', (req,res)=>{
    res.send("<h1>welcome to milkpacket");
})