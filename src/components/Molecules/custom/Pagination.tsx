import "../../../styles/components/Molecules/custom/Pagination.scss";

import React from "react";

import Indicator from "../../Atoms/custom/Indicator";
import Icon from "../../Atoms/Icon";

type PaginationProps = {
  totalElements: number;
  paginate: (_pnber: number) => void;
  currentPage: number;
  rowsPerPage?: number;
  totalPages?: number;
};
const Pagination = ({
  totalPages = 1,
  paginate,
  currentPage = 0,
  totalElements,
}: PaginationProps) => {
  let pageNumbers = [1];

  for (let i = 1; i < totalPages; i++) {
    pageNumbers.push(i + 1);
  }

  const getPageNumbers = () => {
    if (totalPages <= 5) return pageNumbers;
    if (currentPage <= 2) return pageNumbers.slice(0, 5);
    if (currentPage >= totalPages - 2) return pageNumbers.slice(totalPages - 5);
    return pageNumbers.slice(currentPage - 2, currentPage + 3);
  };

  return totalPages >= 1 ? (
    <div className="py-2 d-flex justify-content-between ">
      <div className="px-0 d-flex justify-content-start align-items-center rounded py-1">
        <div className="mr-2">
          <button
            className="btn btn-sm"
            disabled={currentPage === 0}
            onClick={() => {
              paginate(currentPage - 1);
            }}
          >
            <Icon name="arrow-left" size={16} />
          </button>
        </div>
        {getPageNumbers().map((number) => (
          <div className="pr-1" key={number}>
            <Indicator
              isCircular={false}
              isActive={currentPage + 1 === number}
              handleClick={() => paginate(number - 1)}
            >
              {number}
            </Indicator>
          </div>
        ))}
        <div className="mr-2">
          <button
            disabled={currentPage === totalPages - 1}
            className="btn btn-sm"
            onClick={() => {
              paginate(currentPage + 1);
            }}
          >
            <Icon name="arrow-right2" size={16} />
          </button>
        </div>
      </div>
      <div className="">
        <p className="pagination-txt mb-0">
          Puslapis {currentPage + 1} iš {totalPages} / Viso {totalElements}{" "}
          rezultatų
        </p>
      </div>
    </div>
  ) : (
    <></>
  );
};
export default Pagination;
