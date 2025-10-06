import { useState } from 'react';
import { useRouter } from 'next/navigation';

/**
 * Custom hook to handle login form state and submission
 * @returns {Object} Login form state and handlers
 * @property {Object} formData - Current form data with email and password
 * @property {boolean} isLoading - Loading state during form submission
 * @property {string|null} error - Error message if login fails
 * @property {boolean} showPassword - Toggle password visibility state
 * @property {Function} handleChange - Handler for form input changes
 * @property {Function} handleSubmit - Handler for form submission
 * @property {Function} togglePasswordVisibility - Toggles password visibility
 */
export const useLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  /**
   * Handles input changes and updates form data
   * @param {React.ChangeEvent<HTMLInputElement>} e - Input change event
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    if (error) setError(null);
  };

  /**
   * Handles form submission and authentication
   * @param {React.FormEvent} e - Form submission event
   * @throws {Error} If form validation fails or authentication error occurs
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      await new Promise((resolve, reject) => {
        setTimeout(() => {
          if (formData.email && formData.password) {
            resolve();
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });
      
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Toggles the password visibility state
   */
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return {
    formData,
    isLoading,
    error,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  };
};
