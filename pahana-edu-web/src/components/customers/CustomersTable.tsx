import {
  MapPin,
  Phone,
  SquarePen,
  Trash2,
  User,
  Users,
  X,
  AlertTriangle,
} from "lucide-react";
import { memo, useCallback, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { Customer } from "../../types";
import IconText from "../ui/IconText";

// Mock data - in real app this would come from props/context/API
const MOCK_CUSTOMERS: Customer[] = [
  {
    id: "1",
    accountNo: "ACC1001",
    name: "Alice Johnson",
    phone: "555-123-4567",
    address: "123 Maple St, Springfield, IL",
  },
  {
    id: "2",
    accountNo: "ACC1002",
    name: "Bob Smith",
    phone: "555-234-5678",
    address: "456 Oak St, Rivertown, TX",
  },
  {
    id: "3",
    accountNo: "ACC1003",
    name: "Charlie Davis",
    phone: "555-345-6789",
    address: "789 Pine Ave, Lincoln, NE",
  },
  {
    id: "4",
    accountNo: "ACC1004",
    name: "Diana Lee",
    phone: "555-456-7890",
    address: "321 Birch Rd, Austin, TX",
  },
  {
    id: "5",
    accountNo: "ACC1005",
    name: "Ethan Martinez",
    phone: "555-567-8901",
    address: "654 Cedar Blvd, Madison, WI",
  },
  {
    id: "6",
    accountNo: "ACC1006",
    name: "Fiona Clark",
    phone: "555-678-9012",
    address: "987 Elm St, Albany, NY",
  },
  {
    id: "7",
    accountNo: "ACC1007",
    name: "George Thompson",
    phone: "555-789-0123",
    address: "135 Willow Ln, Denver, CO",
  },
  {
    id: "8",
    accountNo: "ACC1008",
    name: "Hannah Wilson",
    phone: "555-890-1234",
    address: "246 Spruce Ct, Boise, ID",
  },
  {
    id: "9",
    accountNo: "ACC1009",
    name: "Ian Wright",
    phone: "555-901-2345",
    address: "357 Aspen Dr, Portland, OR",
  },
  {
    id: "10",
    accountNo: "ACC1010",
    name: "Julia Evans",
    phone: "555-012-3456",
    address: "468 Redwood St, Phoenix, AZ",
  },
];

interface EditCustomerDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (customer: Customer) => void;
}

const EditCustomerDialog = memo<EditCustomerDialogProps>(
  ({ customer, open, onOpenChange, onSave }) => {
    const [formData, setFormData] = useState<Customer>({
      id: "",
      accountNo: "",
      name: "",
      phone: "",
      address: "",
    });

    // Update form data when customer changes or dialog opens
    useEffect(() => {
      if (customer && open) {
        setFormData(customer);
      }
    }, [customer, open]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (
          formData.name.trim() &&
          formData.phone.trim() &&
          formData.address.trim()
        ) {
          onSave(formData);
          onOpenChange(false);
        }
      },
      [formData, onSave, onOpenChange]
    );

    const handleInputChange = useCallback(
      (field: keyof Customer, value: string) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
      []
    );

    if (!customer) return null;

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Edit Customer
                </Dialog.Title>
                <Dialog.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:ring-offset-gray-800">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="phone"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Phone
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
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
                    Save Changes
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

EditCustomerDialog.displayName = "EditCustomerDialog";

interface DeleteConfirmationDialogProps {
  customer: Customer | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: () => void;
}

const DeleteConfirmationDialog = memo<DeleteConfirmationDialogProps>(
  ({ customer, open, onOpenChange, onConfirm }) => {
    const handleConfirm = useCallback(() => {
      onConfirm();
      onOpenChange(false);
    }, [onConfirm, onOpenChange]);

    if (!customer) return null;

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="flex-shrink-0 w-10 h-10 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center">
                  <AlertTriangle className="w-5 h-5 text-red-600 dark:text-red-400" />
                </div>
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Delete Customer
                </Dialog.Title>
              </div>

              <Dialog.Description className="text-sm text-gray-600 dark:text-gray-400 mb-6">
                Are you sure you want to delete{" "}
                <strong className="text-gray-900 dark:text-gray-100">
                  {customer.name}
                </strong>
                ? This action cannot be undone and will permanently remove all
                customer data.
              </Dialog.Description>

              <div className="flex justify-end gap-2">
                <Dialog.Close asChild>
                  <button className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 dark:bg-gray-600 dark:text-gray-200 dark:hover:bg-gray-500 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-gray-400">
                    Cancel
                  </button>
                </Dialog.Close>
                <button
                  onClick={handleConfirm}
                  className="px-4 py-2 text-sm font-medium text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
                >
                  Delete Customer
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

DeleteConfirmationDialog.displayName = "DeleteConfirmationDialog";

interface CustomerCardProps {
  customer: Customer;
  onEdit?: (customer: Customer) => void;
  onDelete?: (customerId: string) => void;
}

const CustomerCard = memo<CustomerCardProps>(
  ({ customer, onEdit, onDelete }) => {
    const handleEdit = useCallback(() => {
      onEdit?.(customer);
    }, [customer, onEdit]);

    const handleDelete = useCallback(() => {
      onDelete?.(customer.id);
    }, [customer.id, onDelete]);

    return (
      <div className="flex items-center justify-between p-4 gap-4 border border-stone-400/50 dark:border-gray-600 rounded-lg mb-4 last:mb-0 transition-colors hover:bg-stone-50 dark:hover:bg-gray-800/50">
        <div className="flex-shrink-0 rounded-full w-12 h-12 bg-blue-600/20 dark:bg-blue-600/30 flex items-center justify-center">
          <User
            className="text-blue-600 dark:text-blue-400 w-6 h-6"
            aria-hidden="true"
          />
        </div>

        <div className="flex flex-col gap-y-2 flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 truncate">
              {customer.name}
            </h3>
            <span className="text-xs font-mono text-gray-500 bg-gray-200 dark:bg-gray-600 dark:text-gray-200 py-0.5 px-2 rounded-md whitespace-nowrap">
              {customer.accountNo}
            </span>
          </div>
          <div className="flex gap-x-4 flex-wrap">
            <IconText icon={Phone} className="flex-shrink-0">
              {customer.phone}
            </IconText>
            <IconText icon={MapPin} className="min-w-0">
              <span className="truncate" title={customer.address}>
                {customer.address}
              </span>
            </IconText>
          </div>
        </div>

        <div className="flex items-center gap-2 flex-shrink-0">
          <button
            onClick={handleEdit}
            className="flex items-center justify-center gap-2 border transition-all duration-200 border-stone-400 hover:bg-stone-300 focus:ring-2 focus:ring-stone-400 focus:outline-none dark:hover:bg-gray-600 dark:border-gray-600 dark:focus:ring-gray-500 rounded-md py-2 px-3 text-sm font-medium"
            aria-label={`Edit ${customer.name}`}
          >
            <SquarePen className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Edit</span>
          </button>
          <button
            onClick={handleDelete}
            className="flex items-center justify-center gap-2 border transition-all duration-200 border-red-600 text-red-600 hover:bg-red-500 hover:text-white focus:ring-2 focus:ring-red-500 focus:outline-none dark:text-red-400 dark:border-red-400 dark:hover:bg-red-600 rounded-md py-2 px-3 text-sm font-medium"
            aria-label={`Delete ${customer.name}`}
          >
            <Trash2 className="w-4 h-4" aria-hidden="true" />
            <span className="hidden sm:inline">Delete</span>
          </button>
        </div>
      </div>
    );
  }
);

CustomerCard.displayName = "CustomerCard";

interface CustomersTableProps {
  customers?: Customer[];
  title?: string;
  onUpdateCustomer?: (customer: Customer) => void;
  onDeleteCustomer?: (customerId: string) => void;
  className?: string;
}

const CustomersTable = memo<CustomersTableProps>(
  ({
    customers = MOCK_CUSTOMERS,
    title = "Customers",
    onUpdateCustomer,
    onDeleteCustomer,
    className = "",
  }) => {
    const [editingCustomer, setEditingCustomer] = useState<Customer | null>(
      null
    );
    const [deletingCustomer, setDeletingCustomer] = useState<Customer | null>(
      null
    );

    const handleEditCustomer = useCallback((customer: Customer) => {
      setEditingCustomer(customer);
    }, []);

    const handleDeleteCustomer = useCallback(
      (customerId: string) => {
        const customer = customers.find((c) => c.id === customerId);
        if (customer) {
          setDeletingCustomer(customer);
        }
      },
      [customers]
    );

    const handleSaveCustomer = useCallback(
      (updatedCustomer: Customer) => {
        onUpdateCustomer?.(updatedCustomer);
        setEditingCustomer(null);
      },
      [onUpdateCustomer]
    );

    const handleConfirmDelete = useCallback(() => {
      if (deletingCustomer) {
        onDeleteCustomer?.(deletingCustomer.id);
        setDeletingCustomer(null);
      }
    }, [deletingCustomer, onDeleteCustomer]);

    if (customers.length === 0) {
      return (
        <div
          className={`mt-4 rounded-lg shadow-md p-4 border border-stone-400/50 dark:border-gray-600 ${className}`.trim()}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={24} aria-hidden="true" />
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {title}
            </h2>
          </div>
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Users
              size={48}
              className="mx-auto mb-4 opacity-50"
              aria-hidden="true"
            />
            <p>No customers found</p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div
          className={`mt-4 rounded-lg shadow-md p-4 border border-stone-400/50 dark:border-gray-600 ${className}`.trim()}
        >
          <div className="flex items-center gap-2 mb-4">
            <Users size={24} aria-hidden="true" />
            <h2 className="font-semibold text-lg text-gray-900 dark:text-gray-100">
              {title}
            </h2>
            <span className="ml-auto text-sm text-gray-500 dark:text-gray-400">
              {customers.length} customer{customers.length !== 1 ? "s" : ""}
            </span>
          </div>

          <div
            className="overflow-y-auto min-h-[50vh] max-h-[calc(100vh-20rem)] scrollbar-thin scrollbar-thumb-gray-300 dark:scrollbar-thumb-gray-600"
            role="list"
            aria-label="Customer list"
          >
            {customers.map((customer) => (
              <div key={customer.id} role="listitem">
                <CustomerCard
                  customer={customer}
                  onEdit={handleEditCustomer}
                  onDelete={handleDeleteCustomer}
                />
              </div>
            ))}
          </div>
        </div>

        <EditCustomerDialog
          customer={editingCustomer}
          open={!!editingCustomer}
          onOpenChange={(open) => !open && setEditingCustomer(null)}
          onSave={handleSaveCustomer}
        />

        <DeleteConfirmationDialog
          customer={deletingCustomer}
          open={!!deletingCustomer}
          onOpenChange={(open) => !open && setDeletingCustomer(null)}
          onConfirm={handleConfirmDelete}
        />
      </>
    );
  }
);

CustomersTable.displayName = "CustomersTable";

export default CustomersTable;
export { CustomerCard };
