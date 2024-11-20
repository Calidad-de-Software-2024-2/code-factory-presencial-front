import { useState } from "react";
import { useRouter } from "next/router";
import FlightCard from "../molecules/flightCard";
import FilterCard from "../molecules/filterCard";
import Flight from "@/utils/interface/flight";
import { useQuery } from "@apollo/client";
import { SEARCH_FLIGHTS, SEARCH_ROUND_TRIP } from "@/utils/gql/queries/flights";
import { DateRange } from "react-day-picker";
import { Button } from "../ui/button";

const FlightList = () => {
  const router = useRouter();
  const { originName, destinationName, arrivalDate, departureDate, passengerAmount, tripType } =
    router.query;

  const [selectedScales, setSelectedScales] = useState<number | null>(null);
  const [selectedPriceRange, setSelectedPriceRange] = useState<{ min: number; max: number } | null>(
    null
  );
  const [selectedDateRange, setSelectedDateRange] = useState<DateRange | undefined>(undefined);
  const [selectedScheduleRange, setSelectedScheduleRange] = useState<{
    start: string;
    end: string;
  } | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<number | null>(null);

  const queryVariables = {
    originName: originName as string,
    destinationName: destinationName as string,
    arrivalDate: arrivalDate as string,
    departureDate: departureDate ? (departureDate as string) : "",
    passengerAmount: Number(passengerAmount),
  };

  const queryToUse = tripType === "departure" ? SEARCH_FLIGHTS : SEARCH_ROUND_TRIP;

  const { data, loading, error } = useQuery(queryToUse, {
    variables: queryVariables,
    skip: !originName || !destinationName || !arrivalDate || !passengerAmount,
  });

  let filteredFlights: Flight[] = [];

  filteredFlights =
    data?.searchFlights.filter((flight: Flight) => {
      const matchesScales = selectedScales !== null ? flight.scaleAmount === selectedScales : true;

      const matchesPrice =
        selectedPriceRange !== null
          ? flight.price >= selectedPriceRange.min && flight.price <= selectedPriceRange.max
          : true;

      const matchesDate = selectedDateRange?.from
        ? new Date(flight.departureDate) >= selectedDateRange.from &&
          new Date(flight.departureDate) <= (selectedDateRange.to || selectedDateRange.from)
        : true;

      const matchesSchedule =
        selectedScheduleRange !== null
          ? new Date(flight.departureDate).getHours() >= parseInt(selectedScheduleRange.start) &&
            new Date(flight.departureDate).getHours() < parseInt(selectedScheduleRange.end)
          : true;

      const flightDuration =
        new Date(flight.arrivalDate).getHours() - new Date(flight.departureDate).getHours();

      const matchesDuration = selectedDuration !== null ? flightDuration > selectedDuration : true;

      return matchesScales && matchesPrice && matchesDate && matchesSchedule && matchesDuration;
    }) || [];

  return (
    <div className="flex flex-col justify-center bg-accent h-screen">
      <div className="flex flex-col">
        <div className="mb-2">
          <div className="flex justify-between w-3/4 mx-auto">
            <FilterCard
              onScalesChange={setSelectedScales}
              onPriceRangeChange={setSelectedPriceRange}
              onDateRangeChange={setSelectedDateRange}
              onScheduleRangeChange={setSelectedScheduleRange}
              onDurationChange={setSelectedDuration}
            />
            <Button variant="default" onClick={() => router.push("/")}>
              Back to Search
            </Button>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 overflow-y-auto max-h-[90vh] pb-2 mb-2">
          {loading ? (
            <p className="w-3/4 mx-auto">Loading flights...</p>
          ) : error ? (
            <p className="w-3/4 mx-auto">No flights found for the given criteria.</p>
          ) : filteredFlights.length > 0 ? (
            filteredFlights.map((flight: Flight) => (
              <FlightCard key={flight.flightId} flight={flight} />
            ))
          ) : (
            <>
              <p className="w-3/4 mx-auto">No flights found for the given criteria.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
