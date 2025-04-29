export const convertPaginationToSkipLimit = (
  current: number,
  pageSize: number
) => {
  return {
    skip: (current - 1) * pageSize,
    limit: pageSize,
  };
};
