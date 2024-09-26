const express = require('express')
const router = express.Router()
const multer = require('multer')
const Review = require("../model/review.js")
const airbnb_data = require("../model/listing")
const path = require('path')
const Customerror = require('./Error Handling/Custom_Error_Class')
const { schema } = require('./model/Schema_Error_Handling')

// ------------------------------------------------------------------------------------
// Handling Upload File-

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const upload = multer({ storage: storage })

// ------------------------------------------------------------------------------------

// Error Handling 
function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
}
// ------------------------------------------------------------------------------------
// Home Route(All Listings)
router.get('/', asyncWrap(async (req, res, next) => {
    all_data = await airbnb_data.find({})

    if (!all_data) {
        next(new Customerror(404, "Data Not Found in Database!"))
    }

    res.render('home.ejs', { all_data });
}))

// ------------------------------------------------------------------------------------

// Show Route
router.get('/user/:id', asyncWrap(async (req, res, next) => {
    let { id } = req.params;

    id_data = await airbnb_data.findById(id).populate('reviews');
    // console.log(id_data.reviews)

    if (!id_data) {
        next(new Customerror(404, `Data Not Found for ID - ${id}!`))
    }
    res.render('edit.ejs', { id_data });
}))

router.patch('/user/:id', asyncWrap(async (req, res, next) => {
    let { name, city, description, beds, guestsSize, bedrooms, price } = req.body
    let { id } = req.params;

    id_data = await airbnb_data.findById(id);

    const updatedData = await airbnb_data.findByIdAndUpdate(
        id,
        {
            $set: { name, city, description, beds, guestsSize, bedrooms, price }
        },
        { new: true, runValidators: true } // Options: new returns the updated document
    );

    if (!updatedData) {
        return res.status(404).json({ message: 'Listing not found' });
    }

    res.redirect("/listings");
}))
// ------------------------------------------------------------------------------------

// Create Route
router.get('/new', (req, res, next) => {
    res.render('new.ejs');
})

router.post('/new/add', upload.single('avatar'), (req, res, next) => {
    try {
        let { name, city, description, beds, guestsSize, bathrooms, price } = req.body
        let { path: filePath } = req.file

        let filename = path.basename(filePath);
        let new_data = { name, city, description, beds, guestsSize, bathrooms, price, photo: filename }


        // Schema Validation(Error Handling)
        // let result = schema.validate(req.body);
        // console.log(result);

        const new_app_data = new airbnb_data(new_data);

        new_app_data.save()

        res.redirect("/listings");
    } catch (err) {
        const error = new Customerror(401, "Error while saving Data");
        next(error)
    }
})

// ------------------------------------------------------------------------------------
// Delete Route
router.delete('/user/:id', asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    await airbnb_data.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/listings');
        })

}))

module.exports = router