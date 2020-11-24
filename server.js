const express = require('express');
const connectDB = require('./config/db');
const app = express();
const cors = require('cors');

// connect database
connectDB();
//express.json() is a built-in method in express to recognize the incoming Request Object as a JSON Object. 
// This method is called as a middleware in your application using the code: app.use(express.json());
app.use(cors());
app.use(express.json());
//express.urlencoded() is a built-in method in express to recognize the incoming Request Object as strings or arrays. 
// This method is called as a middleware in your application using the code: app.use(express.urlencoded());
// When passing option {extended: true}, it'll parse any type of object
app.use(express.urlencoded({extended: false}));

//Define Routes
app.use('/', require('./routes/index'));
app.use('/api/url', require('./routes/url'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


