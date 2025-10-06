'use client';

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { FiMail, FiArrowLeft, FiCheck } from 'react-icons/fi';
import { AnimatedBackgroundComponent } from '@/src/components/auth/login/AnimatedBackgroundComponent';
import { containerVariants } from '@/src/animations/animations';

const ResetPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    try {
      setIsSubmitting(true);
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSubmitted(true);
    } catch (err) {
      setError('Failed to send reset link. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 relative overflow-hidden">
      <AnimatedBackgroundComponent />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-center min-h-[calc(100vh-4rem)]">
          {/* Left side - Form */}
          <motion.div 
            className="w-full max-w-md bg-white/90 backdrop-blur-sm rounded-2xl shadow-2xl p-8 relative overflow-hidden"
            initial="hidden"
            animate="visible"
            variants={containerVariants}
          >
            <div className="mb-8">
              <Link 
                href="/users/auth/login" 
                className="inline-flex items-center text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200 mb-6"
              >
                <FiArrowLeft className="mr-2" /> Back to login
              </Link>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">Reset your password</h1>
              <p className="text-sm text-gray-600">
                {isSubmitted 
                  ? 'Check your email for a link to reset your password.'
                  : 'Enter your email address and we\'ll send you a link to reset your password.'
                }
              </p>
            </div>

            {!isSubmitted ? (
              <form onSubmit={handleSubmit} className="space-y-6">
                {error && (
                  <div className="p-3 text-sm text-red-700 bg-red-100 rounded-lg">
                    {error}
                  </div>
                )}
                
                <div className="space-y-1.5">
                  <label 
                    htmlFor="email" 
                    className="block text-sm font-medium text-gray-700 mb-1.5"
                  >
                    Email Address
                  </label>
                  <div className="relative group">
                    <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                      <FiMail className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
                    </div>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="block w-full pl-12 pr-4 py-3 text-gray-900 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400 focus:shadow-md focus:shadow-indigo-100"
                      placeholder="you@example.com"
                      required
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full flex justify-center items-center py-3.5 px-6 rounded-xl text-base font-semibold text-white bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 shadow-md transition-all duration-200 ${
                    isSubmitting ? 'opacity-80 cursor-not-allowed' : ''
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Reset Link'
                  )}
                </button>
              </form>
            ) : (
              <div className="text-center py-4">
                <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100 mb-4">
                  <FiCheck className="h-6 w-6 text-green-600" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Check your email</h3>
                <p className="text-sm text-gray-500">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <p className="mt-4 text-sm text-gray-500">
                  Didn't receive the email?{' '}
                  <button 
                    onClick={() => setIsSubmitted(false)}
                    className="font-medium text-indigo-600 hover:text-indigo-500"
                  >
                    Click to resend
                  </button>
                </p>
              </div>
            )}
          </motion.div>

          {/* Right side - Hero */}
          <div className="hidden lg:block lg:ml-16 xl:ml-24 2xl:ml-32">
            <div className="max-w-md">
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Forgot your password?</h2>
              <p className="text-lg text-gray-600 mb-8">
                No worries! Just enter your email and we'll send you a link to reset your password.
              </p>
              <div className="flex items-center space-x-4">
                <div className="h-1 w-12 bg-indigo-600 rounded-full"></div>
                <span className="text-sm font-medium text-gray-500">Secure & Private</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPasswordPage;