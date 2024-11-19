import React from "react";
import { Dialog, DialogClose, DialogContent, DialogTrigger } from "../ui/dialog";
import { Icon } from "@iconify/react";
import { Button } from "../ui/button";
import ScalesNumberFilter from "../atoms/scalesNumberFilter";
import { Text } from "../atoms/text";
import PriceRangeFilter from "../atoms/priceRangeFilter";
import DateRangeFilter from "../atoms/dateRangeFilter";
import { DateRange } from "react-day-picker";

const FilterCard = ({
  onScalesChange,
  onPriceRangeChange,
  onDateRangeChange,
}: {
  onScalesChange: (scales: number | null) => void;
  onPriceRangeChange: (range: { min: number; max: number } | null) => void;
  onDateRangeChange: (range: DateRange | undefined) => void;
}) => {
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
            <DateRangeFilter onChange={onDateRangeChange} />
            <PriceRangeFilter onChange={onPriceRangeChange} />
            <ScalesNumberFilter onChange={onScalesChange} />
            <div className="self-end">
              <DialogClose asChild>
                <Button variant="default">Apply</Button>
              </DialogClose>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default FilterCard;
