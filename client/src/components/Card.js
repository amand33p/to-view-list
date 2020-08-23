import React, { useState } from 'react';
import { setTagFilter } from '../context/entry/entryReducer';
import { useEntryContext } from '../context/entry/entryState';
import TimeAgo from 'timeago-react';

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
import DeleteIcon from '@material-ui/icons/Delete';
import LineStyleIcon from '@material-ui/icons/LineStyle';

const Card = ({ entry }) => {
  const {
    title,
    link,
    description,
    tags,
    type,
    viewed,
    starred,
    createdAt,
    updatedAt,
  } = entry;

  const [isStarred, setIsStarred] = useState(starred);
  const [isViewed, setIsViewed] = useState(viewed);

  const [, dispatch] = useEntryContext();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));
  const classes = useCardStyles(isViewed)();

  const handleStarred = (e) => {
    setIsStarred(e.target.checked);
  };

  const handleViewed = (e) => {
    setIsViewed(e.target.checked);
  };

  const handleTagFilter = (tag) => {
    dispatch(setTagFilter(tag));
  };

  const handleEdit = () => {
    console.log('edited');
  };

  const handleDelete = () => {
    console.log('deleted');
  };

  const formattedLink = link.startsWith('http') ? link : `https://${link}`;

  const iconSize = isMobile ? 'small' : 'large';

  return (
    <Paper className={classes.root} variant="outlined">
      <div className={classes.cardTitle}>
        <Typography variant="h5" className={classes.linkTitle}>
          {type === 'article' ? (
            <WebIcon style={{ marginRight: 8 }} fontSize={iconSize} />
          ) : type === 'video' ? (
            <YouTubeIcon style={{ marginRight: 8 }} fontSize={iconSize} />
          ) : (
            <LineStyleIcon style={{ marginRight: 8 }} fontSize={iconSize} />
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
              <Button
                onClick={handleDelete}
                startIcon={<DeleteIcon />}
                className={classes.delete}
              >
                Delete
              </Button>
            </>
          ) : (
            <>
              <IconButton onClick={handleEdit} className={classes.edit}>
                <EditIcon />
              </IconButton>
              <IconButton onClick={handleDelete} className={classes.delete}>
                <DeleteIcon />
              </IconButton>
            </>
          )}

          <FormControlLabel
            control={
              <Checkbox
                checked={isStarred}
                icon={<StarBorderIcon style={{ color: '#ff9800' }} />}
                checkedIcon={<StarIcon style={{ color: '#ff9800' }} />}
                className={classes.star}
              />
            }
            label={isMobile ? '' : isStarred ? 'Starred!' : 'Star it'}
            onChange={handleStarred}
            style={{ color: '#ff9800' }}
            className={classes.starButton}
          />
          <FormControlLabel
            control={
              <Checkbox
                checked={isViewed}
                icon={<VisibilityOutlinedIcon style={{ color: '#46aaa0' }} />}
                checkedIcon={<VisibilityIcon style={{ color: '#46aaa0' }} />}
                className={classes.view}
              />
            }
            label={isMobile ? '' : isViewed ? 'Viewed!' : 'Mark as viewed'}
            onChange={handleViewed}
            style={{ color: '#4db6ac' }}
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
          className={classes.link}
        >
          <LinkIcon style={{ marginRight: 8 }} />
          {formattedLink.length > 40
            ? formattedLink.slice(0, 40) + '...'
            : formattedLink}
        </Link>
        <Typography varaint="body1">{description}</Typography>
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
        <Typography variant="body2" className={classes.addedTime}>
          <Tooltip title={createdAt.split(' ').slice(0, 5).join(' ')}>
            <span>
              Added:{' '}
              <TimeAgo
                datetime={createdAt}
                locale="en"
                className={classes.timestamp}
              />
            </span>
          </Tooltip>
          {createdAt !== updatedAt ? (
            <Tooltip title={updatedAt.split(' ').slice(0, 5).join(' ')}>
              <span>
                {' '}
                | Last modified:{' '}
                <TimeAgo
                  datetime={updatedAt}
                  locale="en"
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
