import React, { useState } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  RadioGroup,
  Radio,
  Button,
} from '@material-ui/core/';

import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

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
    input: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    inputIcon: {
      marginRight: 8,
    },
    radioLabel: {
      marginLeft: 9,
    },
    radioGroup: {
      marginLeft: 20,
    },
    radioInput: {
      display: 'flex',
      alignItems: 'center',
      marginTop: 10,
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
      <div className={classes.input}>
        <TitleIcon color="primary" className={classes.inputIcon} />
        <TextField
          required
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <LinkIcon color="primary" className={classes.inputIcon} />
        <TextField
          required
          label="Link"
          value={link}
          onChange={({ target }) => setLink(target.value)}
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <DescriptionIcon color="primary" className={classes.inputIcon} />
        <TextField
          required
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          fullWidth
        />
      </div>
      <div className={classes.radioInput}>
        <CheckCircleOutlineIcon color="primary" />
        <FormLabel component="legend" className={classes.radioLabel}>
          Link Type:
        </FormLabel>
        <RadioGroup
          label="Type"
          value={type}
          onChange={({ target }) => setType(target.value)}
          defaultValue="article"
          row
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
          <FormControlLabel
            label="Other"
            control={<Radio color="primary" />}
            value="other"
          />
        </RadioGroup>
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Entry
      </Button>
    </FormControl>
  );
};

export default EntryForm;
