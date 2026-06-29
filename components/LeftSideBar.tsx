"use client"

import { useState } from "react"
import Link from "next/link"

const secciones = [
    { href: "/", label: "Inicio", icon: "🏠" },
    { href: "/favoritos", label: "Mis favoritos", icon: "❤️" },
    { href: "/vistas", label: "Vistas", icon: "✅" },
    { href: "/pendientes", label: "Pendientes", icon: "🕐" },
]

export default function Sidebar() {
    const [open, setOpen] = useState(false)
    return (
        <aside
            className={`fixed top-0 left-0 h-full bg-zinc-900 border-r border-zinc-800 transition-all duration-300 z-50 flex flex-col ${open ? "w-52" : "w-16"
                }`}
        >
            {/* Botón abrir/cerrar */}
            <button
                onClick={() => setOpen(!open)}
                className="text-white p-4 text-xl hover:text-yellow-400 transition-colors self-start"
            >
                {open ? "✕" : "☰"}
            </button>

            {/* Enlaces */}
            <nav className="flex flex-col gap-2 mt-4">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className="flex items-center gap-3 px-4 py-3 text-zinc-400 hover:text-white hover:bg-zinc-800 transition-colors"
                    >
                        <span className="text-xl flex-shrink-0">{link.icon}</span>
                        {open && (
                            <span className="text-sm font-medium whitespace-nowrap">
                                {link.label}
                            </span>
                        )}
                    </Link>
                ))}
            </nav>
        </aside>
    )
}




