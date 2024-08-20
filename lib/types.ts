export type Utilisateur = {
  iduser: number;
  nom: string;
  email: string;
  role: string;
  password: string;
};

export type Etudiant = {
  matricule: string;
  noms: string;
  sexe: string;
  lieunaiss: string;
  datenaiss: string;
  nationalite: string;
  etatcivil?: string;
  provinceorigine?: string;
  district?: string;
  territoire?: string;
  adressetudiant?: string;
  telresponsable: string;
  email: string;
  password: string;
};

export type Responsable = {
  telresponsable: string;
  noms: string;
  profession?: string;
};

export type Recu = {
  numrecu: number;
  matricule: string;
  montant: number;
  motif: string;
  departement: string;
  promotion: string;
};

export type Inscription = {
  matricule: string;
  codedepartement: string;
  dateinscription: string;
  promotion: "BAC1" | "BAC2" | "BAC3" | "L1" | "L2" | "G1" | "G2" | "G3";
};

export type Departement = {
  codedepartement: string;
  nom: string;
};
