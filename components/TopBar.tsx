"use client"

import { useState } from "react";

export default function TopBar() {
    const [busqueda, setBusqueda] = useState(""); 

    const manejarCambio = (e : React.ChangeEvent<HTMLInputElement>) => {
        const valor = e.target.value
        setBusqueda(valor)
        console.log("Buscando el valor", valor)
    }

    return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-zinc-900 border-b border-zinc-800 z-40 flex items-center justify-between px-6 ml-16">
      {/* Sección Izquierda: Buscador (muy común en apps de películas) */}
      <div className="flex-1 max-w-md">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none text-zinc-500">
            🔍
          </span>
          <input
            type="text"
            value={busqueda}
            onChange={manejarCambio}
            placeholder="Buscar películas, directores..."
            className="w-full bg-zinc-800 text-white text-sm rounded-lg pl-10 pr-4 py-2 focus:outline-none focus:ring-2 focus:ring-yellow-400 placeholder-zinc-500 transition-all"
          />
        </div>
      </div>

      {/* Sección Derecha: Usuario / Perfil */}
      <div className="flex items-center gap-4">
        <button className="text-zinc-400 hover:text-white transition-colors text-sm font-medium">
          Premium
        </button>
        
        {/* Avatar ficticio */}
        <div className="w-9 height-9 h-9 rounded-full bg-yellow-400 flex items-center justify-between justify-center font-bold text-zinc-950 cursor-pointer hover:opacity-90 transition-opacity">
          U
        </div>
      </div>
    </header>
  );

}