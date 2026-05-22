export const initialState = {
  mails: [],
  unreadCount: 0,
  loading: false,
  error: null,
};

export const mailReducer = (state, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return {
        ...state,
        loading: action.payload,
      };

    case "SET_MAILS":
      return {
        ...state,
        mails: action.payload,
        unreadCount: action.payload.filter((mail) => !mail.read).length,
      };

    case "MARK_AS_READ":
      const updatedMails = state.mails.map((mail) =>
        mail.id === action.payload ? { ...mail, read: true } : mail
      );
      return {
        ...state,
        mails: updatedMails,
        unreadCount: updatedMails.filter((mail) => !mail.read).length,
      };

    case "SET_ERROR":
      return {
        ...state,
        error: action.payload,
      };

    default:
      return state;
  }
};
