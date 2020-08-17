import React from 'react';
import Card from './Card';

const EntriesDisplay = () => {
  const entries = {
    title: 'Great Javascript tutorial',
    link: 'https://javascript.info',
    description: `I'm in love with this awesome site. All the importants quirks of JS are explained nicely.`,
    tags: ['programming', 'javascript'],
    type: 'article',
    viewed: 'false',
    starred: 'false',
  };

  return (
    <div>
      <Card entries={entries} />
    </div>
  );
};

export default EntriesDisplay;
