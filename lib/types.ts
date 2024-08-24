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
  matricule: string; // etudiant
  noms?: string; // etudiant
  codedepartement: string; //departement
  nom?: string; // departement
  dateinscription: string;
  promotion: string;
};

export type Departement = {
  codedepartement: string;
  nom: string;
};
