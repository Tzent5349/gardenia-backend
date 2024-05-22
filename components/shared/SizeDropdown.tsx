// Import the necessary dependencies
import React, { useEffect, useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { getAllSize } from "@/lib/database/actions/sizes.action";
import { ISize } from "@/lib/database/models/size.model";

type DropdownProps = {
    value?: string[];
    onChangeHandler?: (selectedSizes: string[]) => void; // Function should accept an array of strings
  };

const SizeDropdown = ({ value, onChangeHandler }: DropdownProps) => {
  // State to store the list of sizes
  const [sizes, setSizes] = useState<ISize[]>([]);

  // Fetch the list of sizes from the database on component mount
  useEffect(() => {
    const fetchSizes = async () => {
      const sizeList = await getAllSize();
      if (sizeList) {
        setSizes(sizeList);
      }
    };
    fetchSizes();
  }, []);

  return (
// Ensure that the defaultValue prop matches the expected type (string[] | undefined)
<Select
  isMulti  // Enable multi-select functionality
  onValueChange={onChangeHandler} // Handle the change event
  defaultValue={value} // Set the default selected values
>
  <SelectTrigger>
    <SelectValue placeholder="Select Sizes" />
  </SelectTrigger>
  <SelectContent>
    {sizes.map((size) => (
      <SelectItem key={size._id} value={size.name}>
        {size.name}
      </SelectItem>
    ))}
  </SelectContent>
</Select>

  );
};

export default SizeDropdown;
