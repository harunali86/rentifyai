'use client';

import { useActionState } from 'react';
import { registerAction } from '@/actions/register';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import Link from 'next/link';
import { useState } from 'react';
import { CheckCircle2, Building2, User, Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button
            type="submit"
            variant="premium"
            className="w-full h-12 text-lg font-semibold shadow-xl shadow-brand-200/50"
            disabled={pending}
        >
            {pending ? 'Creating Account...' : 'Create Account'}
        </Button>
    );
}

const initialState = {
    error: '',
    success: false,
    message: ''
};

export default function RegisterPage() {
    // @ts-ignore
    const [state, formAction] = useActionState(registerAction, initialState);
    const [role, setRole] = useState<'USER' | 'AGENT'>('USER');

    if (state?.success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-8 bg-gray-50">
                <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-10 text-center space-y-6 animate-in fade-in zoom-in duration-500">
                    <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mx-auto">
                        <Mail className="w-10 h-10 text-brand-600" />
                    </div>
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-gray-900 tracking-tight">Check your email!</h2>
                        <p className="text-gray-500 leading-relaxed italic">
                            {state.message}
                        </p>
                    </div>
                    <div className="bg-brand-50/50 p-4 rounded-2xl text-left border border-brand-100">
                        <h4 className="text-sm font-bold text-brand-800 mb-1">Next Steps:</h4>
                        <ul className="text-xs text-brand-700 space-y-2">
                            <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-brand-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">1</span>
                                Open the email we just sent you.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-brand-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">2</span>
                                Click on the "Verify Email" button.
                            </li>
                            <li className="flex items-start gap-2">
                                <span className="w-4 h-4 rounded-full bg-brand-200 flex-shrink-0 flex items-center justify-center text-[10px] font-bold">3</span>
                                Login to your account and start exploring!
                            </li>
                        </ul>
                    </div>
                    <div className="pt-4 space-y-3">
                        <Link href="/login">
                            <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-2xl py-6 font-bold group">
                                Go to Login
                                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                            </Button>
                        </Link>
                        <p className="text-xs text-gray-400">
                            Didn't receive the email? Check your spam folder.
                        </p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">

            {/* Left: Form Section */}
            <div className="flex items-center justify-center p-8 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-700 to-brand-500">
                                RentifyAI
                            </span>
                        </Link>
                        <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Create your account</h1>
                        <p className="text-gray-500 mt-2">Start your journey with India's premium real estate platform.</p>
                    </div>

                    {state?.error && (
                        <div className="bg-red-50 text-red-600 p-4 rounded-xl text-sm flex items-center gap-2 animate-in slide-in-from-top duration-300">
                            <CheckCircle2 className="w-4 h-4 text-red-500" />
                            {state.error}
                        </div>
                    )}

                    <form action={formAction} className="space-y-6">

                        {/* Role Toggle */}
                        <div className="grid grid-cols-2 gap-4 p-1 bg-gray-50 rounded-xl border border-gray-100">
                            <input type="hidden" name="role" value={role} />

                            <button
                                type="button"
                                onClick={() => setRole('USER')}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                    role === 'USER'
                                        ? "bg-white text-brand-700 shadow-sm border border-gray-100 ring-1 ring-brand-100"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <User className="w-4 h-4" />
                                I'm a User
                            </button>
                            <button
                                type="button"
                                onClick={() => setRole('AGENT')}
                                className={cn(
                                    "flex items-center justify-center gap-2 py-3 rounded-lg text-sm font-medium transition-all duration-200",
                                    role === 'AGENT'
                                        ? "bg-white text-brand-700 shadow-sm border border-gray-100 ring-1 ring-brand-100"
                                        : "text-gray-500 hover:text-gray-700"
                                )}
                            >
                                <Building2 className="w-4 h-4" />
                                I'm an Agent
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Full Name</label>
                                <input name="name" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all outline-none bg-gray-50/50 focus:bg-white" placeholder="Rahul Sharma" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Email Address</label>
                                <input name="email" type="email" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all outline-none bg-gray-50/50 focus:bg-white" placeholder="rahul@example.com" />
                            </div>
                            <div>
                                <label className="block text-sm font-semibold text-gray-700 mb-1">Password</label>
                                <input name="password" type="password" required className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all outline-none bg-gray-50/50 focus:bg-white" placeholder="••••••••" />
                            </div>
                        </div>

                        <SubmitButton />

                        <div className="text-center text-sm text-gray-500">
                            Already have an account?{' '}
                            <Link href="/login" className="text-brand-700 font-bold hover:underline">
                                Sign in
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right: Premium Image */}
            <div className="hidden lg:block relative bg-gray-900">
                <div className="absolute inset-0 bg-brand-900/40 mix-blend-multiply z-10" />
                <img
                    src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&q=80&w=2000"
                    alt="Luxury Real Estate"
                    className="w-full h-full object-cover opacity-90"
                />
                <div className="absolute bottom-12 left-12 z-20 text-white max-w-md">
                    <h2 className="text-4xl font-bold mb-4 leading-tight">Join 50,000+ Agents & Buyers</h2>
                    <p className="text-lg text-gray-200">The most trusted platform for high-end properties in India.</p>
                </div>
            </div>

        </div>
    );
}
