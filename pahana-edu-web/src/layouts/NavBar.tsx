import { Search, X } from "lucide-react";
import ThemeToggle from "../components/shared/ThemeToggle";
import { useState } from "react";

const SearchInput = () => {
  const [query, setQuery] = useState("");

  return (
    <div className="relative w-full max-w-md flex items-center justify-center">
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search..."
        className="w-full rounded-2xl border border-gray-300 bg-stone-300/50 focus:bg-stone-300 dark:bg-gray-900/30 dark:focus:bg-gray-900 px-4 py-2 pr-10 text-base shadow-sm focus:border-blue-500 focus:ring-2 focus:ring-blue-500"
      />

      {query ? (
        <button
          onClick={() => setQuery("")}
          className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          <X size={20} />
        </button>
      ) : (
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer">
          <Search size={20} />
        </span>
      )}
    </div>
  );
};

const NavBar = () => {
  return (
    <nav className="flex items-center justify-end px-2 py-[19px] border-b border-stone-400/50 dark:border-gray-600">
      {/* <SearchInput /> */}
      <div className="flex items-center justify-between gap-4">
        <h1 className="font-semibold">Welcome, Admin</h1>
        <ThemeToggle />
      </div>
    </nav>
  );
};

export default NavBar;
