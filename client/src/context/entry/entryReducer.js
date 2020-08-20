const entryReducer = (state, action) => {
  switch (action.type) {
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
    default:
      return state;
  }
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

export default entryReducer;
