const entryReducer = (state, action) => {
  console.log(action.payload);
  switch (action.type) {
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
        entries: state.entries.sort((a, b) => {
          if (action.payload === 'oldestfirst') {
            return new Date(a.createdAt) - new Date(b.createdAt);
          }

          if (action.payload === 'newestfirst') {
            return new Date(b.createdAt) - new Date(a.createdAt);
          }

          if (action.payload === 'a-z') {
            return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
          }

          if (action.payload === 'z-a') {
            return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
          }

          return state.entries;
        }),
      };
    default:
      return state;
  }
};

export const addEntry = (guest) => {
  guest.id = Date.now();
  guest.viewed = false;
  guest.starred = false;
  guest.createdAt = String(new Date());
  guest.updatedAt = String(new Date());
  return {
    type: 'ADD_ENTRY',
    payload: guest,
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

export default entryReducer;
