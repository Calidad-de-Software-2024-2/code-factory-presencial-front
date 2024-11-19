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

const ScalesNumberFilter = ({ onChange }: { onChange: (scales: number) => void }) => {
  return (
    <Select onValueChange={(value) => onChange(parseInt(value))}>
      <SelectTrigger className="w-[250px] border-primary">
        <SelectValue placeholder="Select number of scales" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Scales</SelectLabel>
          {[...Array(3)].map((_, i) => (
            <SelectItem key={i} value={i.toString()}>
              {i}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ScalesNumberFilter;
