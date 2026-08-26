'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { createBooking, confirmBookingPayment } from '@/lib/api';
import { getCookie } from 'cookies-next';
import { toast } from 'sonner';
import { Loader2, Lock, Unlock, Phone, Mail, CheckCircle, ShieldCheck } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface BookingFormProps {
    propertyId: string;
    agentId: string;
    propertyTitle: string;
    isInitialUnlocked: boolean;
    agent: {
        name: string;
        avatar?: string;
        email?: string;
        phone?: string;
    };
}

export default function BookingForm({ propertyId, agentId, propertyTitle, isInitialUnlocked, agent }: BookingFormProps) {
    const [loading, setLoading] = useState(false);
    const [isUnlocked, setIsUnlocked] = useState(isInitialUnlocked);
    const [booking, setBooking] = useState<any>(null);
    const [step, setStep] = useState<'INITIAL' | 'PAYMENT' | 'SUCCESS'>('INITIAL');
    const router = useRouter();

    const handleInitiateUnlock = async () => {
        const token = getCookie('token') as string;
        if (!token) {
            toast.error('Please login to book a viewing');
            router.push('/login');
            return;
        }

        setLoading(true);
        try {
            // Simulated Platform Holding Fee: ₹999
            const res = await createBooking(token, { propertyId, amount: 999 });
            if (res) {
                setBooking(res);
                setStep('PAYMENT');
            } else {
                toast.error('Failed to initiate booking. Try again.');
            }
        } catch (error) {
            toast.error('Something went wrong');
        } finally {
            setLoading(false);
        }
    };

    const handleConfirmPayment = async () => {
        const token = getCookie('token') as string;
        setLoading(true);
        try {
            const res = await confirmBookingPayment(token, booking.id);
            if (res) {
                setIsUnlocked(true);
                setStep('SUCCESS');
                toast.success('Payment Successful! Contact Unlocked.');
                // Refresh data to get unmasked contact info
                router.refresh();
            } else {
                toast.error('Payment confirmation failed.');
            }
        } catch (error) {
            toast.error('Payment failed');
        } finally {
            setLoading(false);
        }
    };

    if (isUnlocked || step === 'SUCCESS') {
        return (
            <div className="space-y-6">
                <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-100 flex items-center gap-3">
                    <ShieldCheck className="w-6 h-6 text-emerald-600" />
                    <div>
                        <p className="text-sm font-black text-emerald-900 leading-none">Verified Access</p>
                        <p className="text-xs text-emerald-600 font-bold uppercase tracking-widest mt-1">Platform Protected Deal</p>
                    </div>
                </div>

                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 group">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm group-hover:bg-brand-50 transition-colors">
                            <Phone className="w-5 h-5 text-brand-600" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Call Agent</p>
                            <p className="text-lg font-black text-gray-900 tracking-tight">{agent.phone || '+91 98XXX XXX00'}</p>
                        </div>
                    </div>

                    <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 flex items-center gap-4 group">
                        <div className="p-2.5 bg-white rounded-xl shadow-sm group-hover:bg-brand-50 transition-colors">
                            <Mail className="w-5 h-5 text-brand-600" />
                        </div>
                        <div>
                            <p className="text-xs font-black text-gray-400 uppercase tracking-widest leading-none mb-1">Email Agent</p>
                            <p className="text-lg font-black text-gray-900 tracking-tight">{agent.email}</p>
                        </div>
                    </div>
                </div>

                <div className="pt-4">
                    <Button variant="outline" className="w-full h-12 rounded-xl font-bold text-gray-600">
                        Download Receipt
                    </Button>
                </div>
            </div>
        );
    }

    if (step === 'PAYMENT') {
        return (
            <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-500">
                <div className="text-center">
                    <div className="w-16 h-16 bg-brand-50 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Lock className="w-8 h-8 text-brand-600" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">Secure Reservation</h3>
                    <p className="text-sm text-gray-500 mt-2">Pay a holding fee of <span className="text-brand-700 font-black">₹999</span> to unlock contact details and protect your deal.</p>
                </div>

                <div className="p-4 bg-gray-50 rounded-2xl border border-gray-100 space-y-3">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 font-bold">Platform Handling</span>
                        <span className="text-gray-900 font-black">₹999</span>
                    </div>
                    <div className="flex justify-between text-sm py-2 border-t border-gray-200">
                        <span className="text-gray-900 font-black">Total Payable</span>
                        <span className="text-brand-600 font-black">₹999</span>
                    </div>
                </div>

                <Button
                    onClick={handleConfirmPayment}
                    disabled={loading}
                    className="w-full h-14 rounded-2xl bg-brand-600 hover:bg-brand-700 text-white font-black text-lg shadow-xl shadow-brand-100"
                >
                    {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Pay & Unlock Now'}
                </Button>

                <p className="text-xs text-center text-gray-400 font-bold uppercase tracking-widest font-mono">
                    SECURED BY RENTIFY ESCROW • 256-BIT ENCRYPTION
                </p>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="text-center mb-6">
                <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Privacy Protected</p>
                <div className="flex justify-center -space-x-4 mb-6">
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                    <div className="w-12 h-12 rounded-full border-4 border-white bg-gray-100 flex items-center justify-center">
                        <Lock className="w-5 h-5 text-gray-400" />
                    </div>
                </div>
                <h4 className="text-lg font-black text-gray-900 tracking-tight leading-none mb-2">Details are Locked</h4>
                <p className="text-sm text-gray-500 max-w-[240px] mx-auto font-medium">To avoid off-platform scams, contact details are hidden until you book a viewing.</p>
            </div>

            <Button
                onClick={handleInitiateUnlock}
                disabled={loading}
                variant="premium"
                className="w-full h-14 rounded-2xl text-lg shadow-xl shadow-brand-100 font-black"
            >
                {loading ? <Loader2 className="w-6 h-6 animate-spin" /> : 'Express Interest & Unlock'}
            </Button>

            <div className="flex items-center gap-2 justify-center text-xs font-bold text-emerald-600 uppercase tracking-widest">
                <ShieldCheck className="w-3.5 h-3.5" />
                Platform Assured Transactions
            </div>
        </div>
    );
}
