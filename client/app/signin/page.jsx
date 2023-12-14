// pages/index.js in your Next.js project
"use client";
import React from "react";
import Head from "next/head";
import { FaFacebookF, FaGoogle, FaLinkedinIn } from "react-icons/fa";

const Home = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-r from-custom-start to-custom-end">
      <Head>
        <title>Sign In Page</title>
      </Head>

      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sign in to your account</h1>
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
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-700 mb-1 mt-4"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="mt-1 p-2 block w-full border-gray-300 rounded-md shadow-sm"
            placeholder="Enter your password"
          />
        </div>

        <a
          href="#"
          className="text-blue-600 hover:text-blue-700 text-sm mb-4 block"
        >
          Forgot password?
        </a>

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-full"
        >
          Sign In
        </button>

        <p className="mt-4 text-center">
          Not registered?{" "}
          <a href="#" className="text-blue-600 hover:text-blue-700">
            Create an account
          </a>
        </p>
      </div>
    </div>
  );
};

export default Home;
