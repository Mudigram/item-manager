import React from 'react';

interface SearchBarProps {
  search: string;
  setSearch: (value: string) => void;
  loading: boolean;
  itemCount: number;
}

const SearchBar = ({ search, setSearch, loading, itemCount }: SearchBarProps) => {
  return (
    <div className="flex flex-col sm:flex-row items-center gap-4">
      <div className="relative w-full max-w-xl group">
        {!search && (
          <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none text-slate-400 group-focus-within:text-indigo-600 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        )}
        <input
          type="text"
          placeholder="Search by name or description..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className={`premium-input py-4 text-base shadow-sm ${!search ? 'premium-input-with-icon' : 'pl-4'}`}
        />
      </div>
      {!loading && (
        <span className="text-sm font-semibold text-slate-500 bg-slate-100 px-4 py-2 rounded-full border border-slate-200">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} found
        </span>
      )}
    </div>
  );
};

export default SearchBar;
