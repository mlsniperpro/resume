// pages/signup.js in your Next.js project
"use client";
import React from "react";
import Head from "next/head";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

const SignUp = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-custom-start to-custom-end">
      <Head>
        <title>Create Account</title>
      </Head>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Create an account</h1>

        <button className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mb-4 w-full flex items-center justify-center gap-2">
          <FaGoogle />
          Google
        </button>
        <div className="flex flex-col mb-4">
          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your email"
            required
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-1 mt-4"
          >
            Password (8 or more characters)
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your password"
            required
            minLength="8"
          />
        </div>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Create Account
        </button>

        <p className="mt-4 text-center">
          Already have an account?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
