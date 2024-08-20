import { Etudiant } from "@/lib/types";
import { sql } from "@vercel/postgres";
import React from "react";
import { IconUser } from "@tabler/icons-react";
import { cookies } from "next/headers";
import { Users, verifyToken } from "@/lib/verification";
import { redirect } from "next/navigation";

async function Page({ params }: { params: { id: string } }) {
  const idCl = params.id ? String(params.id) : "1"; // Assurer que l&apos;id est une chaîne
  const cookieStore = cookies();
  const tokenCookie = cookieStore.get("token")?.value;

  let verificationcookie: Users | null = null;
  if (tokenCookie) {
    verificationcookie = verifyToken(tokenCookie);
    console.log({ verificationcookie });

    if (verificationcookie?.role) {
      if (verificationcookie?.role != "Etudiant") {
        redirect("/dashboard");
      }
    } else {
      redirect("/login");
    }
  }

  const { rows } =
    await sql<Etudiant>`SELECT * FROM etudiant WHERE matricule = ${idCl}`;

  // Gérer les cas où aucune donnée n'est retournée
  if (rows.length === 0) {
    return (
      <div className="w-full h-screen flex justify-center items-center bg-gray-100 text-gray-700">
        Étudiant non trouvé
      </div>
    );
  }

  const {
    datenaiss,
    email,
    lieunaiss,
    matricule,
    nationalite,
    noms,
    password,
    sexe,
    telresponsable,
    adressetudiant,
    district,
    etatcivil,
    provinceorigine,
    territoire,
  } = rows[0];

  // Fonction pour formater les dates en format français
  const formatDate = (dateString: string) => {
    const options: Intl.DateTimeFormatOptions = {
      day: "numeric",
      month: "long",
      year: "numeric",
    };
    return new Date(dateString).toLocaleDateString("fr-FR", options);
  };

  return (
    <div className="w-full h-screen flex justify-center items-center  overflow-auto">
      <div className="max-w-lg w-full  shadow-lg rounded-lg overflow-hidden">
        <div className="bg-blue-600 text-white p-6 bg-red-500">
          <IconUser className="w-64 h-64 rounded-full" />
        </div>
        <div className="bg-blue-600 text-white p-6">
          <h1 className="text-3xl font-bold">
            Informations de l&apos;étudiant
          </h1>
        </div>
        <div className="p-6">
          <div className="grid grid-cols-1 gap-6">
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Matricule :</p>
              <p className="text-gray-900">{matricule}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Nom :</p>
              <p className="text-gray-900">{noms}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Date de naissance :</p>
              <p className="text-gray-900">{formatDate(datenaiss)}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Lieu de naissance :</p>
              <p className="text-gray-900">{lieunaiss}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Nationalité :</p>
              <p className="text-gray-900">{nationalite}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Email :</p>
              <p className="text-gray-900">{email}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Sexe :</p>
              <p className="text-gray-900">{sexe}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">
                Téléphone du responsable :
              </p>
              <p className="text-gray-900">{telresponsable}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Adresse :</p>
              <p className="text-gray-900">{adressetudiant}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">District :</p>
              <p className="text-gray-900">{district}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">État civil :</p>
              <p className="text-gray-900">{etatcivil}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">
                Province d&apos;origine :
              </p>
              <p className="text-gray-900">{provinceorigine}</p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
              <p className="font-semibold text-gray-700">Territoire :</p>
              <p className="text-gray-900">{territoire}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page;
