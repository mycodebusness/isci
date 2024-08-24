import React from "react";
import { Formulaire } from "../form";
import { sql } from "@vercel/postgres";

async function Page() {
  const { rows: departements } = await sql<{
    codedepartement: number;
    nom: string;
  }>`SELECT * FROM departement `;
  const { rows: etudiants } = await sql<{
    matricule: number;
    noms: string;
  }>`SELECT * FROM etudiant `;
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire ajouter un stock
      </h2>
      <Formulaire departements={departements} etudiants={etudiants} />
    </div>
  );
}

export default Page;
