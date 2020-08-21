let currentFilterArray = [];

const currentFilter = (filterObj) => {
  for (const key in filterObj) {
    if (filterObj[key] === true) {
      currentFilterArray.push(key);
    }
  }
  return currentFilterArray;
};

export default currentFilter;
