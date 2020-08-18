import React, { useReducer } from 'react';
import EntryContext from './entryContext';

const entryState = ({ children }) => {
  const initialState = {
    entries: [],
  };

  const [state, dispatch] = useReducer();

  return <EntryContext.Provider>{children}</EntryContext.Provider>;
};

export default entryState;
