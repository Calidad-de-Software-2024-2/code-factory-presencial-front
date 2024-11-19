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

const FlightDurationFilter = ({ onChange }: { onChange: (duration: number) => void }) => {
  return (
    <Select onValueChange={(value) => onChange(parseInt(value))}>
      <SelectTrigger className="w-[250px] border-primary">
        <SelectValue placeholder="Select the flight duration" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Duration</SelectLabel>
          {[...Array(6)].map((_, i) => {
            const duration = (i + 1) * 2;
            return (
              <SelectItem key={duration} value={duration.toString()}>
                {duration + ` hours`}
              </SelectItem>
            );
          })}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
};

export default FlightDurationFilter;
