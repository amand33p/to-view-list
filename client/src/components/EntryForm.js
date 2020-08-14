import React, { useState } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  RadioGroup,
  Radio,
  Button,
  InputAdornment,
} from '@material-ui/core/';

import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';

import { makeStyles } from '@material-ui/core/styles';

const EntryForm = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('article');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      padding: 20,
    },
    radioLabel: {
      fontSize: '12px',
    },
  }));

  const classes = useStyles();

  return (
    <FormControl
      component="form"
      onSubmit={handleSubmit}
      margin="normal"
      className={classes.root}
    >
      <TextField
        required
        label="Title"
        value={title}
        onChange={({ target }) => setTitle(target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <TitleIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        label="Link"
        value={link}
        onChange={({ target }) => setLink(target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <LinkIcon />
            </InputAdornment>
          ),
        }}
      />
      <TextField
        required
        label="Description"
        value={description}
        onChange={({ target }) => setDescription(target.value)}
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <DescriptionIcon />
            </InputAdornment>
          ),
        }}
      />
      <FormLabel component="legend" className={classes.radioLabel}>
        Link Type
      </FormLabel>
      <RadioGroup
        label="Type"
        value={type}
        onChange={({ target }) => setType(target.value)}
        defaultValue="article"
        className={classes.radioGroup}
      >
        <FormControlLabel
          label="Article"
          control={<Radio color="primary" />}
          value="article"
        />
        <FormControlLabel
          label="Video"
          control={<Radio color="primary" />}
          value="video"
        />
      </RadioGroup>
      <Button type="submit">Add Entry</Button>
    </FormControl>
  );
};

export default EntryForm;
