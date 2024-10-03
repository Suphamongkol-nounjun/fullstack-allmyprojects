const { poolPromise } = require("../config/db");
const bcrypt = require('bcrypt');
const session = require("express-session");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const moment = require('moment-timezone');

const upload = require("../utils/profile-utils")

exports.testuser = async (req, res) => {
    res.json({ msg: "้hello user" });
};


exports.uploadAvatar = async (req, res) => {
    try {
       
    } catch (error) {
        console.log('error', error);
        res.status(400).json({ message: "Avatar upload failed", error });
    }
};


