
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    productName: {
          type: String,
          required: true
    },
    price:{
        type: String,
        required:true
    },
    category: {
        type:[
            {
              type: String,
              enum : ['milk','cheese', 'butter','cream']  
            }
        ]
    },
    image:{
        data: Buffer,
    contentType: String
    },
    bestSeller:{
        type:String
    },
    description:{
        type:String
    },
    dairyfarm: [{
        type: mongoose.Schema.Types.ObjectId,
        ref:'dairyfarm'
    }]
});

const product = mongoose.model('product', productSchema);

module.exports = product