"use client";
import React, { useState , useEffect } from "react";
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Alertpage from '../utils/alertpage';
import { RememberMe } from "@mui/icons-material";
import { jwtDecode } from "jwt-decode";
import { checktoken } from "../utils/checktoken";


const axios = require("axios");

export default function Loginpage() {
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  const [checked, setChecked] = React.useState(false);
  const [email, setEmail] = useState("");
  // console.log('checkremember: ', checkRemember)
  useEffect(() => {

    checktoken();
    const rememberMe = localStorage.getItem('rememberEmail');
    if (rememberMe === 'true') {
      setChecked(true);
      const checkTokenEmail = () => {
        const email = localStorage.getItem('email');
        if(email){
        setEmail(email)
      }else{
        localStorage.setItem('email','')
      }
      };
      checkTokenEmail();
    }
  }, []);
  console.log('checkbox: ',checked);
  console.log('email: ', email)


  const handleChange = (event) => {
    setChecked(event.target.checked);
  };

  // const handleEmailChange = (e) => {
  //   setEmail(e.target.value);
  // };

  // const handlePasswordChange = (e) => {
  //   setPassword(e.target.value);
  // };

  const handleLoginClickToken = async () => {
    try {
      localStorage.setItem("email", email);
      localStorage.setItem("password", password);
      const response = await axios.post(
        "http://localhost:5000/api/loginsavetoken",
        {
          email,
          password,
        }
      );
      console.log("response", response);
      localStorage.setItem("token", response.data.token);
      window.location.href = '/';
      // router.push('/');

    } catch (error) {
      console.log("error", error);
    }
  };
  const handleLoginClickCookie = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loginsavecookie",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleLoginClickSession = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loginsession",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        }
      );
      console.log("response", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleGetuserClickToken = async () => {
    try {
      const authToken = localStorage.getItem("token");
      const response = await axios.get("http://localhost:5000/api/userstoken", {
        headers: {
          authorization: `Bearer ${authToken}`,
        },
      });
      console.log("user data", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleGetuserClickCookie = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/userscookie",
        {
          withCredentials: true,
        }
      );
      console.log("user data", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };
  const handleGetuserClickSession = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/userssession",
        {
          withCredentials: true,
        }
      );
      console.log("user data", response.data);
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const email = data.get('email')
    const password = data.get('password')
    if(!email){
      alert('กรุณาใส่ email');

      return;
    }
    if(!password){
      alert('กรุณาใส่รหัสผ่าน');
      return;
    }
    console.log('checkbox: ',checked);
    console.log('email',email)
    console.log({
      email: data.get('email'),
      password: data.get('password'),
      
    });

    try{
      const response = await axios.post(
        "http://localhost:5000/api/loginsavetoken",
        {
          email,
          password,
        }
      );
      console.log("response", response);
      localStorage.setItem("token", response.data.token);
      if(checked){
        localStorage.setItem("rememberEmail", checked);
        localStorage.setItem("email", email);
        window.location.href = '/';
      }else{
        localStorage.setItem("rememberEmail", checked);
        window.location.href = '/';
      }

    }
    catch(error){
      const errorMessage = error.response.data.message;
      alert(errorMessage); // แสดง alert แบบธรรมดา (optional)
      return (
        <Alert severity="error">
          <AlertTitle>Error</AlertTitle>
          {errorMessage}
        </Alert>
      );
    }
    
  };
  return (
    // <div>
    //   <h2>Login form</h2>
    //   <div>
    //     Email{" "}
    //     <input
    //       type="text"
    //       name="email"
    //       value={email}
    //       onChange={(e) => setEmail(e.target.value)}
    //     />
    //   </div>
    //   <div>
    //     Password{" "}
    //     <input
    //       type="password"
    //       name="password"
    //       value={password}
    //       onChange={(e) => setPassword(e.target.value)}
    //     />
    //   </div>
    //   <div className="button-group">
    //     <button onClick={handleLoginClickToken}>Login Token</button>
    //     <button onClick={handleGetuserClickToken}>Get User Token</button>
    //   </div>

    //   <div className="button-group">
    //     <button onClick={handleLoginClickCookie}>Login Cookie</button>
    //     <button onClick={handleGetuserClickCookie}>Get User Cookie</button>
    //   </div>

    //   <div className="button-group">
    //     <button onClick={handleLoginClickSession}>Login Session</button>
    //     <button onClick={handleGetuserClickSession}>Get User Session</button>
    //   </div>
    // </div>
    <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
            />
            <FormControlLabel
              control={<Checkbox
                checked={checked}
                onChange={handleChange}
                inputProps={{ 'aria-label': 'controlled' }}
              />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container>
              <Grid item xs>
                <Link href="#" variant="body2">
                  Forgot password?
                </Link>
              </Grid>
              <Grid item>
                <Link href="/register" variant="body2">
                  {"Don't have an account? Sign Up"}
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
  );
}
