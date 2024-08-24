"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import {
  ArrowUpDown,
  Plus,
  Pen,
  Delete,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Inscription as Payment } from "@/lib/types";
import Link from "next/link";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { toast } from "@/components/ui/use-toast";
import { deleteInscription } from "@/lib/actions";

// matricule: string;
//     codedepartement: string;
//     dateinscription: string;
//     promotion: "BAC1"

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "matricule",
    header: "Id",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("matricule")}</div>
    ),
  },
  {
    accessorKey: "noms",
    header: "noms étudiant",
    cell: ({ row }) => <div className="capitalize">{row.getValue("noms")}</div>,
  },
  {
    accessorKey: "dateinscription",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Date Inscription
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="capitalize">
        {new Date(
          row.original.dateinscription || Date.now()
        )?.toLocaleDateString("fr-FR", {
          month: "short",
          day: "numeric",
          year: "numeric",
        }) || ""}
      </div>
    ),
  },
  {
    accessorKey: "nom",
    header: "département",
    cell: ({ row }) => <div className="capitalize">{row.getValue("nom")}</div>,
  },
  {
    accessorKey: "promotion",
    header: "Promotion",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("promotion")}</div>
    ),
  },

  {
    header: "Actions",
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      return (
        <div className="flex gap-3">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex gap-3"
                  href={`/dashboard/inscription/ajouter`}
                >
                  <Plus className="h-7 w-7 rounded-full text-white bg-green-800 hover:bg-green-600 p-2" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2 justify-center items-center">
                <Plus className="h-6 w-6 rounded-full" />
                <p>Ajouter une inscription</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Link
                  className="flex gap-3"
                  href={`/dashboard/inscription/${row.original.matricule}`}
                >
                  <Pen className="h-7 w-7 rounded-full text-white bg-blue-800 hover:bg-blue-600  p-2" />
                </Link>
              </TooltipTrigger>
              <TooltipContent className="flex gap-2 justify-center items-center">
                <Pen className="h-6 w-6 rounded-full" />
                <p>modifier l&apos;inscription de {row.original.matricule}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>

          <Dialog>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <DialogTrigger asChild>
                    <Delete className="h-7 w-7 rounded-full text-white bg-red-800 hover:bg-red-600 p-2 cursor-pointer" />
                  </DialogTrigger>
                </TooltipTrigger>
                <TooltipContent className="flex gap-2 justify-center items-center">
                  <Delete className="h-6 w-6 rounded-full" />
                  <p>
                    supprimer l&apos; inscription {row.original.codedepartement}
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>

            <DialogContent>
              <DialogHeader>
                <DialogTitle> Suppression inscription</DialogTitle>
                <DialogDescription>
                  Etes-vous sur de supprimer l&apos;inscription de{" "}
                  {row.original.noms} définitivement?
                </DialogDescription>
              </DialogHeader>

              <DialogFooter className="justify-end">
                <DialogClose asChild>
                  <Button type="button" variant="secondary">
                    Fermer
                  </Button>
                </DialogClose>
                <Button
                  variant="destructive"
                  onClick={async () => {
                    try {
                      await deleteInscription(row.original.matricule);
                      toast({
                        title: "Supprimer",
                        description: `l'inscription de ${row.original.noms} a été supprimer avec succès`,
                        className: "bg-green-700 text-white",
                      });
                    } catch (error) {
                      toast({
                        title: "Erreur supprimer",
                        description: `Erreur lors de la suppression de la categorie`,
                        className: "bg-red-700 text-white",
                      });
                    }
                  }}
                >
                  Confirmer
                </Button>
              </DialogFooter>
            </DialogContent>
          </Dialog>
        </div>
      );
    },
  },
];

export function DataTable({ data }: { data: Payment[] }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pageSize, setPageSize] = React.useState(6);
  const [pageIndex, setPageIndex] = React.useState(0);

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
      pagination: {
        pageIndex,
        pageSize,
      },
    },
  });

  return (
    <div className="w-full px-4 pt-4">
      <div className="flex items-center pb-4">
        <Input
          placeholder="Rechercher stock..."
          value={(table.getColumn("idstock")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("idstock")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Aucun resultat.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          Total : {table.getFilteredRowModel().rows.length} inscription(s).
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            onClick={() => {
              setPageIndex((prevPageIndex) => prevPageIndex - 1);
              table.previousPage();
            }}
            disabled={!table.getCanPreviousPage()}
            size="icon"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button
            variant="outline"
            onClick={() => {
              setPageIndex((prevPageIndex) => prevPageIndex + 1);
              table.nextPage();
            }}
            disabled={!table.getCanNextPage()}
            size="icon"
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
