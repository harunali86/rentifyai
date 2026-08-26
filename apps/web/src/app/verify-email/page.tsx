'use client';

import { useEffect, useState, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { verifyEmail } from '@/lib/api';
import { Button } from '@/components/ui/button';
import { CheckCircle2, XCircle, Loader2, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { toast } from 'sonner';

function VerifyEmailContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get('token');

    const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
    const [message, setMessage] = useState('Verifying your email...');

    useEffect(() => {
        if (!token) {
            setStatus('error');
            setMessage('Missing verification token.');
            return;
        }

        const handleVerify = async () => {
            try {
                const success = await verifyEmail(token);
                if (success) {
                    setStatus('success');
                    setMessage('Your email has been successfully verified! You can now access all features of RentifyAI.');
                    toast.success('Email verified successfully!');
                } else {
                    setStatus('error');
                    setMessage('Invalid or expired verification token. Please try registering again or contact support.');
                }
            } catch (error) {
                setStatus('error');
                setMessage('An error occurred during verification. Please try again later.');
            }
        };

        handleVerify();
    }, [token]);

    return (
        <div className="min-h-[60vh] flex items-center justify-center p-4">
            <div className="max-w-md w-full bg-white rounded-3xl shadow-xl border border-gray-100 p-8 text-center space-y-6">
                {status === 'loading' && (
                    <div className="space-y-4">
                        <Loader2 className="w-16 h-16 text-brand-600 animate-spin mx-auto" />
                        <h2 className="text-2xl font-bold text-gray-900">Verifying Email</h2>
                        <p className="text-gray-500">{message}</p>
                    </div>
                )}

                {status === 'success' && (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mx-auto">
                            <CheckCircle2 className="w-12 h-12 text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Success!</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {message}
                        </p>
                        <div className="pt-4">
                            <Link href="/login">
                                <Button className="w-full bg-brand-600 hover:bg-brand-700 text-white py-6 rounded-2xl text-lg font-bold shadow-lg shadow-brand-200 group">
                                    Continue to Login
                                    <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}

                {status === 'error' && (
                    <div className="space-y-4 animate-in fade-in zoom-in duration-500">
                        <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center mx-auto">
                            <XCircle className="w-12 h-12 text-red-500" />
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900">Verification Failed</h2>
                        <p className="text-gray-600 leading-relaxed">
                            {message}
                        </p>
                        <div className="pt-4 space-y-3">
                            <Link href="/register">
                                <Button variant="outline" className="w-full py-6 rounded-2xl text-lg font-bold border-gray-200">
                                    Try Registering Again
                                </Button>
                            </Link>
                            <Link href="/">
                                <Button variant="ghost" className="w-full py-2 text-gray-500">
                                    Back to Home
                                </Button>
                            </Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function VerifyEmailPage() {
    return (
        <Suspense fallback={
            <div className="min-h-[60vh] flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-brand-600 animate-spin" />
            </div>
        }>
            <VerifyEmailContent />
        </Suspense>
    );
}
