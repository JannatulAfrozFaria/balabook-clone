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
import { IoIosSearch } from "react-icons/io";

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

  // const handleClear = () => {
  //   setSearchInput(""); // Clear search input
  //   setFilteredData(data); // Reset filtered data to the original data
  //   setCurrentPage(1); // Reset to the first page
  // };

  return (
    <div className="w-full overflow-x-auto    ">
       <div className="mb-6 bg-white p-6  border border-gray-300 rounded-lg ">
       <h2 className="text-[14px] font-semibold">Search</h2>
    <div className="w-full flex items-center mt-4 ">
      <div className="relative bg-[#F2F2F2] w-[92%] h-[50px]">
        <span className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400">
          <IoIosSearch size={20} />
        </span>
        <Input
          className="pl-10 h-full w-full rounded-md border border-gray-300 focus:border-blue-500 focus:outline-none"
          placeholder="Search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      <Button
        onClick={handleSearch}
        className="h-[50px] rounded-md bg-[#9ECE39] text-[16px] font-normal text-white ml-4 px-6"
      >
        Search
      </Button>
          {/* <h1
            onClick={handleClear} // Clear search input and data on click
            className="text-[16px] mt-4 ml-4 cursor-pointer"
          >
            Clear
          </h1> */}
        </div>
      </div>
      <div className="bg-white  border border-gray-300 rounded-xl">
        <table className="w-full p-6 ">
        <thead className="font-bold bg-[#F2F8E5]">
          <tr className="border-b ">
            {columns.map((column) => (
              <th
                key={column.id}
                className="p-4 border-b font-semibold text-left text-[24px] uppercase"
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
                  <td key={cell.id} className="p-4 border-b">
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
      </div>
      

      {/* Pagination controls */}
      {/* <div className="flex justify-center items-center gap-4 mt-4 ">
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
      </div> */}
    </div>
  );
}
