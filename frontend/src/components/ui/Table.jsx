import React, { useState, useMemo } from 'react';
import Badge from './Badge';
import './Table.css';

/**
 * Componente Table Reutilizável
 * 
 * @param {Array} columns - [{ key: 'nome', label: 'Nome', sortable: true, width: '200px' }]
 * @param {Array} data - Dados da tabela
 * @param {Object} options - { paginate: true, pageSize: 10, hoverable: true }
 */
const Table = ({
  columns = [],
  data = [],
  onRowClick = () => {},
  striped = true,
  hoverable = true,
  paginate = true,
  pageSize = 10,
  searchable = true,
  className = '',
  actions = null,
  ...props
}) => {
  const [sortConfig, setSortConfig] = useState({ key: null, direction: 'asc' });
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');

  // Filtrar dados
  const filteredData = useMemo(() => {
    if (!searchQuery) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(searchQuery.toLowerCase())
      )
    );
  }, [data, searchQuery]);

  // Ordenar dados
  const sortedData = useMemo(() => {
    if (!sortConfig.key) return filteredData;

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortConfig.key];
      const bValue = b[sortConfig.key];

      if (aValue < bValue) {
        return sortConfig.direction === 'asc' ? -1 : 1;
      }
      if (aValue > bValue) {
        return sortConfig.direction === 'asc' ? 1 : -1;
      }
      return 0;
    });

    return sorted;
  }, [filteredData, sortConfig]);

  // Paginar dados
  const paginatedData = useMemo(() => {
    if (!paginate) return sortedData;
    const startIndex = (currentPage - 1) * pageSize;
    return sortedData.slice(startIndex, startIndex + pageSize);
  }, [sortedData, currentPage, pageSize, paginate]);

  const totalPages = Math.ceil(sortedData.length / pageSize);

  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction:
        prev.key === key && prev.direction === 'asc' ? 'desc' : 'asc',
    }));
    setCurrentPage(1);
  };

  const handleSearch = (query) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const tableClasses = [
    'table-custom',
    striped && 'table-striped',
    hoverable && 'table-hoverable',
    className,
  ]
    .filter(Boolean)
    .join(' ');

  return (
    <div className="table-container">
      {/* Search */}
      {searchable && (
        <div className="table-search">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input
            type="text"
            placeholder="Buscar..."
            value={searchQuery}
            onChange={(e) => handleSearch(e.target.value)}
            className="table-search-input"
          />
        </div>
      )}

      {/* Table */}
      <div className="table-wrapper">
        <table className={tableClasses} {...props}>
          <thead>
            <tr>
              {columns.map((column) => (
                <th
                  key={column.key}
                  style={{ width: column.width }}
                  onClick={() => column.sortable && handleSort(column.key)}
                  className={column.sortable ? 'table-sortable' : ''}
                  title={column.sortable ? 'Clique para ordenar' : ''}
                >
                  <div className="table-header-content">
                    <span>{column.label}</span>
                    {column.sortable && (
                      <span className="table-sort-icon">
                        {sortConfig.key === column.key && (
                          <svg
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                          >
                            {sortConfig.direction === 'asc' ? (
                              <polyline points="18 15 12 9 6 15"></polyline>
                            ) : (
                              <polyline points="18 9 12 15 6 9"></polyline>
                            )}
                          </svg>
                        )}
                      </span>
                    )}
                  </div>
                </th>
              ))}
              {actions && <th style={{ width: '80px' }}>Ações</th>}
            </tr>
          </thead>
          <tbody>
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr key={index} onClick={() => onRowClick(row)}>
                  {columns.map((column) => (
                    <td key={column.key}>
                      {column.render
                        ? column.render(row[column.key], row)
                        : row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td>
                      <div className="table-actions">
                        {actions(row)}
                      </div>
                    </td>
                  )}
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={columns.length + (actions ? 1 : 0)}
                  className="table-empty"
                >
                  Nenhum dado encontrado
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {paginate && totalPages > 1 && (
        <div className="table-pagination">
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(1)}
            disabled={currentPage === 1}
            title="Primeira página"
          >
            ‹‹
          </button>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage((prev) => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
            title="Página anterior"
          >
            ‹
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1)
            .slice(
              Math.max(0, currentPage - 2),
              Math.min(totalPages, currentPage + 2)
            )
            .map((page) => (
              <button
                key={page}
                className={`pagination-button ${
                  currentPage === page ? 'active' : ''
                }`}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </button>
            ))}

          <button
            className="pagination-button"
            onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
            title="Próxima página"
          >
            ›
          </button>
          <button
            className="pagination-button"
            onClick={() => setCurrentPage(totalPages)}
            disabled={currentPage === totalPages}
            title="Última página"
          >
            ››
          </button>

          <span className="pagination-info">
            Página {currentPage} de {totalPages} ({sortedData.length} itens)
          </span>
        </div>
      )}
    </div>
  );
};

export default Table;
