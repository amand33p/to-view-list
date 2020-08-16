import React, { useState } from 'react';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  RadioGroup,
  Radio,
  Button,
  Chip,
} from '@material-ui/core/';

import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

import { makeStyles } from '@material-ui/core/styles';

const EntryForm = () => {
  const [title, setTitle] = useState('');
  const [link, setLink] = useState('');
  const [description, setDescription] = useState('');
  const [type, setType] = useState('article');
  const [tag, setTag] = useState('');
  const [tagsArray, setTagsArray] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('submitted');
  };

  const handleTagButton = () => {
    if (tag === '') return;
    if (tagsArray.includes(tag)) return;
    setTagsArray(tagsArray.concat(tag));
    setTag('');
  };

  const handleTagDelete = (targetTag) => {
    setTagsArray(tagsArray.filter((t) => t !== targetTag));
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
    tags: {
      display: 'flex',
      alignItems: 'flex-end',
    },
    tagButton: {
      marginLeft: 10,
    },
    tag: {
      marginLeft: 14,
    },
    tagGroup: {
      [theme.breakpoints.down('xs')]: {
        display: 'none',
      },
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
        <TitleIcon color="secondary" className={classes.inputIcon} />
        <TextField
          required
          label="Title"
          value={title}
          onChange={({ target }) => setTitle(target.value)}
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <LinkIcon color="secondary" className={classes.inputIcon} />
        <TextField
          required
          label="Link"
          value={link}
          onChange={({ target }) => setLink(target.value)}
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <DescriptionIcon color="secondary" className={classes.inputIcon} />
        <TextField
          required
          multiline
          label="Description"
          value={description}
          onChange={({ target }) => setDescription(target.value)}
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <LocalOfferIcon color="secondary" className={classes.inputIcon} />
        <TextField
          label="Add Tags"
          value={tag}
          onChange={({ target }) => setTag(target.value)}
        />
        <Button
          color="primary"
          size="small"
          variant="outlined"
          onClick={handleTagButton}
          className={classes.tagButton}
        >
          Add
        </Button>
        <div className={classes.tagGroup}>
          {tagsArray.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
              variant="outlined"
              color="primary"
              className={classes.tag}
            />
          ))}
        </div>
      </div>
      <div className={classes.radioInput}>
        <CheckCircleOutlineIcon color="secondary" />
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
