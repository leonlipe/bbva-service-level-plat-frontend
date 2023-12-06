export const queryFilter = ( filters, pageSize, pageNumber ) => {
  let query = {};
  filters.forEach((item) => {
    query[item.name]=  item.value;
  })
  query.pageSize = pageSize;
  query.pageNumber = pageNumber;
  return query;
};

