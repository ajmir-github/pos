import { LayersIcon, PercentIcon } from "lucide-react";
import { Link } from "react-router";
import { classes, conditionalClasses } from "../utils/css";

enum TableStatus {
  open = "open",
  closed = "closed",
  paying = "paying",
}

interface Table {
  tableNumber: number;
  status: TableStatus;
  multiplyTabs: boolean;
  hasDiscount: boolean;
  createdAt: Date;
}

function TableComponent({ table }: { table: Table }) {
  return (
    <Link
      to={`/table/${table.tableNumber}`}
      className={classes(
        "rounded aspect-square flex justify-center items-center flex-col",
        conditionalClasses(
          table.status,
          {
            [TableStatus.open]: "bg-green-700",
            [TableStatus.closed]: "bg-gray-700",
            [TableStatus.paying]: "bg-yellow-700",
          },
          "bg-red-700"
        )
      )}
    >
      {/* {table.status !== TableStatus.closed && (
        <div className="text-xs">{table.createdAt.getTime()}</div>
      )} */}
      <div className="text-base sm:text-xl font-bold">{table.tableNumber}</div>
      {table.status !== TableStatus.closed && (
        <div className="flex justify-around w-full">
          {table.hasDiscount && <LayersIcon size={14} />}
          {table.multiplyTabs && <PercentIcon size={14} />}
        </div>
      )}
    </Link>
  );
}

export default function HomePage() {
  // const tables = useAppSelector((state) => getTables(state.tab));
  const tables: any[] = [];
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 ">
      {tables.map((table) => (
        <TableComponent key={table.tableNumber} table={table} />
      ))}
    </div>
  );
}
