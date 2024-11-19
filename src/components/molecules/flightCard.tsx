import React from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { Text } from "../atoms/text";
import Flight from "@/utils/interface/flight";

const FlightCard: React.FC<{ flight: Flight }> = ({ flight }) => {
  return (
    <div className="w-3/4 mx-auto bg-white shadow-md rounded-lg px-6 py-6 sm:py-8 lg:px-8 grid grid-cols-2 transition-colors shadow-primary">
      <div className="grid grid-rows-1 items-center space-y-3">
        <div className="flex items-center font-bold space-x-3">
          <span>
            <Icon icon="ion:paper-plane" className="h-6 w-6 text-primary" />
          </span>
          <Text text={`Origin: ${flight.origin.city.nameCity}`} />
        </div>
        <div className="flex items-center font-bold space-x-3">
          <span>
            <Icon icon="ion:paper-plane" className="h-6 w-6 text-primary transform rotate-90" />
          </span>
          <Text text={`Destination: ${flight.destination.city.nameCity}`} />
        </div>
        <div className="flex items-center font-bold space-x-3">
          <span>
            <Icon icon="radix-icons:calendar" className="h-6 w-6 text-primary" />
          </span>
          <Text text={`Date and time: ${flight.departureDate}`} />
        </div>
        <div className="flex items-center font-bold space-x-3">
          <span>
            <Icon icon="tabler:building-airport" className="h-6 w-6 text-primary" />
          </span>
          <Text text={`Airport: ${flight.origin.nameAirport.replace(/ Airport$/, "")}`} />
        </div>
        <div className="flex items-center font-bold space-x-3">
          <span>
            <Icon icon="icon-park-outline:transfer" className="h-6 w-6 text-primary" />
          </span>
          <Text text={`Number of scales: ${flight.scaleAmount}`} />
        </div>
      </div>
      <div className="grid grid-rows-1 justify-end">
        <div className="flex justify-end font-bold">
          <Text text={`USD$ ${flight.price}`} />
        </div>
        <div className="flex mt-2">
          <Button>Reserve</Button>
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
