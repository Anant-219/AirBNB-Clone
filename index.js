const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const multer = require('multer')
const Customerror = require('./Error Handling/Custom_Error_Class')
const { schema } = require('./model/Schema_Error_Handling')
const Review = require("./model/review.js")
// const upload = multer({ storage: storage })
const port = '8080'
const mongo_connection_string = 'mongodb+srv://root:root@cluster0.7hkiyzy.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0'

// Basic SetUP For Express App-----------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use('/uploads', express.static(path.join(__dirname, 'public', 'uploads')));

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())
// -------------------------------------------------------------------------------

// Connection to MongoDb Atlas

const main = async () => {
    await mongoose.connect(mongo_connection_string);
}

main().then((res) => {
    console.log('connection Successfull!');

}).catch((err) => {
    console.log("Error while connecting to Database!", err);
})

// ------------------------------------------------------------------------------------
// Schema Defination

const airbnb_schema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        uppercase: true
    },
    city: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: 0
    },
    photo: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    guestsSize: {
        type: Number,
        required: true,
        min: 0
    },
    beds: {
        type: Number,
        required: true,
        min: 0
    },
    bathrooms: {
        type: Number,
        required: true,
        min: 0
    },
    reviews: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Review"
    }]
});

const airbnb_data = mongoose.model('airbnb_data', airbnb_schema);
const appData = mongoose.model('test', new mongoose.Schema({}, { strict: false }));

// ----------------------------------------------------------------------------------
// Handling Upload File-

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, 'public/uploads'))
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
app.get('/', asyncWrap(async (req, res, next) => {
    all_data = await airbnb_data.find({})

    if (!all_data) {
        next(new Customerror(404, "Data Not Found in Database!"))
    }

    res.render('home.ejs', { all_data });
}))

// ------------------------------------------------------------------------------------

// Show Route
app.get('/listing/user/:id', asyncWrap(async (req, res, next) => {
    let { id } = req.params;

    id_data = await airbnb_data.findById(id).populate('reviews');
    // console.log(id_data.reviews)

    if (!id_data) {
        next(new Customerror(404, `Data Not Found for ID - ${id}!`))
    }
    res.render('edit.ejs', { id_data });
}))

app.patch('/listing/user/:id', asyncWrap(async (req, res, next) => {
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

    res.redirect("/");
}))
// ------------------------------------------------------------------------------------

// Create Route
app.get('/listing/new', (req, res, next) => {
    res.render('new.ejs');
})

app.post('/listing/new/add', upload.single('avatar'), (req, res, next) => {
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

        res.redirect("/");
    } catch (err) {
        const error = new Customerror(401, "Error while saving Data");
        next(error)
    }
})

// ------------------------------------------------------------------------------------
// Delete Route
app.delete('/listing/user/:id', asyncWrap(async (req, res, next) => {
    const { id } = req.params;
    await airbnb_data.findByIdAndDelete(id)
        .then(() => {
            res.redirect('/');
        })

}))

// Review Routes--------------------------------------------------------------

app.post('/reviews/new/add/:id', async (req, res, next) => {
    try {

        let { rating, comment } = req.body
        let { id } = req.params

        let new_review = { rating, comment }

        const new_review_data = new Review(new_review);

        await new_review_data.save()

        id_data = await airbnb_data.findById(id);

        id_data.reviews.push(new_review_data)
        await id_data.save()

        res.redirect(`/listing/user/${id}`);
    } catch (err) {
        const error = new Customerror(401, "Error while saving New Review Data");
        next(error)
    }
})


app.delete('/reviews/:review_id', async (req, res, next) => {
    try {
        const { review_id } = req.params;
        const { listing_id } = req.body;
        // console.log(review_id)
        const updatedData = await airbnb_data.findByIdAndUpdate(listing_id, { $pull: { reviews: review_id } });

        if (!updatedData) {
            return res.status(404).json({ message: 'Listing not found' });
        }
        const deletedReview = await Review.findByIdAndDelete(review_id);
        if (!deletedReview) {
            console.log('No review found with that ID');
            return res.status(404).send('Review not found');
        }
        // console.log('Review Deleted:', deletedReview);
        res.redirect(`/listing/user/${listing_id}`);
    } catch (err) {
        const error = new Customerror(401, "Error while Deleting Review Data");
        next(error)
    }
})







// ------------------------------------------------------------------------------------
// Error Handling Middleware

app.use((err, req, res, next) => {
    // console.log("Error Happened!");
    // console.log("Error Name -", err.name);
    // console.log(err.message)
    // console.log("At Route -", req.method, req.originalUrl);  // Logs the method and the route where the error occurred
    // console.log("Stack Trace -", err.stack);  // Optional: Logs the stack trace for more detailed debugging
    res.render('error.ejs', { err })
    // next(err)
})

// ------------------------------------------------------------------------------------
app.use("*", (req, res, next) => {
    res.render('404.ejs')
    // res.status(404).send("Page Not Exits!");
})
// ------------------------------------------------------------------------------------

app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`);
})

// ------------------------------------------------------------------------------------