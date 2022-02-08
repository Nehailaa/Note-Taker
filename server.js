// 1. Importing used modules in this project & set up the express App

const express = require('express');
const apiRoutes = require('./routes/api');
const htmlRoutes = require('./routes/html');
const app = express()
const PORT = process.env.PORT || 3000;

// 2. Setting up my assets
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('/api', apiRoutes);
app.use('/', htmlRoutes);

// 3. Setting up my server
app.listen(PORT, () => {
    console.log(`listening on PORT: ${PORT}`);
});



