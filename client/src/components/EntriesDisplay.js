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
import sortEntries from '../utils/sortEntries';

import { Typography, Button, useMediaQuery } from '@material-ui/core';
import { useEntriesDisplayStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import { Skeleton } from '@material-ui/lab/';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const EntriesDisplay = () => {
  const [
    { entries, filter, search, tag, sortBy, isLoading },
    dispatch,
  ] = useEntryContext();
  const classes = useEntriesDisplayStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  let entriesArray = getEntriesArray(entries, search, tag);

  const entriesToDisplay = sortEntries(
    filterEntries(filter, entriesArray),
    sortBy
  );

  const infoText = showInfoText(filter, search, tag, currentFilter);

  const handleFilterReset = () => {
    dispatch(resetFilter());
    dispatch(resetTagFilter());
    dispatch(clearSearch());
  };

  const backButton = () => {
    if (isMobile) {
      return (
        <Button
          onClick={handleFilterReset}
          size="small"
          color="primary"
          className={classes.goBackButtonRound}
          variant="contained"
        >
          <ArrowBackIcon />
        </Button>
      );
    }

    return (
      <Button
        onClick={handleFilterReset}
        startIcon={<ArrowBackIcon />}
        className={classes.goBackButton}
        variant="contained"
        size="small"
        color="primary"
      >
        Go Back
      </Button>
    );
  };

  return (
    <div>
      <div className={classes.flexedBar}>
        <div className={classes.textAndButton}>
          {(tag || filter || search) && backButton()}
          <Typography
            variant="h6"
            className={classes.infoText}
            color="secondary"
          >
            {infoText}
          </Typography>
        </div>
        <div className={classes.sortMenuWrapper}>
          <SortMenu />
        </div>
      </div>
      {isLoading ? (
        <div style={{ marginTop: 20 }}>
          {Array.from(new Array(3)).map((_, i) => (
            <div key={i} style={{ marginBottom: 20 }}>
              <Skeleton height="80px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
              <Skeleton height="50px" />
            </div>
          ))}
        </div>
      ) : entriesToDisplay.length !== 0 ? (
        entriesToDisplay.map((entry) => <Card key={entry.id} entry={entry} />)
      ) : (
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          className={classes.middleText}
          color="secondary"
        >
          {search || filter ? 'No matches found.' : 'No entries added yet.'}
        </Typography>
      )}
    </div>
  );
};

export default EntriesDisplay;
