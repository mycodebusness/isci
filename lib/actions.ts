"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Departement, Etudiant, Inscription, Recu, Utilisateur } from "./types";

function revalidate() {
  revalidatePath("/dashboard/etudiant");
  revalidatePath("/dashboard/departement");
  revalidatePath("/dashboard/recu");
  revalidatePath("/dashboard/inscription");
  revalidatePath("/dashboard/utilisateur");
  revalidatePath("/dashboard");
}

export async function addInscription(
  data: Omit<Inscription, "dateinscription">
) {
  const { matricule, promotion, codedepartement } = data;
  const dateinscription = new Date().toDateString();

  try {
    await sql`
    INSERT INTO inscription (dateinscription,matricule,promotion,codedepartement)
    VALUES (${dateinscription},${matricule},${promotion},${codedepartement});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/inscription");
}
export async function upDateInscription(
  matricule: string,
  data: Omit<Inscription, "dateinscription">
) {
  const { promotion, codedepartement } = data;

  try {
    await sql`
    UPDATE inscription
SET promotion=${promotion}, codedepartement=${codedepartement}
WHERE matricule = ${matricule};`;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/inscription");
}
export async function deleteInscription(matricule: string) {
  try {
    await sql`
    DELETE FROM inscription
    WHERE matricule=${matricule};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/inscription");
}

export async function addEtudiant(
  matricule: string,
  noms: string,
  sexe: string,
  lieunaiss: string,
  datenaiss: string,
  nationalite: string,
  etatcivil: string,
  provinceorigine: string,
  district: string,
  territoire: string,
  adressetudiant: string,
  telresponsable: string,
  email: string,
  password: string,
  nomsrespo: string,
  profession?: string
) {
  try {
    await sql`
    INSERT INTO responsable (telresponsable,noms,profession)
    VALUES (${telresponsable},${nomsrespo},${profession});
`;
    await sql`
    INSERT INTO etudiant (matricule,noms,sexe,lieunaiss,datenaiss,nationalite,etatcivil,provinceorigine,district,territoire,adressetudiant,telresponsable,email,password)
    VALUES (${matricule},${noms}, ${sexe},${lieunaiss},${datenaiss}, ${nationalite}, ${etatcivil}, ${provinceorigine}, ${district}, ${territoire}, ${adressetudiant}, ${telresponsable}, ${email}, ${password});
  `;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
}
export async function upDateEtudiant(
  matricule: string,
  noms: string,
  sexe: string,
  lieunaiss: string,
  datenaiss: string,
  nationalite: string,
  etatcivil: string,
  provinceorigine: string,
  district: string,
  territoire: string,
  adressetudiant: string,
  telresponsable: string,
  email: string,
  password: string,
  nomsrespo: string,
  profession?: string
) {
  try {
    await sql`UPDATE responsable
SET noms=${nomsrespo},profession=${profession}
WHERE telresponsable=${telresponsable};`;

    await sql`UPDATE etudiant
SET noms=${noms},sexe=${sexe},lieunaiss=${lieunaiss},datenaiss=${datenaiss},nationalite=${nationalite},etatcivil=${etatcivil},provinceorigine=${provinceorigine},district=${district},territoire=${territoire},adressetudiant=${adressetudiant},email=${email},password=${password}
WHERE matricule=${matricule};`;
  } catch (error) {
    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/etudiant");
}
export async function deleteEtudiant(id: string) {
  console.log("supprimer étudiant", { id });
  console.log(`
    DELETE FROM etudiant
    WHERE matricule = ${id};
  `);

  try {
    await sql`
    DELETE FROM etudiant
    WHERE matricule=${id};`;
    console.log("supprimer succès");
  } catch (error) {
    console.log("erreur", { error });

    throw new Error("erreur lors de l'opération");
  }
  revalidate();
  redirect("/dashboard/etudiant");
}

export async function addDepartement(data: Departement) {
  const { nom, codedepartement } = data;
  try {
    await sql`
    INSERT INTO departement (nom, codedepartement)
    VALUES (${nom}, ${codedepartement});
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/departement");
}
export async function upDateDepartement(
  codedepartement: string,
  data: Departement
) {
  const { nom } = data;

  try {
    await sql`
    UPDATE departement
SET nom = ${nom}
WHERE codedepartement = ${codedepartement};  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/departement");
}
export async function deleteDepartement(codedepartement: string) {
  try {
    await sql`
    DELETE FROM departement
    WHERE codedepartement=${codedepartement};
  `;
  } catch (error) {
    throw new Error("opération fail");
  }
  revalidate();
  redirect("/dashboard/departement");
}

// export async function addUser(data: Omit<Users, "iduser">) {
//   const { nom, email, password, role } = data;
//   try {
//     await sql`
//     INSERT INTO users (nom, email, password,role)
//     VALUES (${nom}, ${email}, ${password},${role});
//   `;
//   } catch (error) {
//     throw new Error("opération fail");
//   }
//   revalidate();
//   redirect("/dashboard/users");
// }
// export async function upDateUser(id: number, data: Omit<Users, "iduser">) {
//   const { email, password, nom, role } = data;
//   try {
//     await sql`
//     UPDATE users
// SET nom = ${nom},
//     email = ${email},
//     password = ${password},
//     role=${role}
// WHERE iduser = ${id};  `;
//   } catch (error) {
//     throw new Error("opération fail");
//   }
//   revalidate();
//   redirect("/dashboard/users");
// }
// export async function deleteUser(id: number) {
//   try {
//     await sql`
//     DELETE FROM users
//     WHERE iduser=${id};
//   `;
//   } catch (error) {
//     throw new Error("opération fail");
//   }
//   revalidate();
//   redirect("/dashboard/users");
// }

export async function handlelogin(data: { email: string; mdp: string }) {
  const { email, mdp } = data;

  const { rows, rowCount } =
    await sql<Etudiant>`SELECT * from etudiant WHERE email=${email} AND password=${mdp};`;
  if (rowCount != null && rowCount >= 1) {
    const { matricule, email } = rows[0];

    return {
      data: {
        iduser: matricule,
        email,
      },
      role: "Etudiant",
    };
  } else {
    const { rows, rowCount } =
      await sql<Utilisateur>`SELECT * from utilisateur WHERE email=${email} AND password=${mdp};`;

    if (rowCount != null && rowCount >= 1) {
      const { nom, iduser, email, role } = rows[0];
      return {
        data: {
          iduser,
          nom,
          email,
        },
        role,
      };
    } else {
      return {
        data: {},
        role: "",
      };
    }
  }
}
