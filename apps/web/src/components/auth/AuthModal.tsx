'use client';

import { useAuthModal } from '@/lib/store/useAuthModal';
import { X, Mail } from 'lucide-react';
import { useEffect, useState, useActionState } from 'react';
import { loginAction } from '@/actions/auth';
import { registerAction } from '@/actions/register';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { cn } from '@/lib/utils';
import Link from 'next/link';

export function AuthModal() {
    const { isOpen, close, view, setView } = useAuthModal();
    const [mounted, setMounted] = useState(false);

    // Prevent hydration mismatch
    useEffect(() => {
        setMounted(true);
    }, []);

    // Close on escape
    useEffect(() => {
        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handleEsc);
        return () => window.removeEventListener('keydown', handleEsc);
    }, [close]);

    // Action States
    // @ts-ignore
    const [loginState, loginFormAction, isLoginPending] = useActionState(loginAction, { error: '', success: false });
    // @ts-ignore
    const [registerState, registerFormAction, isRegisterPending] = useActionState(registerAction, { error: '', success: false });

    useEffect(() => {
        if (loginState?.success) {
            toast.success('Welcome back!');
            close();
            // Optional: Reload to update UI state if not using client-side session management completely
            window.location.reload();
        }
    }, [loginState, close]);

    useEffect(() => {
        if (registerState?.success) {
            toast.success('Account created! Please verify your email.');
            // Switch to a success view or close
            close();
        }
    }, [registerState, close]);

    if (!mounted || !isOpen) return null;

    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
                onClick={close}
            />

            {/* Modal Content */}
            <div className="relative w-full max-w-[480px] bg-white rounded-xl shadow-2xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">

                {/* Close Button */}
                <button
                    onClick={close}
                    className="absolute right-4 top-4 p-2 rounded-full hover:bg-gray-100 transition-colors z-10"
                >
                    <X className="w-5 h-5 text-gray-500" />
                </button>

                {/* Header Section */}
                <div className="pt-10 px-8 pb-2 text-center">
                    <h2 className="text-[22px] font-bold text-gray-900 leading-tight tracking-tight">
                        Sign in or register to receive personalized recommendations
                    </h2>
                </div>

                {/* Tabs */}
                <div className="flex border-b border-gray-200 mt-6">
                    <button
                        onClick={() => setView('login')}
                        className={cn(
                            "flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-all border-b-2",
                            view === 'login'
                                ? "border-brand-600 text-brand-600 bg-brand-50/10"
                                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        )}
                    >
                        Sign In
                    </button>
                    <button
                        onClick={() => setView('register')}
                        className={cn(
                            "flex-1 py-4 text-sm font-bold uppercase tracking-wide transition-all border-b-2",
                            view === 'register'
                                ? "border-brand-600 text-brand-600 bg-brand-50/10"
                                : "border-transparent text-gray-500 hover:text-gray-900 hover:bg-gray-50"
                        )}
                    >
                        New Account
                    </button>
                </div>

                {/* Body */}
                <div className="p-8">
                    {view === 'login' ? (
                        <form action={loginFormAction} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 opacity-90">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 bg-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 opacity-90">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 bg-white"
                                    required
                                />
                            </div>

                            {loginState?.error && (
                                <p className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded-md border border-red-100">
                                    {loginState.error}
                                </p>
                            )}

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-lg shadow-md mt-2"
                                disabled={isLoginPending}
                            >
                                {isLoginPending ? 'Signing In...' : 'Sign In'}
                            </Button>

                            <div className="text-center mt-3">
                                <Link
                                    href="/forgot-password"
                                    className="text-brand-600 text-sm font-bold hover:underline"
                                    onClick={close}
                                >
                                    Forgot your password?
                                </Link>
                            </div>
                        </form>
                    ) : (
                        <form action={registerFormAction} className="space-y-4">
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 opacity-90">Email</label>
                                <input
                                    name="email"
                                    type="email"
                                    placeholder="Enter your email"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 bg-white"
                                    required
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-bold text-gray-700 uppercase mb-1.5 opacity-90">Password</label>
                                <input
                                    name="password"
                                    type="password"
                                    placeholder="Create password"
                                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-brand-500 focus:ring-1 focus:ring-brand-500 outline-none transition-all placeholder:text-gray-400 text-gray-900 bg-white"
                                    required
                                />
                            </div>
                            {/* Default to USER role for quick signup */}
                            <input type="hidden" name="role" value="USER" />

                            {registerState?.error && (
                                <p className="text-red-600 text-sm font-medium bg-red-50 p-2 rounded-md border border-red-100">
                                    {registerState.error}
                                </p>
                            )}

                            <div className="text-xs text-gray-500 leading-relaxed">
                                By registering, you agree to our
                                <span className="text-brand-600 font-bold"> Terms of Use</span> &
                                <span className="text-brand-600 font-bold"> Privacy Policy</span>.
                            </div>

                            <Button
                                type="submit"
                                className="w-full h-12 text-base font-bold bg-brand-600 hover:bg-brand-700 text-white rounded-lg shadow-md"
                                disabled={isRegisterPending}
                            >
                                {isRegisterPending ? 'Creating Account...' : 'Register'}
                            </Button>
                        </form>
                    )}

                    {/* Divider */}
                    <div className="relative my-8">
                        <div className="absolute inset-0 flex items-center">
                            <span className="w-full border-t border-gray-200" />
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className="bg-white px-4 text-gray-400 font-medium">Or connect with</span>
                        </div>
                    </div>

                    {/* Social Buttons */}
                    <div className="space-y-3">
                        <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-bold text-gray-700 text-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.477 2 2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.879V14.89h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12c0-5.523-4.477-10-10-10z" /></svg>
                            Continue with Facebook
                        </button>
                        <button className="w-full flex items-center justify-center gap-3 px-4 py-2.5 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-bold text-gray-700 text-sm">
                            <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.84z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                            Continue with Google
                        </button>
                    </div>

                </div>
            </div>
        </div>
    );
}
