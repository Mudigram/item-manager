'use client';
import { useState, useEffect, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import API from '../../lib/axios';
import { useAuth } from '../../context/AuthContext';

interface FormState {
    name: string;
    description: string;
}

interface FormErrors {
    name?: string;
    api?: string;
}

export default function AddItem() {
    const [form, setForm] = useState<FormState>({ name: '', description: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const { user, loading: authLoading } = useAuth();
    const router = useRouter();

    useEffect(() => {
        if (!authLoading && !user) router.push('/login');
    }, [user, authLoading, router]);

    const validate = (): FormErrors => {
        const errs: FormErrors = {};
        if (!form.name.trim()) errs.name = 'Name is required';
        else if (form.name.length > 150) errs.name = 'Name must be under 150 characters';
        return errs;
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();
        setErrors({});
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
            return;
        }

        try {
            setSubmitting(true);
            await API.post('/items', form);
            router.push('/');
        } catch (err) {
            const error = err as import('axios').AxiosError<{ message: string }>;
            setErrors({ api: error.response?.data?.message || 'Something went wrong' });
        } finally {
            setSubmitting(false);
        }
    };

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

            <form onSubmit={handleSubmit} className="premium-card p-8 sm:p-10 bg-white space-y-8">
                <div className="space-y-6">
                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                            Item Name <span className="text-red-500">*</span>
                        </label>
                        <input
                            value={form.name}
                            onChange={(e) => setForm({ ...form, name: e.target.value })}
                            className={`premium-input ${errors.name ? 'border-red-400 focus:ring-red-100 focus:border-red-400' : ''}`}
                            placeholder="e.g. Ergonomic Office Chair"
                            autoFocus
                        />
                        {errors.name && (
                            <p className="text-red-500 text-xs mt-2 font-medium flex items-center gap-1">
                                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                                </svg>
                                {errors.name}
                            </p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-bold text-slate-700 mb-3">
                            Detailed Description
                        </label>
                        <textarea
                            value={form.description}
                            onChange={(e) => setForm({ ...form, description: e.target.value })}
                            rows={6}
                            className="premium-input resize-none"
                            placeholder="Tell us more about this item..."
                        />
                    </div>
                </div>

                {errors.api && (
                    <div className="bg-red-50 border border-red-200 text-red-700 rounded-xl p-4 text-sm flex items-center gap-3">
                        <svg className="w-5 h-5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                        </svg>
                        {errors.api}
                    </div>
                )}

                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <button
                        type="submit"
                        disabled={submitting}
                        className="flex-1 premium-button-primary py-4 text-base flex justify-center items-center gap-2"
                    >
                        {submitting ? (
                            <>
                                <div className="w-4 h-4 border-2 border-white/20 border-b-white rounded-full animate-spin" />
                                Adding...
                            </>
                        ) : 'Save Item'}
                    </button>
                    <button
                        type="button"
                        onClick={() => router.push('/')}
                        className="flex-1 premium-button-secondary py-4 text-base"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
}
