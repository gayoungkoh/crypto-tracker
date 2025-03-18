import { DataTable } from "primereact/datatable";
import { Column, ColumnProps } from "primereact/column";

import "primereact/resources/themes/tailwind-light/theme.css";

export const DataTablePrimeReact = <T extends object>({
  data,
  columns,
}: {
  data: T[];
  columns: ColumnProps[];
}) => {
  return (
    <DataTable
      size="small"
      showGridlines
      value={data}
      paginator
      rows={10}
      rowsPerPageOptions={[10, 20, 50]}
      sortMode="single"
    >
      {columns.map((col) => (
        <Column
          key={col.field}
          field={col.field}
          header={col.header}
          body={col.body}
          sortable={col.sortable}
        />
      ))}
    </DataTable>
  );
};
