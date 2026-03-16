'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { Item } from '../types';
import type { AxiosError } from 'axios';

export default function Home() {
  const [items, setItems] = useState<Item[]>([]);
  const [search, setSearch] = useState<string>('');
  const [loading, setLoading] = useState<boolean>(true);
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!authLoading && !user) router.push('/login');
  }, [user, authLoading, router]);

  useEffect(() => {
    if (!user) return;

    const fetchItems = async (): Promise<void> => {
      try {
        setLoading(true);
        const { data } = await API.get<Item[]>(`/items?search=${search}`);
        setItems(data);
      } catch (err) {
        const error = err as AxiosError;
        if (error.response?.status === 401) router.push('/login');
      } finally {
        setLoading(false);
      }
    };

    const debounce = setTimeout(fetchItems, 300);
    return () => clearTimeout(debounce);
  }, [search, user, router]);

  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-10">
      {/* Header Section */}
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

      {/* Search & Stats Area */}
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
            {items.length} {items.length === 1 ? 'item' : 'items'} found
          </span>
        )}
      </div>

      {/* Items Grid */}
      {loading ? (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((n) => (
            <div key={n} className="h-48 bg-slate-100 rounded-2xl animate-pulse border border-slate-200" />
          ))}
        </div>
      ) : items.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-20 premium-card text-center space-y-4">
          <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 border border-slate-100">
            <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v4M7 7h10" />
            </svg>
          </div>
          <div>
            <h3 className="text-xl font-bold text-slate-900">Nothing to see here yet</h3>
            <p className="text-slate-500 mb-6">Your search didn't return any results or the list is empty.</p>
            <Link href="/add" className="text-indigo-600 hover:text-indigo-700 font-semibold inline-flex items-center gap-1 group">
              Start by adding an item
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </Link>
          </div>
        </div>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((item) => (
            <div
              key={item.id}
              className="premium-card group"
            >
              <div className="space-y-4">
                <h3 className="font-bold text-xl text-slate-900 leading-tight group-hover:text-indigo-600 transition-colors">
                  {item.name}
                </h3>
                <p className="text-slate-600 text-sm line-clamp-3 leading-relaxed">
                  {item.description || "No description provided."}
                </p>
                <div className="pt-4 mt-auto border-t border-slate-100 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-indigo-50 rounded-full flex items-center justify-center text-[10px] font-bold text-indigo-600 border border-indigo-100">
                      {item.username.charAt(0).toUpperCase()}
                    </div>
                    <span className="text-xs font-semibold text-slate-700">{item.username}</span>
                  </div>
                  <time className="text-[10px] font-medium text-slate-400 uppercase tracking-wider">
                    {new Date(item.created_at).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                  </time>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}