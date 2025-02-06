const Dairyfarm = require('../models/dairyfarm'); // Fixed the import name
const Vendor = require('../models/Vendor');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/'); // Directory where images will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + Path.extname( file.originalname)); // Unique file name
    }
});

const upload = multer({ storage: storage });

const addDairyfarm = async (req, res) => {
    try {
        const { dairyfarmName, area, category, region, contactInformation, offer } = req.body;
        const image = req.file ? req.file.filename : undefined;

        const vendor = await Vendor.findById(req.vendorId);
        if (!vendor) {
            return res.status(404).json({ message: "Vendor not found" }); // Return to prevent further execution
        }

        const dairyfarm = new Dairyfarm({
            dairyfarmName, // Corrected field name
            area,
            category,
            region,
            offer,
            image,
            contactInformation,
            vendor: vendor._id
        });

       const savedDairyfarm = await dairyfarm.save();

       vendor.dairyfarm.push(savedDairyfarm)
         await vendor.save()

        return res.status(200).json({ message: "Dairyfarm Added successfully" });

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

const deleteDairyfarmById =async(req, res) => {
    try{
        const dairyfarmId = req.params.dairyfarmId;

        const deleteProduct = await Dairyfarm.findByIdAndDelete(dairyfarmId);

        if(!deleteProduct) {
            return res.status(500).json({ error: "Internal server error"})
        }
    }catch(error) {
        console.error(error);
        res.status(500).json({ error: "Internal server error"});
    }
}

module.exports = { addDairyfarm: [upload.single('image'), addDairyfarm],deleteDairyfarmById };
