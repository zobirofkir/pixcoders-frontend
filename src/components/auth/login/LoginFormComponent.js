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
            className="p-3 text-sm text-red-700 bg-red-100 rounded-lg"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            {error}
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
