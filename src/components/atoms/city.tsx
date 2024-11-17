import * as React from "react";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const City = ({
  cities, // Propiedad que recibe la lista de ciudades, cada una con un valor y una etiqueta
  onSelectCity, // Callback para manejar la ciudad seleccionada
}: {
  cities: { value: string; label: string }[]; // Tipo que define la estructura de las ciudades
  onSelectCity: (city: string) => void; // Función que recibe la ciudad seleccionada
}) => {
  // Estado para controlar si el popover está abierto o cerrado
  const [open, setOpen] = React.useState(false);

  // Estado para almacenar la ciudad seleccionada
  const [value, setValue] = React.useState("");

  return (
    // Componente Popover que contiene el desplegable de ciudades
    <Popover open={open} onOpenChange={setOpen}>
      {/* Botón que actúa como disparador del popover */}
      <PopoverTrigger asChild>
        <Button
          variant="outline" // Estilo del botón
          role="combobox" // Define el botón como un combobox para accesibilidad
          aria-expanded={open} // Indica si el popover está abierto o cerrado
          className="w-full justify-between" // Ocupa el ancho completo y justifica el contenido
        >
          {/* Muestra la ciudad seleccionada o un texto predeterminado si no se ha seleccionado ninguna */}
          {value ? cities.find((city) => city.value === value)?.label : "Select city..."}
        </Button>
      </PopoverTrigger>

      {/* Contenido del popover que contiene el buscador y la lista de ciudades */}
      <PopoverContent className="w-full p-0">
        <Command>
          {/* Input de búsqueda para filtrar las ciudades */}
          <CommandInput placeholder="Search city..." />

          {/* Lista de ciudades */}
          <CommandList>
            {/* Mensaje que se muestra si no se encuentra ninguna ciudad */}
            <CommandEmpty>No city found.</CommandEmpty>

            {/* Agrupación de las ciudades */}
            <CommandGroup>
              {cities.map((city) => (
                <CommandItem
                  key={city.value} // Clave única para cada ciudad
                  value={city.value} // Valor asociado a cada ciudad
                  // Función que se ejecuta al seleccionar una ciudad
                  onSelect={(currentValue) => {
                    // Si la ciudad seleccionada es la misma, la deselecciona; de lo contrario, la selecciona
                    setValue(currentValue === value ? "" : currentValue);
                    onSelectCity(currentValue); // Llama al callback con la ciudad seleccionada
                    setOpen(false); // Cierra el popover después de seleccionar
                  }}
                >
                  {/* Ícono de check que aparece cuando una ciudad está seleccionada */}
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4", // Tamaño del ícono
                      value === city.value ? "opacity-100" : "opacity-0" // Controla la visibilidad del ícono dependiendo de si está seleccionada
                    )}
                  />
                  {city.label} {/* Muestra el nombre de la ciudad */}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default City;

/**
 * City Component
 * 
 * Este componente renderiza un campo desplegable de selección de ciudades utilizando 
 * el componente `Popover` para la interacción. Permite al usuario buscar y seleccionar 
 * una ciudad de una lista proporcionada.
 * 
 * Props:
 * - cities: Un array de objetos que contienen la información de las ciudades. Cada objeto 
 *   tiene un formato { value: string, label: string }, donde `value` es un identificador 
 *   único y `label` es el nombre que se muestra al usuario.
 * - onSelectCity: Una función de callback que se ejecuta cuando el usuario selecciona 
 *   una ciudad. Recibe como parámetro el valor (`value`) de la ciudad seleccionada.
 * 
 * Estado Local:
 * - open: Un booleano que controla si el `Popover` (el menú desplegable) está abierto o cerrado.
 * - value: Almacena el valor (`value`) de la ciudad seleccionada actualmente.
 * 
 * Funcionalidad:
 * - Muestra el botón de selección de ciudad. Si ya se ha seleccionado una ciudad, 
 *   se muestra el nombre de la ciudad (label). Si no, se muestra el texto "Select city...".
 * - Cuando el menú desplegable está abierto, se puede buscar una ciudad por su nombre.
 * - Al seleccionar una ciudad, se actualiza el estado `value` con el valor de la ciudad 
 *   seleccionada y se invoca la función `onSelectCity`.
 * - También se incluye un ícono `Check` que se muestra junto a la ciudad seleccionada.
 */