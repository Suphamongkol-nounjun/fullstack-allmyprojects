"use client";
import React, { useState, useEffect } from "react";
import { checktoken } from "./utils/checktoken";
import { Alert, AlertTitle} from "@mui/material";

export default function Homepage() {
  useEffect(() => {
    checktoken(); // ตรวจสอบ token ใน localStorage
  }, []);
  return (
    <div>
      <h2>Home page</h2>
    </div>
  );
}
