const express = require('express')
const app = express()
const path = require('path')
const mongoose = require('mongoose')
const methodOverride = require('method-override')
const port = '8080'

app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use('/public', express.static(path.join(__dirname, 'public')))
app.use(express.json())

app.get('/', (req, res) => {
    res.render('home.ejs');
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