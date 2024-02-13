import React from "react";
import { useTable } from "react-table";

const DataTable = ({ columns, data, onCheckboxChange }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });

  const handleCheckboxChange = (row) => {
    onCheckboxChange(row.original);
  };

  const handleKeyDown = (event, row) => {
    if (event.key === "Enter") {
      handleCheckboxChange(row);
    }
  };

  return (
    <table {...getTableProps()} style={{ margin: "20px" }}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            <th>Select</th>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps()}>{column.render("Header")}</th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              <td>
                <input
                  type="checkbox"
                  checked={row.original.checked}
                  onChange={() => handleCheckboxChange(row)}
                  onKeyDown={(e) => handleKeyDown(e, row)}
                  tabIndex={0}
                  aria-label={`Select row ${row.id}`}
                />
              </td>
              {row.cells.map((cell, index) => (
                <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
              ))}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default DataTable;
