const { poolPromise } = require("../config/db");
const bcrypt = require('bcrypt');
const session = require("express-session");
const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;

exports.testlogin = async (req, res) => {
    res.json({ msg: "้hello login" });
};

exports.register = async (req, res) => {
    
    try {
    const {email, password} = req.body
    const passwordHash = await bcrypt.hash(password, 10)
    const userData ={
        email,
        password: passwordHash
    }
    
    const [results] = await poolPromise.query('INSERT INTO users SET ?', userData)
    res.json({
        message: "insert ok",
        results
    })
    } catch (error) {
        console.log('error',error)
    res.json({
        message: "insert error",
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
    const token = jwt.sign({email, role: "admin"}, secret, { expiresIn: '1h'})
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
            throw { message: 'user now found'}
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

