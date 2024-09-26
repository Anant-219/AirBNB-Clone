const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')

const review = require("./routes/review")
const listing = require("./routes/listing")
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
// Routes for listings and reviews

app.use('/listings', listing)
app.use('/reviews', review)

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
// Default render if above route not matches

app.use("*", (req, res, next) => {
    res.render('404.ejs')
    // res.status(404).send("Page Not Exits!");
})

app.listen(port, (req, res) => {
    console.log(`App is listening on port ${port}`);
})
// ------------------------------------------------------------------------------------