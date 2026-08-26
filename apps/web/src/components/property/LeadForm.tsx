'use client';

import { useActionState, useEffect } from 'react';
import { createLeadAction } from '@/actions/leads';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Send } from 'lucide-react';

interface LeadFormProps {
    propertyId: string;
    agentId: string;
    agentName: string;
    propertyTitle: string;
}

const initialState = { error: '', success: false, message: '' };

export default function LeadForm({ propertyId, agentId, agentName, propertyTitle }: LeadFormProps) {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(createLeadAction, initialState);

    useEffect(() => {
        if (state?.success) {
            toast.success(state.message);
        } else if (state?.error) {
            toast.error(state.error);
        }
    }, [state]);

    if (state?.success) {
        return (
            <div className="bg-emerald-50 border border-emerald-100 p-6 rounded-2xl text-center">
                <div className="w-12 h-12 bg-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Send className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-emerald-900 font-bold text-lg">Inquiry Sent!</h3>
                <p className="text-emerald-700 text-sm mt-1">{agentName} will contact you shortly.</p>
                <Button
                    variant="outline"
                    className="mt-6 w-full border-emerald-200 text-emerald-700 hover:bg-emerald-100"
                    onClick={() => window.location.reload()}
                >
                    Send another inquiry
                </Button>
            </div>
        );
    }

    return (
        <form action={formAction} className="space-y-4">
            <input type="hidden" name="propertyId" value={propertyId} />
            <input type="hidden" name="agentId" value={agentId} />

            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Full Name</label>
                <input
                    name="name"
                    type="text"
                    required
                    placeholder="Enter your name"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Work Email</label>
                <input
                    name="email"
                    type="email"
                    required
                    placeholder="name@company.com"
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none transition-all"
                />
            </div>

            <div className="space-y-1">
                <label className="text-[10px] font-black uppercase tracking-widest text-gray-400 ml-1">Special Requirements</label>
                <textarea
                    name="message"
                    rows={4}
                    required
                    defaultValue={`Hi ${agentName.split(' ')[0]}, I would like to schedule a viewing for "${propertyTitle}". Please let me know your availability.`}
                    className="w-full px-4 py-3 rounded-xl border border-gray-100 bg-gray-50 focus:bg-white focus:ring-2 focus:ring-brand-500 focus:outline-none resize-none transition-all"
                ></textarea>
            </div>

            <Button
                disabled={isPending}
                className="w-full text-lg h-14 bg-brand-600 hover:bg-brand-700 text-white rounded-2xl shadow-xl shadow-brand-500/10 font-bold transition-all active:scale-95"
            >
                {isPending ? (
                    <>
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                        Processing...
                    </>
                ) : (
                    "Contact Agent Now"
                )}
            </Button>

            <p className="text-[10px] text-center text-gray-400 font-medium">
                Shielded by 256-bit encryption. No spam, guaranteed.
            </p>
        </form>
    );
}
