import React from 'react';

// PaginationItem component
const PaginationItem = ({ href, children, isActive }) => {
  const defaultClasses = "flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white";
  const activeClasses = "flex items-center justify-center px-3 h-8 text-blue-600 border border-gray-300 bg-blue-50 hover:bg-blue-100 hover:text-blue-700 dark:border-gray-700 dark:bg-gray-700 dark:text-white";
  
  return (
    <li>
      <a href={href} className={isActive ? activeClasses : defaultClasses}>
        {children}
      </a>
    </li>
  );
};

// Pagination component
const Pagination = () => {
  return (
    <div>
      {/* Pagination with text-sm */}
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-sm">
          <PaginationItem href="#" isActive={false}>Previous</PaginationItem>
          <PaginationItem href="#" isActive={false}>1</PaginationItem>
          <PaginationItem href="#" isActive={false}>2</PaginationItem>
          <PaginationItem href="#" isActive={true}>3</PaginationItem>
          <PaginationItem href="#" isActive={false}>4</PaginationItem>
          <PaginationItem href="#" isActive={false}>5</PaginationItem>
          <PaginationItem href="#" isActive={false}>Next</PaginationItem>
        </ul>
      </nav>
      
      {/* Pagination with text-base */}
      <nav aria-label="Page navigation example">
        <ul className="inline-flex -space-x-px text-base h-10">
          <PaginationItem href="#" isActive={false}>Previous</PaginationItem>
          <PaginationItem href="#" isActive={false}>1</PaginationItem>
          <PaginationItem href="#" isActive={false}>2</PaginationItem>
          <PaginationItem href="#" isActive={true}>3</PaginationItem>
          <PaginationItem href="#" isActive={false}>4</PaginationItem>
          <PaginationItem href="#" isActive={false}>5</PaginationItem>
          <PaginationItem href="#" isActive={false}>Next</PaginationItem>
        </ul>
      </nav>
    </div>
  );
};

export default Pagination;
