import type { Metadata } from "next"
import "./globals.css"
import LeftSideBar from "../components/LeftSideBar"
import TopBar from "@/components/TopBar"

export const metadata: Metadata = {
  title: "Moviefy",
  description: "Tu gestor de películas",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className="bg-zinc-950">
        <div className="flex">
          <TopBar />
          <LeftSideBar />
          {/* El margen izquierdo deja espacio al sidebar colapsado */}
          <main className="ml-16 flex-1 min-h-screen">
            {children}
          </main>
        </div>
      </body>
    </html>
  )
} 