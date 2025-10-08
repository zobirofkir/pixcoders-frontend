import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setAuthToken, isAuthenticated } from '../utils/cookies';
import { login } from '../redux/slices/authSlice';

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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const dispatch = useDispatch();
  
  const { loading: isLoading, user, accessToken } = useSelector((state) => state.auth);

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
  useEffect(() => {
    if (user && accessToken) {
      // Store the token in cookies
      setAuthToken(accessToken);
      // Redirect to home page after successful login
      window.location.href = '/';
      window.location.href = '/';
    }
  }, [user, accessToken]);

  // Clear error when component unmounts
  useEffect(() => {
    return () => setError(null);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Reset error state on new submission
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const resultAction = await dispatch(login({
        email: formData.email.trim(),
        password: formData.password
      }));

      if (resultAction.error) {
        const errorMessage = resultAction.error.message || 'Login failed. Please check your credentials.';
        setError(errorMessage);
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred. Please try again.');
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
    error: error || null,
    showPassword,
    handleChange,
    handleSubmit,
    togglePasswordVisibility,
  };
};
