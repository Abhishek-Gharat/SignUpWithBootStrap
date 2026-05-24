import { useState, useCallback, useRef, useEffect } from "react";
import { useApi } from "./useApi";

/**
 * Custom hook for authentication operations
 * Handles login and signup with loading states
 * 
 * @returns {Object} Auth methods and states
 */
export const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    return !!localStorage.getItem("token");
  });

  const loginApi = useApi({
    onSuccess: (data) => {
      localStorage.setItem("token", data.token);
      setIsAuthenticated(true);
    },
  });

  const signupApi = useApi({
    onSuccess: () => {
      // Signup success - no token yet, need to login
    },
  });

  /**
   * Login user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise}
   */
  const login = useCallback(
    async (email, password) => {
      return await loginApi.execute("post", "/auth/login", {
        email,
        password,
      });
    },
    [loginApi]
  );

  /**
   * Signup user
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise}
   */
  const signup = useCallback(
    async (email, password) => {
      return await signupApi.execute("post", "/auth/signup", {
        email,
        password,
      });
    },
    [signupApi]
  );

  /**
   * Logout user
   */
  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    setIsAuthenticated(false);
  }, []);

  /**
   * Get current user email
   * @returns {string|null}
   */
  const getUserEmail = useCallback(() => {
    return localStorage.getItem("email");
  }, []);

  /**
   * Set user email
   * @param {string} email 
   */
  const setUserEmail = useCallback((email) => {
    localStorage.setItem("email", email);
  }, []);

  return {
    // States
    loading: loginApi.loading || signupApi.loading,
    error: loginApi.error || signupApi.error,
    isAuthenticated,
    
    // Actions
    login,
    signup,
    logout,
    getUserEmail,
    setUserEmail,
    reset: () => {
      loginApi.reset();
      signupApi.reset();
    },
  };
};

export default useAuth;
