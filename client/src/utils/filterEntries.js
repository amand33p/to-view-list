const filterEntries = (filterObj, entriesArray) => {
  let filteredArray = [];

  if (!filterObj || Object.values(filterObj).every((v) => v === false)) {
    return entriesArray;
  }

  if (filterObj.videos) {
    const filtered = entriesArray.filter((e) => e.type === 'video');

    filtered.forEach((f) =>
      !filteredArray.includes(f) ? filteredArray.push(f) : null
    );
  }

  if (filterObj.articles) {
    const filtered = entriesArray.filter((e) => e.type === 'article');
    filtered.forEach((f) =>
      !filteredArray.includes(f) ? filteredArray.push(f) : null
    );
  }

  if (filterObj.others) {
    const filtered = entriesArray.filter((e) => e.type === 'other');
    filtered.forEach((f) =>
      !filteredArray.includes(f) ? filteredArray.push(f) : null
    );
  }

  if (filterObj.viewed) {
    const filtered = entriesArray.filter((e) => e.isViewed === true);
    filtered.forEach((f) =>
      !filteredArray.includes(f) ? filteredArray.push(f) : null
    );
  }

  if (filterObj.starred) {
    const filtered = entriesArray.filter((e) => e.isStarred === true);
    filtered.forEach((f) =>
      !filteredArray.includes(f) ? filteredArray.push(f) : null
    );
  }

  return filteredArray;
};

export default filterEntries;
