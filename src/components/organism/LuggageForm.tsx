import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/atoms/RadioGroup";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/atoms/Select";
import { Button } from "@/components/atoms/button";
import { Input } from "@/components/atoms/Input";
import { Label } from "@/components/atoms/Label";
import { toast } from "@/components/hooks/use-toast";

// Define el esquema de validación con Zod
const FormSchema = z.object({
  location: z.enum(["handLuggage", "cabin", "hold"], {
    required_error: "Debes seleccionar una ubicación para el equipaje.",
  }),
  type: z.enum(["suitcase", "musicalInstrument", "sportItem", "animal", "specialItems"], {
    required_error: "Debes seleccionar un tipo de equipaje.",
  }),
  weight: z
    .string() // Mantener como string
    .min(1, { message: "El peso no puede estar vacío." }) // Prohibir campos vacíos
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: "El peso debe ser un número positivo." }),
  height: z
    .string() // Mantener como string
    .min(1, { message: "La altura no puede estar vacía." }) // Prohibir campos vacíos
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: "La altura debe ser un número positivo." }),
  length: z
    .string() // Mantener como string
    .min(1, { message: "El largo no puede estar vacío." }) // Prohibir campos vacíos
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: "El largo debe ser un número positivo." }),
  width: z
    .string() // Mantener como string
    .min(1, { message: "El ancho no puede estar vacío." }) // Prohibir campos vacíos
    .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, { message: "El ancho debe ser un número positivo." }),
});

// Inferir tipos a partir del esquema de Zod
type FormData = z.infer<typeof FormSchema>;

export function LuggageForm() {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
  });

  const { register, handleSubmit, setValue, formState: { errors } } = form;

  function onSubmit(data: FormData) {
    toast({
      title: "Has enviado los siguientes valores:",
      description: (
        <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <div className="w-full h-screen bg-white flex justify-center">
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 w-full md:max-w-6xl mt-8"> {/* Ajuste de mt-16 a mt-8 */}
        {/* Título principal "Añadir equipaje" */}
        <Label className="block mb-4 text-left text-4xl font-bold text-black">Añadir equipaje</Label>

        {/* Sección de ubicación y tipo de equipaje */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
          {/* Columna 1: Ubicación del equipaje */}
          <div className="col-span-1">
            <Label className="block mb-1 text-left">Ubicación del equipaje</Label>
            <RadioGroup
              onValueChange={(value: FormData["location"]) => setValue("location", value)}
              defaultValue={form.getValues("location")}
              className="flex flex-col space-y-1"
            >
              <div className="flex items-center">
                <RadioGroupItem value="handLuggage" />
                <span className="ml-2">Equipaje de mano</span>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="cabin" />
                <span className="ml-2">Cabina</span>
              </div>
              <div className="flex items-center">
                <RadioGroupItem value="hold" />
                <span className="ml-2">Bodega</span>
              </div>
            </RadioGroup>
            {errors.location && <span className="text-red-500">{errors.location.message}</span>}
          </div>

          {/* Columna 2: Tipo de equipaje */}
          <div className="col-span-1">
            <Label className="block mb-1 text-left">Tipo de equipaje</Label>
            <Select
              onValueChange={(value: FormData["type"]) => setValue("type", value)}
              defaultValue={form.getValues("type")}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Seleccione un tipo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="suitcase">Maleta o bolso</SelectItem>
                <SelectItem value="musicalInstrument">Instrumento musical</SelectItem>
                <SelectItem value="sportItem">Artículo deportivo</SelectItem>
                <SelectItem value="animal">Animal</SelectItem>
                <SelectItem value="specialItems">Otros artículos especiales</SelectItem>
              </SelectContent>
            </Select>
            {errors.type && <span className="text-red-500">{errors.type.message}</span>}
          </div>

          {/* Columna 3: Peso */}
          <div className="col-span-1">
            <Label className="block mb-1 text-left">Peso</Label>
            <Input
              type="text" // Mantener como 'text' para permitir decimales
              {...register("weight")}
              className="w-full"
              placeholder="Ingrese el peso"
            />
            {errors.weight && <span className="text-red-500">{errors.weight.message}</span>}
            <p className="text-xs text-gray-500 mt-1">Ingresa el peso en kilogramo (Kg)</p>
          </div>
        </div>

        {/* Sección de dimensiones */}
        <div className="mt-8">
          <Label className="block mb-1 text-left text-xl font-bold text-black">Dimensiones</Label>
          <p className="text-xs text-gray-500 mt-1 block mb-1 text-left">
            Ingresa las dimensiones de tu equipaje en centímetros (cm).
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
          <div className="col-span-1">
            <Label className="block mb-1 text-left">Alto</Label>
            <Input
              type="text"
              {...register("height")}
              className="w-full"
              placeholder="Alto"
            />
            {errors.height && <span className="text-red-500">{errors.height.message}</span>}
          </div>

          <div className="col-span-1">
            <Label className="block mb-1 text-left">Largo</Label>
            <Input
              type="text"
              {...register("length")}
              className="w-full"
              placeholder="Largo"
            />
            {errors.length && <span className="text-red-500">{errors.length.message}</span>}
          </div>

          <div className="col-span-1">
            <Label className="block mb-1 text-left">Ancho</Label>
            <Input
              type="text"
              {...register("width")}
              className="w-full"
              placeholder="Ancho"
            />
            {errors.width && <span className="text-red-500">{errors.width.message}</span>}
          </div>
        </div>

        {/* Línea dibujada y valor */}
        <div className="mt-8">
          {/* Línea con el mismo tono de los bordes de input */}
          <div className="w-full h-[2px] bg-gray-300"></div>

          {/* Texto "Valor" debajo de la línea */}
          <div className="flex justify-end mt-2">
            <div className="text-black text-right">
              <span className="font-bold">Valor:</span> <span className="text-black">$ 50.000</span>
            </div>
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex justify-end mt-8 space-x-4">
          <Button type="button" className="bg-white text-black">Cancelar</Button>
          <Button type="submit" className="bg-customSky">Añadir equipaje</Button>
        </div>
      </form>
    </div>
  );
}