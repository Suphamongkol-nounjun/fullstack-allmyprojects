const { poolPromise } = require("../config/db");
const bcrypt = require('bcrypt');
const session = require("express-session");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const {generateOTP, checkEmailExists, getLatestOTP, sendEmail} = require("../utils/otp-utils")
const moment = require('moment-timezone');

exports.testlogin = async (req, res) => {
    res.json({ msg: "้hello login" });
};


exports.register = async (req, res) => {
    
    try {
    const {email, password} = req.body
    const { v4: uuidv4 } = require('uuid');
    const passwordHash = await bcrypt.hash(password, 10)
    const userData ={
        email,
        password: passwordHash,
        role: "user",
        uuid: uuidv4()
    }
    
    const [results] = await poolPromise.query('INSERT INTO users SET ?', userData)
    res.json({
        message: "insert ok",
        results
    })
    } catch (error) {
        console.log('error',error)
        res.status(400).json({ message: "Email Duplicate",error })
    }
};

exports.login = async (req, res)=>{
    try {
    const {email, password} = req.body
    const [results] = await poolPromise.query('SELECT * FROM users where email = ?', email)
    if (results.length === 0) {
        return res.status(400).json({ message: "User not found or wrong email" });
    }
    const user = results[0]

    res.json({user})

    } catch (error) {
        console.log('error', error)
        res.status(401).json({
            message: "login fail",
            error
        })
    }

}; 



exports.loginsavetoken = async (req, res)=>{
    try {
    const {email, password} = req.body
    const [results] = await poolPromise.query('SELECT * FROM users where email = ?', email)
    if (results.length === 0) {
        return res.status(400).json({ message: "User not found or wrong email" });
    }
    const userData = results[0]
    const matchPassword = await bcrypt.compare(password, userData.password)

    if(!matchPassword){
        res.status(400).json({
            message: "wrong password"
        })
        return false
    };

    //สร้าง jwt token
    const token = jwt.sign({email, role: "admin"}, secret, { expiresIn: '1m'})
    res.json({message: "login success",
        token
    })

    } catch (error) {
        console.log('error', error)
        res.status(401).json({
            message: "login fail",
            error
        })
    }

}; 

exports.loginsavecookie = async (req, res)=>{
    try {
    const {email, password} = req.body
    const [results] = await poolPromise.query('SELECT * FROM users where email = ?', email)
    if (results.length === 0) {
        return res.status(400).json({ message: "User not found or wrong email" });
    }
    const userData = results[0]
    const matchPassword = await bcrypt.compare(password, userData.password)

    if(!matchPassword){
        res.status(400).json({
            message: "wrong password"
        })
        return false
    };

    //สร้าง jwt token
    const token = jwt.sign({email, role: "admin"}, secret, { expiresIn: '1h'})
    console.log(token)
    res.cookie('token', token, {
        maxAge: 300000, //มีเวลา 5 นาที
        secure: true,
        httpOnly: true,
        sameSite: "none"
    })
    res.json({message: "login success"})

    } catch (error) {
        console.log('error', error)
        res.status(401).json({
            message: "login fail",
            error
        })
    }

};

exports.loginsession = async (req, res)=>{
    try {
    const {email, password} = req.body
    const [results] = await poolPromise.query('SELECT * FROM users where email = ?', email)
    if (results.length === 0) {
        return res.status(400).json({ message: "User not found or wrong email" });
    }
    const userData = results[0]
    const matchPassword = await bcrypt.compare(password, userData.password)

    if(!matchPassword){
        res.status(400).json({
            message: "wrong password"
        })
        return false
    };

    req.session.userId =  userData.id
    req.session.user = userData
    console.log('sessionID: ', req.sessionID)
    
    res.json({message: "login success"})

    } catch (error) {
        console.log('error', error)
        res.status(401).json({
            message: "login fail",
            error
        })
    }

};

exports.userstoken = async (req, res) =>{
    try {
        const authHeader = req.headers['authorization']
        let authToken = ''
        if (authHeader){
            authToken = authHeader.split(' ')[1]
        }
        console.log('authToken', authToken , '\nauthHeader',authHeader)
        const user = jwt.verify(authToken, secret)
        //เราจะมั่นใจว่า user มาอย่างถูกต้องแล้ว ไม่ต้อง handler อะไร
        console.log('user', user, 'email:', user.email)
        const [checkResults] = await poolPromise.query("SELECT * FROM users where email = ?", user.email)
        if (!checkResults[0]){
            throw { message: 'user not found'}
        }

        const [results] = await poolPromise.query("SELECT * FROM users where email= ?", user.email)
        res.json({
            users: results
        })

    } catch (error) {
        console.log('error', error)
        res.status(403).json({
            message: "authentication fail",
            error
        })
    }
}

exports.userscookie = async (req, res) =>{
    try {
        const authToken = req.cookies.token
        console.log('authToken: ',authToken)
        const user = jwt.verify(authToken, secret)
        //เราจะมั่นใจว่า user มาอย่างถูกต้องแล้ว ไม่ต้อง handler อะไร
        console.log('user', user)
        const [checkResults] = await poolPromise.query("SELECT * FROM users where email = ?", user.email)
        if (!checkResults[0]){
            throw { message: 'user now found'}
        }

        const [results] = await poolPromise.query("SELECT * FROM users where email = ?", user.email)
        res.json({
            users: results
        })

    } catch (error) {
        console.log('error', error)
        res.status(403).json({
            message: "authentication fail",
            error
        })
    }
}

exports.userssession = async (req, res) =>{
    try {

        if(!req.session.userId){
            throw { message: 'Auth fail'}
        }
        const userId = req.session.userId
        console.log(userId)
        const [results] = await poolPromise.query("SELECT * FROM users where id = ?", userId)
        res.json({
            users: results
        })

    } catch (error) {
        console.log('error', error)
        res.status(403).json({
            message: "authentication fail",
            error
        })
    }
}

exports.generateOtp = async (req, res) => {

    const { email } = req.body;
    try {
         const emailExists = await checkEmailExists(email);
    if (!emailExists) {
      return res.status(404).json({ message: 'Email not found' });
    }
        // const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otp = await generateOTP(email);
        const createDate = moment().tz('Asia/Bangkok').format('YYYY-MM-DD HH:mm:ss');
        const expireDate = moment().tz('Asia/Bangkok').add(5, 'minutes').format('YYYY-MM-DD HH:mm:ss');
        const [results] = await poolPromise.query('INSERT INTO otplog SET ?', { otp, email, createDate, expireDate });
        res.status(200).json({ email,otp,results });
    
    } catch (error) {
        console.log('error',error)
        res.status(400).json({ message: "Email ซ้ำ",error })
    }
};

exports.sendOtp = async (req, res) => {

    const { email } = req.body;
    const otp = await getLatestOTP(email);
    console.log('otp: ', otp)
  
    if (!otp) {
      return res.status(400).json({ message: 'OTP not generated' });
    }
    try {
     await sendEmail(email, otp);
     res.status(200).json({ message: `OTP sent เรียบร้อย` });
    
    } catch (error) {
        console.log('error',error)
        res.status(500).json({ message: 'Error sending OTP', error });
    }
};

exports.checkOtp = async (req, res) => {

    const { email, otp } = req.body;
    const otpcheck = await getLatestOTP(email);
    console.log('otp ใน db: ', otpcheck,'otp ที่กรอกมา : ', otp)
  
    try {
        if (otp !== otpcheck) {
            return res.status(400).json({ message: "OTP does not match" });
        }
        res.status(200).json({ message: `OTP ถูกต้อง` });
    
    } catch (error) {
        console.log('error',error)
        res.status(500).json({ message: 'Error Submit OTP', error });
    }
};

exports.changePassword = async (req, res) => {

    const {email, oldpassword, newpassword} = req.body
    if (oldpassword === newpassword) {
        return res.status(400).json({ message: "รหัสผ่านใหม่และเก่าต้องไม่เหมือนกัน" });
    }

    try {
    const [rows] = await poolPromise.query('SELECT password FROM users WHERE email = ?', [email]);
    // console.log(rows)
    const password = rows[0].password;
    // console.log('passwordemail: ', password)
    const matchPassword = await bcrypt.compare(oldpassword, password)
    if(!matchPassword){
        res.status(400).json({
            message: "รหัสผ่านเก่า ไม่ถูกต้อง"
        })
        return false
    };
    // console.log('password เหมือนกัน')
    const hashedNewPassword = await bcrypt.hash(newpassword, 10); // ใช้ bcrypt เพื่อเข้ารหัส newpassword
    await poolPromise.query('UPDATE users SET password = ? WHERE email = ?', [hashedNewPassword, email]);
    res.status(200).json({ message: "แก้ไขรหัสผ่านเรียบร้อย" });
    
    } catch (error) {
        console.log('error',error)
        res.status(400).json({ message: 'Error change password', error });
    }
};

