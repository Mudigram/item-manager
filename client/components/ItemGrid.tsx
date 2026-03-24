import React from 'react';
import Link from 'next/link';
import { Item } from '../types';
import ItemCard from './ItemCard';

interface ItemGridProps {
  items: Item[];
  loading: boolean;
}

const ItemGrid = ({ items, loading }: ItemGridProps) => {
  if (loading) {
    return (
      <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {[1, 2, 3, 4, 5, 6].map((n) => (
          <div key={n} className="h-40 sm:h-48 bg-slate-100 rounded-2xl animate-pulse border border-slate-200" />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20 premium-card text-center space-y-4">
        <div className="w-16 h-16 sm:w-20 sm:h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 border border-slate-100">
          <svg className="w-8 h-8 sm:w-10 sm:h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v4M7 7h10" />
          </svg>
        </div>
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">Nothing to see here</h3>
          <p className="text-slate-500 text-sm sm:text-base mb-6">Your search didn't return any results or the list is empty.</p>
          <Link href="/add" className="inline-flex items-center gap-2 text-indigo-600 hover:text-indigo-700 font-semibold group">
            Start by adding an item
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="grid gap-4 sm:gap-5 lg:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((item) => (
        <ItemCard key={item.id} item={item} />
      ))}
    </div>
  );
};

export default ItemGrid;
