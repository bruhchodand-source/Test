import PropTypes from 'prop-types';
import { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronLeft, ChevronRight } from 'lucide-react';

export const TableVariant = {
  DEFAULT: 'default',
  GLASS: 'glass',
  STRIPED: 'striped',
};

const Table = ({
  data,
  columns,
  variant = TableVariant.GLASS,
  className = '',
  striped = true,
  hoverable = true,
}) => {
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);

  const handleSort = (columnId) => {
    if (sortColumn === columnId) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(columnId);
      setSortDirection('asc');
    }
  };

  const sortedData = useMemo(() => {
    if (!sortColumn) return data;

    const column = columns.find(col => col.id === sortColumn);
    if (!column || !column.sortable) return data;

    return [...data].sort((a, b) => {
      const aValue = column.accessor ? column.accessor(a) : a[sortColumn];
      const bValue = column.accessor ? column.accessor(b) : b[sortColumn];

      let comparison = 0;
      if (aValue < bValue) comparison = -1;
      if (aValue > bValue) comparison = 1;

      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection, columns]);

  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentPageData = sortedData.slice(startIndex, endIndex);

  const baseClasses = 'w-full rounded-lg overflow-hidden';
  
  const variantClasses = {
    [TableVariant.DEFAULT]: 'bg-dark-800 border border-dark-600',
    [TableVariant.GLASS]: 'glass-card',
    [TableVariant.STRIPED]: 'bg-dark-800 border border-dark-600',
  };

  const classes = [
    baseClasses,
    variantClasses[variant],
    className,
  ].join(' ');

  const getSortIcon = (columnId) => {
    if (sortColumn !== columnId) return null;
    return sortDirection === 'asc' ? 
      <ChevronUp className="w-4 h-4" /> : 
      <ChevronDown className="w-4 h-4" />;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(Number(e.target.value));
    setCurrentPage(1);
  };

  return (
    <div className="space-y-4">
      <div className={classes}>
        <table className="w-full">
          <thead className="bg-dark-700 border-b border-dark-600">
            <tr>
              {columns.map((column) => (
                <th
                  key={column.id}
                  className={`
                    px-4 py-3 text-left text-sm font-medium text-text-secondary
                    ${column.sortable ? 'cursor-pointer select-none hover:text-text-primary' : ''}
                    ${column.className || ''}
                  `}
                  onClick={() => column.sortable && handleSort(column.id)}
                >
                  <div className="flex items-center gap-2">
                    {column.header}
                    {column.sortable && (
                      <span className="text-text-muted">
                        {getSortIcon(column.id)}
                      </span>
                    )}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {currentPageData.length === 0 ? (
              <tr>
                <td 
                  colSpan={columns.length} 
                  className="px-4 py-8 text-center text-text-muted"
                >
                  <div className="flex flex-col items-center">
                    <div className="text-lg mb-2">No data available</div>
                    <div className="text-sm">No records found</div>
                  </div>
                </td>
              </tr>
            ) : (
              currentPageData.map((row, rowIndex) => (
                <tr
                  key={row.id || rowIndex}
                  className={`
                    border-b border-dark-800
                    ${hoverable ? 'hover:bg-dark-700/50' : ''}
                    ${striped && rowIndex % 2 === 1 ? 'bg-dark-800/50' : ''}
                  `}
                >
                  {columns.map((column) => (
                    <td
                      key={column.id}
                      className={`
                        px-4 py-3 text-sm text-text-primary
                        ${column.cellClassName || ''}
                      `}
                    >
                      {column.cell ? column.cell(row) : (
                        column.accessor ? column.accessor(row) : row[column.id]
                      )}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Controls */}
      {sortedData.length > itemsPerPage && (
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">Show</span>
            <select
              value={itemsPerPage}
              onChange={handleItemsPerPageChange}
              className="px-2 py-1 bg-dark-800 border border-dark-600 rounded text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={25}>25</option>
              <option value={50}>50</option>
              <option value={100}>100</option>
            </select>
            <span className="text-sm text-text-muted">entries</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-sm text-text-muted">
              Page {currentPage} of {totalPages}
            </span>
            
            <div className="flex items-center gap-1">
              <button
                onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-1 rounded hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let startPage = Math.max(1, currentPage - 2);
                let endPage = Math.min(totalPages, startPage + 4);
                
                if (endPage - startPage < 4) {
                  startPage = Math.max(1, endPage - 4);
                }
                
                const pageNum = startPage + i;
                if (pageNum > totalPages) return null;
                
                return (
                  <button
                    key={pageNum}
                    onClick={() => handlePageChange(pageNum)}
                    className={`
                      px-2 py-1 text-sm rounded transition-colors
                      ${currentPage === pageNum 
                        ? 'bg-primary text-white' 
                        : 'hover:bg-dark-700 text-text-primary'
                      }
                    `}
                  >
                    {pageNum}
                  </button>
                );
              })}
              
              <button
                onClick={() => handlePageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-1 rounded hover:bg-dark-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

Table.propTypes = {
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      header: PropTypes.node.isRequired,
      accessor: PropTypes.func,
      cell: PropTypes.func,
      sortable: PropTypes.bool,
      className: PropTypes.string,
      cellClassName: PropTypes.string,
    })
  ).isRequired,
  variant: PropTypes.oneOf(Object.values(TableVariant)),
  className: PropTypes.string,
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
};

// Table sub-components for building custom tables
export const TableRoot = ({ children, className = '', ...props }) => (
  <div className={`glass-card overflow-hidden ${className}`} {...props}>
    <table className="w-full">
      {children}
    </table>
  </div>
);

export const TableHead = ({ children, className = '' }) => (
  <thead className={`bg-dark-700 border-b border-dark-600 ${className}`}>
    {children}
  </thead>
);

export const TableBody = ({ children, className = '' }) => (
  <tbody className={className}>
    {children}
  </tbody>
);

export const TableRow = ({ children, className = '', striped = false, hoverable = true }) => (
  <tr className={`
    border-b border-dark-800
    ${hoverable ? 'hover:bg-dark-700/50' : ''}
    ${striped ? 'even:bg-dark-800/50' : ''}
    ${className}
  `}>
    {children}
  </tr>
);

export const TableHeader = ({ children, className = '', sortable = false, onClick }) => (
  <th
    className={`
      px-4 py-3 text-left text-sm font-medium text-text-secondary
      ${sortable ? 'cursor-pointer select-none hover:text-text-primary' : ''}
      ${className}
    `}
    onClick={onClick}
  >
    {children}
  </th>
);

export const TableCell = ({ children, className = '' }) => (
  <td className={`px-4 py-3 text-sm text-text-primary ${className}`}>
    {children}
  </td>
);

TableRoot.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableHead.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableBody.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

TableRow.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  striped: PropTypes.bool,
  hoverable: PropTypes.bool,
};

TableHeader.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  sortable: PropTypes.bool,
  onClick: PropTypes.func,
};

TableCell.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
};

export default Table;