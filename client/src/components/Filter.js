import React, { useState } from 'react';
import { useEntryContext } from '../context/entry/entryState';
import { setFilterValues, resetFilter } from '../context/entry/entryReducer';

import {
  FormControl,
  Button,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import RotateLeftIcon from '@material-ui/icons/RotateLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    paddingLeft: 20,
    paddingRight: 20,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      flexWrap: 'wrap',
      paddingLeft: 10,
      paddingRight: 10,
    },
  },
  filterButton: {
    [theme.breakpoints.down('xs')]: {
      marginTop: 10,
      width: '100%',
    },
  },
}));

const Filter = () => {
  const [, dispatch] = useEntryContext();
  const [filter, setFilter] = useState({
    videos: false,
    articles: false,
    others: false,
    viewed: false,
    starred: false,
  });

  const classes = useStyles();

  const { videos, articles, others, viewed, starred } = filter;

  const handleCheckboxChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    if (!Object.values(filter).every((v) => v === false)) {
      dispatch(setFilterValues(filter));
    }
  };

  const handleUncheck = () => {
    setFilter({
      videos: false,
      articles: false,
      others: false,
      viewed: false,
      starred: false,
    });
    dispatch(resetFilter());
  };

  return (
    <FormControl
      component="form"
      className={classes.root}
      onSubmit={handleApplyFilter}
    >
      <FormGroup row>
        <FormControlLabel
          control={
            <Checkbox
              checked={videos}
              onChange={handleCheckboxChange}
              name="videos"
            />
          }
          label="Videos"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={articles}
              onChange={handleCheckboxChange}
              name="articles"
            />
          }
          label="Articles"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={others}
              onChange={handleCheckboxChange}
              name="others"
            />
          }
          label="Others"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={viewed}
              onChange={handleCheckboxChange}
              name="viewed"
            />
          }
          label="Viewed"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={starred}
              onChange={handleCheckboxChange}
              name="starred"
            />
          }
          label="Starred"
        />
        <Button onClick={handleUncheck} startIcon={<RotateLeftIcon />}>
          Reset
        </Button>
      </FormGroup>

      <Button
        type="submit"
        variant="contained"
        color="primary"
        startIcon={<FilterListIcon />}
        className={classes.filterButton}
      >
        Apply Filter
      </Button>
    </FormControl>
  );
};

export default Filter;
