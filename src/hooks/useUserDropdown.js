import { useState, useRef, useCallback } from 'react';
import { API_CONFIG } from '../config/api';
import { removeAuthToken, getAuthToken } from '../utils/cookies';

export const useUserDropdown = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const dropdownRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  }, []);

  const toggleDropdown = useCallback(() => {
    setIsOpen(prev => !prev);
  }, []);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      const token = getAuthToken();
      
      // First remove the token to ensure logout happens on client side
      removeAuthToken();
      
      // Create a form and submit it to handle the logout
      // This is a workaround for CORS issues with fetch
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = API_CONFIG.BASE_URL + API_CONFIG.ENDPOINTS.AUTH.LOGOUT;
      form.style.display = 'none';
      
      // Add CSRF token if needed
      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = '_token';
      csrfInput.value = token;
      form.appendChild(csrfInput);
      
      // Add to document and submit
      document.body.appendChild(form);
      
      // Use a timeout to ensure the form is submitted
      setTimeout(() => {
        try {
          form.submit();
        } catch (e) {
          console.warn('Form submission failed, continuing with redirect', e);
        }
        // Redirect regardless of form submission success
        window.location.href = '/';
      }, 100);
      
    } catch (error) {
      console.error('Logout error:', error);
      window.location.href = '/';
    }
  }, []);

  return {
    isOpen,
    isLoggingOut,
    dropdownRef,
    toggleDropdown,
    closeDropdown,
    handleLogout,
  };
};
