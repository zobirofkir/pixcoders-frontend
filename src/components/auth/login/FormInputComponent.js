import React from 'react';
import { FiMail, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';
import { motion } from 'framer-motion';

export const FormInputComponent = ({ 
  id, 
  name, 
  type, 
  placeholder, 
  label, 
  value,
  onChange,
  showPassword = false,
  onTogglePasswordVisibility,
  showPasswordToggle = false,
  required = false
}) => {
  const inputType = showPasswordToggle ? (showPassword ? 'text' : 'password') : type;
  const Icon = {
    email: FiMail,
    password: FiLock,
  }[name] || FiMail;

  return (
    <div className="space-y-1.5">
      {label && (
        <label 
          htmlFor={id} 
          className="block text-sm font-medium text-gray-700 mb-1.5"
        >
          {label}
        </label>
      )}
      <div className="relative group">
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
          <Icon className="h-5 w-5 text-gray-400 group-focus-within:text-indigo-500 transition-colors duration-200" />
        </div>
        <input
          id={id}
          name={name}
          type={inputType}
          value={value}
          onChange={onChange}
          className="block w-full pl-12 pr-12 py-3 text-gray-900 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 outline-none transition-all duration-200 placeholder-gray-400 focus:shadow-md focus:shadow-indigo-100"
          placeholder={placeholder}
          required={required}
        />
        {showPasswordToggle && (
          <motion.button
            type="button"
            className="absolute inset-y-0 right-0 pr-4 flex items-center focus:outline-none"
            onClick={onTogglePasswordVisibility}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {showPassword ? (
              <FiEyeOff className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
            ) : (
              <FiEye className="h-5 w-5 text-gray-400 hover:text-gray-600 transition-colors duration-200" />
            )}
          </motion.button>
        )}
      </div>
    </div>
  );
};
