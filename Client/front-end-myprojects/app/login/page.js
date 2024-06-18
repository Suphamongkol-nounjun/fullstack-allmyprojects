"use client";
import React, { useState } from "react";
const axios = require("axios");

export default function Loginpage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginClickToken = async () => {
    try {
      const response = await axios.post(
        "http://localhost:5000/api/loginsavetoken",
        {
          email,
          password,
        }
      );
      console.log("response", response);
      localStorage.setItem("token", response.data.token);
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

  return (
    <div>
      <h2>Login form</h2>
      <div>
        Email{" "}
        <input
          type="text"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div>
        Password{" "}
        <input
          type="password"
          name="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <div className="button-group">
        <button onClick={handleLoginClickToken}>Login Token</button>
        <button onClick={handleGetuserClickToken}>Get User Token</button>
      </div>

      <div className="button-group">
        <button onClick={handleLoginClickCookie}>Login Cookie</button>
        <button onClick={handleGetuserClickCookie}>Get User Cookie</button>
      </div>

      <div className="button-group">
        <button onClick={handleLoginClickSession}>Login Session</button>
        <button onClick={handleGetuserClickSession}>Get User Session</button>
      </div>
    </div>
  );
}
