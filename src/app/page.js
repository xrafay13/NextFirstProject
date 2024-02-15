"use client";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from "../firebase.js";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { TextInput, Button, PasswordInput, Title } from "@mantine/core";
import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import "./style.css";

export default function Home() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmpassword, setConfirmpassword] = useState("");

  const router = useRouter();

  const handleSignUp = async () => {
    if (password !== confirmpassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const user1 = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
        confirmpassword
      );
      toast.success("SIGNUP SUCCESSFUL");
      router.push("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  const notify = () => {
    if (
      firstName === "" ||
      lastName === "" ||
      email === "" ||
      password === "" ||
      confirmpassword === ""
    ) {
      toast.error("Please input all fields");
    } else {
      handleSignUp();
    }
  };

  return (
    <div className="container1">
      <div className="centerdiv1">
        <h1>SIGNUP</h1>

        <TextInput
          className="emailInput1"
          placeholder="David"
          label="First Name"
          value={firstName}
          withAsterisk
          onChange={(e) => setFirstName(e.target.value)}
        />
        <TextInput
          className="emailInput1"
          placeholder="John"
          label="Last Name"
          value={lastName}
          withAsterisk
          onChange={(e) => setLastname(e.target.value)}
        />

        <TextInput
          className="emailInput1"
          placeholder="abc@john.com"
          label="Enter email"
          value={email}
          withAsterisk
          onChange={(e) => setEmail(e.target.value)}
        />

        <PasswordInput
          className="emailInput1"
          placeholder="********"
          label="Enter Password"
          value={password}
          withAsterisk
          onChange={(e) => setPassword(e.target.value)}
        />
        <PasswordInput
          className="emailInput1"
          placeholder="ConfirmPassword"
          label="Confirm Password"
          withAsterisk
          onChange={(e) => setConfirmpassword(e.target.value)}
        />

        <Button
          color="orange"
          size="md"
          onClick={() => {
            notify();
          }}
        >
          Signup
        </Button>

        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "1rem",
          }}
        >
          <Title style={{ fontSize: "15px" }}>
            Already have an account?
            <Link style={{ color: "red" }} href="/login">
              {" "}
              Login
            </Link>
          </Title>
        </div>

        <Toaster />
      </div>
    </div>
  );
}
