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

    case "UPDATE_MAILS": {
      // Merge new mails with existing ones, preserving read status of existing mails
      const existingMailIds = new Set(state.mails.map(m => m.id));
      const newMails = action.payload.filter(m => !existingMailIds.has(m.id));
      
      // Update existing mails with any changes from server (except read status which we preserve locally)
      const updatedMails = action.payload.map(newMail => {
        const existingMail = state.mails.find(m => m.id === newMail.id);
        if (existingMail) {
          // Preserve local read status but update other fields
          return { ...newMail, read: existingMail.read };
        }
        return newMail;
      });
      
      // Combine: updated existing mails + any completely new mails
      const mergedMails = [...updatedMails];
      
      // Sort by created_at descending (newest first)
      mergedMails.sort((a, b) => new Date(b.created_at) - new Date(a.created_at));
      
      return {
        ...state,
        mails: mergedMails,
        unreadCount: mergedMails.filter((mail) => !mail.read).length,
        error: null,
      };
    }

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
