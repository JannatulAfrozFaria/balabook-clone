import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";

const data = [
  { description: "Product A", type: "Electronic", price: "$100", null: "" },
  { description: "Product B", type: "Apparel", price: "$50", null: "" },
  { description: "Product C", type: "Accessory", price: "$25", null: "" },
  { description: "Product D", type: "Furniture", price: "$200", null: "" },
  { description: "Product E", type: "Home", price: "$75", null: "" },
  { description: "Product F", type: "Toy", price: "$15", null: "" },
];

const ItemList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 3;
  const totalPages = Math.ceil(data.length / itemsPerPage);

  const handlePrevious = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="w-full overflow-x-auto bg-white rounded-lg p-4">
      <table className="min-w-full bg-white border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b font-semibold text-left text-[24px]">Description</th>
            <th className="py-2 px-4 border-b font-semibold text-left text-[24px]">Type</th>
            <th className="py-2 px-4 border-b font-semibold text-left text-[24px]">Price</th>
            <th className="py-2 px-4 border-b font-semibold text-left"></th>
          </tr>
        </thead>
        <tbody>
          {paginatedData.map((item, index) => (
            <tr key={index} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b">{item.description}</td>
              <td className="py-2 px-4 border-b">{item.type}</td>
              <td className="py-2 px-4 border-b">{item.price}</td>
              <td className="py-2 px-4 border-b">
                <Select>
                  <SelectTrigger className="w-[140px] h-[40px] border-2 border-black rounded-full text-[16px] px-4 py-2 hover:bg-black hover:text-white">
                    <SelectValue placeholder="Action" />
                  </SelectTrigger>
                  <SelectContent className="border-2 border-black rounded-xl">
                    <SelectGroup>
                      <SelectItem value="edit" className="text-[16px]">Edit</SelectItem>
                      <SelectItem value="delete" className="text-[16px]">Delete</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination controls */}
      <div className="flex justify-center items-center gap-4 mt-4">
        <button
          onClick={handlePrevious}
          disabled={currentPage === 1}
          className="p-2 rounded-full disabled:opacity-50 flex"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left-to-line"><path d="M3 19V5"/><path d="m13 6-6 6 6 6"/><path d="M7 12h14"/></svg>
         
        </button>
        <button
          onClick={handlePrevious}
          disabled={currentPage === 2}
          className="p-2 rounded-full disabled:opacity-50 flex"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-left"><path d="m12 19-7-7 7-7"/><path d="M19 12H5"/></svg>
         
        </button>

        <span className="text-lg font-semibold">{currentPage}</span>

        
        <button
          onClick={handleNext}
          disabled={currentPage === 3}
          className="p-2 rounded-full disabled:opacity-50 flex"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right"><path d="M5 12h14"/><path d="m12 5 7 7-7 7"/></svg>
         
        </button>
        <button
          onClick={handleNext}
          disabled={currentPage === 4}
          className="p-2 rounded-full disabled:opacity-50 flex"
        >
         <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-arrow-right-to-line"><path d="M17 12H3"/><path d="m11 18 6-6-6-6"/><path d="M21 5v14"/></svg>
         
        </button>

      </div>
    </div>
  );
};

export default ItemList;
