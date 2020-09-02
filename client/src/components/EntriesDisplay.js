import React from 'react';
import { useEntryContext } from '../context/entry/entryState';
import Card from './Card';
import SortMenu from './SortMenu';
import {
  resetTagFilter,
  resetFilter,
  clearSearch,
} from '../context/entry/entryReducer';

import getEntriesArray from '../utils/getEntriesArray';
import filterEntries from '../utils/filterEntries';
import currentFilter from '../utils/currentFilter';
import showInfoText from '../utils/showInfoText';

import { Typography, Button, useMediaQuery } from '@material-ui/core';
import { useEntriesDisplayStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab/';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const EntriesDisplay = () => {
  const [
    { entries, filter, search, tag, isLoading },
    dispatch,
  ] = useEntryContext();
  const classes = useEntriesDisplayStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  let entriesArray = getEntriesArray(entries, search, tag);

  const entriesToDisplay = filterEntries(filter, entriesArray);

  const infoText = showInfoText(filter, search, tag, currentFilter);

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
      {isLoading ? (
        <div style={{ marginTop: 20 }}>
          {Array.from(new Array(3)).map((a) => (
            <div key={a} style={{ marginBottom: 20 }}>
              <Skeleton variant="h1" height="60px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
            </div>
          ))}
        </div>
      ) : (
        entriesToDisplay.map((entry) => <Card key={entry.id} entry={entry} />)
      )}
    </div>
  );
};

export default EntriesDisplay;
