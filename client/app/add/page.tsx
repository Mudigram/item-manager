'use client';
import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import LoadingSpinner from '../../components/LoadingSpinner';
import ItemForm from '../../components/ItemForm';

export default function AddItem() {
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) router.push('/login');
    }, [user, authLoading, router]);

    if (authLoading) {
        return <LoadingSpinner />;
    }

    return (
        <div className="w-full">
            <div className="mb-6 sm:mb-8 lg:mb-10 text-center sm:text-left">
                <Link 
                    href="/" 
                    className="inline-flex items-center gap-2 text-slate-500 hover:text-indigo-600 transition-colors font-medium mb-3 sm:mb-4 text-sm sm:text-base"
                >
                    <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Collection
                </Link>
                <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-slate-900 tracking-tight">
                    New Item
                </h1>
                <p className="text-slate-500 mt-2 text-sm sm:text-base">
                    Fill out the details below to add a new item to your collection.
                </p>
            </div>

            <div className="max-w-2xl">
                <ItemForm />
            </div>
        </div>
    );
}
