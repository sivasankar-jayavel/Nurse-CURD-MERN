const mongoose = require('mongoose')

const UserSchema = new mongoose.Schema({
    name: String,
    licenseNumber: String,
    age: Number,
    dob: String,
})

const UserModel = mongoose.model("users", UserSchema)

module.exports = UserModel;