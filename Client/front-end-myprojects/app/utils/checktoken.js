// utils/tokenUtils.js
import { jwtDecode } from "jwt-decode";

export const checktoken = () => {
    const token = localStorage.getItem("token");
    // console.log(token);
    if (token) {
        const decodedToken = jwtDecode(token);
        if (decodedToken) {
            console.log("Decoded Token:", decodedToken);
            const isTokenExpired = Date.now() >= decodedToken.exp * 1000;
            const expirationTimeMilliseconds = decodedToken.exp * 1000;
            const expirationDate = new Date(expirationTimeMilliseconds);
            const emailLogin = decodedToken.email;

            if (isTokenExpired) {
                console.log("Token has expired");
                window.location.href = '/login';
                localStorage.removeItem("token");

                // ทำอะไรบางอย่างเมื่อ token หมดอายุ
            } else {
                console.log('Token หมดเวลา : ', expirationDate);
                console.log('email ที่ใช้ Login: ', emailLogin);
                console.log("Token ยังไม่หมดอายุ");
                // ดำเนินการต่อไปตามปกติ
            }
        } else {
            console.log("Invalid token");
            // ทำอะไรบางอย่างเมื่อ token ไม่ถูกต้อง
        }
    } else {
        console.log("Session หมดอายุ");
        window.location.href = '/login';
    }
};


