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
  // Estado para el tipo de viaje: "departure" (solo ida) o "roundtrip" (ida y vuelta)
  const [tripType, setTripType] = useState("departure");
  
  // Estado para manejar errores en los campos del formulario, incluyendo origen, destino, pasajeros y fechas
  const [error, setError] = useState({ originName: false, destinationName: false, passengerAmount: false, dates: false });
  
  // Estado para manejar los parámetros de búsqueda como origen, destino, fechas y número de pasajeros
  const [searchParams, setSearchParams] = useState<SearchParams>({
    originName: "",
    destinationName: "",
    arrivalDate: "",
    departureDate: "",
    passengerAmount: 0,
    tripType: tripType,
  });

  // Función que maneja la búsqueda y valida que los campos obligatorios estén completos
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();

    // Validar si el origen, destino, pasajeros, y fechas han sido seleccionados correctamente
    const originNameIsEmpty = searchParams.originName === "";
    const destinationNameIsEmpty = searchParams.destinationName === "";
    const passengerAmountIsEmpty = searchParams.passengerAmount === 0;
    const arrivalDateIsEmpty = searchParams.arrivalDate === ""; // Verifica si falta la fecha de salida
    const departureDateIsEmpty = tripType === "roundtrip" && searchParams.departureDate === ""; // Verifica si falta la fecha de regreso en caso de viaje de ida y vuelta

    // Si algún campo está vacío, marca como error y no permite la búsqueda
    if (originNameIsEmpty || destinationNameIsEmpty || passengerAmountIsEmpty || arrivalDateIsEmpty || (tripType === "roundtrip" && departureDateIsEmpty)) {
      setError({
        originName: originNameIsEmpty,
        destinationName: destinationNameIsEmpty,
        passengerAmount: passengerAmountIsEmpty,
        dates: arrivalDateIsEmpty || (tripType === "roundtrip" && departureDateIsEmpty), // Error si falta alguna fecha
      });
      return; // Impedir la búsqueda si hay campos vacíos
    }

    // Si todo está completo, ejecuta la búsqueda con los parámetros ingresados
    onSearch({ 
      ...searchParams, 
      tripType,
      arrivalDate: searchParams.arrivalDate ? format(searchParams.arrivalDate, "yyyy-MM-dd") : "", 
      departureDate: searchParams.departureDate ? format(searchParams.departureDate, "yyyy-MM-dd") : "",
    });
  };

  return (
    <div className="h-screen flex justify-center items-center bg-accent">
      <div className="bg-white shadow-md shadow-primary rounded-lg px-6 py-6 sm:py-8 lg:px-8 w-3/4">
        <div className="text-left">
          <Title title="Flight search" /> {/* Título de la búsqueda de vuelos */}
          <Text text="Find the flight you need" /> {/* Descripción */}
        </div>

        {/* Formulario de búsqueda */}
        <form className="mt-6 sm:mt-8" onSubmit={handleSearch} autoComplete="off">
          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="originName" className="text-sm font-semibold leading-6">
                OriginName {/* Etiqueta para seleccionar el origen */}
              </Label>
              <div className="relative py-2">
                <City
                  cities={citiesList} // Lista de ciudades para seleccionar
                  onSelectCity={(value) => {
                    setSearchParams({ ...searchParams, originName: value });
                    setError({ ...error, originName: false }); // Limpiar error al seleccionar una ciudad
                  }}
                />
                <span className="absolute inset-y-0 right-2 flex items-center pr-1.5">
                  <Icon icon="bx:map" className="text-primary h-5 w-5" /> {/* Icono de mapa */}
                </span>
              </div>
              {error.originName && <p className="text-red-600 text-sm">OriginName is required.</p>} {/* Mostrar error si no se selecciona origen */}
            </div>

            <div>
              <Label htmlFor="destinationName" className="text-sm font-semibold leading-6">
                DestinationName {/* Etiqueta para seleccionar el destino */}
              </Label>
              <div className="relative py-2">
                <City
                  cities={citiesList} // Lista de ciudades para seleccionar
                  onSelectCity={(value) => {
                    setSearchParams({ ...searchParams, destinationName: value });
                    setError({ ...error, destinationName: false }); // Limpiar error al seleccionar una ciudad
                  }}
                />
                <span className="absolute inset-y-0 right-2 flex items-center pr-1.5">
                  <Icon icon="bx:map" className="text-primary h-5 w-5" /> {/* Icono de mapa */}
                </span>
              </div>
              {error.destinationName && (
                <p className="text-red-600 text-sm">DestinationName is required.</p> /* Mostrar error si no se selecciona destino */
              )}
            </div>
          </div>

          {/* Selección de tipo de viaje: solo ida o ida y vuelta */}
          <div className="py-2">
            <RadioGroup defaultValue={tripType} onValueChange={(value) => setTripType(value)}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="departure" id="r1" />
                <Label htmlFor="r1">Departure</Label> {/* Opción de solo ida */}
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="roundtrip" id="r2" />
                <Label htmlFor="r2">Roundtrip</Label> {/* Opción de ida y vuelta */}
              </div>
            </RadioGroup>
          </div>

          <div className="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
            <div>
              <Label htmlFor="originName" className="text-sm font-semibold leading-6">
                Date {/* Etiqueta para seleccionar la fecha */}
              </Label>
              <div className="relative py-2">
                {tripType === "departure" ? (
                  <DepartureDate
                    onDateSelect={(date) =>
                      setSearchParams({ ...searchParams, arrivalDate: date?.toISOString() || "" }) // Seleccionar la fecha de salida
                    }
                  />
                ) : (
                  <RoundTripDate
                    onDepartureSelect={(date) =>
                      setSearchParams({ ...searchParams, arrivalDate: date?.toISOString() || "" }) // Seleccionar la fecha de salida
                    }
                    onReturnSelect={(date) =>
                      setSearchParams({ ...searchParams, departureDate: date?.toISOString() || "" }) // Seleccionar la fecha de regreso
                    }
                  />
                )}
              </div>
              {error.dates && (
                <p className="text-red-600 text-sm">
                  {tripType === "roundtrip"
                    ? "Both departure and return dates are required."
                    : "Departure date is required."} {/* Mostrar error si no se seleccionan las fechas */}
                </p>
              )}
            </div>

            {/* Selección de número de pasajeros */}
            <div>
              <Label htmlFor="destinationName" className="text-sm font-semibold leading-6">
                Number of passenger
              </Label>
              <div className="relative py-2">
                <PassengerNumber
                  onSelectPassengers={(num) =>
                    setSearchParams({ ...searchParams, passengerAmount: num }) // Actualizar el número de pasajeros seleccionado
                  }
                />
              </div>
              {error.passengerAmount && (
                <p className="text-red-600 text-sm">Please select at least one passenger.</p> /* Mostrar error si no se seleccionan pasajeros */
              )}
            </div>
          </div>

          {/* Botón para iniciar la búsqueda */}
          <div className="mt-6 flex justify-end">
            <Button type="submit">Search</Button> {/* Botón de búsqueda */}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SearchCard;
