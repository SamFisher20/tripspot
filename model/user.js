const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const passportLocalMong = require('passport-local-mongoose');


const userSchema = new Schema({
    email: {
        type: String,
        required: true,
        unique: true
    }
});

userSchema.plugin(passportLocalMong);

module.exports = mongoose.model('user', userSchema);