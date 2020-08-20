import React from 'react';
import { useStateValue } from '../context/entry/entryState';
import Card from './Card';

import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    paddingBottom: 0,
  },
}));

const EntriesDisplay = () => {
  const [{ entries, filter, search, tag }] = useStateValue();

  const classes = useStyles();

  let entriesArray = search
    ? entries.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.description.toLowerCase().includes(search.toLowerCase()) ||
          e.tags.includes(search.toLowerCase())
      )
    : tag
    ? entries.filter((e) => e.tags.includes(tag.toLowerCase()))
    : entries;

  let filteredArray = [];

  const filterEntries = () => {
    if (!filter || Object.values(filter).every((v) => v === false)) {
      return entriesArray;
    }

    if (filter.videos) {
      const filtered = entriesArray.filter((e) => e.type === 'video');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    if (filter.articles) {
      const filtered = entriesArray.filter((e) => e.type === 'article');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    if (filter.others) {
      const filtered = entriesArray.filter((e) => e.type === 'other');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    if (filter.viewed) {
      const filtered = entriesArray.filter((e) => e.viewed === 'true');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    if (filter.starred) {
      const filtered = entriesArray.filter((e) => e.starred === 'true');
      filtered.forEach((f) =>
        !filteredArray.includes(f) ? filteredArray.push(f) : null
      );
    }

    return filteredArray;
  };

  const visibleEntries = 'All';

  return (
    <div>
      <div className={classes.root}>
        <Typography variant="h5">{visibleEntries}</Typography>
      </div>
      {filterEntries().map((entry) => (
        <Card key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntriesDisplay;
