import React from 'react'
import { BsFillArrowLeftCircleFill } from 'react-icons/bs';
import { BsFillArrowRightCircleFill } from 'react-icons/bs';
import '../Style/pagination.css'

const Pagination = (props)=>{
    const {page, totalPages, onLeftClick, onRightClick} = props
    return (
        <div className="pagination-container">
            <button onClick={onLeftClick}><div><BsFillArrowLeftCircleFill className="pagination-btn"/></div></button>
            <div>{page} de {totalPages}</div>
            <button onClick={onRightClick}><div><BsFillArrowRightCircleFill className="pagination-btn"/></div></button>
        </div>
    )
}
export default Pagination