import React from 'react';
import { useEntryContext } from '../context/entry/entryState';
import Card from './Card';
import SortMenu from './SortMenu';
import {
  resetTagFilter,
  resetFilter,
  clearSearch,
} from '../context/entry/entryReducer';

import filterEntries from '../utils/filterEntries';
import currentFilter from '../utils/currentFilter';

import { Typography, Button, useMediaQuery } from '@material-ui/core';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const useStyles = makeStyles((theme) => ({
  root: {
    padding: 15,
    paddingBottom: 0,
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  textAndButton: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    [theme.breakpoints.down('xs')]: {
      justifyContent: 'space-between',
    },
  },
  infoText: {
    marginRight: 20,
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  goBackButton: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 12,
    },
  },
}));

const EntriesDisplay = () => {
  const [{ entries, filter, search, tag }, dispatch] = useEntryContext();
  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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

  const entriesToDisplay = filterEntries(filter, entriesArray);

  const infoText = filter
    ? `Filtered to show - "${currentFilter(filter).join(', ')}"`
    : search
    ? `Showing results for - search "${search}"`
    : tag
    ? `Filtered by tag - "${tag.toLowerCase()}"`
    : 'Showing - ALL';

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
      <div className={classes.root}>
        <div className={classes.textAndButton}>
          <Typography variant="h6" className={classes.infoText} color="primary">
            {infoText}
          </Typography>
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
              variant={!isMobile ? 'contained' : 'outlined'}
              size="small"
              color="primary"
            >
              {!isMobile ? 'Go Back' : 'Back'}
            </Button>
          ) : null}
        </div>
        <SortMenu />
      </div>
      {entriesToDisplay.map((entry) => (
        <Card key={entry.id} entry={entry} />
      ))}
    </div>
  );
};

export default EntriesDisplay;
