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
        <div className="max-w-2xl mx-auto py-10 px-4">
            <div className="mb-10 text-center md:text-left">
                <Link href="/" className="text-slate-500 hover:text-indigo-600 inline-flex items-center gap-2 mb-4 transition-colors font-medium">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                    </svg>
                    Back to Collection
                </Link>
                <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">New Item</h1>
                <p className="text-slate-500 mt-2">Fill out the details below to add a new item to the system.</p>
            </div>

            <ItemForm />
        </div>
    );
}
