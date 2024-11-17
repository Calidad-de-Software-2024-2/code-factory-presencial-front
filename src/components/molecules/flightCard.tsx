import React from "react";
import { Button } from "../ui/button";
import { Icon } from "@iconify/react";
import { Text } from "../atoms/text";
import Flight from "@/utils/interface/flight";

// Recibe 'flight' como prop, que es un objeto con los datos del vuelo
const FlightCard: React.FC<{ flight: Flight }> = ({ flight }) => {
  return (
    <div className="w-3/4 mx-auto bg-white shadow-md rounded-lg px-6 py-6 sm:py-8 lg:px-8 grid grid-cols-2 transition-colors shadow-primary">
      {/* Contenedor principal con estilos de ancho, fondo blanco, sombra y distribución en 2 columnas */}
      <div className="grid grid-rows-1 items-center space-y-3">
        {/* Columna izquierda: información del vuelo, alineada verticalmente con espacio entre filas */}
        <div className="flex items-center font-bold space-x-3">
          {/* Fila para el origen del vuelo */}
          <span>
            <Icon icon="ion:paper-plane" className="h-6 w-6 text-primary" />
            {/* Ícono de avión */}
          </span>
          <Text text={`Origin: ${flight.origin.city.nameCity}`} />
          {/* Texto que muestra el origen del vuelo */}
        </div>
        <div className="flex items-center font-bold space-x-3">
          {/* Fila para el destino del vuelo */}
          <span>
            <Icon icon="ion:paper-plane" className="h-6 w-6 text-primary transform rotate-90" />
            {/* Ícono de avión rotado 90 grados */}
          </span>
          <Text text={`Destination: ${flight.destination.city.nameCity}`} />
          {/* Texto que muestra el destino del vuelo */}
        </div>
        <div className="flex items-center font-bold space-x-3">
          {/* Fila para la fecha y hora del vuelo */}
          <span>
            <Icon icon="radix-icons:calendar" className="h-6 w-6 text-primary" />
            {/* Ícono de calendario */}
          </span>
          <Text text={`Date and time: ${flight.departureDate}`} />
          {/* Texto que muestra la fecha y hora del vuelo */}
        </div>
        <div className="flex items-center font-bold space-x-3">
          {/* Fila para el aeropuerto */}
          <span>
            <Icon icon="tabler:building-airport" className="h-6 w-6 text-primary" />
            {/* Ícono */}
          </span>
          <Text text={`Airport: ${flight.origin.nameAirport.replace(/ Airport$/, '')}`} />
          {/* Texto que muestra el aeropuerto */}
        </div>
      </div>
      <div className="grid grid-rows-1 justify-end">
        {/* Columna derecha: muestra el precio y el botón de reserva */}
        <div className="flex justify-end font-bold">
          {/* Fila para mostrar el precio */}
          <Text text={`USD$ ${flight.price}`} />
          {/* Texto que muestra el precio actual */}
        </div>
        <div className="flex mt-2">
          {/* Fila para el botón de reserva */}
          <Button>Reserve</Button>
          {/* Botón para reservar el vuelo */}
        </div>
      </div>
    </div>
  );
};

export default FlightCard;
