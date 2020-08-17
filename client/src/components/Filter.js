import React, { useState } from 'react';

import {
  FormControl,
  Button,
  IconButton,
  FormGroup,
  FormControlLabel,
  Checkbox,
} from '@material-ui/core';

import { makeStyles } from '@material-ui/core/styles';
import FilterListIcon from '@material-ui/icons/FilterList';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

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
  const [filter, setFilter] = useState({
    links: false,
    articles: false,
    others: false,
    viewed: false,
    starred: false,
  });

  const classes = useStyles();

  const { links, articles, others, viewed, starred } = filter;

  const handleCheckboxChange = (event) => {
    setFilter({ ...filter, [event.target.name]: event.target.checked });
  };

  const handleApplyFilter = (e) => {
    e.preventDefault();
    console.log('filter applied', filter);
  };

  const handleUncheck = () => {
    setFilter({
      links: false,
      articles: false,
      others: false,
      viewed: false,
      starred: false,
    });
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
              checked={links}
              onChange={handleCheckboxChange}
              name="links"
            />
          }
          label="Links"
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
        <IconButton
          onClick={handleUncheck}
          variant="outlined"
          color="secondary"
          size="small"
        >
          <HighlightOffIcon />
        </IconButton>
      </FormGroup>

      <Button
        type="submit"
        variant="contained"
        color="secondary"
        startIcon={<FilterListIcon />}
        className={classes.filterButton}
      >
        Apply Filter
      </Button>
    </FormControl>
  );
};

export default Filter;
