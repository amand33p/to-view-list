import React from 'react';
import { useHistory } from 'react-router-dom';
import { useEntryContext } from '../context/entry/entryState';
import {
  setTagFilter,
  removeEntry,
  setEditValues,
  toggleStarEntry,
  toggleViewEntry,
} from '../context/entry/entryReducer';
import TimeAgo from 'timeago-react';
import DeleteDialog from './DeleteDialog';
import entryService from '../services/entries';
import notify from '../utils/notifyDispatcher';

import {
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  Link,
  Chip,
  Button,
  IconButton,
  Divider,
  Tooltip,
} from '@material-ui/core';
import { useCardStyles } from '../styles/muiStyles';
import { useTheme } from '@material-ui/core/styles';
import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import LinkIcon from '@material-ui/icons/Link';
import WebIcon from '@material-ui/icons/Web';
import YouTubeIcon from '@material-ui/icons/YouTube';
import EditIcon from '@material-ui/icons/Edit';
import LineStyleIcon from '@material-ui/icons/LineStyle';

const Card = ({ entry }) => {
  const {
    id,
    title,
    link,
    description,
    tags,
    type,
    isViewed,
    isStarred,
    createdAt,
    updatedAt,
  } = entry;

  const [{ darkMode }, dispatch] = useEntryContext();
  const history = useHistory();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useCardStyles(isViewed, darkMode)();

  const handleStarToggle = async () => {
    try {
      dispatch(toggleStarEntry(id));
      await entryService.star(id);
      notify(
        dispatch,
        `${isStarred ? 'Un-Starred' : 'Starred'} "${title}"!`,
        'success'
      );
    } catch (err) {
      if (err?.response?.data?.error) {
        notify(dispatch, `${err.response.data.error}`, 'error');
      } else {
        notify(dispatch, `${err.message}`, 'error');
      }
    }
  };

  const handleViewToggle = async () => {
    try {
      dispatch(toggleViewEntry(id));
      await entryService.view(id);
      notify(
        dispatch,
        `Marked "${title}" as ${isViewed ? 'Not Viewed' : 'Viewed'}!`,
        'success'
      );
    } catch (err) {
      if (err?.response?.data?.error) {
        notify(dispatch, `${err.response.data.error}`, 'error');
      } else {
        notify(dispatch, `${err.message}`, 'error');
      }
    }
  };

  const handleTagFilter = (tag) => {
    dispatch(setTagFilter(tag));
  };

  const handleEdit = () => {
    dispatch(setEditValues(entry));
    history.push('/add_update');
  };

  const handleDelete = async () => {
    try {
      dispatch(removeEntry(id));
      await entryService.remove(id);
      notify(dispatch, `Successfully deleted "${title}"!`, 'success');
    } catch (err) {
      if (err?.response?.data?.error) {
        notify(dispatch, `${err.response.data.error}`, 'error');
      } else {
        notify(dispatch, `${err.message}`, 'error');
      }
    }
  };

  const formattedLink = link.startsWith('http') ? link : `https://${link}`;
  const iconSize = isMobile ? 'small' : 'large';
  const iconStyle = { marginRight: 8 };

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.cardTitle}>
        <Typography variant="h5" className={classes.linkTitle}>
          {type === 'article' ? (
            <WebIcon style={iconStyle} fontSize={iconSize} />
          ) : type === 'video' ? (
            <YouTubeIcon style={iconStyle} fontSize={iconSize} />
          ) : (
            <LineStyleIcon style={iconStyle} fontSize={iconSize} />
          )}
          {title}
        </Typography>
        <div className={classes.endButtons}>
          {!isMobile ? (
            <>
              <Button
                onClick={handleEdit}
                startIcon={<EditIcon />}
                className={classes.edit}
              >
                Edit
              </Button>
              <DeleteDialog
                handleDelete={handleDelete}
                title={title}
                isMobile={isMobile}
              />
            </>
          ) : (
            <>
              <IconButton onClick={handleEdit} className={classes.edit}>
                <EditIcon />
              </IconButton>
              <DeleteDialog
                handleDelete={handleDelete}
                title={title}
                isMobile={isMobile}
              />
            </>
          )}
          <FormControlLabel
            control={
              <Checkbox
                checked={isStarred}
                icon={<StarBorderIcon className={classes.starIcon} />}
                checkedIcon={<StarIcon className={classes.starIcon} />}
                className={classes.star}
              />
            }
            label={isMobile ? '' : isStarred ? 'Starred!' : 'Star it'}
            onChange={handleStarToggle}
            className={classes.starButton}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isViewed}
                icon={<VisibilityOutlinedIcon className={classes.viewIcon} />}
                checkedIcon={<VisibilityIcon className={classes.viewIcon} />}
                className={classes.view}
              />
            }
            label={isMobile ? '' : isViewed ? 'Viewed!' : 'Mark as viewed'}
            onChange={handleViewToggle}
            className={classes.viewButton}
          />
        </div>
      </div>
      <Divider />
      <div>
        <Link
          href={formattedLink}
          target="_blank"
          rel="noreferrer"
          variant="h6"
          color="secondary"
          className={classes.link}
        >
          <LinkIcon style={{ marginRight: 8 }} />
          {formattedLink.length > 40
            ? formattedLink.slice(0, 40) + '...'
            : formattedLink}
        </Link>
        <Typography varaint="body1" className={classes.description}>
          {description}
        </Typography>
        {tags.length !== 0 && (
          <div className={classes.tagsGroup}>
            Tags:{' '}
            {tags.map((tag) => (
              <Chip
                key={tag}
                label={tag}
                color="secondary"
                className={classes.tag}
                onClick={() => handleTagFilter(tag)}
              />
            ))}
          </div>
        )}
        <Typography variant="body2" className={classes.addedTime}>
          <Tooltip title={createdAt}>
            <span>
              Added:{' '}
              <TimeAgo datetime={createdAt} className={classes.timestamp} />
            </span>
          </Tooltip>
          {createdAt !== updatedAt ? (
            <Tooltip title={updatedAt}>
              <span>
                {' '}
                | Last modified:{' '}
                <TimeAgo
                  datetime={updatedAt}
                  className={classes.timestamp}
                />{' '}
              </span>
            </Tooltip>
          ) : null}
        </Typography>
      </div>
    </Paper>
  );
};

export default Card;
