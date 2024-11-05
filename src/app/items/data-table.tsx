"use client";

import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectGroup, SelectItem } from "@/components/ui/select"; // Adjust import based on your UI library

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function UserDataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");
  const [filteredData, setFilteredData] = useState(data); // Add filtered data state

  const itemsPerPage = 5; // Adjust based on your preference

  const table = useReactTable({
    data: filteredData, // Use filtered data here
    columns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onColumnFiltersChange: setColumnFilters,
    getFilteredRowModel: getFilteredRowModel(),
    state: {
      sorting,
      columnFilters,
    },
  });

  const paginatedData = table.getRowModel().rows.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSearch = () => {
    // Filter data based on search input
    const filtered = data.filter((item) =>
      JSON.stringify(item).toLowerCase().includes(searchInput.toLowerCase())
    );
    setFilteredData(filtered);
    setCurrentPage(1); // Reset to the first page
  };

  const handleClear = () => {
    setSearchInput(""); // Clear search input
    setFilteredData(data); // Reset filtered data to the original data
    setCurrentPage(1); // Reset to the first page
  };

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg p-4  ">
       <div className="mb-10">
        <h2 className="text-[14px] font-semibold">Search</h2>
        <div className="w-full flex items-center">
          <Input
            className="h-[60px] bg-white mt-4 w-[85%]"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)} // Update search input
          />
          <Button
            onClick={handleSearch} // Run search on click
            className="p-6 rounded-full bg-[#FFED37] text-[16px] text-normal text-black mt-4 ml-4"
          >
            Search
          </Button>
          <h1
            onClick={handleClear} // Clear search input and data on click
            className="text-[16px] mt-4 ml-4 cursor-pointer"
          >
            Clear
          </h1>
        </div>
      </div>
      <table className="w-full">
        <thead>
          <tr className="border-b">
            {columns.map((column) => (
              <th
                key={column.id}
                className="py-2 px-4 border-b font-semibold text-left text-[24px]"
              >
                {flexRender(column.header, {})}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className=" w-full border-b">
          {paginatedData.length ? (
            paginatedData.map((row, index) => (
              <tr key={index} className="hover:bg-gray-100">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4 border-b">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          ) : (
            <tr>
              <td
                colSpan={columns.length + 1}
                className="h-24 text-center"
              >
                No results.
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-4 ">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full disabled:opacity-50 flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left-to-line">
            <path d="M3 19V5" />
            <path d="m13 6-6 6 6 6" />
            <path d="M7 12h14" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="p-2 rounded-full disabled:opacity-50 flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-left">
            <path d="m12 19-7-7 7-7" />
            <path d="M19 12H5" />
          </svg>
        </button>

        <span className="text-lg font-semibold">{currentPage}</span>

        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          className="p-2 rounded-full disabled:opacity-50 flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right">
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, Math.ceil(data.length / itemsPerPage)))}
          disabled={currentPage === Math.ceil(data.length / itemsPerPage)}
          className="p-2 rounded-full disabled:opacity-50 flex"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-arrow-right-to-line">
            <path d="M17 12H3" />
            <path d="m11 18 6-6-6-6" />
            <path d="M21 5v14" />
          </svg>
        </button>
      </div>
    </div>
  );
}
