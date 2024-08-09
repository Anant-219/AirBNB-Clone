const mongoose = require('mongoose')
const mongo_connection_string = 'mongodb+srv://root:root@cluster0.7hkiyzy.mongodb.net/sample_mflix?retryWrites=true&w=majority&appName=Cluster0'

const main = async () => {
    const data = await mongoose.connect(mongo_connection_string);
    // console.log("Connected Successfully");
    // mongoose.close()
}

main().then((res) => {
    console.log('connection Successfull!');
    // console.log(res);
}).catch((err) => {
    console.log("Errror", err);
})

const airbnb_schema = new mongoose.Schema({
    name: String,
    city: String,
    price: Number,
    photo: String,
    discription: String,
    guestsSize: Number,
    beds: Number,
    bathrooms: Number,
    bedrooms: Number
});



const appData = mongoose.model('Airbnb_data', airbnb_schema);


const newData = new appData({
    name: "Cozy Mountain Cabin NEWWWW",
    city: "SHRINAGAR",
    price: 7500,
    photo: "https://images.stockcake.com/public/7/f/d/7fd607eb-17da-46c6-90d7-8ecfa368bb7d_large/elegant-tuscan-villa-stockcake.jpg",
    description: "Cuddling On The Creek… The name says it all!!! This brand new unigue ”Cozy Mountain Cabin” 1 bedroom cabin located just steps away from right down to creek. The firepit and creek views from your front porch give you the perfect backdrop to enjoying peace, tranquility and your morning coffee",
    guestsSize: 1,
    bedrooms: 7,
    beds: 5,
    bathrooms: "Four"
});


// appData.save()
//     .then(savedUser => {
//         console.log("User saved:", savedUser);
//     })
//     .catch(err => {
//         console.error("Error saving user:", err);
//     })
//     .finally(() => {
//         mongoose.connection.close();
//     });


// const gpt_data = [
//     {
//         name: "Beachside Bungalow",
//         city: "Goa",
//         price: 4000,
//         photo: "https://images.stockcake.com/public/4/9/a/49a69dae-c9b9-454b-b478-df7c30967178_large/sunset-villa-escape-stockcake.jpg",
//         description: "A beautiful beachfront bungalow in Goa, perfect for a relaxing getaway by the sea.",
//         guestsSize: 10,
//         bedrooms: 3,
//         beds: 7,
//         bathrooms: 4
//     },
//     {
//         name: "Urban Loft",
//         city: "Mumbai",
//         price: 6000,
//         photo: "https://images.stockcake.com/public/9/5/3/9539d49a-ad7a-4bd4-bdba-a1d3a321cffd_large/seaside-italian-villa-stockcake.jpg",
//         description: "A chic and modern loft in the heart of Mumbai, offering stunning city views.",
//         guestsSize: 12,
//         bedrooms: 4,
//         beds: 8,
//         bathrooms: 3
//     },
//     {
//         name: "Countryside Cottage",
//         city: "Ooty",
//         price: 3000,
//         photo: "https://images.stockcake.com/public/2/8/0/280be47d-0eee-4b4e-8039-f06a244f5a06_large/idyllic-tuscan-villa-stockcake.jpg",
//         description: "A cozy cottage nestled in the serene hills of Ooty, ideal for nature lovers.",
//         guestsSize: 8,
//         bedrooms: 2,
//         beds: 6,
//         bathrooms: 2
//     },
//     {
//         name: "Hilltop Villa",
//         city: "Shimla",
//         price: 5000,
//         photo: "https://images.stockcake.com/public/b/d/3/bd357cc0-6c50-4309-b138-31bbf8454a0a_large/tuscan-villa-sunrise-stockcake.jpg",
//         description: "A luxurious villa perched on a hilltop in Shimla, offering breathtaking views.",
//         guestsSize: 9,
//         bedrooms: 3,
//         beds: 5,
//         bathrooms: 3
//     },
//     {
//         name: "Heritage Mansion",
//         city: "Jaipur",
//         price: 4500,
//         photo: "https://images.stockcake.com/public/4/e/3/4e3b1826-9ec9-4efa-8d68-b7117a5026d2_large/coastal-villa-escape-stockcake.jpg",
//         description: "An elegant mansion in Jaipur, rich in history and cultural heritage.",
//         guestsSize: 12,
//         bedrooms: 5,
//         beds: 10,
//         bathrooms: 4
//     },
//     {
//         name: "Lakeside Retreat",
//         city: "Udaipur",
//         price: 5500,
//         photo: "https://images.stockcake.com/public/b/f/b/bfbac59f-8c89-4467-85c7-4b91eb6ce5a1_large/tuscan-villa-sunrise-stockcake.jpg",
//         description: "A peaceful retreat by the lake in Udaipur, offering tranquility and luxury.",
//         guestsSize: 10,
//         bedrooms: 4,
//         beds: 6,
//         bathrooms: 3
//     },
//     {
//         name: "Forest Lodge",
//         city: "Munnar",
//         price: 3500,
//         photo: "https://images.stockcake.com/public/7/5/5/75505cc2-7ebf-4cd7-b5a6-6e99a9f4a35a_large/sunset-tuscan-villa-stockcake.jpg",
//         description: "A rustic lodge surrounded by lush forests in Munnar, perfect for a wilderness escape.",
//         guestsSize: 6,
//         bedrooms: 2,
//         beds: 4,
//         bathrooms: 2
//     },
//     {
//         name: "Desert Camp",
//         city: "Jaisalmer",
//         price: 2700,
//         photo: "https://images.stockcake.com/public/0/a/a/0aa40f6a-f42a-480a-a1a2-76872d3a14eb_large/luxurious-coastal-villa-stockcake.jpg",
//         description: "An adventurous desert camp experience in the golden sands of Jaisalmer.",
//         guestsSize: 8,
//         bedrooms: 2,
//         beds: 4,
//         bathrooms: 1
//     },
//     {
//         name: "Luxury Apartment",
//         city: "Delhi",
//         price: 7000,
//         photo: "https://images.stockcake.com/public/b/5/0/b50ad1e7-d255-4a46-a88b-fefa749395b1_large/idyllic-tuscan-villa-stockcake.jpg",
//         description: "A luxurious apartment in the bustling city of Delhi, offering modern amenities.",
//         guestsSize: 12,
//         bedrooms: 4,
//         beds: 8,
//         bathrooms: 3
//     },
//     {
//         name: "Seaside Villa",
//         city: "Pondicherry",
//         price: 5200,
//         photo: "https://images.stockcake.com/public/4/8/4/48497267-4565-4e15-a3e5-fc3d8af1cf34_large/tropical-beachfront-villa-stockcake.jpg",
//         description: "A charming villa by the sea in Pondicherry, blending French and Indian cultures.",
//         guestsSize: 11,
//         bedrooms: 3,
//         beds: 5,
//         bathrooms: 2
//     },
//     {
//         name: "Riverside Cottage",
//         city: "Rishikesh",
//         price: 3200,
//         photo: "https://images.stockcake.com/public/b/9/a/b9aa3c1c-3ee0-4288-a853-eaffea858153_large/luxurious-poolside-villa-stockcake.jpg",
//         description: "A quaint riverside cottage in Rishikesh, perfect for a spiritual retreat.",
//         guestsSize: 7,
//         bedrooms: 2,
//         beds: 4,
//         bathrooms: 2
//     },
//     {
//         name: "Jungle Treehouse",
//         city: "Wayanad",
//         price: 3800,
//         photo: "https://images.stockcake.com/public/b/5/0/b50ad1e7-d255-4a46-a88b-fefa749395b1_large/idyllic-tuscan-villa-stockcake.jpg",
//         description: "An adventurous treehouse stay amidst the lush jungles of Wayanad.",
//         guestsSize: 5,
//         bedrooms: 1,
//         beds: 3,
//         bathrooms: 1
//     },
//     {
//         name: "Boutique Hotel",
//         city: "Bangalore",
//         price: 4500,
//         photo: "https://images.stockcake.com/public/d/d/1/dd146a46-1ad8-499c-8574-d8919f1cd745_large/sunset-villa-elegance-stockcake.jpg",
//         description: "A stylish boutique hotel in Bangalore, offering a unique and luxurious experience.",
//         guestsSize: 10,
//         bedrooms: 4,
//         beds: 6,
//         bathrooms: 3
//     },
//     {
//         name: "Snow Chalet",
//         city: "Gulmarg",
//         price: 5000,
//         photo: "https://images.stockcake.com/public/0/b/c/0bce55d0-1fc8-4817-a41f-a1cb2dff7a3b_large/tuscan-villa-sunset-stockcake.jpg",
//         description: "A cozy chalet in the snow-covered landscapes of Gulmarg, perfect for a winter getaway.",
//         guestsSize: 6,
//         bedrooms: 2,
//         beds: 4,
//         bathrooms: 2
//     },
//     {
//         name: "Hill Station Resort",
//         city: "Kodaikanal",
//         price: 4200,
//         photo: "https://images.stockcake.com/public/7/0/a/70a02f16-f907-43cb-a29f-4b53a7292713_large/idyllic-tuscan-villa-stockcake.jpg",
//         description: "A serene resort in the beautiful hill station of Kodaikanal, offering breathtaking views.",
//         guestsSize: 9,
//         bedrooms: 3,
//         beds: 5,
//         bathrooms: 3
//     },
//     {
//         name: "Modern Studio",
//         city: "Hyderabad",
//         price: 4000,
//         photo: "https://images.stockcake.com/public/d/6/d/d6d49659-a09d-4a12-b625-53dea0660eed_large/elegant-spanish-villa-stockcake.jpg",
//         description: "A sleek and modern studio in Hyderabad, ideal for business and leisure travelers.",
//         guestsSize: 4,
//         bedrooms: 1,
//         beds: 2,
//         bathrooms: 1
//     },
//     {
//         name: "Farmhouse Stay",
//         city: "Alibaug",
//         price: 3500,
//         photo: "https://images.stockcake.com/public/c/1/7/c17bacf8-8e84-437b-9048-b9d883056d1b_large/idyllic-spanish-villa-stockcake.jpg",
//         description: "A peaceful farmhouse stay in Alibaug, offering a rustic and charming experience.",
//         guestsSize: 8,
//         bedrooms: 3,
//         beds: 5,
//         bathrooms: 2
//     },
//     {
//         name: "Mountain Retreat",
//         city: "Manali",
//         price: 4800,
//         photo: "https://images.stockcake.com/public/3/a/2/3a2a59d5-5540-455f-b378-4f44dc1bab17_large/tuscan-sunset-glow-stockcake.jpg",
//         description: "A beautiful retreat in the mountains of Manali, offering peace and tranquility.",
//         guestsSize: 9,
//         bedrooms: 3,
//         beds: 5,
//         bathrooms: 3
//     },
//     {
//         name: "Eco Lodge",
//         city: "Coorg",
//         price: 3300,
//         photo: "https://images.stockcake.com/public/3/a/2/3a2a59d5-5540-455f-b378-4f44dc1bab17_large/tuscan-sunset-glow-stockcake.jpg",
//         description: "An eco-friendly lodge in the lush coffee plantations of Coorg, perfect for nature lovers.",
//         guestsSize: 7,
//         bedrooms: 2,
//         beds: 4,
//         bathrooms: 2
//     },
//     {
//         name: "Waterfront Apartment",
//         city: "Kochi",
//         price: 4600,
//         photo: "https://images.stockcake.com/public/e/d/f/edf92c8e-cd01-41e3-851e-4d6df7e5c11c_large/luxurious-poolside-villa-stockcake.jpg",
//         description: "A stylish apartment with stunning waterfront views in Kochi, ideal for a serene stay.",
//         guestsSize: 6,
//         bedrooms: 2,
//         beds: 3,
//         bathrooms: 2
//     },
//     {
//         name: "Mountain View Chalet",
//         city: "Nainital",
//         price: 3100,
//         photo: "https://images.stockcake.com/public/5/9/f/59f9b1cd-dff3-4945-ad67-d8c736d12215_large/tuscan-sunrise-beauty-stockcake.jpg",
//         description: "A cozy chalet offering panoramic mountain views in the beautiful town of Nainital.",
//         guestsSize: 6,
//         bedrooms: 2,
//         beds: 3,
//         bathrooms: 1
//     },
//     {
//         name: "Historic Villa",
//         city: "Agra",
//         price: 4300,
//         photo: "https://images.stockcake.com/public/0/e/2/0e270fae-9cd9-4bb6-843d-9d5d6041adc8_large/sunset-villa-view-stockcake.jpg",
//         description: "A historic villa in Agra, offering a blend of traditional architecture and modern comforts.",
//         guestsSize: 10,
//         bedrooms: 3,
//         beds: 7,
//         bathrooms: 3
//     },
//     {
//         name: "Luxury Retreat",
//         city: "Uttarakhand",
//         price: 5400,
//         photo: "https://images.stockcake.com/public/7/7/4/77420c9c-dc7a-44f0-8c50-fed915bead7e_large/luxurious-villa-entrance-stockcake.jpg",
//         description: "A luxurious retreat in the picturesque landscapes of Uttarakhand, offering peace and serenity.",
//         guestsSize: 8,
//         bedrooms: 3,
//         beds: 5,
//         bathrooms: 3
//     },
//     {
//         name: "Beach Hut",
//         city: "Gokarna",
//         price: 2400,
//         photo: "https://images.stockcake.com/public/3/e/4/3e4141fe-7b6f-4667-939e-9ffb07956a5e_large/luxury-poolside-leisure-stockcake.jpg",
//         description: "A simple and cozy beach hut in Gokarna, perfect for a laid-back seaside vacation.",
//         guestsSize: 4,
//         bedrooms: 1,
//         beds: 2,
//         bathrooms: 1
//     }
// ]

// appData.insertMany(gpt_data)
//     .then((res) => {
//         console.log("Data Added!");
//         mongoose.connection.close();
//     }).catch((err) => {
//         console.log("Error happend", err);
//         mongoose.connection.close();
//     })

newData.save()
    .then(savedUser => {
        console.log("User saved:", savedUser);
    })
    .catch(err => {
        console.error("Error saving user:", err);
    })
    .finally(() => {
        mongoose.connection.close();
    });




