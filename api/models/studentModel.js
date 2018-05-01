'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var StudentSchema = new Schema({
    first_name: {
        type: String
    },
    last_name: {
        type: String
    },
    email: {
        type: String
    },
    age : {
        type: Number
    },
    grade: {
        type: String,
        enum : ['Pre-K,', 'K', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
        default: 'N/A'
    }
});

module.exports = mongoose.model('Student', StudentSchema);