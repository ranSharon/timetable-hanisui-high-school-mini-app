const mongoose = require('mongoose');
const { Schema } = mongoose; //this is es6 syntax for "const Schema = mongoose.Schema;"

const timeTableSchema = new Schema({
    classNumber: String,
    days: Array,
    constaraintsToAdd: Array
});

module.exports = mongoose.model('TimeTables', timeTableSchema);
