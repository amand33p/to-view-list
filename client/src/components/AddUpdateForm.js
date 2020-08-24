import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { useEntryContext } from '../context/entry/entryState';
import {
  addEntry,
  updateEntry,
  resetEditValues,
} from '../context/entry/entryReducer';

import {
  FormControl,
  FormControlLabel,
  FormLabel,
  TextField,
  RadioGroup,
  Radio,
  Button,
  Chip,
  Typography,
  useMediaQuery,
  Paper,
} from '@material-ui/core/';

import { useFormStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';

import TitleIcon from '@material-ui/icons/Title';
import LinkIcon from '@material-ui/icons/Link';
import DescriptionIcon from '@material-ui/icons/Description';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import LocalOfferIcon from '@material-ui/icons/LocalOffer';
import PostAddIcon from '@material-ui/icons/PostAdd';
import EditIcon from '@material-ui/icons/Edit';
import BackspaceIcon from '@material-ui/icons/Backspace';

const AddUpdateForm = () => {
  const [entry, setEntry] = useState({
    title: '',
    link: '',
    description: '',
    type: 'article',
    tags: [],
  });
  const [tagInput, setTagInput] = useState('');

  const [{ editValues }, dispatch] = useEntryContext();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useFormStyles();

  useEffect(() => {
    if (editValues) {
      setEntry(editValues);
    }
  }, [editValues]);

  const { title, link, description, type, tags } = entry;

  const handleOnChange = (e) => {
    setEntry({
      ...entry,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editValues) {
      dispatch(updateEntry(entry));
      dispatch(resetEditValues());
    } else {
      dispatch(addEntry(entry));
    }

    history.push('/');

    setEntry({
      title: '',
      link: '',
      description: '',
      type: 'article',
      tags: [],
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

  const handleClearInput = () => {
    if (editValues) {
      dispatch(resetEditValues());
    }

    setEntry({
      title: '',
      link: '',
      description: '',
      type: 'article',
      tags: [],
    });
    setTagInput('');
  };

  return (
    <Paper>
      <FormControl
        component="form"
        onSubmit={handleSubmit}
        margin="normal"
        className={classes.root}
      >
        <Typography
          variant={isMobile ? 'h5' : 'h4'}
          color="primary"
          className={classes.formTitle}
        >
          {editValues ? 'Update the entry' : 'Add a new entry'}
        </Typography>
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
        <div className={classes.buttonGroup}>
          <Button
            variant="outlined"
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            startIcon={<BackspaceIcon />}
            onClick={handleClearInput}
          >
            Clear
          </Button>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            size={isMobile ? 'medium' : 'large'}
            startIcon={editValues ? <EditIcon /> : <PostAddIcon />}
          >
            {editValues ? 'Update Entry' : 'Add Entry'}
          </Button>
        </div>
      </FormControl>
    </Paper>
  );
};

export default AddUpdateForm;
