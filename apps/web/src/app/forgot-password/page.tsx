'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { forgotPassword } from '@/lib/api';
import { CheckCircle2, AlertCircle, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

export default function ForgotPasswordPage() {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        const success = await forgotPassword(email);

        // We always show success message for security (user enumeration prevention)
        // But in this demo, let's assume it worked if the API didn't crash
        setSubmitted(true);
        setLoading(false);
        toast.success('If an account exists, a reset link has been sent.');
    };

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">
            {/* Left: Form Section */}
            <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <Link href="/login" className="inline-flex items-center text-sm text-slate-500 hover:text-brand-600 mb-8 transition-colors">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Login
                        </Link>
                        <h1 className="text-3xl font-extrabold text-brand-950 tracking-tight mb-2">Reset Password</h1>
                        <p className="text-slate-500 text-lg">Enter your email to receive a reset link.</p>
                    </div>

                    {submitted ? (
                        <div className="bg-green-50 text-green-800 p-6 rounded-xl border border-green-100 flex flex-col items-center text-center space-y-4">
                            <CheckCircle2 className="w-12 h-12 text-green-600" />
                            <h3 className="font-bold text-lg">Check your inbox</h3>
                            <p className="text-sm">We've sent a password reset link to <strong>{email}</strong>.</p>
                            <Button variant="outline" className="mt-4 w-full" onClick={() => setSubmitted(false)}>
                                Try another email
                            </Button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-amber-500 focus:border-amber-500 transition-all outline-none bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                                    placeholder="Enter your registered email"
                                />
                            </div>

                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full h-12 text-lg font-bold bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white shadow-lg shadow-amber-500/30 transition-all duration-300"
                            >
                                {loading ? 'Sending Link...' : 'Send Reset Link'}
                            </Button>
                        </form>
                    )}
                </div>
            </div>

            {/* Right: Image */}
            <div className="hidden lg:block relative bg-brand-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 to-black/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1493809842364-78817add7ffb?auto=format&fit=crop&q=80&w=1600"
                    alt="Luxury Building"
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay"
                />
            </div>
        </div>
    );
}
