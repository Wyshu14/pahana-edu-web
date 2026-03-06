import { ChevronsRight, ReceiptText } from "lucide-react";
import { NavLink } from "react-router-dom";
import { memo, useMemo } from "react";

// Type definitions
interface BillRecord {
  id: number;
  customer: string;
  amount: string;
  date: Date;
}

interface BillTableProps {
  title?: string;
  maxHeight?: string;
  seeMoreLink?: string;
  bills?: BillRecord[];
  className?: string;
  showSeeMore?: boolean;
}

// Default data - in production this would come from props/API
const DEFAULT_BILLS: BillRecord[] = [
  { id: 1, customer: "John Doe", amount: "$100", date: new Date("2023-01-01") },
  {
    id: 2,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
  {
    id: 3,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
  {
    id: 4,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
  {
    id: 5,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
  {
    id: 6,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
  {
    id: 7,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
  {
    id: 8,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
  {
    id: 9,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
  {
    id: 10,
    customer: "Jane Smith",
    amount: "$200",
    date: new Date("2023-01-02"),
  },
];

const TABLE_HEADERS = ["ID", "Customer", "Amount", "Date"] as const;

interface TableHeaderProps {
  headers: readonly string[];
}

const TableHeader = memo<TableHeaderProps>(({ headers }) => (
  <thead className="bg-blue-600">
    <tr>
      {headers.map((header) => (
        <th
          key={header}
          scope="col"
          className="px-6 py-3 text-start text-sm text-white uppercase font-semibold"
        >
          {header}
        </th>
      ))}
    </tr>
  </thead>
));

TableHeader.displayName = "TableHeader";

interface TableRowProps {
  bill: BillRecord;
  index: number;
}

const TableRow = memo<TableRowProps>(({ bill, index }) => {
  const formattedDate = useMemo(
    () =>
      bill.date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      }),
    [bill.date]
  );

  return (
    <tr
      className="hover:bg-gray-50 dark:hover:bg-gray-600 transition-all duration-300"
      role="row"
    >
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        {bill.id}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        {bill.customer}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200 font-medium">
        {bill.amount}
      </td>
      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800 dark:text-neutral-200">
        <time
          dateTime={bill.date.toISOString()}
          title={bill.date.toLocaleString()}
        >
          {formattedDate}
        </time>
      </td>
    </tr>
  );
});

TableRow.displayName = "TableRow";

interface TableBodyProps {
  bills: BillRecord[];
}

const TableBody = memo<TableBodyProps>(({ bills }) => (
  <tbody className="divide-y divide-gray-100 dark:divide-neutral-700 bg-white dark:bg-gray-900">
    {bills.map((bill, index) => (
      <TableRow key={`${bill.id}-${index}`} bill={bill} index={index} />
    ))}
  </tbody>
));

TableBody.displayName = "TableBody";

interface EmptyStateProps {
  message?: string;
}

const EmptyState = memo<EmptyStateProps>(({ message = "No bills found" }) => (
  <div className="text-center py-8 text-gray-500 dark:text-gray-400">
    <ReceiptText
      size={48}
      className="mx-auto mb-4 opacity-50"
      aria-hidden="true"
    />
    <p>{message}</p>
  </div>
));

EmptyState.displayName = "EmptyState";

const BillTable = memo<BillTableProps>(
  ({
    title = "Recent bills",
    maxHeight = "212px",
    seeMoreLink = "/billing",
    bills = DEFAULT_BILLS,
    className = "",
    showSeeMore = true,
  }) => {
    const tableContainerStyle = useMemo(
      () => ({
        maxHeight: maxHeight,
      }),
      [maxHeight]
    );

    if (bills.length === 0) {
      return (
        <div
          className={`shadow-md rounded-md p-4 border border-stone-400/50 dark:border-gray-600 ${className}`.trim()}
        >
          <div className="flex items-center gap-2 mt-2 mb-4">
            <ReceiptText aria-hidden="true" />
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          </div>
          <EmptyState />
        </div>
      );
    }

    return (
      <div
        className={`shadow-md rounded-md p-4 border border-stone-400/50 dark:border-gray-600 ${className}`.trim()}
      >
        {/* Header */}
        <div className="flex items-center gap-2 mt-2 mb-4">
          <ReceiptText aria-hidden="true" />
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {title}
          </h2>
          <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
            {bills.length} bill{bills.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Table Container */}
        <div
          className="mt-8 overflow-hidden overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
          style={tableContainerStyle}
        >
          <div className="flex flex-col">
            <div className="-m-1.5">
              <div className="p-1.5 min-w-full inline-block align-middle">
                <div className="border border-gray-200 rounded-lg overflow-hidden dark:border-neutral-700">
                  <table
                    className="min-w-full divide-y divide-gray-200 dark:divide-neutral-700"
                    role="table"
                    aria-label={`${title} table`}
                  >
                    <TableHeader headers={TABLE_HEADERS} />
                    <TableBody bills={bills} />
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* See More Link */}
        {showSeeMore && (
          <div className="mt-2 flex justify-end">
            <NavLink
              to={seeMoreLink}
              className="flex items-center justify-center gap-1 underline text-blue-600 hover:text-blue-700 dark:text-blue-400 dark:hover:text-blue-300 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-sm"
              aria-label="View all bills"
            >
              <span>See more</span>
              <ChevronsRight className="w-5 h-5 mt-0.5" aria-hidden="true" />
            </NavLink>
          </div>
        )}
      </div>
    );
  }
);

BillTable.displayName = "BillTable";

export default BillTable;
export type { BillRecord, BillTableProps };
