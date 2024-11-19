import React, { useState } from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import ScalesNumberFilter from "../atoms/scalesNumberFilter";
import { Text } from "../atoms/text";
import PriceRangeFilter from "../atoms/priceRangeFilter";
import DateRangeFilter from "../atoms/dateRangeFilter";
import { DateRange } from "react-day-picker";
import ScheduleRangeFilter from "../atoms/scheduleRangeFilter";
import FlightDurationFilter from "../atoms/flightDurationFilter";

const FilterCard = ({
  onScalesChange,
  onPriceRangeChange,
  onDateRangeChange,
  onScheduleRangeChange,
  onDurationChange,
}: {
  onScalesChange: (scales: number | null) => void;
  onPriceRangeChange: (range: { min: number; max: number } | null) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
  onScheduleRangeChange: (range: { start: string; end: string } | null) => void;
  onDurationChange: (duration: number | null) => void;
}) => {
  const [tempScales, setTempScales] = useState<number | null>(null);
  const [tempPriceRange, setTempPriceRange] = useState<{ min: number; max: number } | null>(null);
  const [tempDateRange, setTempDateRange] = useState<DateRange | undefined>(undefined);
  const [tempScheduleRange, setTempScheduleRange] = useState<{ start: string; end: string } | null>(
    null
  );
  const [tempDuration, setTempDuration] = useState<number | null>(null);

  const applyFilters = () => {
    onScalesChange(tempScales);
    onPriceRangeChange(tempPriceRange);
    onDateRangeChange(tempDateRange);
    onScheduleRangeChange(tempScheduleRange);
    onDurationChange(tempDuration);
  };

  return (
    <div className="bg-accent w-3/4 mx-auto">
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="ghost">
            <Icon icon="stash:filter-duotone" className="h-6 w-6 text-primary mr-1" />
            <Text text="Filters" />
          </Button>
        </DialogTrigger>
        <DialogContent className="w-[300px]">
          <div className="flex flex-col justify-center items-center space-y-2">
            <h1 className="text-2xl font-bold self-start">Filters</h1>
            <DateRangeFilter onChange={setTempDateRange} />
            <FlightDurationFilter onChange={setTempDuration} />
            <PriceRangeFilter onChange={setTempPriceRange} />
            <ScalesNumberFilter onChange={setTempScales} />
            <ScheduleRangeFilter onChange={setTempScheduleRange} />
            <div className="self-end">
              <DialogClose asChild>
                <Button variant="default" onClick={applyFilters}>
                  Apply
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterCard;
