/** Copyright © 2025 Qcells. All rights reserved.
This software is proprietary and confidential. Unauthorized use,
duplication, or distribution of software is strictly prohibited.
*/
import { Coin } from "@/types/coin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";

export const coinListColumns: ColumnDef<Coin>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
  },
  {
    accessorKey: "symbol",
    header: "Symbol",
  },
  {
    accessorKey: "rank",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Rank" />;
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
