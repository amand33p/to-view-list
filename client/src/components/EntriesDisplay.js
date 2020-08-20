import React from 'react';
import { useStateValue } from '../context/entry/entryState';
import Card from './Card';
import {
  resetTagFilter,
  resetFilter,
  clearSearch,
} from '../context/entry/entryReducer';

import { Typography, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  actionPanel: {
    padding: 15,
    paddingBottom: 0,
  },
  actionText: {
    display: 'flex',
    alignItems: 'center',
  },
  goBackButton: {
    marginLeft: 20,
  },
}));

const EntriesDisplay = () => {
  const [{ entries, filter, search, tag }, dispatch] = useStateValue();
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

  let currentFilterArray = [];

  const currentFilter = () => {
    for (const key in filter) {
      if (filter[key] === true) {
        currentFilterArray.push(key);
      }
    }
    return currentFilterArray;
  };

  const visibleEntries = filter
    ? `Filtered to show - "${currentFilter().join(', ')}"`
    : search
    ? `Showing results for - searched "${search}"`
    : tag
    ? `Filtered by tag - "${tag.toLowerCase()}"`
    : null;

  const handleTagReset = () => {
    dispatch(resetTagFilter());
  };

  const handleFilterReset = () => {
    dispatch(resetFilter());
  };

  const handleSearchReset = () => {
    dispatch(clearSearch());
  };

  return (
    <div>
      <div className={classes.actionPanel}>
        <div className={classes.actionText}>
          <Typography variant="h6">{visibleEntries}</Typography>
          {tag || filter || search ? (
            <Button
              onClick={
                tag
                  ? handleTagReset
                  : filter
                  ? handleFilterReset
                  : handleSearchReset
              }
              startIcon={<ArrowBackIcon />}
              className={classes.goBackButton}
              variant="contained"
              size="small"
              color="primary"
            >
              Go Back
            </Button>
          ) : null}
        </div>
      </div>
      {filterEntries().map((entry) => (
        <Card key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntriesDisplay;
