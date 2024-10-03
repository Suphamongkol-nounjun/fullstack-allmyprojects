"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";

function ResetPasswordPage() {
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState(""); // Store OTP
  const [newpassword, setNewPassword] = useState(""); // Store new password
  const [confirmPassword, setConfirmPassword] = useState(""); // Store confirmed password
  const [isOtpSent, setIsOtpSent] = useState(false); // Flag to indicate if OTP has been sent
  const [isOtpVerified, setIsOtpVerified] = useState(false); // Flag to indicate if OTP has been verified
  const [isPasswordReset, setIsPasswordReset] = useState(false); // Flag to indicate if password has been reset
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [countdown, setCountdown] = useState(0); // Countdown timer in seconds
  const [isResendAllowed, setIsResendAllowed] = useState(true); // Flag to allow resend

  const { data: session } = useSession();
  if (session) redirect("/welcome");

  useEffect(() => {
    let timer;
    if (countdown > 0) {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    } else if (countdown === 0 && !isResendAllowed) {
      setIsResendAllowed(true); // Allow resend when countdown finishes
    }
    return () => clearInterval(timer); // Clear interval on component unmount
  }, [countdown, isResendAllowed]);

  const handleSubmitEmail = async (e) => {
    e.preventDefault();

    if (!email) {
      setError("Please enter your email!");
      return;
    }

    try {
      // Step 1: Generate OTP
      const generateRes = await fetch("http://localhost:5000/api/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      // const generateData = await generateRes.json();

      if (!generateRes.ok) {
        const errorData = await generateRes.json();
        const errorMessage = errorData.message || "Error generating OTP";
        setError(errorMessage);
        return;
      }

      // Step 2: Send OTP
      const sendRes = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (sendRes.ok) {
        setError(""); // Clear previous error message
        setSuccess("OTP sent to your email");
        setIsOtpSent(true);
        setIsResendAllowed(false); // Disable resend button
        setCountdown(60); // Set countdown for 1 minute
      } else {
        const errorData = await sendRes.json();
        const errorMessage = errorData.message || "Error sending OTP";
        setError(errorMessage);
      }
    } catch (error) {
      console.log("Error during OTP request: ", error);
      setError("An error occurred while sending OTP");
    }
  };

  const handleSubmitOtp = async (e) => {
    e.preventDefault();
    setSuccess("");
    if (!otp) {
      setError("Please enter the OTP!");
      return;
    }

    try {
      // Verify OTP
      const res = await fetch("http://localhost:5000/api/check-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, otp }),
      });

      if (res.ok) {
        setError(""); // Clear previous error message
        setSuccess("OTP verified successfully! You can now reset your password.");
        setIsOtpVerified(true); // Set flag to true to show reset password form
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || "Invalid OTP";
        setError(errorMessage);
      }
    } catch (error) {
      console.log("Error during OTP verification: ", error);
      setError("An error occurred while verifying OTP");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    setSuccess("");

    if (!newpassword || !confirmPassword) {
      setError("Please fill out both fields!");
      return;
    }

    if (newpassword !== confirmPassword) {
      setError("Passwords do not match!");
      return;
    }

    try {
      // Reset password
      const res = await fetch("http://localhost:5000/api/changepassword", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, newpassword }),
      });

      if (res.ok) {
        setError(""); // Clear previous error message
        setSuccess("Password has been reset successfully!");
        setIsPasswordReset(true); // Set flag to true to hide password reset form
      } else {
        const errorData = await res.json();
        const errorMessage = errorData.message || "Error resetting password";
        setError(errorMessage);
      }
    } catch (error) {
      console.log("Error during password reset: ", error);
      setError("An error occurred while resetting password");
    }
  };

  const handleResendOtp = async () => {
    if (!email) {
      setError("Email is required to resend OTP!");
      return;
    }

    // Generate new OTP and send it using the existing email
    try {
      // Generate OTP
      const generateRes = await fetch("http://localhost:5000/api/generate-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const generateData = await generateRes.json();

      if (!generateRes.ok) {
        const errorData = await generateRes.json();
        const errorMessage = errorData.message || "Error generating OTP";
        setError(errorMessage);
        return;
      }

      // Send OTP
      const sendRes = await fetch("http://localhost:5000/api/send-otp", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      if (sendRes.ok) {
        setError(""); // Clear previous error message
        setSuccess("OTP sent to your email");
        setIsResendAllowed(false); // Disable resend button
        setCountdown(60); // Reset countdown
      } else {
        const errorData = await sendRes.json();
        const errorMessage = errorData.message || "Error sending OTP";
        setError(errorMessage);
      }
    } catch (error) {
      console.log("Error during OTP resend: ", error);
      setError("An error occurred while resending OTP");
    }
  };

  return (
    <div>
      <Navbar />
      <div className="container mx-auto py-5">
        <h3>Reset Password Page</h3>
        <hr className="my-3" />

        {error && (
          <div className="bg-red-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-500 w-fit text-sm text-white py-1 px-3 rounded-md mt-2">
            {success}
          </div>
        )}

        {!isOtpSent ? (
          <form onSubmit={handleSubmitEmail}>
            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="block bg-gray-300 p-2 my-2 rounded-md"
              type="email"
              placeholder="Enter your email"
            />
            <button type="submit" className="bg-green-500 p-2 rounded-md text-white">
              Submit
            </button>
          </form>
        ) : !isOtpVerified ? (
          <>
            <form onSubmit={handleSubmitOtp}>
              <input
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                className="block bg-gray-300 p-2 my-2 rounded-md"
                type="text"
                placeholder="Enter OTP"
              />
              <button type="submit" className="bg-green-500 p-2 rounded-md text-white">
                Verify OTP
              </button>
            </form>
            <p className="mt-2">
              {isResendAllowed ? (
                <span
                  onClick={handleResendOtp}
                  className="text-blue-500 cursor-pointer"
                >
                  Click here to resend OTP
                </span>
              ) : (
                <span className="text-gray-500 cursor-not-allowed">
                  Please wait {countdown} seconds before requesting a new OTP.
                </span>
              )}
            </p>
          </>
        ) : !isPasswordReset ? (
          <form onSubmit={handleResetPassword}>
            <input
              value={newpassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="block bg-gray-300 p-2 my-2 rounded-md"
              type="password"
              placeholder="New Password"
            />
            <input
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="block bg-gray-300 p-2 my-2 rounded-md"
              type="password"
              placeholder="Confirm New Password"
            />
            <button type="submit" className="bg-green-500 p-2 rounded-md text-white">
              Reset Password
            </button>
          </form>
        ) : null}

        <hr className="my-3" />
        <p>
          Do not have an account? Go to{" "}
          <Link className="text-blue-500 hover:underline" href="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}

export default ResetPasswordPage;
