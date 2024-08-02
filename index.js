const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const port = '8080'
const mongo_connection_string = 'mongodb+srv://root:root@cluster0.7hkiyzy.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0'

// Basic SetUP For Express App-----------------------------------------
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

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
    console.log("Errror", err);
})

const airbnb_data = mongoose.model('airbnb_data', new mongoose.Schema({}, { strict: false }));
const appData = mongoose.model('test', new mongoose.Schema({}, { strict: false }));

// ----------------------------------------------------------------------------------


// Home Route(All Listings)
app.get('/', async (req, res) => {

    all_data = await airbnb_data.find({})

    res.render('home.ejs', { all_data });
})

// Show Route
app.get('/listing/user/:id', async (req, res) => {
    let { id } = req.params;
    // console.log(id);
    id_data = await airbnb_data.findById(id);
    console.log(id_data);

    // console.log(id_data);
    res.render('edit.ejs', { id_data });
})




// Create Route
app.get('/listing/new', (req, res) => {
    res.render('new.ejs');
})

app.post('/listing/new/add', (req, res) => {
    // console.log(req.body);
    // let { property, city, description, beds, guestsSize, bedrooms, price } = req.body

    const new_app_data = new appData(req.body);

    new_app_data.save()
        .then((result) => {
            console.log("Data Added!");
            res.redirect("/");
        }).catch((err) => {
            console.log("Error happend", err);
        })
})







app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`);
})