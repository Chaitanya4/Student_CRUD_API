const mongoose = require('mongoose');

const EmployeeSchema = mongoose.Schema({
    name: String,
    gender:String,
    email: String,
    salary:Number

}, {
    timestamps: true
});

module.exports = mongoose.model('Employees', EmployeeSchema);