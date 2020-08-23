import React, { useRef } from 'react';
import { setSearchInput, clearSearch } from '../context/entry/entryReducer';
import { useEntryContext } from '../context/entry/entryState';

import {
  TextField,
  InputAdornment,
  Button,
  IconButton,
  useMediaQuery,
} from '@material-ui/core';

import { useSearchStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import SearchIcon from '@material-ui/icons/Search';
import HighlightOffIcon from '@material-ui/icons/HighlightOff';

const Search = () => {
  const query = useRef();
  const classes = useSearchStyles();
  const [, dispatch] = useEntryContext();

  const handleSearchChange = () => {
    if (query.current.value !== '') {
      dispatch(setSearchInput(query.current.value));
    } else {
      dispatch(clearSearch());
    }
  };

  const handleClear = () => {
    query.current.value = '';
    dispatch(clearSearch());
  };

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  return (
    <div className={classes.root}>
      <TextField
        className={classes.field}
        fullWidth
        label="Search"
        variant="outlined"
        placeholder="By title, tag or description"
        inputRef={query}
        onChange={handleSearchChange}
        color="secondary"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="secondary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {isMobile ? (
                <IconButton color="secondary" onClick={handleClear}>
                  <HighlightOffIcon />
                </IconButton>
              ) : (
                <Button
                  color="primary"
                  onClick={handleClear}
                  startIcon={<HighlightOffIcon />}
                >
                  Clear
                </Button>
              )}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
