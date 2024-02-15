"use client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import "./login.css";
import { setCookie } from "cookies-next";
import Link from "next/link";
import {
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
} from "firebase/auth";
import { auth } from "../../firebase";
import { Title, TextInput, Button, PasswordInput } from "@mantine/core";
import toast, { Toaster } from "react-hot-toast";
import { BsGoogle } from "react-icons/bs";

function page() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const route = useRouter();
  const provider = new GoogleAuthProvider();

  const handleLogin = async () => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      console.log(user.user.email);
      toast.success("LOGIN SUCCESSFUL");

      // Set cookie indicating the user is authenticated
      setCookie("isAuthenticated", "true");

      route.push("/dashboard");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const handleGoogleSignIn = () => {
    signInWithPopup(auth, provider).then((data) => {
      // Set cookie indicating the user is authenticated
      setCookie("isAuthenticated", "true");

      route.push("/dashboard");
    });
  };

  const notify = () => {
    if (email === "" || password === "") {
      toast.error("Please input all fields");
    } else {
      handleLogin();
    }
  };

  return (
    <div className="container">
      <div className="centerdiv">
        <h1>LOGIN</h1>
        <TextInput
          className="emailInput"
          placeholder="abc@john.com"
          label="Enter email"
          value={email}
          withAsterisk
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput
          className="emailInput"
          placeholder="********"
          label="Enter Password"
          value={password}
          withAsterisk
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          style={{ marginTop: "1rem" }}
          size="md"
          color="orange"
          onClick={notify}
        >
          LOGIN
        </Button>
        <div className="horizontal-line">
          <hr />
          <span>OR</span>
          <hr />
        </div>

        {/* GOOGLE SIGN IN */}

        <button className="google-button" onClick={() => handleGoogleSignIn()}>
          {
            <BsGoogle
              style={{
                fontSize: "30px",
                marginTop: "1px",
              }}
            />
          }
          <span
            style={{
              flex: "1",
              marginTop: "5px",
              cursor: "pointer",
            }}
          >
            Sign In With Google
          </span>
        </button>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <Title style={{ fontSize: "15px" }}>
            Don't have an account?
            <Link style={{ color: "red" }} href="/">
              {" "}
              Signup
            </Link>
          </Title>
        </div>

        <Toaster />
      </div>
    </div>
  );
}

export default page;
