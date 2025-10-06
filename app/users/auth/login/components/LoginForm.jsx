import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FormInput } from './FormInput';
import { SubmitButton } from './SubmitButton';
import { SocialLogin } from './SocialLogin';
import { itemVariants } from '../../../../../src/animations/animations';

export const LoginForm = () => {
  return (
    <div className="space-y-6">
      <FormInput
        id="email"
        name="email"
        type="email"
        placeholder="you@example.com"
        label="Email Address"
      />

      <FormInput
        id="password"
        name="password"
        type="password"
        placeholder="••••••••"
        label={
          <div className="flex items-center justify-between w-full">
            <span>Password</span>
            <Link 
              href="/forgot-password" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        }
        showPasswordToggle
      />

      <motion.div className="pt-1" variants={itemVariants}>
        <SubmitButton>Continue</SubmitButton>
      </motion.div>

      <motion.div variants={itemVariants}>
        <SocialLogin />
      </motion.div>

      <motion.div 
        className="pt-4 border-t border-gray-100 text-center"
        variants={itemVariants}
      >
        <p className="text-sm text-gray-600">
          Don't have an account?{' '}
          <Link 
            href="/signup" 
            className="font-semibold text-indigo-600 hover:text-indigo-500 transition-colors duration-200 hover:underline"
          >
            Create an account
          </Link>
        </p>
      </motion.div>
    </div>
  );
};
