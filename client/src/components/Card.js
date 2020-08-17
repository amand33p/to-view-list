import React, { useState } from 'react';

import {
  Paper,
  Typography,
  FormControlLabel,
  Checkbox,
  useMediaQuery,
  Link,
  Chip,
} from '@material-ui/core';

import { makeStyles, useTheme } from '@material-ui/core/styles';

import StarIcon from '@material-ui/icons/Star';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import LinkIcon from '@material-ui/icons/Link';

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: 40,
    padding: 20,
  },
  cardTitle: {
    display: 'flex',
    justifyContent: 'space-between',
    [theme.breakpoints.down('xs')]: {
      alignItems: 'center',
      flexWrap: 'wrap',
    },
  },
  checkboxes: {
    [theme.breakpoints.down('xs')]: {
      display: 'flex',
    },
  },
  linkTitle: {
    [theme.breakpoints.down('xs')]: {
      fontSize: 20,
    },
  },
  tag: {
    marginRight: 5,
  },
  tagsGroup: {
    marginTop: 8,
  },
  link: {
    display: 'flex',
    alignItems: 'center',
    [theme.breakpoints.down('xs')]: {
      fontSize: 16,
    },
  },
}));

const Card = ({ entries }) => {
  const { title, link, description, tags, type, viewed, starred } = entries;

  const [isStarred, setIsStarred] = useState(starred === 'true');
  const [isViewed, setIsViewed] = useState(viewed === 'true');

  const classes = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('xs'));

  const handleStarred = (e) => {
    setIsStarred(e.target.checked);
  };

  const handleViewed = (e) => {
    setIsViewed(e.target.checked);
  };

  const handleTagFilter = (tag) => {
    console.log('filtered by tag', tag);
  };

  return (
    <Paper className={classes.root}>
      <div className={classes.cardTitle}>
        <Typography variant="h5" className={classes.linkTitle}>
          {title}
        </Typography>
        <div className={classes.checkboxes}>
          <FormControlLabel
            control={
              <Checkbox
                icon={<StarBorderIcon />}
                checkedIcon={<StarIcon />}
                name="star"
              />
            }
            label={isMobile ? '' : isStarred ? 'Starred!' : 'Star it'}
            onChange={handleStarred}
          />
          <FormControlLabel
            control={
              <Checkbox
                icon={<VisibilityOutlinedIcon />}
                checkedIcon={<VisibilityIcon />}
              />
            }
            label={isMobile ? '' : isViewed ? 'Viewed!' : 'Mark as viewed'}
            onChange={handleViewed}
          />
        </div>
      </div>
      <div>
        <Link
          href={link.startsWith('http') ? link : `https://${link}`}
          target="_blank"
          rel="noreferrer"
          variant="h6"
          className={classes.link}
        >
          <LinkIcon style={{ marginRight: 8 }} />
          {link.length > 40 ? link.slice(0, 40) + '...' : link}
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
      </div>
    </Paper>
  );
};

export default Card;
