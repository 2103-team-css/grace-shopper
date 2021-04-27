import React from 'react';

import { Pagination as Paginate } from '@material-ui/lab';

const Pagination = ({ pageCount, paginate, currentPage }) => {
  return (
    <Paginate
      count={pageCount}
      page={currentPage}
      onChange={paginate}
      size="large"
      variant="outlined"
      shape="rounded"
      color="primary"
    />
  );
};

export default Pagination;
