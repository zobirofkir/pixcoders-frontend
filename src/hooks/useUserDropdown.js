import { useState, useRef, useCallback } from 'react';
import { API_CONFIG } from '../config/api';
import { removeAuthToken, getAuthToken } from '../utils/cookies';

/**
 * Custom hook for managing user dropdown menu state and logout functionality.
 * Handles dropdown open/close state, click-outside detection, and logout flow.
 * 
 * @returns {Object} An object containing:
 *   @property {boolean} isOpen - Current dropdown open state
 *   @property {boolean} isLoggingOut - Loading state during logout
 *   @property {React.RefObject} dropdownRef - Ref for the dropdown element
 *   @property {Function} toggleDropdown - Toggles the dropdown open/closed
 *   @property {Function} closeDropdown - Closes the dropdown
 *   @property {Function} handleLogout - Handles the logout process
 */
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

  /**
   * Handles the logout process by:
   * 1. Removing the auth token from cookies
   * 2. Submitting a form to the logout endpoint
   * 3. Redirecting to the home page
   */
  const handleLogout = useCallback(async () => {
    try {
      setIsLoggingOut(true);
      const token = getAuthToken();
      
      removeAuthToken();
      
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = `${API_CONFIG.BASE_URL}${API_CONFIG.ENDPOINTS.AUTH.LOGOUT}`;
      form.style.display = 'none';
      
      const csrfInput = document.createElement('input');
      csrfInput.type = 'hidden';
      csrfInput.name = '_token';
      csrfInput.value = token;
      form.appendChild(csrfInput);
      
      document.body.appendChild(form);
      
      setTimeout(() => {
        try {
          form.submit();
        } catch (e) {
          console.warn('Form submission failed, continuing with redirect', e);
        }
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
