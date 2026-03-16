'use client';
import Link from 'next/link';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout, loading } = useAuth();

    if (loading) return null;

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 text-slate-900 px-8 py-4 shadow-sm">
            <div className="max-w-7xl mx-auto flex items-center justify-between">
                <Link href="/" className="group flex items-center gap-2">
                    <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md group-hover:scale-110 transition-transform">
                        I
                    </div>
                    <span className="font-bold text-xl tracking-tight text-slate-900">
                        ItemManager
                    </span>
                </Link>

                <div className="flex items-center gap-8">
                    {user ? (
                        <>
                            <div className="hidden md:flex items-center gap-6 text-sm font-medium text-slate-500">
                                <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                                <Link href="/add" className="hover:text-indigo-600 transition-colors">Add Item</Link>
                            </div>
                            
                            <div className="h-4 w-px bg-slate-200 hidden md:block" />

                            <div className="flex items-center gap-4">
                                <span className="text-sm font-medium text-slate-500">
                                    Hi, <span className="text-slate-900 font-semibold">{user.username}</span>
                                </span>
                                <button
                                    onClick={logout}
                                    className="bg-red-50 hover:bg-red-600 text-red-600 hover:text-white text-xs font-bold uppercase tracking-wider px-4 py-2 rounded-lg border border-red-100 transition-all active:scale-95"
                                >
                                    Logout
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center gap-4">
                            <Link 
                                href="/login" 
                                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                            >
                                Sign In
                            </Link>
                            <Link
                                href="/register"
                                className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-bold px-5 py-2 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                            >
                                Register
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </nav>
    );
}