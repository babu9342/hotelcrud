function Pagination({page,total,onChange})
{
    return(
            <div className="pagination">

            <button onClick={()=>onChange(page-1)} disabled={page===1}>Previous</button>
            <span> {page} of {total}</span>
            <button onClick={()=>onChange(page+1)} disabled={page >= total || total===0}>Next</button>
            </div>
    )
}

export default Pagination;