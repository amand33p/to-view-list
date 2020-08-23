const getEntriesArray = (entries, search, tag) => {
  return search
    ? entries.filter(
        (e) =>
          e.title.toLowerCase().includes(search.toLowerCase()) ||
          e.description.toLowerCase().includes(search.toLowerCase()) ||
          e.tags.includes(search.toLowerCase())
      )
    : tag
    ? entries.filter((e) => e.tags.includes(tag.toLowerCase()))
    : entries;
};

export default getEntriesArray;
