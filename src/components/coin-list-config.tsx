/** Copyright © 2025 Qcells. All rights reserved.
This software is proprietary and confidential. Unauthorized use,
duplication, or distribution of software is strictly prohibited.
*/
import { Coin } from "@/types/coin";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { ArrowUpDown } from "lucide-react";

export const coinListColumns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "rank",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Rank
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "is_new",
    header: "Is New",
    cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "is_active",
    header: "Is Active",
    cell: ({ cell }) => (cell.getValue() ? "Yes" : "No"),
  },
  {
    accessorKey: "type",
    header: "Type",
  },
];
