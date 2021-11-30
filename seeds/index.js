const mongoose = require('mongoose');
const cities = require('./cities');
const { places, descriptors } = require('./seedHelpers');
const Campground = require('../models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
    console.log("Database connected");
});

const sample = array => array[Math.floor(Math.random() * array.length)];


const seedDB = async () => {
    await Campground.deleteMany({});
    for (let i = 0; i < 300; i++) {
        const random1000 = Math.floor(Math.random() * 1000);
        const price = Math.floor(Math.random() * 20) + 10;
        const camp = new Campground({
            //YOUR USER ID
            author: '617e2710d7268d1304f83eec',
            location: `${cities[random1000].city}, ${cities[random1000].state}`,
            title: `${sample(descriptors)} ${sample(places)}`,
            description: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quibusdam dolores vero perferendis laudantium, consequuntur voluptatibus nulla architecto, sit soluta esse iure sed labore ipsam a cum nihil atque molestiae deserunt!',
            price,
            geometry: {
                coordinates: [
                    cities[random1000].longitude,
                    cities[random1000].latitude
                ],
                type: 'Point'
            },
            images: [
                {
                  url: 'https://res.cloudinary.com/dukuhjj9q/image/upload/v1637503857/YelpCamp/a51u819vx1kldmji2jyc.jpg',
                  filename: 'YelpCamp/xu0b1v07iclfbohf70st'
                },
                {
                  url: 'https://res.cloudinary.com/dukuhjj9q/image/upload/v1637505293/YelpCamp/vnjftqzthavtfuddy38t.jpg',
                  filename: 'YelpCamp/wm5o1ibbcuwbu6qwq1ur'
                }
              ]
        })
        await camp.save();
    }
}

seedDB().then(() => {
    mongoose.connection.close();
})