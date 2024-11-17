interface Flight {
  flightId: number;
  flightNumber: string;
  departureDate: string;
  arrivalDate: string;
  price: number;
  taxPercentage: number;
  surchargePercentage: number;
  isCanceled: boolean;
  sellSeats: number;
  origin: {
    airportId: number;
    iataCode: string;
    nameAirport: string;
    city: {
      cityId: number;
      nameCity: string;
      state: string;
      country: string;
    };
  };
  destination: {
    airportId: number;
    iataCode: string;
    nameAirport: string;
    city: {
      cityId: number;
      nameCity: string;
      state: string;
      country: string;
    };
  };
  plane: {
    planeId: number;
    model: string;
    seatCapacity: number;
    seatDistribution: string;
  };
  scales: number;
}

export default Flight;
