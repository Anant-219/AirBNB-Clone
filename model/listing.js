const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Review = require("./review.js")

const airbnb_schema = new Schema({
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


airbnb_schema.post('findOneAndDelete', async (listing) => {
    const deleted_reviews = await Review.deleteMany({ _id: { $in: listing.reviews } });
    // console.log('deleted_reviews', deleted_reviews);
})

module.exports = mongoose.model('airbnb_data', airbnb_schema);