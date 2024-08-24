import { ModeToggle } from "@/components/toggletheme";
import { Etudiant } from "@/lib/types";
import { sql } from "@vercel/postgres";
import React from "react";
import { DataTable } from "./dataTable";

const Page = async () => {
  const { rows } = await sql<Etudiant>`SELECT * FROM etudiant`;

  return (
    <div className="flex flex-col w-full">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6 justify-between">
        <h2 className="scroll-m-20 text-2xl font-semibold tracking-tight">
          Page Gérer Client
        </h2>
        <ModeToggle />
      </header>

      <main>
        <DataTable data={rows} />
      </main>
    </div>
  );
};

export default Page;
