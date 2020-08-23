import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useEntryContext } from '../context/entry/entryState';
import { addEntry } from '../context/entry/entryReducer';

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

import { useFormStyles } from '../styles/muiStyles';
import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';

const AddUpdateForm = () => {
  const [entry, setEntry] = useState({
    title: '',
    link: '',
    description: '',
    type: 'article',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  const [, dispatch] = useEntryContext();

  const history = useHistory();
  const classes = useFormStyles();

  const { title, link, description, type, tags } = entry;

  const handleOnChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(addEntry(entry));

    history.push('/');
    setEntry({
      title: '',
      link: '',
      description: '',
      type: 'article',
      tagsArray: [],
    });
    setTagInput('');
  };

  const handleTagButton = () => {
    if (tagInput === '') return;
    if (tags.includes(tagInput)) return;
    setEntry({ ...entry, tags: tags.concat(tagInput) });
    setTagInput('');
  };

  const handleTagDelete = (targetTag) => {
    setEntry({ ...entry, tags: tags.filter((t) => t !== targetTag) });
  };

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
          color="secondary"
          required
          label="Title"
          value={title}
          name="title"
          onChange={handleOnChange}
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <LinkIcon color="secondary" className={classes.inputIcon} />
        <TextField
          color="secondary"
          required
          label="Link"
          value={link}
          name="link"
          onChange={handleOnChange}
          fullWidth
        />
      </div>
      <div className={classes.input}>
        <DescriptionIcon color="secondary" className={classes.inputIcon} />
        <TextField
          color="secondary"
          required
          multiline
          label="Description"
          value={description}
          name="description"
          onChange={handleOnChange}
          fullWidth
        />
      </div>
      <div className={classes.tagArea}>
        <div className={classes.input}>
          <LocalOfferIcon color="secondary" className={classes.inputIcon} />
          <TextField
            color="secondary"
            label="Add Tags"
            value={tagInput}
            onChange={({ target }) => setTagInput(target.value)}
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
        </div>
        <div className={classes.tagGroup}>
          {tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              onDelete={() => handleTagDelete(tag)}
              variant="outlined"
              color="secondary"
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
          row
          label="Type"
          value={type}
          name="type"
          onChange={handleOnChange}
          className={classes.radioGroup}
        >
          <FormControlLabel
            label="Article"
            control={<Radio color="secondary" />}
            value="article"
            checked={type === 'article'}
          />
          <FormControlLabel
            label="Video"
            control={<Radio color="secondary" />}
            value="video"
            checked={type === 'video'}
          />
          <FormControlLabel
            label="Other"
            control={<Radio color="secondary" />}
            value="other"
            checked={type === 'other'}
          />
        </RadioGroup>
      </div>
      <Button type="submit" variant="contained" color="primary">
        Add Entry
      </Button>
    </FormControl>
  );
};

export default AddUpdateForm;
