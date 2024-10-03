const multer = require('multer');
const path = require('path');
const fs = require('fs-extra');

// การตั้งค่า multer
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        const userId = req.body.id; // รับ userId จาก body
        const dir = path.join(__dirname, 'serverDrive', userId); // สร้างโฟลเดอร์ตาม userId

        fs.ensureDirSync(dir); // สร้างโฟลเดอร์ถ้ายังไม่มี
        cb(null, dir);
    },
    filename: (req, file, cb) => {
        cb(null, file.originalname); // ตั้งชื่อไฟล์ตามชื่อเดิม
    }
});

// ส่งออกการตั้งค่า multer
const upload = multer({ storage });

module.exports = upload;
