import { Coin } from "@/types/coin";
import { DataTable } from "@/components/data-table";
import {
  coinListColumns,
  coinListColumnsPrimeReact,
} from "@/components/coin-list-config";
import { DataTablePrimeReact } from "@/components/data-table-prime-react";

export const CoinListTable = ({ coinList }: { coinList: Coin[] }) => {
  return (
    <>
      <DataTable data={coinList} columns={coinListColumns} />
      <DataTablePrimeReact
        data={coinList}
        columns={coinListColumnsPrimeReact}
      />
    </>
  );
};
