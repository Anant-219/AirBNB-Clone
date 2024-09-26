const express = require('express')
const router = express.Router()
const Review = require("../model/review.js")
const airbnb_data = require("../model/listing")
const Customerror = require('./Error Handling/Custom_Error_Class')
const { schema } = require('./model/Schema_Error_Handling')

// Error Handling 

function asyncWrap(fn) {
    return function (req, res, next) {
        fn(req, res, next).catch((err) => next(err));
    }
}

router.post('/new/add/:id', async (req, res, next) => {
    try {

        let { rating, comment } = req.body
        let { id } = req.params

        let new_review = { rating, comment }

        const new_review_data = new Review(new_review);

        await new_review_data.save()

        id_data = await airbnb_data.findById(id);

        id_data.reviews.push(new_review_data)
        await id_data.save()

        res.redirect(`/listings/user/${id}`);
    } catch (err) {
        const error = new Customerror(401, "Error while saving New Review Data");
        next(error)
    }
})


router.delete('/:review_id', async (req, res, next) => {
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
        res.redirect(`/listings/user/${listing_id}`);
    } catch (err) {
        const error = new Customerror(401, "Error while Deleting Review Data");
        next(error)
    }
})

module.exports = router