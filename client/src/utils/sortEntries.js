const sortEntries = (entries, sortBy) => {
  return entries.slice().sort((a, b) => {
    if (sortBy === 'oldest') {
      return new Date(a.createdAt) - new Date(b.createdAt);
    }

    if (sortBy === 'a-z') {
      return a.title < b.title ? -1 : a.title > b.title ? 1 : 0;
    }

    if (sortBy === 'z-a') {
      return a.title < b.title ? 1 : a.title > b.title ? -1 : 0;
    }

    return new Date(b.createdAt) - new Date(a.createdAt);
  });
};

export default sortEntries;
