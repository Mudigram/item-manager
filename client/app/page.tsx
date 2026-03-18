'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import API from '../lib/axios';
import { useAuth } from '../context/AuthContext';
import { Item } from '../types';
import type { AxiosError } from 'axios';
import LoadingSpinner from '../components/LoadingSpinner';
import ItemHeader from '../components/ItemHeader';
import SearchBar from '../components/SearchBar';
import ItemGrid from '../components/ItemGrid';

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
    return <LoadingSpinner />;
  }

  return (
    <div className="space-y-10">
      <ItemHeader />
      
      <SearchBar 
        search={search} 
        setSearch={setSearch} 
        loading={loading} 
        itemCount={items.length} 
      />

      <ItemGrid items={items} loading={loading} />
    </div>
  );
}