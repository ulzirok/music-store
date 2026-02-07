import { Pagination } from "react-bootstrap";

export default function PaginationBar({ page, onPageChange }) {
  return (
    <div className="d-flex justify-content-center my-4">
      <Pagination>
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={page === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(page - 1)}
          disabled={page === 1}
        />
        {page > 3 && <Pagination.Ellipsis disabled />}
        {page > 1 && (
          <Pagination.Item onClick={() => onPageChange(page - 1)}>
            {page - 1}
          </Pagination.Item>
        )}
        <Pagination.Item active>{page}</Pagination.Item>
        <Pagination.Item onClick={() => onPageChange(page + 1)}>
          {page + 1}
        </Pagination.Item>
        <Pagination.Ellipsis disabled />
        <Pagination.Next onClick={() => onPageChange(page + 1)} />
      </Pagination>
    </div>
  );
}
