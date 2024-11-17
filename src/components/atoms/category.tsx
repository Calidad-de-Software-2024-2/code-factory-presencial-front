import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import CategoryProps from "@/utils/interface/category";
import { DialogClose } from "../ui/dialog";

const Category = ({ categories, setSelectedCategory, prices }: CategoryProps) => {
  // Estado local para almacenar la pestaña seleccionada, inicializado con la primera categoría
  const [selectedTab, setSelectedTab] = useState(categories[0].value);

  return (
    // Componente Tabs para crear una interfaz de pestañas
    <Tabs defaultValue={selectedTab} className="w-[400px]">
      {/* Lista de pestañas */}
      <TabsList className="grid w-full grid-cols-3">
        {categories.map((category) => (
          <TabsTrigger
            key={category.value} // Clave única para cada pestaña basada en el valor de la categoría
            value={category.value} // Valor de la pestaña que activa el contenido correspondiente
            onClick={() => {
              setSelectedTab(category.value); // Cambia la pestaña seleccionada
            }}
          >
            {category.title} {/* Título de la categoría mostrado en la pestaña */}
          </TabsTrigger>
        ))}
      </TabsList>

      {/* Contenido que se muestra cuando una pestaña está activa */}
      {categories.map((category) => (
        <TabsContent key={category.value} value={category.value}>
          {/* Tarjeta (Card) que muestra los detalles de la categoría */}
          <Card>
            <CardHeader>
              {/* Título y descripción de la categoría */}
              <CardTitle>{category.title}</CardTitle>
              <CardDescription>{category.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-2">
              {/* Muestra el precio de la categoría */}
              <div>
                <p className="text-xl font-bold">
                  Price: ${prices[category.value as keyof typeof prices]}
                </p>
              </div>

              {/* Muestra los beneficios de la categoría en una lista */}
              <div>
                <p className="font-semibold">Benefits:</p>
                <ul className="list-disc ml-5">
                  {category.benefits.map((benefit, index) => (
                    <li key={index}>{benefit}</li> // Cada beneficio es mostrado como un ítem de lista
                  ))}
                </ul>
              </div>
            </CardContent>

            <CardFooter>
              {/* Botón que selecciona la categoría y cierra el diálogo */}
              <DialogClose asChild>
                <Button onClick={() => setSelectedCategory(category)}>
                  Select {category.title} {/* Muestra el botón para seleccionar la categoría */}
                </Button>
              </DialogClose>
            </CardFooter>
          </Card>
        </TabsContent>
      ))}
    </Tabs>
  );
};

export default Category;


/**
 * Category Component
 * 
 * Este componente renderiza una lista de categorías en formato de pestañas (tabs).
 * Permite al usuario seleccionar una categoría y muestra detalles como el precio
 * y los beneficios asociados a cada categoría.
 * 
 * Props:
 * - categories: Un array de objetos que contiene la información de cada categoría.
 *   Cada objeto debe tener las siguientes propiedades:
 *   - value: Identificador único de la categoría.
 *   - title: Título de la categoría.
 *   - description: Descripción breve de la categoría.
 *   - benefits: Un array de strings que describe los beneficios de la categoría.
 * 
 * - setSelectedCategory: Una función de callback que se ejecuta cuando el usuario selecciona
 *   una categoría. Recibe el objeto de la categoría seleccionada.
 * 
 * - prices: Un objeto que asocia cada categoría con su precio. La clave es el `value` de la
 *   categoría y el valor es el precio de la categoría.
 * 
 * Estado Local:
 * - selectedTab: Almacena el valor (`value`) de la categoría que está actualmente seleccionada.
 * 
 * Funcionalidad:
 * - Muestra las categorías en una lista de pestañas, permitiendo cambiar entre ellas.
 * - Al cambiar de pestaña, se actualiza el contenido mostrado, incluyendo el título,
 *   descripción, precio y beneficios de la categoría seleccionada.
 * - Cada categoría tiene un botón que, al hacer clic, selecciona la categoría y 
 *   ejecuta la función `setSelectedCategory` con los datos de la categoría seleccionada.
 * 
 * Componentes Utilizados:
 * - Button: Un botón reutilizable de la interfaz de usuario.
 * - Card: Un contenedor que agrupa los detalles de cada categoría.
 * - Tabs: Componente que organiza las categorías en pestañas.
 * - DialogClose: Un botón que cierra el diálogo al seleccionar una categoría.
 */