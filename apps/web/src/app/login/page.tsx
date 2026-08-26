'use client';

import { useActionState } from 'react';
import { loginAction } from '@/actions/auth';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { CheckCircle2 } from 'lucide-react';

function SubmitButton() {
    return (
        <Button
            type="submit"
            className="w-full h-12 text-lg font-bold bg-gradient-to-r from-brand-600 to-brand-700 hover:from-brand-700 hover:to-brand-800 text-white shadow-lg shadow-brand-500/30 transition-all duration-300"
        >
            Sign In
        </Button>
    );
}

const initialState = { error: '', success: false };

export default function LoginPage() {
    // @ts-ignore
    const [state, formAction] = useActionState(loginAction, initialState);

    return (
        <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-slate-50">

            {/* Left: Form Section */}
            <div className="flex items-center justify-center p-8 lg:p-16 bg-white">
                <div className="w-full max-w-md space-y-8">
                    <div className="text-center lg:text-left">
                        <Link href="/" className="inline-block mb-8">
                            <span className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-brand-800 to-brand-600 tracking-tight">
                                RentifyAI
                            </span>
                        </Link>
                        <h1 className="text-4xl font-extrabold text-brand-950 tracking-tight mb-2">Welcome Back</h1>
                        <p className="text-slate-500 text-lg">Access your premium real estate dashboard.</p>
                    </div>

                    {state?.error && (
                        <div className="bg-red-50 text-red-700 p-4 rounded-xl text-sm flex items-center gap-3 border border-red-100">
                            <CheckCircle2 className="w-5 h-5 text-red-600" />
                            {state.error}
                        </div>
                    )}

                    <form action={formAction} className="space-y-6">
                        <div className="space-y-5">
                            <div>
                                <label className="block text-sm font-bold text-slate-700 mb-2 uppercase tracking-wide">Email Address</label>
                                <input
                                    name="email"
                                    type="email"
                                    required
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                                    placeholder="agent@example.com"
                                />
                            </div>
                            <div>
                                <div className="flex justify-between items-center mb-2">
                                    <label className="block text-sm font-bold text-slate-700 uppercase tracking-wide">Password</label>
                                    <Link href="/forgot-password" university-id="" className="text-sm text-brand-600 hover:text-brand-700 font-semibold hover:underline">
                                        Forgot?
                                    </Link>
                                </div>
                                <input
                                    name="password"
                                    type="password"
                                    required
                                    className="w-full px-5 py-4 rounded-xl border border-slate-200 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 transition-all outline-none bg-slate-50 focus:bg-white text-slate-900 placeholder:text-slate-400 font-medium"
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>

                        <SubmitButton />

                        <div className="relative my-8">
                            <div className="absolute inset-0 flex items-center">
                                <span className="w-full border-t border-slate-200" />
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="bg-white px-4 text-slate-500 font-medium">New to RentifyAI?</span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <Link href="/register?role=USER" className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-brand-200 hover:text-brand-700 transition-all">
                                Join as User
                            </Link>
                            <Link href="/register?role=AGENT" className="flex items-center justify-center px-4 py-3 border border-slate-200 rounded-xl shadow-sm bg-white text-sm font-bold text-slate-700 hover:bg-slate-50 hover:border-brand-200 hover:text-brand-700 transition-all">
                                Join as Agent
                            </Link>
                        </div>
                    </form>
                </div>
            </div>

            {/* Right: Premium Image */}
            <div className="hidden lg:block relative bg-brand-950 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-brand-900/90 to-black/60 z-10" />
                <img
                    src="https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1600"
                    alt="Luxury Home"
                    className="w-full h-full object-cover opacity-80 mix-blend-overlay hover:scale-105 transition-transform duration-[20s]"
                />
                <div className="absolute bottom-0 left-0 right-0 p-16 z-20 bg-gradient-to-t from-black/90 to-transparent">
                    <h2 className="text-4xl font-bold text-white mb-4 leading-tight">Efficiency Meets <span className="text-brand-400">Luxury</span></h2>
                    <p className="text-lg text-slate-300 max-w-lg">
                        Manage your listings, track leads, and close deals faster with our AI-powered platform designed for top-tier agents.
                    </p>
                </div>
            </div>

        </div>
    );
}
