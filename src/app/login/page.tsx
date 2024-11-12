// pages/login.tsx

import { ReactElement } from 'react';
import RootLayout from '../layout';
import Link from 'next/link';
import React from 'react';

// LoginPage Component
const LoginPage = () => {
  return (
    <div className="bg-gray-100 flex items-center justify-center min-h-screen">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-[#514DEC] text-3xl font-semibold text-center mb-6">Login</h2>
        <form className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-[#514DEC] text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              required
              className="w-full p-3 bg-[#F3F4F6] text-[#514DEC] placeholder-[#A9A6FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#514DEC]"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-[#514DEC] text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              required
              className="w-full p-3 bg-[#F3F4F6] text-[#514DEC] placeholder-[#A9A6FF] rounded-lg focus:outline-none focus:ring-2 focus:ring-[#514DEC]"
            />
          </div>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center space-x-2 text-[#514DEC]">
              <input type="checkbox" className="form-checkbox h-5 w-5 text-[#514DEC]" />
              <span>Remember me</span>
            </label>
            <a href="#" className="text-[#514DEC] hover:text-[#A9A6FF]">Forgot Password?</a>
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-[#514DEC] text-white font-semibold rounded-lg hover:bg-[#05041F] transition duration-300"
          >
            Login
          </button>
        </form>
        <div className="text-center text-[#514DEC] text-sm mt-6">
          Don't have an account?{" "}
          <Link href="/signup" className="text-[#514DEC] hover:text-[#A9A6FF] font-semibold">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
};

// Layout function for LoginPage
LoginPage.getLayout = function getLayout(page: ReactElement) {
  return <RootLayout showSidebar={false}>{page}</RootLayout>;
};

export default LoginPage;
