import { LayersIcon, PercentIcon } from "lucide-react";
import { Link } from "react-router";
import { classes, conditionalClasses } from "../utils/css";

enum TableStatus {
  open = "open",
  closed = "closed",
  paying = "paying",
}

function TableComponent({ tableNumber }: { tableNumber: number }) {
  const table = {
    tableNumber,
    multiplyTabs: true,
    hasDiscount: true,
    status: TableStatus.closed,
  };
  return (
    <Link
      to={`/table/${tableNumber}`}
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
      {table.status !== TableStatus.closed && (
        <div className="text-xs">1:20 PM</div>
      )}
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

function generateTables() {
  const tables: number[] = [];
  for (let index = 1; index <= 100; index++) {
    tables.push(index);
  }
  return tables;
}

export default function HomePage() {
  const tables = generateTables();
  return (
    <div className="grid grid-cols-4 sm:grid-cols-6 md:grid-cols-8 lg:grid-cols-10 xl:grid-cols-12 gap-2 ">
      {tables.map((tableNumber) => (
        <TableComponent key={tableNumber} tableNumber={tableNumber} />
      ))}
    </div>
  );
}
