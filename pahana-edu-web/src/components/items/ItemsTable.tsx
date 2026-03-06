import {
  DollarSign,
  Package,
  SquarePen,
  Trash2,
  X,
  AlertTriangle,
} from "lucide-react";
import { memo, useCallback, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import type { Item } from "../../types";
import IconText from "../ui/IconText";

// Mock data - in real app this would come from props/context/API
const MOCK_ITEMS: Item[] = [
  {
    id: "1",
    name: "Laptop Computer",
    price: 999.99,
  },
  {
    id: "2",
    name: "Wireless Mouse",
    price: 29.99,
  },
  {
    id: "3",
    name: "USB-C Cable",
    price: 15.99,
  },
  {
    id: "4",
    name: "External Monitor",
    price: 299.99,
  },
  {
    id: "5",
    name: "Keyboard",
    price: 79.99,
  },
];

interface EditItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item | null;
  onSave: (item: Item) => void;
}

const EditItemDialog = memo<EditItemDialogProps>(
  ({ open, onOpenChange, item, onSave }) => {
    const [formData, setFormData] = useState({
      name: "",
      price: 0,
    });

    // Initialize form data when item changes
    useEffect(() => {
      if (item) {
        setFormData({
          name: item.name,
          price: item.price,
        });
      }
    }, [item]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (item && formData.name.trim() && formData.price > 0) {
          onSave({
            ...item,
            name: formData.name.trim(),
            price: formData.price,
          });
          onOpenChange(false);
        }
      },
      [item, formData, onSave, onOpenChange]
    );

    const handleInputChange = useCallback(
      (field: keyof typeof formData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
      []
    );

    if (!item) return null;

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Edit Item
                </Dialog.Title>
                <Dialog.Close className="rounded-sm opacity-70 ring-offset-white transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-offset-2 dark:ring-offset-gray-800">
                  <X className="h-4 w-4" />
                  <span className="sr-only">Close</span>
                </Dialog.Close>
              </div>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label
                    htmlFor="edit-name"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Item Name
                  </label>
                  <input
                    id="edit-name"
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleInputChange("name", e.target.value)}
                    placeholder="Enter item name"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
                    required
                  />
                </div>

                <div>
                  <label
                    htmlFor="edit-price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Price ($)
                  </label>
                  <input
                    id="edit-price"
                    type="number"
                    min="0"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) =>
                      handleInputChange(
                        "price",
                        parseFloat(e.target.value) || 0
                      )
                    }
                    placeholder="0.00"
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:text-gray-100"
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

EditItemDialog.displayName = "EditItemDialog";

interface DeleteConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  item: Item | null;
  onConfirm: (itemId: string) => void;
}

const DeleteConfirmDialog = memo<DeleteConfirmDialogProps>(
  ({ open, onOpenChange, item, onConfirm }) => {
    const handleConfirm = useCallback(() => {
      if (item) {
        onConfirm(item.id);
        onOpenChange(false);
      }
    }, [item, onConfirm, onOpenChange]);

    if (!item) return null;

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
                <div>
                  <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Delete Item
                  </Dialog.Title>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    This action cannot be undone.
                  </p>
                </div>
              </div>

              <div className="mb-6">
                <p className="text-gray-700 dark:text-gray-300">
                  Are you sure you want to delete{" "}
                  <span className="font-semibold">{item.name}</span>? This will
                  permanently remove the item from your inventory.
                </p>
              </div>

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
                  Delete Item
                </button>
              </div>
            </div>
          </Dialog.Content>
        </Dialog.Portal>
      </Dialog.Root>
    );
  }
);

DeleteConfirmDialog.displayName = "DeleteConfirmDialog";

interface ItemRowProps {
  item: Item;
  onEdit: (item: Item) => void;
  onDelete: (item: Item) => void;
}

const ItemRow = memo<ItemRowProps>(({ item, onEdit, onDelete }) => {
  const handleEdit = useCallback(() => {
    onEdit(item);
  }, [item, onEdit]);

  const handleDelete = useCallback(() => {
    onDelete(item);
  }, [item, onDelete]);

  return (
    <tr className="border-b border-gray-200 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
      <td className="px-6 py-4">
        <IconText icon={Package} text={item.name} />
      </td>
      <td className="px-6 py-4">
        <IconText
          icon={DollarSign}
          text={`$${item.price.toFixed(2)}`}
          className="text-green-600 dark:text-green-400"
        />
      </td>
      <td className="px-6 py-4">
        <div className="flex items-center justify-end gap-2">
          <button
            onClick={handleEdit}
            className="inline-flex items-center justify-center w-8 h-8 text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:text-blue-400 dark:hover:text-blue-300 dark:hover:bg-blue-900/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500"
            title="Edit item"
          >
            <SquarePen className="w-4 h-4" />
          </button>
          <button
            onClick={handleDelete}
            className="inline-flex items-center justify-center w-8 h-8 text-red-600 hover:text-red-700 hover:bg-red-50 dark:text-red-400 dark:hover:text-red-300 dark:hover:bg-red-900/20 rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-red-500"
            title="Delete item"
          >
            <Trash2 className="w-4 h-4" />
          </button>
        </div>
      </td>
    </tr>
  );
});

ItemRow.displayName = "ItemRow";

interface ItemsTableProps {
  items: Item[];
  onUpdateItem: (item: Item) => void;
  onDeleteItem: (itemId: string) => void;
}

const ItemsTable = memo<ItemsTableProps>(
  ({ items, onUpdateItem, onDeleteItem }) => {
    const [editingItem, setEditingItem] = useState<Item | null>(null);
    const [deletingItem, setDeletingItem] = useState<Item | null>(null);
    const [displayItems, setDisplayItems] = useState<Item[]>(MOCK_ITEMS);

    // Update display items when props change
    useEffect(() => {
      if (items.length > 0) {
        setDisplayItems(items);
      }
    }, [items]);

    const handleEdit = useCallback((item: Item) => {
      setEditingItem(item);
    }, []);

    const handleDelete = useCallback((item: Item) => {
      setDeletingItem(item);
    }, []);

    const handleSaveEdit = useCallback(
      (updatedItem: Item) => {
        onUpdateItem(updatedItem);
        setDisplayItems((prev) =>
          prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
        );
        setEditingItem(null);
      },
      [onUpdateItem]
    );

    const handleConfirmDelete = useCallback(
      (itemId: string) => {
        onDeleteItem(itemId);
        setDisplayItems((prev) => prev.filter((item) => item.id !== itemId));
        setDeletingItem(null);
      },
      [onDeleteItem]
    );

    if (displayItems.length === 0) {
      return (
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col items-center justify-center py-12 px-6">
            <Package className="w-12 h-12 text-gray-400 dark:text-gray-500 mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">
              No items found
            </h3>
            <p className="text-gray-500 dark:text-gray-400 text-center max-w-sm">
              Get started by adding your first item to the inventory.
            </p>
          </div>
        </div>
      );
    }

    return (
      <>
        <div className="mt-6 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 dark:bg-gray-700/50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Item Name
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Price
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                {displayItems.map((item) => (
                  <ItemRow
                    key={item.id}
                    item={item}
                    onEdit={handleEdit}
                    onDelete={handleDelete}
                  />
                ))}
              </tbody>
            </table>
          </div>
          <div className="bg-gray-50 dark:bg-gray-700/30 px-6 py-3 text-sm text-gray-500 dark:text-gray-400">
            Showing {displayItems.length} item
            {displayItems.length !== 1 ? "s" : ""}
          </div>
        </div>

        <EditItemDialog
          open={!!editingItem}
          onOpenChange={(open) => !open && setEditingItem(null)}
          item={editingItem}
          onSave={handleSaveEdit}
        />

        <DeleteConfirmDialog
          open={!!deletingItem}
          onOpenChange={(open) => !open && setDeletingItem(null)}
          item={deletingItem}
          onConfirm={handleConfirmDelete}
        />
      </>
    );
  }
);

ItemsTable.displayName = "ItemsTable";

export default ItemsTable;
