export interface Passenger {
    nombre: string;
    apellido: string;
    tipoDocumento: string;
    numeroDocumento: string;
    correo: string;
    telefono: string;
    accesibilidad: boolean;
    equipajeAdicional: boolean;
    adiciones: boolean;
    asientoElegido: boolean;
    }

export interface PassengerDB {
    idPasajero: number;
    nombre: string;
    apellido: string;
    tipoDocumento: string;
    numeroDocumento: string;
    correo: string;
    telefono: string;
    }