const mongoose = require("mongoose");
const config = require('config');
const mongoDB = config.get('mongoURI');

const connectDB = () => {
    mongoose.connect(mongoDB , {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
    console.log('MongoDB Connected');
    let db = mongoose.connection;
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));
}

// const connectDB = async () => {
//     try{
//         await mongoose.connect(db, {
//             useNewUrlParser: true,
//             useUnifiedTopology: true
//         });
//         console.log('MongoDB Connected');
//     }catch(err){
//         console.log(err.message);
//         process.exit(1);
//     }
// }

module.exports = connectDB;

// Alternatively:
// var mongoDB = 'mongodb://127.0.0.1/my_database';
// mongoose.connect(mongoDB, {useNewUrlParser: true, useUnifiedTopology: true});

// //Get the default connection
// var db = mongoose.connection;

// //Bind connection to error event (to get notification of connection errors)
// db.on('error', console.error.bind(console, 'MongoDB connection error:'));