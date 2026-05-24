import { useCallback, useRef, useEffect } from "react";
import { useApi } from "./useApi";

/**
 * Custom hook for mail operations
 * Provides methods for fetching and managing mails
 * 
 * @param {Function} dispatch - Redux/useReducer dispatch function
 * @returns {Object} Mail operations and states
 */
export const useMails = (dispatch) => {
  // API hooks for different mail operations
  const inboxApi = useApi();
  const sentApi = useApi();
  const trashApi = useApi();
  const markReadApi = useApi();
  const trashMailApi = useApi();
  const restoreApi = useApi();
  const deleteApi = useApi();
  const sendApi = useApi();

  const intervalRef = useRef(null);

  /**
   * Fetch inbox mails
   * @param {string} userEmail 
   * @param {boolean} isPolling - Whether this is a background poll
   */
  const fetchInbox = useCallback(
    async (userEmail, isPolling = false) => {
      if (!isPolling) {
        dispatch({ type: "SET_LOADING", payload: true });
      }

      try {
        const data = await inboxApi.execute(
          "get",
          `/mail/inbox/${userEmail}`
        );
        dispatch({
          type: isPolling ? "UPDATE_MAILS" : "SET_MAILS",
          payload: data,
        });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: inboxApi.error || "Failed to fetch inbox",
        });
      } finally {
        if (!isPolling) {
          dispatch({ type: "SET_LOADING", payload: false });
        }
      }
    },
    [dispatch, inboxApi]
  );

  /**
   * Fetch sent mails
   * @param {string} userEmail 
   */
  const fetchSent = useCallback(
    async (userEmail) => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const data = await sentApi.execute("get", `/mail/sent/${userEmail}`);
        dispatch({ type: "SET_MAILS", payload: data });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: sentApi.error || "Failed to fetch sent mails",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [dispatch, sentApi]
  );

  /**
   * Fetch trash mails
   * @param {string} userEmail 
   */
  const fetchTrash = useCallback(
    async (userEmail) => {
      dispatch({ type: "SET_LOADING", payload: true });

      try {
        const data = await trashApi.execute("get", `/mail/trash/${userEmail}`);
        dispatch({ type: "SET_TRASH_MAILS", payload: data });
      } catch (error) {
        dispatch({
          type: "SET_ERROR",
          payload: trashApi.error || "Failed to fetch trash",
        });
      } finally {
        dispatch({ type: "SET_LOADING", payload: false });
      }
    },
    [dispatch, trashApi]
  );

  /**
   * Mark mail as read
   * @param {number} id 
   */
  const markAsRead = useCallback(
    async (id) => {
      try {
        await markReadApi.execute("put", `/mail/read/${id}`);
        dispatch({ type: "MARK_AS_READ", payload: id });
      } catch (error) {
        console.error("Error marking as read:", error);
      }
    },
    [dispatch, markReadApi]
  );

  /**
   * Move mail to trash
   * @param {number} id 
   */
  const moveToTrash = useCallback(
    async (id) => {
      try {
        await trashMailApi.execute("put", `/mail/trash/${id}`);
        dispatch({ type: "DELETE_MAIL", payload: id });
      } catch (error) {
        console.error("Error moving to trash:", error);
        alert("Failed to move mail to trash.");
      }
    },
    [dispatch, trashMailApi]
  );

  /**
   * Restore mail from trash
   * @param {number} id 
   */
  const restoreMail = useCallback(
    async (id) => {
      try {
        await restoreApi.execute("put", `/mail/restore/${id}`);
        dispatch({ type: "RESTORE_MAIL", payload: id });
      } catch (error) {
        console.error("Error restoring mail:", error);
        alert("Failed to restore mail.");
      }
    },
    [dispatch, restoreApi]
  );

  /**
   * Permanently delete mail
   * @param {number} id 
   */
  const permanentDelete = useCallback(
    async (id) => {
      try {
        await deleteApi.execute("delete", `/mail/permanent/${id}`);
        dispatch({ type: "PERMANENT_DELETE_TRASH", payload: id });
      } catch (error) {
        console.error("Error deleting mail:", error);
        alert("Failed to delete mail.");
      }
    },
    [dispatch, deleteApi]
  );

  /**
   * Delete mail (move to trash from inbox/sent)
   * @param {number} id 
   */
  const deleteMail = useCallback(
    async (id) => {
      try {
        await deleteApi.execute("put", `/mail/trash/${id}`);
        dispatch({ type: "DELETE_MAIL", payload: id });
      } catch (error) {
        console.error("Error deleting mail:", error);
        alert("Failed to delete mail.");
      }
    },
    [dispatch, deleteApi]
  );

  /**
   * Send mail
   * @param {Object} mailData - { sender, receiver, subject, message }
   * @returns {Promise}
   */
  const sendMail = useCallback(
    async (mailData) => {
      return await sendApi.execute("post", "/mail/send", mailData);
    },
    [sendApi]
  );

  /**
   * Start polling inbox for new mails
   * @param {string} userEmail 
   * @param {number} interval - Polling interval in ms (default: 2000)
   */
  const startInboxPolling = useCallback(
    (userEmail, interval = 2000) => {
      // Clear any existing interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }

      // Start new polling
      intervalRef.current = setInterval(() => {
        fetchInbox(userEmail, true);
      }, interval);
    },
    [fetchInbox]
  );

  /**
   * Stop polling
   */
  const stopInboxPolling = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopInboxPolling();
    };
  }, [stopInboxPolling]);

  // Combined loading state
  const loading =
    inboxApi.loading ||
    sentApi.loading ||
    trashApi.loading ||
    markReadApi.loading ||
    trashMailApi.loading ||
    restoreApi.loading ||
    deleteApi.loading ||
    sendApi.loading;

  // Combined error state (return first error found)
  const error =
    inboxApi.error ||
    sentApi.error ||
    trashApi.error ||
    markReadApi.error ||
    trashMailApi.error ||
    restoreApi.error ||
    deleteApi.error ||
    sendApi.error;

  return {
    // States
    loading,
    error,
    isPolling: !!intervalRef.current,

    // Fetch operations
    fetchInbox,
    fetchSent,
    fetchTrash,

    // Mail actions
    markAsRead,
    moveToTrash,
    restoreMail,
    permanentDelete,
    deleteMail,
    sendMail,

    // Polling
    startInboxPolling,
    stopInboxPolling,
  };
};

export default useMails;
