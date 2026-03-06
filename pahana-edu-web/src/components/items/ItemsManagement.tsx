import { Search, Package, PackagePlus, X } from "lucide-react";
import { memo, useCallback, useState, useEffect } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import ItemsTable from "./ItemsTable";
import type { Item } from "../../types";

interface AddItemDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (item: Omit<Item, "id">) => void;
}

const AddItemDialog = memo<AddItemDialogProps>(
  ({ open, onOpenChange, onSave }) => {
    const [formData, setFormData] = useState({
      name: "",
      price: 0,
    });

    // Reset form when dialog opens
    useEffect(() => {
      if (open) {
        setFormData({
          name: "",
          price: 0,
        });
      }
    }, [open]);

    const handleSubmit = useCallback(
      (e: React.FormEvent) => {
        e.preventDefault();
        if (formData.name.trim() && formData.price > 0) {
          onSave(formData);
          onOpenChange(false);
        }
      },
      [formData, onSave, onOpenChange]
    );

    const handleInputChange = useCallback(
      (field: keyof typeof formData, value: string | number) => {
        setFormData((prev) => ({ ...prev, [field]: value }));
      },
      []
    );

    return (
      <Dialog.Root open={open} onOpenChange={onOpenChange}>
        <Dialog.Portal>
          <Dialog.Overlay className="fixed inset-0 bg-black/50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0" />
          <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[state=closed]:slide-out-to-left-1/2 data-[state=closed]:slide-out-to-top-[48%] data-[state=open]:slide-in-from-left-1/2 data-[state=open]:slide-in-from-top-[48%]">
            <div className="p-6">
              <div className="flex items-center justify-between mb-4">
                <Dialog.Title className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Add New Item
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
                    Item Name
                  </label>
                  <input
                    id="name"
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
                    htmlFor="price"
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
                  >
                    Price ($)
                  </label>
                  <input
                    id="price"
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
                    Add Item
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

AddItemDialog.displayName = "AddItemDialog";

interface HeaderProps {
  onAddItem: (item: Omit<Item, "id">) => void;
}

const Header = memo<HeaderProps>(({ onAddItem }) => {
  const [showAddDialog, setShowAddDialog] = useState(false);

  const handleAddItem = useCallback(
    (itemData: Omit<Item, "id">) => {
      onAddItem(itemData);
      setShowAddDialog(false);
    },
    [onAddItem]
  );

  return (
    <>
      <div className="flex items-center justify-between rounded-md px-4">
        <div className="flex items-center justify-start gap-2">
          <Package className="aspect-square" size={48} />
          <div>
            <h1 className="font-semibold text-lg">Manage Items</h1>
            <p className="text-sm text-gray-500">Manage your inventory items</p>
          </div>
        </div>
        <button
          onClick={() => setShowAddDialog(true)}
          className="flex items-center justify-center gap-2 p-2 rounded-md bg-blue-600 hover:bg-blue-700 text-white cursor-pointer transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <PackagePlus />
          <span>Add item</span>
        </button>
      </div>

      <AddItemDialog
        open={showAddDialog}
        onOpenChange={setShowAddDialog}
        onSave={handleAddItem}
      />
    </>
  );
});

Header.displayName = "Header";

const SearchItem = memo(() => {
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
          placeholder="Search items by name or price..."
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

SearchItem.displayName = "SearchItem";

const Items = () => {
  const [items, setItems] = useState<Item[]>([]);

  const handleAddItem = useCallback((itemData: Omit<Item, "id">) => {
    const newItem: Item = {
      ...itemData,
      id: Date.now().toString(), // Simple ID generation - use UUID in production
    };
    setItems((prev) => [newItem, ...prev]);
  }, []);

  const handleUpdateItem = useCallback((updatedItem: Item) => {
    setItems((prev) =>
      prev.map((item) => (item.id === updatedItem.id ? updatedItem : item))
    );
  }, []);

  const handleDeleteItem = useCallback((itemId: string) => {
    setItems((prev) => prev.filter((item) => item.id !== itemId));
  }, []);

  return (
    <div className="">
      <Header onAddItem={handleAddItem} />
      <SearchItem />
      <ItemsTable
        items={items}
        onUpdateItem={handleUpdateItem}
        onDeleteItem={handleDeleteItem}
      />
    </div>
  );
};

export default Items;
