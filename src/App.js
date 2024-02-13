import React, { useState, useEffect } from "react";
import DataTable from "./components/DataTable";
import BarChart from "./components/BarChart";
import SearchBar from "./components/SearchBar";
import Pagination from "./components/Pagination";
import "./App.css";

const App = () => {
  const [data, setData] = useState([]);
  const [selectedRows, setSelectedRows] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const selectedRows = data.filter((row) => row.checked);
    setSelectedRows(selectedRows);
  }, [data]);

  const fetchData = async () => {
    try {
      const response = await fetch("/dummyData.json");
      const dummyData = (await response.json()).map((item, index) => ({
        ...item,
        checked: index < 5,
      }));

      setData(dummyData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const columns = [
    { Header: "ID", accessor: "id" },
    { Header: "title", accessor: "title" },
    { Header: "stock", accessor: "stock" },
    { Header: "price", accessor: "price" },
  ];

  const filteredData = data.filter((row) =>
    Object.values(row).some(
      (value) =>
        typeof value === "string" &&
        value.toLowerCase().includes(searchTerm.toLowerCase())
    )
  );

  const paginatedData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const handleCheckboxChange = (selectedRow) => {
    const updatedRows = [...data];
    const index = updatedRows.findIndex((row) => row.id === selectedRow.id);
    updatedRows[index].checked = !updatedRows[index].checked;
    setData(updatedRows);

    const selectedRows = updatedRows.filter((row) => row.checked);
    setSelectedRows(selectedRows);
  };

  const handleSearchChange = (value) => {
    setSearchTerm(value);
    setCurrentPage(1);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container" role="main" aria-live="polite">
      {data.length > 0 ? (
        <>
          <div className="left-side">
            <h1>Data Table</h1>
            <SearchBar onSearchChange={handleSearchChange} />
            <DataTable
              columns={columns}
              data={paginatedData}
              onCheckboxChange={handleCheckboxChange}
            />
            <Pagination
              totalPages={totalPages}
              currentPage={currentPage}
              onPageChange={handlePageChange}
            />
          </div>
          <div className="right-side">
            <h1>Bar Chart</h1>
            <BarChart data={selectedRows} />
          </div>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
