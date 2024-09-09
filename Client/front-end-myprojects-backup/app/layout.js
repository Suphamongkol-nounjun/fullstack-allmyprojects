"use client";
import './globals.css'; // นำเข้าไฟล์ CSS ของคุณ
import Link from 'next/link';
import { AppBar, Box, Toolbar, Typography, Button, IconButton, Container } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { jwtDecode } from "jwt-decode";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"] });

export default function RootLayout({ children }) {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);
  const router = useRouter(); 
  const pathname = usePathname();

  
  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        const decodedToken = jwtDecode(token);
        const email = decodedToken.email;
        setToken(token);
        setEmail(email);
      }
    };

    fetchData();
  }, []); // ใช้งาน useEffect เพียงครั้งเดียวตอน Component โหลดครั้งแรก

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setEmail(null);
    router.push('/login');
    console.log('Logout สำเร็จ')
  };

  if (pathname === '/login' || pathname === '/register') {
    return (
      <html lang="en">
        <body className={inter.className}>
          {children}
        </body>
      </html>
    );
  }


  return (
    <html lang="en">
      <body className={inter.className}>

        <Box sx={{ flexGrow: 1 }}>
          <AppBar position="static">
            <Toolbar>
              <IconButton
                size="large"
                edge="start"
                color="inherit"
                aria-label="menu"
                sx={{ mr: 2 }}
              >
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                <Link href="/attractions" style={{ textDecoration: 'none', color: 'white' }}>
                  Travel App
                </Link>
              </Typography>
              {token ? (
                <>
                  <Typography variant="body1" sx={{ color: 'white', mr: 2 }}>
                    {`Logged in as: ${email}`}
                  </Typography>
                  <Button color="inherit" onClick={handleLogout}>Logout</Button>
                </>
              ) : (
                <Link href="/login" passHref>
                  <Button color="inherit">Login</Button>
                </Link>
              )}
            </Toolbar>
          </AppBar>
        <Container>
        {children}
        </Container>
        </Box>
        </body>
        </html>
  );
}
// export function RootLayout({ children }) {
//   return (
//     <html lang="en">
//       <body className={inter.className}>{children}</body>
//     </html>
//   );
// }