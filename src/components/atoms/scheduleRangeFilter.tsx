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

const ScheduleRangeFilter = ({
  onChange,
}: {
  onChange: (range: { start: string; end: string } | null) => void;
}) => {
  return (
    <Select
      onValueChange={(value) => {
        const range = scheduleRanges.find((range) => range.value === value);
        onChange(range ? { start: range.start, end: range.end } : null);
      }}
    >
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
