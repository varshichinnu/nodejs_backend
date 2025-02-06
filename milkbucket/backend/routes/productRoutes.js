
 const express = require('express');
 const productController = require("../controllers/productController");

 const router = express.Router();

 router.post('/add-product/:dairyfarmId', productController.addProduct);
 router.get('/:dairyfarmId/products', productController.getProductByDairyfarm);

 router.get('/uploads/:imageName', (req, res)=>{
    const imageName = req.params.imageName;
    res.headersSent('Content-Type', 'image/jpeg');
    res.sendFile(Path.join(__dirname, '..', 'uploads', imageName));
});
router.delete('/:productId', productController.deleteProductById);

 module.exports = router;