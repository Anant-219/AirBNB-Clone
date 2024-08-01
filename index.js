const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const port = '8080'
const mongo_connection_string = 'mongodb+srv://root:root@cluster0.7hkiyzy.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0'

// Basic SetUP For Express App-----------------------------------------
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
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

// ----------------------------------------------------------------------------------

app.get('/', async (req, res) => {

    all_data = await airbnb_data.find({})
    // .then((res) => {
    //     console.log(res);
    // }).catch((err) => {
    //     console.log("Errorrr");
    // })
    // console.log(user_data)
    // res.send('working');
    res.render('home.ejs', { all_data });
})

// app.get('/', (req, res) => {
//     console.log('Root');
// })

// app.get('/', (req, res) => {
//     console.log('Root');
// })


app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`);
})