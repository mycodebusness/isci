import React from "react";
import { sql } from "@vercel/postgres";
import { Inscription } from "@/lib/types";
// import { categories as rows } from "@/lib/data";
import { DataTable } from "./dataTable";
import { ModeToggle } from "@/components/toggletheme";

export default async function Page() {
  const { rows } = await sql<Inscription>`
  SELECT 
    i.matricule,
    e.noms AS noms,
    i.dateinscription,
    i.promotion,
    d.nom AS nom,
    d.codedepartement
FROM 
    Inscription i
JOIN 
    Etudiant e ON i.matricule = e.matricule
JOIN 
    Departement d ON i.codedepartement = d.codedepartement; `;
  return (
    <div className="flex flex-col w-full">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Inscription
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
}
