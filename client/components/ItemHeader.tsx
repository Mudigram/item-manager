import React from 'react';
import Link from 'next/link';

const ItemHeader = () => {
  return (
    <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-slate-200">
      <div className="space-y-2">
        <h1 className="text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl">
          Explore <span className="text-indigo-600">Items</span>
        </h1>
        <p className="text-lg text-slate-500 max-w-lg">
          Manage your personal collection and discover what others have shared.
        </p>
      </div>
      <Link
        href="/add"
        className="premium-button-primary inline-flex items-center gap-2"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        Add New Item
      </Link>
    </div>
  );
};

export default ItemHeader;
