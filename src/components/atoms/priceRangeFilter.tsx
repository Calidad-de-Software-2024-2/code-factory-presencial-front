import * as React from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import priceRanges from "@/utils/const/priceRange";

const PriceRangeFilter = ({
  onChange,
}: {
  onChange: (range: { min: number; max: number } | null) => void;
}) => {
  return (
    <Select
      onValueChange={(value) => {
        const range = priceRanges.find((range) => range.value === value);
        onChange(range ? { min: range.min, max: range.max } : null);
      }}
    >
      <SelectTrigger className="w-[250px] border-primary">
        <SelectValue placeholder="Select price range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Price Range</SelectLabel>
          {priceRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default PriceRangeFilter;
