"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "@/components/ui/use-toast";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { addInscription, upDateInscription } from "@/lib/actions";

const FormSchema = z.object({
  matricule: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  codedepartement: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
  promotion: z.string().min(2, {
    message: "doit contenir aumoins 2 caractères.",
  }),
});
export function Formulaire({
  matricule = "",
  codedepartement = "",
  promotion = "",
  etudiants = [
    {
      matricule: 0,
      noms: "aucun étudiants",
    },
  ],
  departements = [
    {
      codedepartement: 0,
      nom: "aucun departements",
    },
  ],
}) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      matricule,
      codedepartement,
      promotion,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (matricule == "") {
      try {
        await addInscription(data);
        toast({
          title: "Ajouter",
          description: `l'inscription de ${matricule}  a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout de l'inscription`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateInscription(matricule, data);
        toast({
          title: "Modifier",
          description: `l'inscription ${matricule}  a été modifier avec succès`,
          className: "bg-blue-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur modifier",
          description: `Erreur lors de la modification`,
          className: "bg-red-700 text-white",
        });
      }
    }
    handleHidden();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        <FormField
          control={form.control}
          name="promotion"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Promotions</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner une promotion" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {["BAC1", "BAC2", "BAC3", "L1", "L2", "G1", "G2", "G3"].map(
                    (pres, index) => (
                      <SelectItem key={index} value={pres.toString()}>
                        {pres.toString()}
                      </SelectItem>
                    )
                  )}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="matricule"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Etudiant</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner un étudiant" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {etudiants.map((pres, index) => (
                    <SelectItem key={index} value={pres.matricule?.toString()}>
                      {pres.noms}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="codedepartement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Département</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value?.toString()}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectionner un département" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {departements.map((pres, index) => (
                    <SelectItem
                      key={index}
                      value={pres.codedepartement?.toString()}
                    >
                      {pres.nom}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="w-full"
          disabled={hidden}
          aria-disabled={hidden}
        >
          soumettre
        </Button>
      </form>
    </Form>
  );
}
