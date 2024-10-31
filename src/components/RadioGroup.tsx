import React from "react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const CustomRadioGroup = () => {
  return (
    <RadioGroup defaultValue="comfortable" className="flex items-center pt-8 gap-8">
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="default"
          id="r1"
          className="w-5 h-5 border-2 border-gray-300 rounded-none cursor-pointer transition-all checked:bg-red-400 checked:border-[#7D67FF] checked:border-4 focus:outline-none focus:ring-0"
        />
        <Label htmlFor="r1">Default</Label>
      </div>
      <div className="flex items-center space-x-2">
        <RadioGroupItem
          value="comfortable"
          id="r2"
          className="w-5 h-5 border-2 border-gray-300 rounded-none cursor-pointer transition-all checked:bg-[#7D67FF] checked:border-[#7D67FF] checked:border-4 focus:outline-none focus:ring-0"
        />
        <Label htmlFor="r2">Comfortable</Label>
      </div>
     
    </RadioGroup>
  );
};

export default CustomRadioGroup;
