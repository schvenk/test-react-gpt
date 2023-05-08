// SortableTable.tsx
import React, {useState, useCallback} from "react";
import "./SortableTable.less";

export type Column<T> = {
  name: string;
  key: keyof T;
  cellClassName?: string;
};

type CellRendererProps<T> = {
  row: T;
  column: Column<T>;
};

type SortableTableProps<T> = {
  columns: Column<T>[];
  data: T[];
  tableClassName?: string;
  rowClassName?: string;
  cellClassName?: string;
  cellRenderer?: (props: CellRendererProps<T>) => React.ReactNode;
  onChange?: (row: T, column: Column<T>) => void;
  onFocus?: (row: T, column: Column<T>) => void;
  onBlur?: (row: T, column: Column<T>) => void;
};

const SortableTable = <T,>({
  columns,
  data,
  tableClassName,
  rowClassName,
  cellClassName,
  cellRenderer,
  onChange,
  onFocus,
  onBlur,
}: SortableTableProps<T>): React.ReactElement => {
  const [sortColumn, setSortColumn] = useState<Column<T> | null>(null);
  const [sortAscending, setSortAscending] = useState(true);

  const handleHeaderClick = useCallback(
    (column: Column<T>) => {
      if (sortColumn && column.key === sortColumn.key) {
        setSortAscending(!sortAscending);
      } else {
        setSortColumn(column);
        setSortAscending(true);
      }
    },
    [sortColumn, sortAscending]
  );

  const renderCell = useCallback(
    ({row, column}: CellRendererProps<T>) => {
      if (cellRenderer) {
        return cellRenderer({row, column});
      }
      return row[column.key] as React.ReactNode;
    },
    [cellRenderer]
  );

  const sortedData = [...data].sort((a, b) => {
    if (!sortColumn) {
      return 0;
    }
    const aValue = a[sortColumn.key];
    const bValue = b[sortColumn.key];

    if (typeof aValue === "number" && typeof bValue === "number") {
      return sortAscending ? aValue - bValue : bValue - aValue;
    }

    if (typeof aValue === "string" && typeof bValue === "string") {
      return sortAscending ? aValue.localeCompare(bValue) : bValue.localeCompare(aValue);
    }

    return 0;
  });

  return (
    <table className={`table ${tableClassName}`}>
      <thead>
        <tr>
          {columns.map((column) => (
            <th key={column.key as string} onClick={() => handleHeaderClick(column)}>
              {column.name}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {sortedData.map((row) => (
          <tr key={(row as any).id} className={rowClassName}>
            {columns.map((column) => (
              <td
                key={column.key as string}
                data-label={column.name}
                className={column.cellClassName || cellClassName}
                onClick={() => onChange && onChange(row, column)}
                onFocus={() => onFocus && onFocus(row, column)}
                onBlur={() => onBlur && onBlur(row, column)}
              >
                {renderCell({row, column})}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default SortableTable;
