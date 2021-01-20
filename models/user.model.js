const {LOGIN_REGEX, NAME_REGEX, DEFAULT_IP} = require("../lib/constants");
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
    login: {
        type: String,
        index: { unique: true },
        required: [true, 'логин - обязательное поле.'],
        trim: true,
        match: [
            LOGIN_REGEX,
            'Логин может содержать только маленькие латинские буквы и цифры.'
        ]
    },
    name: {
        type: String,
        required: [true, 'имя - обязательное поле.'],
        trim: true,
        match: [
            NAME_REGEX,
            'Имя может содержать только буквы английского или русского алфавитов, цифры, пробел.'
        ]
    },
    password: {
        type: String,
        required: [true, 'пароль - обязательное поле.'],
        trim: true,
        minlength: [8, 'Пароль слишком короткий, инимум 8 символов.']
    },
    confirmPassword: {
        type: String,
        trim: true,
        validate: {
            validator: function (field) {
                return field === this.password
            },
            message: 'Пароли не совпадают.'
        }
    },
    registrationDate: {
        type: Date,
        default: Date.now
    },
    userIp: {
        type: String,
        default: DEFAULT_IP
    },
    role: {
        type: String,
        default: 'player'
    },
    hiScore: {
        type: Number,
        default: 0
    },
    gamesPlayed: {
        type: Number,
        default: 0
    }
})

UserSchema.pre('save', async function(next) {
    this.password = await bcrypt.hash(this.password, 12);
    this.confirmPassword = undefined;
    next();
});

const User = mongoose.model('User', UserSchema)

module.exports = User;