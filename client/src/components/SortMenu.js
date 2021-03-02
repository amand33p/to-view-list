import React from 'react';
import { useEntryContext } from '../context/entry/entryState';
import { sortEntries } from '../context/entry/entryReducer';

import { FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import { useSortStyles } from '../styles/muiStyles';
import SortIcon from '@material-ui/icons/Sort';

const SortMenu = () => {
  const [{ sortBy }, dispatch] = useEntryContext();
  const classes = useSortStyles();

  const handleSelectChange = (e) => {
    dispatch(sortEntries(e.target.value));
  };

  return (
    <div className={classes.root}>
      <Typography variant="subtitle1" className={classes.label}>
        <SortIcon className={classes.sortIcon} />
        Sort by:
      </Typography>
      <form>
        <FormControl>
          <Select
            value={sortBy}
            displayEmpty
            onChange={handleSelectChange}
            className={classes.select}
          >
            <MenuItem value="newest">Newest first</MenuItem>
            <MenuItem value="oldest">Oldest first</MenuItem>
            <MenuItem value="a-z">Title: A - Z</MenuItem>
            <MenuItem value="z-a">Title: Z - A</MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

export default SortMenu;
