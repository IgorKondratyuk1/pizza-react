import React from 'react'
import ReactPaginate from 'react-paginate';
import s from './Pagination.module.scss';

const Pagination = ({ onPageChange }) => {
    return (
        <div className={s.root}>
            <ReactPaginate
                breakLabel="..."
                nextLabel=">"
                previousLabel="<"
                onPageChange={(e => { onPageChange(e.selected + 1) })}
                pageRangeDisplayed={5}
                pageCount={3}
                renderOnZeroPageCount={null}
            />
        </div>
    )
}

export default Pagination;