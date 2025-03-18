import { Coin } from "@/types/coin";
import { DataTable } from "@/components/data-table";
import { coinListColumns } from "@/components/coin-list-config";

export const CoinListTable = ({ coinList }: { coinList: Coin[] }) => {
  return <DataTable data={coinList} columns={coinListColumns} />;
};
