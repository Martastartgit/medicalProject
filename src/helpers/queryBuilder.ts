export const queryBuilder = (query: any):
    {skip: number, limit: number, page: number, sort: any, filters: any} => {

  const { limit = 20, page = 1, sortBy = 'createdAt', orderBy = 'asc', ...filters } = query;
  const skip = (page - 1) * limit;
  const order = orderBy === 'asc' ? 1 : -1;
  const sort = { [sortBy]: order };

  return {
    skip,
    limit,
    page,
    sort,
    filters
  };
};
