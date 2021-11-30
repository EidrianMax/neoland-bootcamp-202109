const mongoose = require('mongoose')

const { Schema } = mongoose

const user = new Schema({
    name: {
        type: String,
        required: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        validate: [
            {
                validator(password) {
                    return password.length > 6
                },
                message: 'password too short'
            },
            {
                validator(password) {
                    return /(?=.*[a-zA-Z])(?=.*[0-9]+).*/.test(password)
                },
                message: 'password has white spaces'
            }
        ]
    }
})

const User = model('User', userSchema)

mongoose.connect('mongodb://localhost/demo')
    .then(() => {

    })