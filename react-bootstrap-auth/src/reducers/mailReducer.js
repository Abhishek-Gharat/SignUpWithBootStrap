export const initialState = {
  mails: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const mailReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, loading: action.payload };

    case "SET_MAILS":
      return {
        ...state,
        mails: action.payload,
        unreadCount: action.payload.filter((mail) => !mail.read).length,
        error: null,
      };

    case "SET_TRASH_MAILS":
      return {
        ...state,
        mails: action.payload,
        error: null,
      };

    case "MARK_AS_READ": {
      const updated = state.mails.map((mail) =>
        mail.id === action.payload ? { ...mail, read: true } : mail
      );
      return {
        ...state,
        mails: updated,
        unreadCount: updated.filter((mail) => !mail.read).length,
      };
    }

    case "DELETE_MAIL":
      const filtered = state.mails.filter((mail) => mail.id !== action.payload);
      return {
        ...state,
        mails: filtered,
        unreadCount: filtered.filter((mail) => !mail.read).length,
      };

    case "RESTORE_MAIL":
      const restored = state.mails.filter((mail) => mail.id !== action.payload);
      return {
        ...state,
        mails: restored,
      };

    case "PERMANENT_DELETE_TRASH":
      const permanentDeleted = state.mails.filter(
        (mail) => mail.id !== action.payload
      );
      return {
        ...state,
        mails: permanentDeleted,
      };

    case "SET_ERROR":
      return { ...state, error: action.payload, loading: false };

    default:
      return state;
  }
};
