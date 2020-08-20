import React, { useState } from 'react';

import { FormControl, InputLabel, Select, Input } from '@material-ui/core';

const SortMenu = () => {
  const [sortBy, setSortBy] = useState('oldest');

  return (
    <form>
      <FormControl>
        <InputLabel>Sort by:</InputLabel>
        <Select
          native
          value={sortBy}
          onChange={}
          input={<Input id="demo-dialog-native" />}
        >
          <option aria-label="None" value="" />
          <option value={10}>Ten</option>
          <option value={20}>Twenty</option>
          <option value={30}>Thirty</option>
        </Select>
      </FormControl>
    </form>
  );
};

export default SortMenu;
