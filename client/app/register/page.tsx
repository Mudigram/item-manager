'use client';
import { useState, FormEvent } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import API from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';
import { AuthResponse } from '../../types';

export default function Register() {
    const [form, setForm] = useState({ username: '', email: '', password: '' });
    const [error, setError] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const { login } = useAuth();
    const router = useRouter();

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const { data } = await API.post<AuthResponse>('/auth/register', form);
            login(data.user, data.token);
            router.push('/');
        } catch (err) {
            const error = err as import('axios').AxiosError<{ message: string }>;
            setError(error.response?.data?.message || 'Registration failed. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="w-full flex items-center justify-center min-h-[85vh] px-4 sm:px-6 py-4 sm:py-8">
            <div className="premium-card p-6 sm:p-8 lg:p-10 bg-white w-full max-w-md">
                <div className="text-center mb-8 sm:mb-10">
                    <div className="w-14 h-14 sm:w-16 sm:h-16 bg-indigo-50 rounded-2xl flex items-center justify-center mx-auto mb-3 sm:mb-4 border border-indigo-100">
                        <svg className="w-7 h-7 sm:w-8 sm:h-8 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                        </svg>
                    </div>
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-500 mt-2 text-sm sm:text-base">Join Item Manager today</p>
                </div>

                {error && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-3 sm:p-4 text-sm mb-6 sm:mb-8 animate-shake flex items-start gap-3">
                        <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                        </svg>
                        <span className="flex-1">{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 sm:mb-2.5">Username</label>
                        <input
                            type="text"
                            value={form.username}
                            onChange={(e) => setForm({ ...form, username: e.target.value })}
                            className="premium-input text-base"
                            placeholder="johndoe"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 sm:mb-2.5">Email Address</label>
                        <input
                            type="email"
                            value={form.email}
                            onChange={(e) => setForm({ ...form, email: e.target.value })}
                            className="premium-input text-base"
                            placeholder="you@example.com"
                            required
                        />
                    </div>
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2 sm:mb-2.5">Password</label>
                        <input
                            type="password"
                            value={form.password}
                            onChange={(e) => setForm({ ...form, password: e.target.value })}
                            className="premium-input text-base"
                            placeholder="At least 6 characters"
                            required
                        />
                    </div>
                    
                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full premium-button-primary py-3 sm:py-4 text-base mt-4 hover:shadow-lg transition-shadow"
                    >
                        {loading ? 'Creating account...' : 'Sign Up'}
                    </button>
                </form>

                <div className="mt-6 sm:mt-8 pt-6 sm:pt-8 border-t border-slate-100 text-center">
                    <p className="text-sm text-slate-500">
                        Already have an account?{' '}
                        <Link href="/login" className="text-indigo-600 hover:text-indigo-700 font-bold tracking-tight hover:underline">
                            Login here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}