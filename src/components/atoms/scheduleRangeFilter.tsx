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
import scheduleRanges from "@/utils/const/scheduleRanges";

const ScheduleRangeFilter = () => {
  return (
    <Select>
      <SelectTrigger className="w-[250px] border-primary">
        <SelectValue placeholder="Select schedule range" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Schedule range</SelectLabel>
          {scheduleRanges.map((range) => (
            <SelectItem key={range.value} value={range.value}>
              {range.label}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default ScheduleRangeFilter;
