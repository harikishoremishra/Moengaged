const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    lists: [{
        name: String,
        creationDate: Date,
        responseCodes: [String],
        imageLinks: [String]
    }]
});

module.exports = mongoose.model('User', UserSchema);
