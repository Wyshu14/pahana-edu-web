import { Search, UserCog, UserRoundPlus, X } from "lucide-react";
import { memo, useCallback, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import CustomersTable from "./CustomersTable";
import type { Customer } from "../../types";

interface AddCustomerDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (customer: Omit<Customer, "id">) => void;
}

const AddCustomerDialog = memo<AddCustomerDialogProps>(
  ({ open, onOpenChange, onSave }) => {
    const [formData, setFormData] = useState({
      accountNo: "",
      name: "",
      phone: "",
      address: "",
    });

    // Reset form when dialog opens
    useEffect(() => {
      if (open) {
        setFormData({
          accountNo: "",
          name: "",
          phone: "",
          address: "",
        });
      }
    }, [open]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (
          formData.name.trim() &&
          formData.phone.trim() &&
          formData.address.trim() &&
          formData.accountNo.trim()
        ) {
          onSave(formData);
          onOpenChange(false);
        }
      },
      [formData, onSave, onOpenChange]
    );

    const handleInputChange = useCallback(
      (field: keyof typeof formData, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
      []
    );

    const generateAccountNo = useCallback(() => {
      const timestamp = Date.now().toString().slice(-6);
      const randomNum = Math.floor(Math.random() * 1000)
        .toString()
        .padStart(3, "0");
      const accountNo = `ACC${timestamp}${randomNum}`;
      handleInputChange("accountNo", accountNo);
    }, [handleInputChange]);

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Add New Customer
                </Dialog.Title>
                <Dialog.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:ring-offset-gray-800">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="accountNo"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Account Number
                  </label>
                  <div className="flex gap-2">
                    <input
                      id="accountNo"
                      type="text"
                      value={formData.accountNo}
                      onChange={(e) =>
                        handleInputChange("accountNo", e.target.value)
                      }
                      placeholder="ACC1001"
                      className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                      required
                    />
                    <button
                      type="button"
                      onClick={generateAccountNo}
                      className="px-3 py-2 text-xs font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      Generate
                    </button>
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Full Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="John Doe"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone Number
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    placeholder="555-123-4567"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    value={formData.address}
                    onChange={(e) =>
                      handleInputChange("address", e.target.value)
                    }
                    placeholder="123 Main St, City, State"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100 resize-none"
                    required
                  />
                </div>

                <div className="flex justify-end gap-2 pt-4">
                  <Dialog.Close asChild>
                    <button
                      type="button"
                      className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400"
                    >
                      Cancel
                    </button>
                  </Dialog.Close>
                  <button
                    type="submit"
                    className="px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    Add Customer
                  </button>
                </div>
              </form>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

AddCustomerDialog.displayName = "AddCustomerDialog";

interface HeaderProps {
  onAddCustomer: (customer: Omit<Customer, "id">) => void;
}

const Header = memo<HeaderProps>(({ onAddCustomer }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddCustomer = useCallback(
    (customerData: Omit<Customer, "id">) => {
      onAddCustomer(customerData);
      setShowAddDialog(false);
    },
    [onAddCustomer]
  );

  return (
    <>
      <div className="flex items-center justify-between rounded-md px-4">
        <div className="flex items-center justify-start gap-2">
          <UserCog className="aspect-square" size={48} />
          <div>
            <h1 className="font-semibold text-lg">Manage Customers</h1>
            <p className="text-sm text-gray-500">
              Manage your customer database
            </p>
          </div>
        </div>
        <button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center justify-center gap-2 p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <UserRoundPlus />
          <span>Add customer</span>
        </button>
      </div>

      <AddCustomerDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSave={handleAddCustomer}
      />
    </>
  );
});

Header.displayName = "Header";

const SearchCustomer = memo(() => {
  const [query, setQuery] = useState("");

  const handleSearch = useCallback(() => {
    if (!query.trim()) return; // safety check
    console.log("Search term:", query);
    // You can return query or trigger API call here
    setQuery("");
  }, [query]);

  const handleClear = useCallback(() => {
    setQuery("");
  }, []);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (e.key === "Enter") {
        handleSearch();
      }
    },
    [handleSearch]
  );

  return (
    <div className="flex items-center justify-between gap-2 mt-4 border border-stone-400/50 shadow-sm rounded-md py-3 px-4">
      {/* Input field */}
      <div className="relative flex w-full">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-600" />
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search customers by name, account number, or phone..."
          className="rounded-md p-2 pl-10 w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 border border-stone-400 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-100"
        />
      </div>

      {/* Buttons */}
      <div className="flex items-center justify-between gap-2 min-w-[150px]">
        <button
          onClick={handleSearch}
          disabled={!query.trim()}
          className={`rounded-md px-4 py-2 border font-semibold text-sm transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500
            ${
              query.trim()
                ? "flex-[2] cursor-pointer bg-blue-600 text-white hover:bg-blue-700 border-blue-600"
                : "flex-1 w-full bg-gray-200 text-gray-500 cursor-not-allowed border-gray-300"
            }
          `}
        >
          Search
        </button>
        {query && (
          <button
            onClick={handleClear}
            className="rounded-md px-4 py-2 cursor-pointer border font-semibold text-sm flex-1 bg-gray-100 hover:bg-gray-200 border-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-400 transition-colors"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
});

SearchCustomer.displayName = "SearchCustomer";

const Customers = () => {
  const [customers, setCustomers] = useState<Customer[]>([]);

  const handleAddCustomer = useCallback(
    (customerData: Omit<Customer, "id">) => {
      const newCustomer: Customer = {
        ...customerData,
        id: Date.now().toString(), // Simple ID generation - use UUID in production
      };
      setCustomers((prev) => [newCustomer, ...prev]);
    },
    []
  );

  const handleUpdateCustomer = useCallback((updatedCustomer: Customer) => {
    setCustomers((prev) =>
      prev.map((customer) =>
        customer.id === updatedCustomer.id ? updatedCustomer : customer
      )
    );
  }, []);

  const handleDeleteCustomer = useCallback((customerId: string) => {
    setCustomers((prev) =>
      prev.filter((customer) => customer.id !== customerId)
    );
  }, []);

  return (
    <div className="">
      <Header onAddCustomer={handleAddCustomer} />
      <SearchCustomer />
      <CustomersTable
        customers={customers}
        onUpdateCustomer={handleUpdateCustomer}
        onDeleteCustomer={handleDeleteCustomer}
      />
    </div>
  );
};

export default Customers;
