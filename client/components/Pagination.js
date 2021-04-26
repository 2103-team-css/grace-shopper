import React from 'react';

import { Pagination as Paginate } from '@material-ui/lab';

const Pagination = ({ productsPerPage, totalProducts, paginate }) => {
  const pageCount = Math.ceil(totalProducts / productsPerPage);
  return (
    <Paginate
      count={pageCount}
      defaultPage={1}
      onChange={paginate}
      size="large"
      variant="outlined"
      shape="rounded"
      color="primary"
    />
  );
};

export default Pagination;
