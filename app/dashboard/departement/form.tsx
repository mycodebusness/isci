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
import { addDepartement, upDateDepartement } from "@/lib/actions";

const FormSchema = z.object({
  codedepartement: z.string().min(2, {
    message: "le nom doit contenir aumoins 2 caractères.",
  }),
  nom: z.string().min(2, {
    message: "le nom doit contenir aumoins 2 caractères.",
  }),
});

export function Formulaire({ codedepartement = "", nom = "" }) {
  const [hidden, setHidden] = useState(false);
  const handleHidden = () => {
    setHidden((v) => !v);
  };
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      codedepartement,
      nom,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    handleHidden();
    if (codedepartement == "") {
      try {
        await addDepartement(data);
        toast({
          title: "Ajouter",
          description: `le département ${data.nom}  a été ajouter avec succès`,
          className: "bg-green-700 text-white",
        });
      } catch (error) {
        toast({
          title: "Erreur ajouter",
          description: `erreur d'ajout du produit`,
          className: "bg-red-700 text-white",
        });
      }
    } else {
      try {
        await upDateDepartement(codedepartement, data);
        toast({
          title: "Modifier",
          description: `le département ${data.nom}  a été modifier avec succès`,
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-2/3 space-y-6">
        <FormField
          control={form.control}
          name="codedepartement"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Code département</FormLabel>
              <FormControl>
                {codedepartement == "" ? (
                  <Input {...field} />
                ) : (
                  <Input disabled {...field} />
                )}
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nom"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nom département</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={hidden} aria-disabled={hidden}>
          soumettre
        </Button>
      </form>
    </Form>
  );
}
