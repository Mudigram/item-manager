import React from 'react';
import Link from 'next/link';

const ItemHeader = () => {
  return (
    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 sm:gap-6 pb-6 border-b border-slate-200">
      <div className="space-y-2">
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight text-slate-900">
          Explore <span className="text-indigo-600">Items</span>
        </h1>
        <p className="text-sm sm:text-base lg:text-lg text-slate-500 max-w-lg">
          Manage your collection and discover what others have shared.
        </p>
      </div>
      <Link
        href="/add"
        className="premium-button-primary inline-flex items-center justify-center gap-2 py-3 sm:py-2.5 px-4 sm:px-6 flex-shrink-0 hover:shadow-lg transition-shadow"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span className="text-sm sm:text-base">Add Item</span>
      </Link>
    </div>
  );
};

export default ItemHeader;
