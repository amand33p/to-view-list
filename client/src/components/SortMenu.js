import React, { useRef, useState } from 'react';
import { useStateValue } from '../context/entry/entryState';
import { sortEntries } from '../context/entry/entryReducer';

import { FormControl, Select, MenuItem, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import SortIcon from '@material-ui/icons/Sort';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
  },
  label: {
    marginRight: 10,
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
  sortIcon: {
    marginRight: 5,
  },
  select: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 14,
    },
  },
}));

const SortMenu = () => {
  const [sortBy, setSortBy] = useState('oldestfirst');
  const [, dispatch] = useStateValue();

  const classes = useStyles();

  const handleSelectChange = (e) => {
    setSortBy(e.target.value);
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
            <MenuItem value="oldestfirst">Oldest first</MenuItem>
            <MenuItem value="newestfirst">Newest first</MenuItem>
            <MenuItem value="a-z">Title: A - Z</MenuItem>
            <MenuItem value="z-a">Title: Z - A</MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

/*
const SortMenu = () => {
  const sortBy = useRef();
  const [, dispatch] = useStateValue();

  const classes = useStyles();

  const handleSelectChange = () => {
    dispatch(sortEntries(sortBy.current.value));
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
            native
            inputRef={sortBy}
            defaultValue="oldestfirst"
            onChange={handleSelectChange}
            className={classes.select}
          >
            <option value="oldestfirst">Oldest first</option>
            <option value="newestfirst">Newest first</option>
            <option value="a-z">Title: A - Z</option>
            <option value="z-a">Title: Z - A</option>
          </Select>
        </FormControl>
      </form>
    </div>
  );
};
*/

export default SortMenu;
