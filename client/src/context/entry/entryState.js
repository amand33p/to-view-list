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
      viewed: false,
      starred: false,
      createdAt: 'Fri Aug 21 2020 14:26:27 GMT+0530 (India Standard Time)',
      updatedAt: 'Fri Aug 21 2020 14:26:27 GMT+0530 (India Standard Time)',
      id: '1',
    },

    {
      title: `Brad Traversy's tuts are well explained`,
      link: 'https://youtu.be/hdI2bqOjy3c',
      description: `Great guy who teaches stuff with passion.`,
      tags: ['programming', 'javascript'],
      type: 'video',
      viewed: false,
      starred: true,
      createdAt: 'Fri Aug 21 2020 15:30:27 GMT+0530 (India Standard Time)',
      updatedAt: 'Fri Aug 21 2020 15:30:27 GMT+0530 (India Standard Time)',
      id: '3',
    },
    {
      title: 'MDN is love! <3',
      link: 'developer.mozilla.org',
      description: `It pretty much is the best resource on various web technologies. You will always find a specific topic that is covered better on another site, but I think as of now I think MDN in general reigns in terms of being correct, detailed and up to date.`,
      tags: ['programming', 'web', 'js', 'html', 'css'],
      type: 'other',
      viewed: true,
      starred: true,
      createdAt: 'Fri Aug 21 2020 14:30:30 GMT+0530 (India Standard Time)',
      updatedAt: 'Fri Aug 21 2020 14:40:30 GMT+0530 (India Standard Time)',
      id: '2',
    },
  ],
  filter: null,
  search: null,
  tag: null,
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

export const useEntryContext = () => useContext(EntryContext);
