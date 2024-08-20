"use server";
import { sql } from "@vercel/postgres";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { Departement, Etudiant, Inscription, Recu, Utilisateur } from "./types";

function revalidate() {
  revalidatePath("/dashboard/etudiant");
  revalidatePath("/dashboard/recu");
  revalidatePath("/dashboard/inscription");
  revalidatePath("/dashboard/utilisateur");
  revalidatePath("/dashboard");
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
// export async function upDateProduit(id: number, data: Omit<Produit, "idprod">) {
//   const {
//     itemname,
//     prix,
//     quantity,
//     stockalerte,
//     type,
//     date_creation,
//     description,
//   } = data;
//   const date = new Date(date_creation || "").toDateString();
//   try {
//     await sql`UPDATE produit
// SET itemname=${itemname},prix=${prix},quantity=${quantity},stockalerte=${stockalerte},type=${type},date_creation=${date},description=${description}
// WHERE idprod=${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/produit");
// }
// export async function deleteProduit(id: number) {
//   try {
//     await sql`
//     DELETE FROM produit
//     WHERE idprod = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/produit");
// }

// export async function addCommande(data: Omit<Commande, "idcomm">) {
//   const total_amount = 0,
//     total_amount_ex_vat = 0,
//     total_amount_inc_charge_cdf = 0,
//     total_amount_inc_charge_usd = 0;
//   const {
//     currency,
//     delivery_point,
//     expiry_date,
//     idcl,
//     inco_term,
//     payement_type,
//     requeste_date,
//     status,
//     transport_mode,
//     vat_rate,
//     activites,
//     adresse_livraison,
//     date_creation,
//     date_livraison,
//     origine,
//   } = data;

//   try {
//     await sql`
//     INSERT INTO commande (currency,delivery_point,expiry_date,idcl,inco_term,payement_type,requeste_date,status,transport_mode,vat_rate,activites,adresse_livraison,date_creation,date_livraison,origine,total_amount,total_amount_ex_vat,total_amount_inc_charge_cdf,total_amount_inc_charge_usd)
//     VALUES (${currency},${delivery_point},${expiry_date},${idcl},${inco_term},${payement_type},${requeste_date},${status},${transport_mode},${vat_rate},${activites},${adresse_livraison},${date_creation},${date_livraison},${origine},${total_amount},${total_amount_ex_vat},${total_amount_inc_charge_cdf},${total_amount_inc_charge_usd});
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/commande");
// }
// export async function upDateCommande(
//   id: number,
//   data: Omit<Commande, "idcomm">
// ) {
//   const total_amount = 0,
//     total_amount_ex_vat = 0,
//     total_amount_inc_charge_cdf = 0,
//     total_amount_inc_charge_usd = 0;
//   const {
//     currency,
//     delivery_point,
//     expiry_date,
//     idcl,
//     inco_term,
//     payement_type,
//     requeste_date,
//     status,
//     transport_mode,
//     vat_rate,
//     activites,
//     adresse_livraison,
//     date_creation,
//     date_livraison,
//     origine,
//   } = data;
//   try {
//     await sql`  UPDATE commande
// SET currency=${currency},delivery_point=${delivery_point},expiry_date=${expiry_date},idcl=${idcl},inco_term=${inco_term},payement_type=${payement_type},requeste_date=${requeste_date},status=${status},transport_mode=${transport_mode},vat_rate=${vat_rate},activites=${activites},adresse_livraison=${adresse_livraison},date_creation=${date_creation},date_livraison=${date_livraison},origine=${origine},total_amount=${total_amount},total_amount_ex_vat=${total_amount_ex_vat},total_amount_inc_charge_cdf=${total_amount_inc_charge_cdf},total_amount_inc_charge_usd=${total_amount_inc_charge_usd}
// WHERE idcomm = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/commande");
// }
// export async function deleteCommande(id: number) {
//   try {
//     await sql`
//     DELETE FROM commande
//     WHERE idcomm = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/commande");
// }

// export async function addStock(data: Omit<Stock, "idstock">) {
//   const date = new Date().toDateString();
//   const { idprod, quantity, date_expiration, emplacement } = data;
//   try {
//     await sql`
//     INSERT INTO stock (date,idprod,quantity,date_expiration,emplacement)
//     VALUES (${date},${idprod},${quantity},${date_expiration},${emplacement});
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/stock");
// }
// export async function upDateStock(id: number, data: Omit<Stock, "idstock">) {
//   const { idprod, quantity, date_expiration, emplacement } = data;
//   try {
//     await sql`UPDATE stock
// SET idprod=${idprod},quantity=${quantity},date_expiration=${date_expiration},emplacement=${emplacement}
// WHERE idstock = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/stock");
// }
// export async function deleteStock(id: number) {
//   try {
//     await sql`
//     DELETE FROM stock
//     WHERE idstock = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/stock");
// }

// export async function addDetailCommande(
//   data: Omit<DetailCommande, "iddetcom">
// ) {
//   const {
//     driver_Id,
//     driver_name,
//     idcom,
//     idprod,
//     item_id,
//     quantity,
//     remaining_qty,
//     uom,
//     etat,
//     prix_unitaire,
//     remark,
//     total,
//     vehicule_number,
//   } = data;
//   try {
//     await sql`
//     INSERT INTO detailcommande (driver_Id,driver_name,idcom,idprod,item_id,quantity,remaining_qty,uom,etat,prix_unitaire,remark,total,vehicule_number)
//     VALUES (${driver_Id},${driver_name},${idcom},${idprod},${item_id},${quantity},${remaining_qty},${uom},${etat},${prix_unitaire},${remark},${total},${vehicule_number});
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/detailcommande");
// }
// export async function upDateDetailCommande(
//   id: number,
//   data: Omit<DetailCommande, "iddetcom">
// ) {
//   const {
//     driver_Id,
//     driver_name,
//     idcom,
//     idprod,
//     item_id,
//     quantity,
//     remaining_qty,
//     uom,
//     etat,
//     prix_unitaire,
//     remark,
//     total,
//     vehicule_number,
//   } = data;
//   try {
//     await sql`UPDATE detailcommande
// SET driver_Id=${driver_Id},driver_name=${driver_name},idcom=${idcom},idprod=${idprod},item_id=${item_id},quantity=${quantity},remaining_qty=${remaining_qty},uom=${uom},etat=${etat},prix_unitaire=${prix_unitaire},remark=${remark},total=${total},vehicule_number=${vehicule_number}
// WHERE iddetcom = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/detailcommande");
// }
// export async function deleteDetailCommande(id: number) {
//   try {
//     await sql`
//     DELETE FROM detailcommande
//     WHERE iddetcom = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/detailcommande");
// }

// export async function addClient(data: Omit<Client, "idcl">) {
//   const date_inscription = new Date().toDateString();
//   const {
//     nom,
//     prenom,
//     avenue,
//     commune,
//     email,
//     numero,
//     numeroimpot,
//     quartier,
//     rccmm,
//     telephone,
//     type_client,
//     ville,
//     password,
//   } = data;
//   try {
//     await sql`
//     INSERT INTO client (nom,prenom,avenue,commune,date_inscription,email,numero,numeroimpot,quartier,rccmm,telephone,type_client,ville,password)
//     VALUES (${nom},${prenom},${avenue},${commune},${date_inscription},${email},${numero},${numeroimpot},${quartier},${rccmm},${telephone},${type_client},${ville},${password});
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/client");
// }
// export async function upDateClient(id: number, data: Omit<Client, "idcl">) {
//   const {
//     nom,
//     prenom,
//     avenue,
//     commune,
//     date_inscription,
//     email,
//     numero,
//     numeroimpot,
//     quartier,
//     rccmm,
//     telephone,
//     type_client,
//     ville,
//     password,
//   } = data;
//   try {
//     await sql`UPDATE client
// SET nom=${nom},prenom=${prenom},avenue=${avenue},commune=${commune},date_inscription=${date_inscription},email=${email},numero=${numero},numeroimpot=${numeroimpot},quartier=${quartier},rccmm=${rccmm},telephone=${telephone},type_client=${type_client},ville=${ville},password=${password}
// WHERE idcl = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/client");
// }
// export async function deleteClient(id: number) {
//   try {
//     await sql`
//     DELETE FROM client
//     WHERE idcl = ${id};
//   `;
//   } catch (error) {
//     throw new Error("erreur lors de l'opération");
//   }
//   revalidate();
//   redirect("/dashboard/client");
// }

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
