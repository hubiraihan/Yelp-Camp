const mongoose = require('mongoose');
const cities = require('./cities');
const {descriptors, places} = require('./seedHelpers');
const Campground = require('../models/campground'); //./models/campground.js というファイルの エクスポート を Campground という名前で取り込んでいる。


mongoose.connect('mongodb://localhost:27017/Yelp-camp', { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => {
        console.log('Mongo DB conect success!!!')
    })
    .catch(err => {
        console.log('MongoDB conection Error!!')
        console.log(err)
    });

const sample = array => array[Math.floor(Math.random() * array.length)];

const seedDB = async () => {
    await Campground.deleteMany({});
    for(let i = 0; i < 50; i ++) {
        const randomCityIndex = Math.floor(Math.random() * cities.length);
        const camp = new Campground({
            location: `${cities[randomCityIndex].prefecture}${cities[randomCityIndex].city}`,
            title: `${sample(descriptors)}・${sample(places)}`
        });
        await camp.save();
    };
};

seedDB().then(() => {
    mongoose.connection.close();
})