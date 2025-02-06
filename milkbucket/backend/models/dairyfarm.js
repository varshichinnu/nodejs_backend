
const mongoose = require('mongoose');

const dairyfarmSchema = new mongoose.Schema({
   dairyfarmName:{
    type: String,
    required: true,
    unique: true
   },
   area: {
    type: String,
    required: true,
   },
   
   category:{
    type:[
        {
            type:String,
            enum : ['milk','cheese', 'butter','cream']
        }
    ]
   },
   contactInformation: {
      phone: {
      type: String,
      required: true
    },
      email: {
      type: String,
      required: true
    },
},
region:{
        
            type:String,
           required: true
},
offers: {
    type: String
    
  },
  image: {
    data: Buffer,
    contentType: String
},

  
  vendor:[
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'vendor'

    }],
        products: [{
          type: mongoose.Schema.Types.ObjectId,
          ref: 'product'
        }]
      });
const Dairyfarm = mongoose.model('dairyfarm',dairyfarmSchema);

module.exports = Dairyfarm