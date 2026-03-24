'use client';
import Link from 'next/link';
import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';

export default function Navbar() {
    const { user, logout, loading } = useAuth();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    if (loading) return null;

    return (
        <>
            <nav className="sticky top-0 z-50 bg-white border-b border-slate-200 text-slate-900 px-4 sm:px-6 lg:px-8 py-4 shadow-sm">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                    <Link href="/" className="group flex items-center gap-2 flex-shrink-0">
                        <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center font-bold text-white shadow-md group-hover:scale-110 transition-transform">
                            I
                        </div>
                        <span className="font-bold text-lg sm:text-xl tracking-tight text-slate-900 hidden sm:inline">
                            ItemManager
                        </span>
                    </Link>

                    {/* Desktop Navigation */}
                    <div className="hidden md:flex items-center gap-8">
                        {user ? (
                            <>
                                <div className="flex items-center gap-6 text-sm font-medium text-slate-500">
                                    <Link href="/" className="hover:text-indigo-600 transition-colors">Home</Link>
                                    <Link href="/add" className="hover:text-indigo-600 transition-colors">Add Item</Link>
                                </div>
                                
                                <div className="h-4 w-px bg-slate-200" />

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
                            <div className="flex items-center gap-3 sm:gap-4">
                                <Link 
                                    href="/login" 
                                    className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors"
                                >
                                    Sign In
                                </Link>
                                <Link
                                    href="/register"
                                    className="bg-indigo-600 text-white hover:bg-indigo-700 text-sm font-bold px-4 py-2 rounded-xl transition-all shadow-md hover:-translate-y-0.5"
                                >
                                    Register
                                </Link>
                            </div>
                        )}
                    </div>

                    {/* Mobile Menu Button */}
                    {user && (
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-2 hover:bg-slate-100 rounded-lg transition-colors"
                        >
                            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                {mobileMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    )}

                    {/* Mobile Auth Links */}
                    {!user && (
                        <div className="md:hidden flex items-center gap-2">
                            <Link 
                                href="/login" 
                                className="text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors px-3 py-2"
                            >
                                Sign In
                            </Link>
                        </div>
                    )}
                </div>
            </nav>

            {/* Mobile Menu */}
            {user && mobileMenuOpen && (
                <div className="md:hidden bg-white border-b border-slate-200 px-4 py-4 space-y-3 shadow-sm">
                    <Link 
                        href="/" 
                        className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Home
                    </Link>
                    <Link 
                        href="/add" 
                        className="block px-4 py-3 text-sm font-medium text-slate-700 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition-colors"
                        onClick={() => setMobileMenuOpen(false)}
                    >
                        Add Item
                    </Link>
                    <div className="border-t border-slate-100 pt-3 mt-3">
                        <p className="px-4 py-2 text-sm text-slate-500">
                            Logged in as <span className="font-semibold text-slate-900">{user.username}</span>
                        </p>
                        <button
                            onClick={() => {
                                logout();
                                setMobileMenuOpen(false);
                            }}
                            className="w-full text-left px-4 py-3 text-sm font-bold text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                        >
                            Logout
                        </button>
                    </div>
                </div>
            )}
        </>
    );
}