import Navbar from "@/components/molecules/bars/Navbar";
import SearchBar from "@/components/molecules/bars/SearchBar";
import FlightCard from "@/components/molecules/cards/FlightCard";
import FooterCopy from "@/components/molecules/FooterCopy";
import { BadgePlus } from "lucide-react";
import Link from "next/link";
import React from "react";

function FlightsHome() {
  return (
    <div className="flex flex-col h-full w-full">
      <Navbar />
      <SearchBar />
      <section className="flex flex-col">
        <div className="flex justify-end px-4">
          <Link
            href="/gestion-de-vuelos-A/vuelos/registro"
            className="flex gap-1 bg-primary hover:bg-primary/90 transition-colors duration-200 text-slate-100 font-bold p-2 rounded-lg"
          >
            <BadgePlus /> Registrar vuelo
          </Link>
        </div>
        {/* Pasar los vuelos obtenidos a FlightCard */}
        <FlightCard />
      </section>
      <FooterCopy />
    </div>
  );
}

export default FlightsHome;
