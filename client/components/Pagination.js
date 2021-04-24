import React from 'react';

const Pagination = ( {productsPerPage, totalProducts, paginate } ) => {
    const pageNumbers = [];
    for( let i=1; i<Math.ceil(totalProducts / productsPerPage); i++)   {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination" >
                {pageNumbers.map((num) => (
                    <li key={num} className="page-item" >
                        <a onClick={() => paginate(num) } href="#" className="page-link" >{num}</a>
                    </li>
                )
                )}
            </ul>
        </nav>
    )

}

export default Pagination;