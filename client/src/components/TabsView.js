import React, { useState } from 'react';

import { Paper, Tabs, Tab, makeStyles } from '@material-ui/core';

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const TabsView = () => {
  const [view, setView] = useState('filter');

  const classes = useStyles();

  const handleViewChange = (e) => {
    console.log('ok view');
  };

  return (
    <Paper className={classes.root}>
      <Tabs
        value={view}
        onChange={handleViewChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Item One" />
        <Tab label="Item Two" />
        <Tab label="Item Three" />
      </Tabs>
    </Paper>
  );
};

export default TabsView;
