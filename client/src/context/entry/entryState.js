import React, { useReducer, createContext, useContext } from 'react';
import entryReducer from './entryReducer';

const initialState = {
  entries: [
    {
      title: 'Great Javascript tutorial',
      link: 'javascript.info',
      description: `I'm in love with this awesome site. All the importants quirks of JS are explained nicely.`,
      tags: ['programming', 'javascript'],
      type: 'article',
      viewed: 'false',
      starred: 'false',
      id: '1',
    },
    {
      title: 'MDN is love! <3',
      link: 'developer.mozilla.org',
      description: `It pretty much is the best resource on various web technologies. You will always find a specific topic that is covered better on another site, but I think as of now I think MDN in general reigns in terms of being correct, detailed and up to date.`,
      tags: ['programming', 'web', 'js', 'html', 'css'],
      type: 'other',
      viewed: 'true',
      starred: 'true',
      id: '2',
    },
    {
      title: `Brad Traversy's tuts are well explained`,
      link: 'https://youtu.be/hdI2bqOjy3c',
      description: `Great guy who teaches stuff with passion.`,
      tags: ['programming', 'javascript'],
      type: 'video',
      viewed: 'false',
      starred: 'true',
      id: '3',
    },
  ],
  filter: {},
};

const EntryContext = createContext();

export const EntryStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(entryReducer, initialState);

  return (
    <EntryContext.Provider value={[state, dispatch]}>
      {children}
    </EntryContext.Provider>
  );
};

export const useStateValue = () => useContext(EntryContext);
