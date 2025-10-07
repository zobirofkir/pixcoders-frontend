import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';
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
  const dispatch = useDispatch();
  const router = useRouter();
  
  const { loading: isLoading, error, user, accessToken } = useSelector((state) => state.auth);

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
      console.log('User logged in successfully');
    }
  }, [user, accessToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.email || !formData.password) {
      setError('Please fill in all fields');
      return;
    }

    try {
      const resultAction = await dispatch(login({
        email: formData.email,
        password: formData.password
      }));
      

      if (login.fulfilled.match(resultAction)) {
      } else if (login.rejected.match(resultAction)) {
        return;
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An unexpected error occurred');
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
