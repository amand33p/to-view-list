import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import AlertBox from './AlertBox';
import entryService from '../services/entries';
import { useEntryContext } from '../context/entry/entryState';
import {
  addEntry,
  updateEntry,
  resetEditValues,
  toggleIsLoading,
} from '../context/entry/entryReducer';
import notify from '../utils/notifyDispatcher';

import {
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

const initialInputValues = {
  title: '',
  link: '',
  description: '',
  type: 'article',
  tags: [],
};

const AddUpdateForm = () => {
  const [entry, setEntry] = useState(initialInputValues);
  const [tagInput, setTagInput] = useState('');
  const [error, setError] = useState('');
  const [{ editValues, isLoading }, dispatch] = useEntryContext();
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

  const handleTagButton = () => {
    if (tagInput === '') return;
    if (tags.includes(tagInput)) {
      return setError(`Tags need to be unique. Two tags can't be same.`);
    }
    setEntry({ ...entry, tags: tags.concat(tagInput.toLowerCase()) });
    setTagInput('');
  };

  const handleTagDelete = (targetTag) => {
    setEntry({ ...entry, tags: tags.filter((t) => t !== targetTag) });
  };

  const handleClearInput = () => {
    if (editValues) {
      dispatch(resetEditValues());
    }
    setEntry(initialInputValues);
    setTagInput('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (tags.length === 0) {
      return setError('Atleast one tag is required.');
    }

    try {
      dispatch(toggleIsLoading());
      if (editValues) {
        const entryRes = await entryService.update(editValues.id, entry);
        dispatch(updateEntry(entryRes));
        notify(
          dispatch,
          `Entry "${editValues.title}" has been successfully updated.`,
          'success'
        );
        dispatch(resetEditValues());
      } else {
        const entryRes = await entryService.create(entry);
        dispatch(addEntry(entryRes));
        notify(
          dispatch,
          `New entry "${entryRes.title}" has been successfully added!`,
          'success'
        );
      }

      dispatch(toggleIsLoading());
      setEntry(initialInputValues);
      setTagInput('');
      history.push('/');
    } catch (err) {
      dispatch(toggleIsLoading());

      const errRes = err?.response?.data;

      if (
        errRes?.error.includes('title') &&
        errRes?.error.includes('allowed length (40)')
      ) {
        return setError(`Title field's maximum character limit is 40. `);
      } else if (
        errRes?.error.includes('description') &&
        errRes?.error.includes('allowed length (250)')
      ) {
        return setError(`Description field's maximum character limit is 250. `);
      } else if (errRes?.error) {
        return setError(errRes.error);
      } else {
        return setError(err.message);
      }
    }
  };

  return (
    <Paper>
      <form onSubmit={handleSubmit} className={classes.root}>
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
            disabled={isLoading}
          >
            {editValues
              ? isLoading
                ? 'Updating Entry'
                : 'Update Entry'
              : isLoading
              ? 'Adding Entry'
              : 'Add Entry'}
          </Button>
        </div>
        {error && (
          <AlertBox
            message={error}
            severity="error"
            clearError={() => setError(null)}
          />
        )}
      </form>
    </Paper>
  );
};

export default AddUpdateForm;
