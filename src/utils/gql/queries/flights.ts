import { gql } from "@apollo/client";

export const SEARCH_FLIGHTS = gql`
  query SearchFlights(
    $originName: String!
    $destinationName: String!
    $departureDate: String!
    $passengerAmount: Int!
  ) {
    searchFlights(
      originName: $originName
      destinationName: $destinationName
      departureDate: $departureDate
      passengerAmount: $passengerAmount
    ) {
      flightId
      departureDate
      origin {
        nameAirport
        city {
          nameCity
        }
      }
      destination {
        nameAirport
        city {
          nameCity
        }
      }
      price
    }
  }
`;

export const SEARCH_ROUND_TRIP = gql`
  query SearchFlights(
    $originName: String!
    $destinationName: String!
    $arrivalDate: String!
    $departureDate: String!
    $passengerAmount: Int!
  ) {
    searchFlights(
      originName: $originName
      destinationName: $destinationName
      arrivalDate: $arrivalDate
      departureDate: $departureDate
      passengerAmount: $passengerAmount
    ) {
      flightId
      arrivalDate
      departureDate
      origin {
        nameAirport
        city {
          nameCity
        }
      }
      destination {
        nameAirport
        city {
          nameCity
        }
      }
      price
    }
  }
`;