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
        type: Number
    }
});

module.exports = mongoose.model('Student', StudentSchema);