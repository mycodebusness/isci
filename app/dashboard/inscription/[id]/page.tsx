import React from "react";
import { sql } from "@vercel/postgres";
import { Formulaire } from "../form";
import { Inscription } from "@/lib/types";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? String(params.id) : 1;

  const { rows } = await sql<Inscription>`SELECT * FROM inscription `;
  const { codedepartement, dateinscription, matricule, promotion, nom, noms } =
    rows[0];

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
        Formulaire modifier une inscription
      </h2>
      <Formulaire
        codedepartement={codedepartement}
        departements={departements}
        etudiants={etudiants}
        matricule={matricule}
        promotion={promotion}
      />
    </div>
  );
}

export default Page;
