"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addEtudiant } from "@/lib/actions";

export default function LoginForm() {
  const [matricule, setMatricule] = useState("");
  const [noms, setNoms] = useState("");
  const [sexe, setSexe] = useState("Homme");
  const [lieunaiss, setLieunaiss] = useState("");
  const [datenaiss, setDatenaiss] = useState("");
  const [nationalite, setNationalite] = useState("");
  const [etatcivil, setEtatCivil] = useState("");
  const [provinceorigine, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [territoire, setTerritoire] = useState("");
  const [adressetudiant, setAdresse] = useState("");
  const [telresponsable, setTelrespo] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [password, setPassword] = useState("");
  const [nomsrespo, setNomsRespo] = useState<string>("");
  const [profession, setProfession] = useState("");
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addEtudiant(
        matricule,
        noms,
        sexe,
        lieunaiss,
        datenaiss,
        nationalite,
        etatcivil,
        provinceorigine,
        district,
        territoire,
        adressetudiant,
        telresponsable,
        email,
        password,
        nomsrespo,
        profession
      );
      toast({
        title: "inscription",
        description: `Vous êtes inscrit avec succès`,
        className: "bg-blue-700 text-white",
      });
      window.location.href = `/etudiant/${matricule}`;
    } catch (error) {
      toast({
        title: "Erreur de création",
        description: `veuillez réesseyez plus tard`,
        className: "bg-red-700 text-white",
      });
    }
  };

  useEffect(() => {
    function generateMatricule(): string {
      const prefix = "ET";
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      const randomLetters = Array.from({ length: 4 }, () =>
        letters.charAt(Math.floor(Math.random() * letters.length))
      ).join("");

      // Obtenir les millisecondes depuis l'époque Unix (temps courant)
      const timestamp = Date.now();

      // Convertir les millisecondes en une chaîne de chiffres et en prendre les 6 premiers chiffres
      const randomNumbers = timestamp.toString().slice(-6);

      return `${prefix}${randomLetters}${randomNumbers}`;
    }

    // Exemple d'utilisation
    const mat = generateMatricule();
    setMatricule(mat);
  }, []);
  return (
    <Card className="mx-auto max-w-sm">
      <CardHeader>
        <CardTitle className="text-xl">S&apos;inscrire</CardTitle>
        <CardDescription>
          Entrer vos informations pour votre inscription
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="matricule">matricule</Label>
            <Input
              id="matricule"
              value={matricule}
              onChange={(e) => setMatricule(e.target.value)}
              required
              disabled
            />
          </div>{" "}
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="sexe">genre</Label>
              <Select
                onValueChange={(e) => {
                  setSexe(e.toString());
                }}
                defaultValue={sexe}
                name="sexe"
                required
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez le genre" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Genre</SelectLabel>
                    <SelectItem value="Homme">Homme</SelectItem>
                    <SelectItem value="Femme">Femme</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="etatcivil">Etat civil</Label>
              <Select
                required
                onValueChange={(e) => {
                  setEtatCivil(e.toString());
                }}
                defaultValue={etatcivil}
                name="etatcivil"
              >
                <SelectTrigger>
                  <SelectValue placeholder="Sélectionnez l'état civil" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>État Civil</SelectLabel>
                    <SelectItem value="Célibataire">Célibataire</SelectItem>
                    <SelectItem value="Marié">Marié</SelectItem>
                    <SelectItem value="Divorcé">Divorcé</SelectItem>
                    <SelectItem value="Veuf">Veuf</SelectItem>
                    <SelectItem value="Veuve">Veuve</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="noms">Nom complet</Label>
            <Input
              id="noms"
              placeholder="ex : KABANGU MULOTA Patrick"
              value={noms}
              onChange={(e) => setNoms(e.target.value)}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="province">Province</Label>

              <Select
                required
                onValueChange={(e) => {
                  setProvince(e.toString());
                }}
                defaultValue={provinceorigine}
                name="province"
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez une province" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Provinces de la RDC</SelectLabel>
                    <SelectItem value="Bas-Uele">Bas-Uele</SelectItem>
                    <SelectItem value="Équateur">Équateur</SelectItem>
                    <SelectItem value="Haut-Katanga">Haut-Katanga</SelectItem>
                    <SelectItem value="Haut-Lomami">Haut-Lomami</SelectItem>
                    <SelectItem value="Haut-Uele">Haut-Uele</SelectItem>
                    <SelectItem value="Ituri">Ituri</SelectItem>
                    <SelectItem value="Kasaï">Kasaï</SelectItem>
                    <SelectItem value="Kasaï-Central">Kasaï-Central</SelectItem>
                    <SelectItem value="Kasaï-Oriental">
                      Kasaï-Oriental
                    </SelectItem>
                    <SelectItem value="Kinshasa">Kinshasa</SelectItem>
                    <SelectItem value="Kongo-Central">Kongo-Central</SelectItem>
                    <SelectItem value="Kwango">Kwango</SelectItem>
                    <SelectItem value="Kwilu">Kwilu</SelectItem>
                    <SelectItem value="Lomami">Lomami</SelectItem>
                    <SelectItem value="Lualaba">Lualaba</SelectItem>
                    <SelectItem value="Mai-Ndombe">Mai-Ndombe</SelectItem>
                    <SelectItem value="Maniema">Maniema</SelectItem>
                    <SelectItem value="Mongala">Mongala</SelectItem>
                    <SelectItem value="Nord-Kivu">Nord-Kivu</SelectItem>
                    <SelectItem value="Nord-Ubangi">Nord-Ubangi</SelectItem>
                    <SelectItem value="Sankuru">Sankuru</SelectItem>
                    <SelectItem value="Sud-Kivu">Sud-Kivu</SelectItem>
                    <SelectItem value="Sud-Ubangi">Sud-Ubangi</SelectItem>
                    <SelectItem value="Tanganyika">Tanganyika</SelectItem>
                    <SelectItem value="Tshopo">Tshopo</SelectItem>
                    <SelectItem value="Tshuapa">Tshuapa</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="territoire">Territoire</Label>
              <Select
                onValueChange={(e) => {
                  setTerritoire(e.toString());
                }}
                defaultValue={territoire}
                name="territoire"
                required
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Sélectionnez un territoire" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Territoires par Province</SelectLabel>

                    {/* Bas-Uele */}
                    <SelectItem value="Aketi">Bas-Uele - Aketi</SelectItem>
                    <SelectItem value="Ango">Bas-Uele - Ango</SelectItem>
                    <SelectItem value="Bondo">Bas-Uele - Bondo</SelectItem>
                    <SelectItem value="Buta">Bas-Uele - Buta</SelectItem>
                    <SelectItem value="Poko">Bas-Uele - Poko</SelectItem>

                    {/* Équateur */}
                    <SelectItem value="Bomongo">Équateur - Bomongo</SelectItem>
                    <SelectItem value="Bikoro">Équateur - Bikoro</SelectItem>
                    <SelectItem value="Ingende">Équateur - Ingende</SelectItem>
                    <SelectItem value="Lukolela">
                      Équateur - Lukolela
                    </SelectItem>
                    <SelectItem value="Makanza">Équateur - Makanza</SelectItem>
                    <SelectItem value="Bolomba">Équateur - Bolomba</SelectItem>
                    <SelectItem value="Bolenge">Équateur - Bolenge</SelectItem>

                    {/* Haut-Katanga */}
                    <SelectItem value="Kambove">
                      Haut-Katanga - Kambove
                    </SelectItem>
                    <SelectItem value="Kasenga">
                      Haut-Katanga - Kasenga
                    </SelectItem>
                    <SelectItem value="Kipushi">
                      Haut-Katanga - Kipushi
                    </SelectItem>
                    <SelectItem value="Mitwaba">
                      Haut-Katanga - Mitwaba
                    </SelectItem>
                    <SelectItem value="Pweto">Haut-Katanga - Pweto</SelectItem>
                    <SelectItem value="Sakania">
                      Haut-Katanga - Sakania
                    </SelectItem>

                    {/* Haut-Lomami */}
                    <SelectItem value="Bukama">Haut-Lomami - Bukama</SelectItem>
                    <SelectItem value="Kabongo">
                      Haut-Lomami - Kabongo
                    </SelectItem>
                    <SelectItem value="Kaniama">
                      Haut-Lomami - Kaniama
                    </SelectItem>
                    <SelectItem value="Malemba-Nkulu">
                      Haut-Lomami - Malemba-Nkulu
                    </SelectItem>

                    {/* Haut-Uele */}
                    <SelectItem value="Dungu">Haut-Uele - Dungu</SelectItem>
                    <SelectItem value="Faradje">Haut-Uele - Faradje</SelectItem>
                    <SelectItem value="Niangara">
                      Haut-Uele - Niangara
                    </SelectItem>
                    <SelectItem value="Rungu">Haut-Uele - Rungu</SelectItem>
                    <SelectItem value="Wamba">Haut-Uele - Wamba</SelectItem>

                    {/* Ituri */}
                    <SelectItem value="Aru">Ituri - Aru</SelectItem>
                    <SelectItem value="Djugu">Ituri - Djugu</SelectItem>
                    <SelectItem value="Irumu">Ituri - Irumu</SelectItem>
                    <SelectItem value="Mahagi">Ituri - Mahagi</SelectItem>
                    <SelectItem value="Mambasa">Ituri - Mambasa</SelectItem>

                    {/* Kasaï */}
                    <SelectItem value="Dekese">Kasaï - Dekese</SelectItem>
                    <SelectItem value="Ilebo">Kasaï - Ilebo</SelectItem>
                    <SelectItem value="Luebo">Kasaï - Luebo</SelectItem>
                    <SelectItem value="Mweka">Kasaï - Mweka</SelectItem>
                    <SelectItem value="Tshikapa">Kasaï - Tshikapa</SelectItem>

                    {/* Kasaï-Central */}
                    <SelectItem value="Demba">Kasaï-Central - Demba</SelectItem>
                    <SelectItem value="Dimbelenge">
                      Kasaï-Central - Dimbelenge
                    </SelectItem>
                    <SelectItem value="Kazumba">
                      Kasaï-Central - Kazumba
                    </SelectItem>
                    <SelectItem value="Luiza">Kasaï-Central - Luiza</SelectItem>

                    {/* Kasaï-Oriental */}
                    <SelectItem value="Kabeya-Kamwanga">
                      Kasaï-Oriental - Kabeya-Kamwanga
                    </SelectItem>
                    <SelectItem value="Katanda">
                      Kasaï-Oriental - Katanda
                    </SelectItem>
                    <SelectItem value="Lupatapata">
                      Kasaï-Oriental - Lupatapata
                    </SelectItem>
                    <SelectItem value="Miabi">
                      Kasaï-Oriental - Miabi
                    </SelectItem>
                    <SelectItem value="Tshilenge">
                      Kasaï-Oriental - Tshilenge
                    </SelectItem>

                    {/* Kinshasa */}
                    <SelectItem value="Mont-Ngafula">
                      Kinshasa - Mont-Ngafula
                    </SelectItem>
                    <SelectItem value="Masina">Kinshasa - Masina</SelectItem>
                    <SelectItem value="Ngaliema">
                      Kinshasa - Ngaliema
                    </SelectItem>
                    <SelectItem value="Nsele">Kinshasa - Nsele</SelectItem>
                    <SelectItem value="Selembao">
                      Kinshasa - Selembao
                    </SelectItem>

                    {/* Kongo-Central */}
                    <SelectItem value="Boma">Kongo-Central - Boma</SelectItem>
                    <SelectItem value="Kasangulu">
                      Kongo-Central - Kasangulu
                    </SelectItem>
                    <SelectItem value="Luozi">Kongo-Central - Luozi</SelectItem>
                    <SelectItem value="Madimba">
                      Kongo-Central - Madimba
                    </SelectItem>
                    <SelectItem value="Mbanza-Ngungu">
                      Kongo-Central - Mbanza-Ngungu
                    </SelectItem>
                    <SelectItem value="Muanda">
                      Kongo-Central - Muanda
                    </SelectItem>
                    <SelectItem value="Tshela">
                      Kongo-Central - Tshela
                    </SelectItem>

                    {/* Kwango */}
                    <SelectItem value="Kenge">Kwango - Kenge</SelectItem>
                    <SelectItem value="Kasongo-Lunda">
                      Kwango - Kasongo-Lunda
                    </SelectItem>
                    <SelectItem value="Feshi">Kwango - Feshi</SelectItem>
                    <SelectItem value="Kahemba">Kwango - Kahemba</SelectItem>
                    <SelectItem value="Popokabaka">
                      Kwango - Popokabaka
                    </SelectItem>

                    {/* Kwilu */}
                    <SelectItem value="Bagata">Kwilu - Bagata</SelectItem>
                    <SelectItem value="Bulungu">Kwilu - Bulungu</SelectItem>
                    <SelectItem value="Gungu">Kwilu - Gungu</SelectItem>
                    <SelectItem value="Idiofa">Kwilu - Idiofa</SelectItem>
                    <SelectItem value="Masi-Manimba">
                      Kwilu - Masi-Manimba
                    </SelectItem>

                    {/* Lomami */}
                    <SelectItem value="Kabinda">Lomami - Kabinda</SelectItem>
                    <SelectItem value="Kamiji">Lomami - Kamiji</SelectItem>
                    <SelectItem value="Luilu">Lomami - Luilu</SelectItem>
                    <SelectItem value="Ngandajika">
                      Lomami - Ngandajika
                    </SelectItem>

                    {/* Lualaba */}
                    <SelectItem value="Dilolo">Lualaba - Dilolo</SelectItem>
                    <SelectItem value="Kapanga">Lualaba - Kapanga</SelectItem>
                    <SelectItem value="Kasaji">Lualaba - Kasaji</SelectItem>
                    <SelectItem value="Mutshatsha">
                      Lualaba - Mutshatsha
                    </SelectItem>

                    {/* Mai-Ndombe */}
                    <SelectItem value="Inongo">Mai-Ndombe - Inongo</SelectItem>
                    <SelectItem value="Kiri">Mai-Ndombe - Kiri</SelectItem>
                    <SelectItem value="Kutu">Mai-Ndombe - Kutu</SelectItem>
                    <SelectItem value="Oshwe">Mai-Ndombe - Oshwe</SelectItem>
                    <SelectItem value="Yumbi">Mai-Ndombe - Yumbi</SelectItem>

                    {/* Maniema */}
                    <SelectItem value="Kabambare">
                      Maniema - Kabambare
                    </SelectItem>
                    <SelectItem value="Kasongo">Maniema - Kasongo</SelectItem>
                    <SelectItem value="Kibombo">Maniema - Kibombo</SelectItem>
                    <SelectItem value="Lubutu">Maniema - Lubutu</SelectItem>
                    <SelectItem value="Pangi">Maniema - Pangi</SelectItem>
                    <SelectItem value="Punia">Maniema - Punia</SelectItem>

                    {/* Mongala */}
                    <SelectItem value="Bumba">Mongala - Bumba</SelectItem>
                    <SelectItem value="Lisala">Mongala - Lisala</SelectItem>
                    <SelectItem value="Yahuma">Mongala - Yahuma</SelectItem>

                    {/* Nord-Kivu */}
                    <SelectItem value="Beni">Nord-Kivu - Beni</SelectItem>
                    <SelectItem value="Goma">Nord-Kivu - Goma</SelectItem>
                    <SelectItem value="Masisi">Nord-Kivu - Masisi</SelectItem>
                    <SelectItem value="Lubero">Nord-Kivu - Lubero</SelectItem>
                    <SelectItem value="Nyiragongo">
                      Nord-Kivu - Nyiragongo
                    </SelectItem>
                    <SelectItem value="Rutshuru">
                      Nord-Kivu - Rutshuru
                    </SelectItem>
                    <SelectItem value="Walikale">
                      Nord-Kivu - Walikale
                    </SelectItem>

                    {/* Nord-Ubangi */}
                    <SelectItem value="Businga">
                      Nord-Ubangi - Businga
                    </SelectItem>
                    <SelectItem value="Bosobolo">
                      Nord-Ubangi - Bosobolo
                    </SelectItem>
                    <SelectItem value="Mobayi-Mbongo">
                      Nord-Ubangi - Mobayi-Mbongo
                    </SelectItem>
                    <SelectItem value="Yakoma">Nord-Ubangi - Yakoma</SelectItem>

                    {/* Sankuru */}
                    <SelectItem value="Katako-Kombe">
                      Sankuru - Katako-Kombe
                    </SelectItem>
                    <SelectItem value="Lodja">Sankuru - Lodja</SelectItem>
                    <SelectItem value="Lubefu">Sankuru - Lubefu</SelectItem>
                    <SelectItem value="Lusambo">Sankuru - Lusambo</SelectItem>
                    <SelectItem value="Tshumbe">Sankuru - Tshumbe</SelectItem>

                    {/* Sud-Kivu */}
                    <SelectItem value="Fizi">Sud-Kivu - Fizi</SelectItem>
                    <SelectItem value="Idjwi">Sud-Kivu - Idjwi</SelectItem>
                    <SelectItem value="Kabare">Sud-Kivu - Kabare</SelectItem>
                    <SelectItem value="Kalehe">Sud-Kivu - Kalehe</SelectItem>
                    <SelectItem value="Mwenga">Sud-Kivu - Mwenga</SelectItem>
                    <SelectItem value="Shabunda">
                      Sud-Kivu - Shabunda
                    </SelectItem>
                    <SelectItem value="Uvira">Sud-Kivu - Uvira</SelectItem>
                    <SelectItem value="Walungu">Sud-Kivu - Walungu</SelectItem>

                    {/* Sud-Ubangi */}
                    <SelectItem value="Budjala">
                      Sud-Ubangi - Budjala
                    </SelectItem>
                    <SelectItem value="Gemena">Sud-Ubangi - Gemena</SelectItem>
                    <SelectItem value="Kungu">Sud-Ubangi - Kungu</SelectItem>
                    <SelectItem value="Libenge">
                      Sud-Ubangi - Libenge
                    </SelectItem>
                    <SelectItem value="Zongo">Sud-Ubangi - Zongo</SelectItem>

                    {/* Tanganyika */}
                    <SelectItem value="Kalemie">
                      Tanganyika - Kalemie
                    </SelectItem>
                    <SelectItem value="Kongolo">
                      Tanganyika - Kongolo
                    </SelectItem>
                    <SelectItem value="Manono">Tanganyika - Manono</SelectItem>
                    <SelectItem value="Moba">Tanganyika - Moba</SelectItem>
                    <SelectItem value="Nyunzu">Tanganyika - Nyunzu</SelectItem>

                    {/* Tshopo */}
                    <SelectItem value="Bafwasende">
                      Tshopo - Bafwasende
                    </SelectItem>
                    <SelectItem value="Banalia">Tshopo - Banalia</SelectItem>
                    <SelectItem value="Basoko">Tshopo - Basoko</SelectItem>
                    <SelectItem value="Isangi">Tshopo - Isangi</SelectItem>
                    <SelectItem value="Opala">Tshopo - Opala</SelectItem>
                    <SelectItem value="Ubundu">Tshopo - Ubundu</SelectItem>
                    <SelectItem value="Yahisuli">Tshopo - Yahisuli</SelectItem>

                    {/* Tshuapa */}
                    <SelectItem value="Boende">Tshuapa - Boende</SelectItem>
                    <SelectItem value="Bokungu">Tshuapa - Bokungu</SelectItem>
                    <SelectItem value="Djolu">Tshuapa - Djolu</SelectItem>
                    <SelectItem value="Ikela">Tshuapa - Ikela</SelectItem>
                    <SelectItem value="Monkoto">Tshuapa - Monkoto</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="district">district</Label>
              <Input
                id="district"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="lieunaiss">lieu naissance</Label>
              <Input
                id="lieunaiss"
                value={lieunaiss}
                onChange={(e) => setLieunaiss(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="grid gap-2">
              <Label htmlFor="datenaiss">date naissance</Label>
              <Input
                id="datenaiss"
                name="datenaiss"
                value={datenaiss}
                type="date"
                onChange={(e) => setDatenaiss(e.target.value)}
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nationalite">nationalité</Label>
              <Input
                id="nationalite"
                name="nationalite"
                value={nationalite}
                onChange={(e) => setNationalite(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="adressetudiant">adresse étudiant</Label>
            <Input
              id="adressetudiant"
              name="adressetudiant"
              value={adressetudiant}
              onChange={(e) => setAdresse(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              name="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">password</Label>
            <Input
              id="password"
              type="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <p>Information sur le responsable</p>
          <div className="grid gap-2">
            <Label htmlFor="nomsrespo">noms</Label>
            <Input
              id="nomsrespo"
              name="telresponsable"
              value={nomsrespo}
              onChange={(e) => setNomsRespo(e.target.value)}
              required
            />
          </div>{" "}
          <div className="grid gap-2">
            <Label htmlFor="telresponsable">téléphone</Label>
            <Input
              id="telresponsable"
              name="telresponsable"
              placeholder="0... ou +243..."
              value={telresponsable}
              onChange={(e) => setTelrespo(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="profession">profession</Label>
            <Input
              id="profession"
              name="profession"
              value={profession}
              onChange={(e) => setProfession(e.target.value)}
              required
            />
          </div>
          <Button type="submit" className="w-full">
            S&apos;inscrire
          </Button>
        </form>
        <div className="mt-4 text-center text-sm">
          Etes-vous déjà inscrit?{" "}
          <Link href="/login" className="underline">
            Se connecter
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
