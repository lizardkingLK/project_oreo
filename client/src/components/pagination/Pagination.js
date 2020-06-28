import React from 'react'

const Pagination = (props) => {
    const { itemsPerPage, totalItems, paginate } = props;
    const pageNumbers = [];

    for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
        pageNumbers.push(i);
    }

    return (
        <nav>
            <ul className="pagination">
                {pageNumbers.map(number => (
                    <li key={number} className="list-item">
                        <span
                            onClick={() => paginate(number)}
                            className="badge badge-info"
                            style={{
                                cursor: "pointer",
                                padding: "1vh",
                                margin: "0 .5vh"
                            }}
                        >
                            {number}
                        </span>
                    </li>
                ))}
            </ul>
        </nav>
    )
}


export default Pagination;