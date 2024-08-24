import React from "react";
import { sql } from "@vercel/postgres";
import { Client } from "@/lib/types";
import { Formulaire } from "../form";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? Number(params.id) : 1;

  const { rows } = await sql<Client>`SELECT * from client where idcl=${idCl}`;
  const {
    idcl,
    nom,
    password,
    prenom,
    avenue,
    commune,
    date_inscription,
    email,
    numero,
    numeroimpot,
    quartier,
    rccmm,
    telephone,
    type_client,
    ville,
  } = rows[0];
  return (
    <div className="flex flex-col gap-4 py-4 px-8">
      <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
        Formulaire modifier un client
      </h2>
      <Formulaire
        avenue={avenue}
        commune={commune}
        email={email}
        idcl={idcl}
        nom={nom}
        numero={numero}
        numeroimpot={numeroimpot}
        password={password}
        prenom={prenom}
        quartier={quartier}
        rccmm={rccmm}
        telephone={telephone}
        type_client={type_client}
        ville={ville}
      />
    </div>
  );
}

export default Page;
