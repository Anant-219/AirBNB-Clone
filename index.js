const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const multer = require('multer')
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
    // console.log("Connected Successfully");
    // mongoose.close()
}

main().then((res) => {
    console.log('connection Successfull!');
    // console.log(res);
}).catch((err) => {
    console.log("Error while connecting to Database!", err);
})


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
    }
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
// Home Route(All Listings)
app.get('/', async (req, res) => {

    all_data = await airbnb_data.find({})
    // console.log("Alll Data-------------------------------------");
    // console.log(all_data);
    // console.log('----------------------------------------------');

    res.render('home.ejs', { all_data });
})


// Show Route
app.get('/listing/user/:id', async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    id_data = await airbnb_data.findById(id);
    // console.log(id_data);
    res.render('edit.ejs', { id_data });
})

app.patch('/listing/user/:id', async (req, res) => {
    let { name, city, description, beds, guestsSize, bedrooms, price } = req.body

    let { id } = req.params;


    id_data = await airbnb_data.findById(id);
    console.log(id_data);



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


    id_data = await airbnb_data.findById(id);
    console.log(id_data);

    res.redirect("/");
})



// Create Route
app.get('/listing/new', (req, res) => {
    res.render('new.ejs');
})

app.post('/listing/new/add', upload.single('avatar'), (req, res) => {
    let { name, city, description, beds, guestsSize, bathrooms, price } = req.body
    let { path: filePath } = req.file

    console.log(req.file);
    let filename = path.basename(filePath);
    let new_data = { name, city, description, beds, guestsSize, bathrooms, price, photo: filename }

    const new_app_data = new airbnb_data(new_data);

    new_app_data.save()
        .then((result) => {
            console.log("Data Added!");
            res.redirect("/");
        }).catch((err) => {
            console.log("Error happend", err);
        })
})


// // Delete Route
// app.get('/listing/user/:id', async (req, res) => {
//     let { id } = req.params;
//     // console.log(id);
//     id_data = await airbnb_data.findById(id);
//     // console.log(id_data);
//     res.render('edit.ejs', { id_data });
// })





app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`);
})