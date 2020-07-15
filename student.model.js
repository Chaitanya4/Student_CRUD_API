const mongoose = require('mongoose');

const StudentSchema = mongoose.Schema({
    rollNo: String,
    name: String,
    contact: Number,
    email: String,
    password:String,
    classs:String

}, {
    timestamps: true
});

module.exports = mongoose.model('Students', StudentSchema);