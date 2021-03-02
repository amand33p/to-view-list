const entryReducer = (state, action) => {
  switch (action.type) {
    case 'INIT_ENTRIES':
      return {
        ...state,
        entries: action.payload,
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        entries: [...state.entries, action.payload],
      };
    case 'REMOVE_ENTRY':
      return {
        ...state,
        entries: state.entries.filter((e) => e.id !== action.payload),
      };
    case 'UPDATE_ENTRY':
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id !== action.payload.id ? e : action.payload
        ),
      };
    case 'SET_EDIT_VALUES':
      return {
        ...state,
        editValues: action.payload,
      };
    case 'RESET_EDIT_VALUES':
      return {
        ...state,
        editValues: null,
      };
    case 'TOGGLE_STAR_ENTRY':
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id !== action.payload ? e : { ...e, isStarred: !e.isStarred }
        ),
      };
    case 'TOGGLE_VIEW_ENTRY':
      return {
        ...state,
        entries: state.entries.map((e) =>
          e.id !== action.payload ? e : { ...e, isViewed: !e.isViewed }
        ),
      };
    case 'SET_FILTER':
      return {
        ...state,
        filter: action.payload,
      };
    case 'RESET_FILTER':
      return {
        ...state,
        filter: null,
      };
    case 'SEARCH_ENTRIES':
      return {
        ...state,
        search: action.payload,
      };
    case 'CLEAR_SEARCH':
      return {
        ...state,
        search: null,
      };
    case 'TAG_FILTER':
      return {
        ...state,
        tag: action.payload,
      };
    case 'RESET_TAG_FILTER':
      return {
        ...state,
        tag: null,
      };
    case 'SORT_ENTRIES':
      return {
        ...state,
        sortBy: action.payload,
      };
    case 'TOGGLE_DARK_MODE':
      return {
        ...state,
        darkMode: !state.darkMode,
      };
    case 'SET_NOTIFICATION':
      return {
        ...state,
        notification: action.payload,
      };
    case 'CLEAR_NOTIFICATION':
      return {
        ...state,
        notification: null,
      };
    case 'TOGGLE_IS_LOADING':
      return {
        ...state,
        isLoading: !state.isLoading,
      };
    default:
      return state;
  }
};

export const initializeEntries = (entries) => {
  return {
    type: 'INIT_ENTRIES',
    payload: entries,
  };
};

export const addEntry = (entry) => {
  return {
    type: 'ADD_ENTRY',
    payload: entry,
  };
};

export const removeEntry = (id) => {
  return {
    type: 'REMOVE_ENTRY',
    payload: id,
  };
};

export const updateEntry = (entry) => {
  return {
    type: 'UPDATE_ENTRY',
    payload: entry,
  };
};

export const setEditValues = (entry) => {
  return {
    type: 'SET_EDIT_VALUES',
    payload: entry,
  };
};

export const resetEditValues = () => {
  return {
    type: 'RESET_EDIT_VALUES',
  };
};

export const toggleStarEntry = (id) => {
  return {
    type: 'TOGGLE_STAR_ENTRY',
    payload: id,
  };
};

export const toggleViewEntry = (id) => {
  return {
    type: 'TOGGLE_VIEW_ENTRY',
    payload: id,
  };
};

export const setFilterValues = (itemsToFilter) => {
  return {
    type: 'SET_FILTER',
    payload: itemsToFilter,
  };
};

export const resetFilter = () => {
  return {
    type: 'RESET_FILTER',
  };
};

export const setSearchInput = (input) => {
  return {
    type: 'SEARCH_ENTRIES',
    payload: input,
  };
};

export const clearSearch = () => {
  return {
    type: 'CLEAR_SEARCH',
  };
};

export const setTagFilter = (tag) => {
  return {
    type: 'TAG_FILTER',
    payload: tag,
  };
};

export const resetTagFilter = () => {
  return {
    type: 'RESET_TAG_FILTER',
  };
};

export const sortEntries = (sortBy) => {
  return {
    type: 'SORT_ENTRIES',
    payload: sortBy,
  };
};

export const toggleDarkMode = () => {
  return {
    type: 'TOGGLE_DARK_MODE',
  };
};

export const setNotification = (notifObj) => {
  return {
    type: 'SET_NOTIFICATION',
    payload: notifObj,
  };
};

export const clearNotification = () => {
  return {
    type: 'CLEAR_NOTIFICATION',
  };
};

export const toggleIsLoading = () => {
  return {
    type: 'TOGGLE_IS_LOADING',
  };
};

export default entryReducer;
