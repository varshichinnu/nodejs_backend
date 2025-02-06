
const Dairyfarm = require("../models/dairyfarm");
const Product = require("../models/product");
const multer = require("multer");
const path = require("path");


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where images will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Path.extname( file.originalname)); // Unique file name
    }
});
const upload = multer({ storage: storage });

const addProduct = async(req, res)=>{
    try{
         const{ productName, price, category, bestSeller, description } = req.body;
         const image = req.file ? req.file.filname : undefined;

         const dairyfarmId = req.params.dairyfarmId;
         const dairyfarm = await Dairyfarm.findById(dairyfarmId);

          if(!dairyfarm) {
            return res.status(404).json({error: "No dairyfarm found"});
          }
          const product = new Product({
            productName, price, category, bestSeller, description, image, dairyfarm: dairyfarm._id
          });

          const savedProduct = await product.save();

          dairyfarm.products.push(savedProduct._id);

          await dairyfarm.save();

          res.status(200).json(savedProduct);

    } catch (error) {
        console.error(error);
        res.status(500).json({error: "Internal server error"});

    }
};

const getProductByDairyfarm = async(req,res)=>{
    try{
        const dairyfarmId = req.params.dairyfarmId;
        const dairyfarm = await Dairyfarm.findById(dairyfarmId);

        if(!dairyfarm) {
            return res.status(404).json({error: "No dairyfarm found"});
        }

        const dairyfarmName = dairyfarm.dairyfarmName;
         const product = await Product.find({ dairyfarm: dairyfarmId });

         res.status(200).json({dairyfarmName, product });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error"});
    }
}
 const deleteProductById = async(req, res)=>{
    try{
        const productId = req.params.productId;

        const deleteProduct = await Product.findByIdAndDelete(productId);

        if(!deleteProduct){
            return res.status(404).json({error: " No product found"})
        }
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error"});
    }
 }

module.exports = {addProduct: [upload.single('image'), addProduct], getProductByDairyfarm, deleteProductById };