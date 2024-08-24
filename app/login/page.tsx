// // pages/auth/signin.tsx
"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "@/components/ui/use-toast";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    if (response.ok) {
      // Redirige l'utilisateur après une connexion réussie
      toast({
        title: "Authentification",
        description: `connexion avec succès`,
        className: "bg-blue-700 text-white",
      });
      window.location.href = `/etudiant`;
    } else {
      const data = await response.json();
      setError(data.error);
      toast({
        title: "Erreur connexion",
        description: `email ou mdp incorrectes`,
        className: "bg-red-700 text-white",
      });
    }
  };

  return (
    <div className="w-full flex h-screen justify-center items-center">
      <div className=" text-center w-[350px] flex flex-col">
        <div>
          <h1 className="text-3xl font-bold">Se connecter</h1>
          <p className="text-balance text-muted-foreground">
            Entrer vos informations pour vous connecter
          </p>
        </div>
        <form onSubmit={handleSubmit} className="grid gap-4">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="m@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="grid gap-2">
            <div className="flex items-center">
              <Label htmlFor="password">Mot de passe</Label>
            </div>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          {error && <div className="text-red-500">{error}</div>}
          <Button type="submit" className="w-full">
            Connecter
          </Button>
        </form>
      </div>
    </div>
  );
}
