'use client';
import React, { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import API from '../lib/axios';
import ErrorMessage from './ErrorMessage';

interface FormState {
    name: string;
    description: string;
}

interface FormErrors {
    name?: string;
    api?: string;
}

const ItemForm = () => {
    const [form, setForm] = useState<FormState>({ name: '', description: '' });
    const [errors, setErrors] = useState<FormErrors>({});
    const [submitting, setSubmitting] = useState<boolean>(false);
    const router = useRouter();

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
        <form onSubmit={handleSubmit} className="premium-card p-6 sm:p-8 lg:p-10 bg-white space-y-6 sm:space-y-8">
            <div className="space-y-5 sm:space-y-6">
                <div>
                    <label className="block text-sm font-bold text-slate-700 mb-3">
                        Item Name <span className="text-red-500">*</span>
                    </label>
                    <input
                        value={form.name}
                        onChange={(e) => setForm({ ...form, name: e.target.value })}
                        className={`premium-input text-sm sm:text-base ${errors.name ? 'border-red-400 focus:ring-red-100 focus:border-red-400' : ''}`}
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
                        rows={4}
                        className="premium-input resize-none text-sm sm:text-base min-h-[120px] sm:min-h-[150px]"
                        placeholder="Tell us more about this item..."
                    />
                </div>
            </div>

            {errors.api && <ErrorMessage message={errors.api} />}

            <div className="flex flex-col gap-3 sm:gap-4 pt-4">
                <button
                    type="submit"
                    disabled={submitting}
                    className="w-full premium-button-primary py-3 sm:py-4 text-base flex justify-center items-center gap-2 hover:shadow-lg transition-shadow"
                >
                    {submitting ? (
                        <>
                            <div className="w-4 h-4 border-2 border-white/20 border-b-white rounded-full animate-spin" />
                            Adding...
                        </>
                    ) : (
                        <>
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                            Save Item
                        </>
                    )}
                </button>
                <button
                    type="button"
                    onClick={() => router.push('/')}
                    className="w-full premium-button-secondary py-3 sm:py-4 text-base"
                >
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default ItemForm;
