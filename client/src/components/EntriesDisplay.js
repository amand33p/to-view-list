import React from 'react';
import { useStateValue } from '../context/entry/entryState';
import Card from './Card';

const EntriesDisplay = () => {
  const [{ entries, filter }, dispatch] = useStateValue();

  /*const filterEntries = () => {
    if (filter.videos) {
      filteredEntries = filteredEntries.filter((e) => e.type === 'video');
    }

    if (filter.articles) {
      filteredEntries = filteredEntries.filter((e) => e.type === 'article');
    }

    if (filter.others) {
      filteredEntries = filteredEntries.filter((e) => e.type === 'other');
    }

    if (filter.viewed) {
      filteredEntries = filteredEntries.filter((e) => e.viewed === 'true');
    }

    if (filter.starred) {
      filteredEntries = filteredEntries.filter((e) => e.starred === 'true');
    }

    return filteredEntries;
  };*/

  let array = [];

  const filterEntries = () => {
    if (
      Object.keys(filter).length === 0 ||
      Object.values(filter).filter((v) => v === false).length ===
        Object.keys(filter).length
    ) {
      return entries;
    }

    if (filter.videos) {
      const filtered = entries.filter((e) => e.type === 'video');
      filtered.forEach((f) => (!array.includes(f) ? array.push(f) : null));
    }

    if (filter.articles) {
      const filtered = entries.filter((e) => e.type === 'article');
      filtered.forEach((f) => (!array.includes(f) ? array.push(f) : null));
    }

    if (filter.others) {
      const filtered = entries.filter((e) => e.type === 'other');
      filtered.forEach((f) => (!array.includes(f) ? array.push(f) : null));
    }

    if (filter.viewed) {
      const filtered = entries.filter((e) => e.viewed === 'true');
      filtered.forEach((f) => (!array.includes(f) ? array.push(f) : null));
    }

    if (filter.starred) {
      const filtered = entries.filter((e) => e.starred === 'true');
      filtered.forEach((f) => (!array.includes(f) ? array.push(f) : null));
    }

    return array;
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
