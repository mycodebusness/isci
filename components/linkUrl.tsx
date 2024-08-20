"use client";

import {
  BookMinus,
  Home,
  ShoppingBasket,
  NotebookPen,
  Origami,
  Package2,
  LucideBadgeDollarSign,
  User,
  UserCog,
  Users,
  Warehouse,
} from "lucide-react";
import Link from "next/link";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { usePathname } from "next/navigation";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { toast } from "./ui/use-toast";

function LinkUrl() {
  const pathname = usePathname();

  return (
    <>
      <nav className="flex flex-col items-center gap-4 px-2 sm:py-5">
        <Link
          href="/"
          className="group flex h-9 w-9 shrink-0 items-center justify-center gap-2 rounded-full bg-primary text-lg font-semibold text-primary-foreground md:h-8 md:w-8 md:text-base"
        >
          <Package2 className="h-4 w-4 transition-all group-hover:scale-110" />
          <span className="sr-only">GCK Likasi</span>
        </Link>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard" ? "bg-muted text-primary" : null
                }`}
              >
                <Home className="h-5 w-5" />
                <span className="sr-only">Dashboard</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Dashboard</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/produit"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/produit"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <ShoppingBasket className="h-5 w-5" />
                <span className="sr-only">produit</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">produits</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/commande"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/commande"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <LucideBadgeDollarSign className="h-5 w-5" />
                <span className="sr-only">commandes</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">commandes</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/stock"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/stock"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <Warehouse className="h-5 w-5" />

                <span className="sr-only">stocks</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">stocks</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/client"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/client"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <Users className="h-5 w-5" />
                <span className="sr-only">Clients</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Clients</TooltipContent>
          </Tooltip>
        </TooltipProvider>
      </nav>
      <nav className="mt-auto flex flex-col items-center gap-4 px-2 sm:py-5">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link
                href="/dashboard/users"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  pathname == "/dashboard/users"
                    ? "bg-muted text-primary"
                    : null
                }`}
              >
                <UserCog className="h-5 w-5" />
                <span className="sr-only">Utilisateurs</span>
              </Link>
            </TooltipTrigger>
            <TooltipContent side="right">Utilisateurs</TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Avatar className="w-7 h-7 bg-blue-700 cursor-pointer" asChild>
              <User className="p-1" />
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Votre compte</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem
              onClick={async () => {
                const response = await fetch("/api/auth/logout");

                if (response.ok) {
                  // Redirige l'utilisateur après une connexion réussie
                  toast({
                    title: "Authentification",
                    description: `connexion avec succès`,
                    className: "bg-blue-700 text-white",
                  });
                  window.location.href = "/";
                } else {
                  toast({
                    title: "Erreur connexion",
                    description: `email ou mdp incorrectes`,
                    className: "bg-red-700 text-white",
                  });
                }
              }}
            >
              Se déconnecter
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </nav>
    </>
  );
}

export default LinkUrl;
