import React from "react";
import { sql } from "@vercel/postgres";
import { Departement } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? String(params.id) : "";

  const { rows } =
    await sql<Departement>`SELECT * from departement where codedepartement=${idCl}`;
  const { codedepartement, nom } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un département
      </h2>
      <Formulaire codedepartement={codedepartement} nom={nom} />
    </div>
  );
}

export default Page;
