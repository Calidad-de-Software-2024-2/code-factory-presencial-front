import React, { useState } from "react";
import { Text, Title } from "../atoms/text";
import City from "../atoms/city";
import citiesList from "@/utils/const/citiesList";
import { Icon } from "@iconify/react";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";
import { DepartureDate, RoundTripDate } from "../atoms/date";
import PassengerNumber from "../atoms/passengerNumber";
import { Button } from "../ui/button";
import SearchParams from "@/utils/interface/search";
import { format } from "date-fns";

const SearchCard: React.FC<{ onSearch: (searchParams: SearchParams) => void }> = ({ onSearch }) => {
  const [tripType, setTripType] = useState("departure");

  const [error, setError] = useState({
    originName: false,
    destinationName: false,
    passengerAmount: false,
    dates: false,
  });

  const [searchParams, setSearchParams] = useState<SearchParams>({
    originName: "",
    destinationName: "",
    arrivalDate: "",
    departureDate: "",
    passengerAmount: 0,
    tripType: tripType,
  });

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    const originNameIsEmpty = searchParams.originName === "";
    const destinationNameIsEmpty = searchParams.destinationName === "";
    const passengerAmountIsEmpty = searchParams.passengerAmount === 0;
    const arrivalDateIsEmpty = searchParams.arrivalDate === "";
    const departureDateIsEmpty = tripType === "roundtrip" && searchParams.departureDate === "";

    if (
      originNameIsEmpty ||
      destinationNameIsEmpty ||
      passengerAmountIsEmpty ||
      arrivalDateIsEmpty ||
      (tripType === "roundtrip" && departureDateIsEmpty)
    ) {
      setError({
        originName: originNameIsEmpty,
        destinationName: destinationNameIsEmpty,
        passengerAmount: passengerAmountIsEmpty,
        dates: arrivalDateIsEmpty || (tripType === "roundtrip" && departureDateIsEmpty),
      });
      return;
    }

    onSearch({
      ...searchParams,
      tripType,
      arrivalDate: searchParams.arrivalDate ? format(searchParams.arrivalDate, "yyyy-MM-dd") : "",
      departureDate: searchParams.departureDate
        ? format(searchParams.departureDate, "yyyy-MM-dd")
        : "",
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-accent">
      <div className="bg-white shadow-md shadow-primary rounded-lg px-6 py-6 sm:py-8 lg:px-8 w-3/4">
        <div className="text-left">
          <Title title="Flight search" />
          <Text text="Find the flight you need" />
        </div>
        <form className="mt-6 sm:mt-8" onSubmit={handleSearch} autoComplete="off">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="originName" className="text-sm font-semibold leading-6">
                Origin city
              </Label>
              <div className="relative py-2">
                <City
                  cities={citiesList}
                  onSelectCity={(value) => {
                    setSearchParams({ ...searchParams, originName: value });
                    setError({ ...error, originName: false });
                  }}
                />
                <span className="absolute inset-y-0 right-2 flex items-center pr-1.5">
                  <Icon icon="bx:map" className="text-primary h-5 w-5" />
                </span>
              </div>
              {error.originName && <p className="text-red-600 text-sm">Origin city is required.</p>}
            </div>
            <div>
              <Label htmlFor="destinationName" className="text-sm font-semibold leading-6">
                Destination city
              </Label>
              <div className="relative py-2">
                <City
                  cities={citiesList}
                  onSelectCity={(value) => {
                    setSearchParams({ ...searchParams, destinationName: value });
                    setError({ ...error, destinationName: false });
                  }}
                />
                <span className="absolute inset-y-0 right-2 flex items-center pr-1.5">
                  <Icon icon="bx:map" className="text-primary h-5 w-5" />
                </span>
              </div>
              {error.destinationName && (
                <p className="text-red-600 text-sm">Destination city is required.</p>
              )}
            </div>
          </div>
          <div className="py-2">
            <RadioGroup defaultValue={tripType} onValueChange={(value) => setTripType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="departure" id="r1" />
                <Label htmlFor="r1">Departure</Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roundtrip" id="r2" />
                <Label htmlFor="r2">Roundtrip</Label>
              </div>
            </RadioGroup>
          </div>
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="originName" className="text-sm font-semibold leading-6">
                Date
              </Label>
              <div className="relative py-2">
                {tripType === "departure" ? (
                  <DepartureDate
                    onDateSelect={(date) =>
                      setSearchParams({ ...searchParams, arrivalDate: date?.toISOString() || "" })
                    }
                  />
                ) : (
                  <RoundTripDate
                    onDepartureSelect={(date) =>
                      setSearchParams({ ...searchParams, arrivalDate: date?.toISOString() || "" })
                    }
                    onReturnSelect={(date) =>
                      setSearchParams({ ...searchParams, departureDate: date?.toISOString() || "" })
                    }
                  />
                )}
              </div>
              {error.dates && (
                <p className="text-red-600 text-sm">
                  {tripType === "roundtrip"
                    ? "Both departure and return dates are required."
                    : "Departure date is required."}
                </p>
              )}
            </div>
            <div>
              <Label htmlFor="destinationName" className="text-sm font-semibold leading-6">
                Number of passenger
              </Label>
              <div className="relative py-2">
                <PassengerNumber
                  onSelectPassengers={(num) =>
                    setSearchParams({ ...searchParams, passengerAmount: num })
                  }
                />
              </div>
              {error.passengerAmount && (
                <p className="text-red-600 text-sm">Please select at least one passenger.</p>
              )}
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            <Button type="submit">Search</Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchCard;
