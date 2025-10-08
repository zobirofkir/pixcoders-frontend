import React from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { FormInputComponent } from './FormInputComponent';
import { SubmitButtonComponent } from './SubmitButtonComponent';
import { itemVariants } from '../../../animations/animations';
import { useLogin } from '../../../hooks/useLogin';

export const LoginFormComponent = () => {
  const {
    formData,
    isLoading,
    error,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  } = useLogin();

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <motion.div 
            className="p-3 mb-4 text-sm text-red-700 bg-red-100 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex items-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <span>{error}</span>
            </div>
          </motion.div>
        )}
        <FormInputComponent
          id="email"
          name="email"
          type="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="you@example.com"
          label="Email Address"
          required
        />

      <FormInputComponent
        id="password"
        name="password"
        type={showPassword ? 'text' : 'password'}
        value={formData.password}
        onChange={handleChange}
        placeholder="••••••••"
        label={
          <div className="flex items-center justify-between w-full">
            <span>Password</span>
            <Link 
              href="/users/auth/reset-password" 
              className="text-sm font-medium text-indigo-600 hover:text-indigo-500 transition-colors duration-200 hover:underline"
            >
              Forgot password?
            </Link>
          </div>
        }
        showPasswordToggle
        onTogglePasswordVisibility={togglePasswordVisibility}
        required
      />

      <motion.div className="pt-1" variants={itemVariants}>
        <SubmitButtonComponent disabled={isLoading}>
          {isLoading ? 'Signing in...' : 'Continue'}
        </SubmitButtonComponent>
      </motion.div>

      </form>
    </div>
  );
};
