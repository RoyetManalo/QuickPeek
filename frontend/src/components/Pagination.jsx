function Pagination({ personPerPage, totalPerson, paginate }) {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalPerson / personPerPage); i++) {
    pageNumbers.push(i);
  }
  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((page) => (
          <li key={page} className="page-item" onClick={() => paginate(page)}>
            <a href="#" className="page-link">
              {page}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}

export default Pagination;
