
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { Loader2, Send, ShieldAlert, CheckCircle } from 'lucide-react';

interface LeadInquiryFormProps {
    propertyId: string;
    agentId: string;
    userId?: string;
}

export default function LeadInquiryForm({ propertyId, agentId, userId }: LeadInquiryFormProps) {
    const [message, setMessage] = useState('');
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);

        try {
            const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/api/v1';
            const res = await fetch(`${API_URL}/leads`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    propertyId,
                    agentId,
                    userId,
                    name: !userId ? name : undefined,
                    email: !userId ? email : undefined,
                    message
                })
            });

            if (res.ok) {
                setSubmitted(true);
                toast.success('Inquiry sent to Admin for verification.');
            } else {
                toast.error('Failed to send inquiry.');
            }
        } catch (error) {
            toast.error('Network error. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 text-center space-y-3 animate-in fade-in zoom-in-95">
                <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto shadow-sm">
                    <CheckCircle className="w-6 h-6 text-emerald-600" />
                </div>
                <h4 className="text-sm font-black text-emerald-900 uppercase tracking-widest leading-none">Inquiry Secured</h4>
                <p className="text-xs text-emerald-600 font-medium italic">Our Admin is verifying your request for a safe deal. You will be notified once approved.</p>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="space-y-4 pt-4 border-t border-slate-50">
            <div className="flex items-center gap-2 mb-2">
                <ShieldAlert className="w-4 h-4 text-brand-600" />
                <h4 className="text-xs font-black text-slate-900 uppercase tracking-widest">Safe Inquiry Channel</h4>
            </div>

            {!userId && (
                <div className="grid grid-cols-2 gap-3">
                    <input
                        type="text"
                        placeholder="Your Name"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold focus:bg-white focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                    />
                    <input
                        type="email"
                        placeholder="Email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold focus:bg-white focus:ring-2 focus:ring-brand-500/20 outline-none transition-all"
                    />
                </div>
            )}

            <textarea
                rows={3}
                placeholder="Ask about negotiation, photos, or visit schedule..."
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-100 bg-slate-50 text-xs font-bold focus:bg-white focus:ring-2 focus:ring-brand-500/20 outline-none transition-all resize-none"
            />

            <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 rounded-xl bg-slate-900 hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] shadow-lg shadow-slate-200"
            >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <><Send className="w-3.5 h-3.5 mr-2" /> Send Verified Inquiry</>}
            </Button>

            <p className="text-[9px] text-center text-slate-400 font-bold uppercase leading-relaxed px-4">
                Messages are monitored by Admin to prevent unauthorized direct deals.
            </p>
        </form>
    );
}
