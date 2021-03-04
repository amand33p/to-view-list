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
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

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

  const clearButton = () => {
    if (isMobile) {
      return (
        <IconButton color="secondary" onClick={handleClear} size="small">
          <HighlightOffIcon />
        </IconButton>
      );
    }

    return (
      <Button
        color="primary"
        onClick={handleClear}
        startIcon={<HighlightOffIcon />}
      >
        Clear
      </Button>
    );
  };

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
        size={isMobile ? 'small' : 'medium'}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon color="secondary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              {query?.current?.value !== '' && clearButton()}
            </InputAdornment>
          ),
        }}
      />
    </div>
  );
};

export default Search;
