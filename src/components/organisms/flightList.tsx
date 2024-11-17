import { useState } from "react";
import { useRouter } from "next/router";
import FlightCard from "../molecules/flightCard";
import FilterCard from "../molecules/filterCard";
import Flight from "@/utils/interface/flight";
import { useQuery } from "@apollo/client";
import { SEARCH_FLIGHTS, SEARCH_ROUND_TRIP } from "@/utils/gql/queries/flights";

const FlightList = () => {
  const router = useRouter();
  const { originName, destinationName, arrivalDate, departureDate, passengerAmount, tripType } =
    router.query;

  const [selectedScales, setSelectedScales] = useState<number | null>(null);

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

  if (tripType !== "departure" && data?.searchFlights) {
    const returnFlights = data.searchFlights.map((flight: Flight) => ({
      ...flight,
      flightId: `${flight.flightId}-return`,
      origin: flight.destination,
      destination: flight.origin,
      departureDate: flight.arrivalDate,
      price: flight.price * 1.2,
    }));

    filteredFlights = data.searchFlights.filter((flight: Flight) => {
      return selectedScales !== null ? flight.scales === selectedScales : true;
    });

    filteredFlights = [
      ...filteredFlights,
      ...returnFlights.filter((flight: Flight) => {
        return selectedScales !== null ? flight.scales === selectedScales : true;
      }),
    ];
  } else if (tripType === "departure" && data?.searchFlights) {
    filteredFlights =
      data?.searchFlights.filter((flight: Flight) => {
        return selectedScales !== null ? flight.scales === selectedScales : true;
      }) || [];
  }

  return (
    <div className="flex flex-col justify-center bg-accent h-screen">
      <div className="flex flex-col">
        <div className="mb-2">
          <FilterCard onScalesChange={setSelectedScales} />
        </div>
        <div className="grid grid-cols-1 gap-6 overflow-y-auto max-h-[90vh] pb-2 mb-2">
          {loading ? (
            <p>Loading flights...</p>
          ) : error ? (
            <p>Error loading flights: {error.message}</p>
          ) : filteredFlights.length > 0 ? (
            filteredFlights.map((flight: Flight) => (
              <FlightCard
                key={flight.flightId}
                flight={{
                  flightId: flight.flightId,
                  flightNumber: flight.flightNumber,
                  departureDate: flight.departureDate,
                  origin: flight.origin,
                  destination: flight.destination,
                  arrivalDate: flight.arrivalDate,
                  scales: flight.scales,
                  price: flight.price,
                  taxPercentage: flight.taxPercentage,
                  surchargePercentage: flight.surchargePercentage,
                  isCanceled: flight.isCanceled,
                  sellSeats: flight.sellSeats,
                  plane: flight.plane,
                }}
              />
            ))
          ) : (
            <>
              {alert("No flights found for the given criteria.")}
              <p className="w-3/4 mx-auto">No flights found for the given criteria.</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FlightList;
