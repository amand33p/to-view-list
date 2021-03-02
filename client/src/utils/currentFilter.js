const currentFilter = (filterObj) => {
  let currentFilterArray = [];

  for (const key in filterObj) {
    if (filterObj[key] === true) {
      currentFilterArray.push(key);
    }
  }
  return currentFilterArray;
};

export default currentFilter;
