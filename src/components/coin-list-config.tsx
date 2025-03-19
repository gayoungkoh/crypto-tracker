/** Copyright © 2025 Qcells. All rights reserved.
This software is proprietary and confidential. Unauthorized use,
duplication, or distribution of software is strictly prohibited.
*/
import { Coin } from "@/types/coin";
import { ColumnDef } from "@tanstack/react-table";
import { DataTableColumnHeader } from "@/components/data-table";
import { ColumnProps } from "primereact/column";

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

export const coinListColumnsPrimeReact: ColumnProps[] = [
  {
    field: "name",
    header: "Name",
    sortable: true,
  },
  {
    field: "symbol",
    header: "Symbol",
  },
  {
    field: "rank",
    header: "Rank",
    sortable: true,
  },
  {
    field: "is_new",
    header: "Is New",
    body: (value) => (value.is_new ? "Yes" : "No"),
  },
  {
    field: "is_active",
    header: "Is Active",
    body: (value) => (value.is_active ? "Yes" : "No"),
  },
  {
    field: "type",
    header: "Type",
  },
];
