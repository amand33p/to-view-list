let currentFilterArray = [];

const currentFilter = (filterObj) => {
  currentFilterArray = [];
  for (const key in filterObj) {
    if (filterObj[key] === true) {
      currentFilterArray.push(key);
    }
  }
  return currentFilterArray;
};

export default currentFilter;
