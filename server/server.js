const path = require('path');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const keys = require('./config/keys');
const PORT = process.env.PORT || 4000;
const timeTablesRouter = require('./routes/timeTables');

// database
mongoose.connect(keys.mongoURI, {
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
});
const connection = mongoose.connection;

connection.once('open', function() {
    console.log('MongoDB database connection established successfully');
});

// middleware
app.use(cors());
app.use(bodyParser.json()); // parse application/json
app.use(express.static(__dirname)); // static files
app.use(express.static(path.join(__dirname, '../build'))); // static files

// API routes
app.use('/api', timeTablesRouter);

// unhandled path
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(PORT, function() {
    console.log('Server is running on Port: ' + PORT);
});
