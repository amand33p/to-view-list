import React from 'react';
import { useStateValue } from '../context/entry/entryState';
import Card from './Card';

const EntriesDisplay = () => {
  const [{ entries, filter }] = useStateValue();

  let filteredArray = [];

  const filterEntries = () => {
    if (!filter || Object.values(filter).every((v) => v === false)) {
      return entries;
    }

    if (filter.videos) {
      const filtered = entries.filter((e) => e.type === 'video');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    if (filter.articles) {
      const filtered = entries.filter((e) => e.type === 'article');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    if (filter.others) {
      const filtered = entries.filter((e) => e.type === 'other');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    if (filter.viewed) {
      const filtered = entries.filter((e) => e.viewed === 'true');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    if (filter.starred) {
      const filtered = entries.filter((e) => e.starred === 'true');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    return filteredArray;
  };

  return (
    <div>
      {filterEntries().map((entry) => (
        <Card key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntriesDisplay;
