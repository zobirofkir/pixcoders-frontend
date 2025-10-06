import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const useLogin = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    
    try {
      // Basic validation
      if (!formData.email || !formData.password) {
        throw new Error('Please fill in all fields');
      }

      // TODO: Replace with actual API call
      console.log('Login attempt with:', formData);
      // Simulate API call
      await new Promise((resolve, reject) => {
        setTimeout(() => {
          // Simulate successful login
          // In a real app, you would validate credentials with your backend
          if (formData.email && formData.password) {
            resolve();
          } else {
            reject(new Error('Invalid credentials'));
          }
        }, 1000);
      });
      
      // Redirect after successful login
      router.push('/dashboard');
    } catch (err) {
      console.error('Login error:', err);
      setError(err.message || 'An error occurred during login');
    } finally {
      setIsLoading(false);
    }
  };

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
