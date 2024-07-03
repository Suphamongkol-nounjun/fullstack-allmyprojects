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
        } else {
            console.log("Invalid token");
            // ทำอะไรบางอย่างเมื่อ token ไม่ถูกต้อง
        }
    }

};
