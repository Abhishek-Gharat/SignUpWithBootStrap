import { useState, useCallback } from "react";
import API from "../api";

/**
 * Generic custom hook for making API calls
 * Handles loading states, errors, and provides execute function
 * 
 * @param {Object} config - Configuration object
 * @param {Function} config.onSuccess - Callback on successful API call
 * @param {Function} config.onError - Callback on API error
 * @returns {Object} { data, loading, error, execute, reset }
 */
export const useApi = (config = {}) => {
  const [state, setState] = useState({
    data: null,
    loading: false,
    error: null,
  });

  const { onSuccess, onError } = config;

  /**
   * Execute API call
   * @param {string} method - HTTP method (get, post, put, delete)
   * @param {string} url - API endpoint
   * @param {Object} data - Request body data (for post/put)
   * @param {Object} params - Query parameters
   */
  const execute = useCallback(
    async (method, url, data = null, params = null) => {
      setState((prev) => ({ ...prev, loading: true, error: null }));

      try {
        let response;
        const config = params ? { params } : undefined;

        switch (method.toLowerCase()) {
          case "get":
            response = await API.get(url, config);
            break;
          case "post":
            response = await API.post(url, data);
            break;
          case "put":
            response = await API.put(url, data);
            break;
          case "delete":
            response = await API.delete(url);
            break;
          default:
            throw new Error(`Unsupported HTTP method: ${method}`);
        }

        setState({
          data: response.data,
          loading: false,
          error: null,
        });

        if (onSuccess) {
          onSuccess(response.data);
        }

        return response.data;
      } catch (error) {
        const errorMessage =
          error.response?.data?.message || error.message || "An error occurred";

        setState({
          data: null,
          loading: false,
          error: errorMessage,
        });

        if (onError) {
          onError(errorMessage);
        }

        throw error;
      }
    },
    [onSuccess, onError]
  );

  /**
   * Reset hook state
   */
  const reset = useCallback(() => {
    setState({
      data: null,
      loading: false,
      error: null,
    });
  }, []);

  return {
    data: state.data,
    loading: state.loading,
    error: state.error,
    execute,
    reset,
  };
};

export default useApi;
