'use client';

import { useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { resetPassword } from '@/lib/api';
import { CheckCircle2, AlertCircle, Lock } from 'lucide-react';
import { toast } from 'sonner';

function ResetPasswordForm() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (!token) {
            setError('Invalid or missing reset token.');
            return;
        }

        if (password.length < 6) {
            setError('Password must be at least 6 characters.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setLoading(true);

        const isOk = await resetPassword(token, password);
        setLoading(false);

        if (isOk) {
            setSuccess(true);
            toast.success('Password reset successfully!');
            setTimeout(() => router.push('/login'), 3000);
        } else {
            setError('Failed to reset password. Token may be expired.');
        }
    };

    if (!token) {
        return (
            <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-100 flex flex-col items-center text-center space-y-4">
                <AlertCircle className="w-12 h-12 text-red-600" />
                <h3 className="font-bold text-lg">Invalid Link</h3>
                <p className="text-sm">This password reset link is invalid or has expired.</p>
                <Link href="/forgot-password" className="text-amber-600 font-bold hover:underline">Request a new one</Link>
            </div>
        );
    }

    if (success) {
        return (
            <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-100 flex flex-col items-center text-center space-y-4">
                <CheckCircle2 className="w-12 h-12 text-green-600" />
                <h3 className="font-bold text-lg">Password Updated!</h3>
                <p className="text-sm">Your password has been changed successfully. Redirecting to login...</p>
                <Link href="/login" className="w-full">
                    <Button variant="outline" className="w-full">Login Now</Button>
                </Link>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
                <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-center gap-3 border border-red-100">
                    <AlertCircle className="w-5 h-5 text-red-600" />
                    {error}
                </div>
            )}

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">New Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                        placeholder="New strong password"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Confirm Password</label>
                <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        required
                        className="w-full pl-12 pr-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                        placeholder="Repeat password"
                    />
                </div>
            </div>

            <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30 transition-all duration-300"
            >
                {loading ? 'Resetting...' : 'Set New Password'}
            </Button>
        </form>
    );
}

export default function ResetPasswordPage() {
    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
            {/* Left: Form Section */}
            <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <h1 className="text-3xl font-extrabold text-brand-950 tracking-tight mb-2">Create New Password</h1>
                        <p className="text-slate-500 text-lg">Secure your account with a fresh password.</p>
                    </div>

                    <Suspense fallback={<div>Loading...</div>}>
                        <ResetPasswordForm />
                    </Suspense>
                </div>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:block relative bg-brand-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 to-black/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=1600"
                    alt="Modern Security"
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
            </div>
        </div>
    );
}
