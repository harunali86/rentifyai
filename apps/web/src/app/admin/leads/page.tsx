
import { cookies } from "next/headers";
import { MessageSquare, ShieldCheck, AlertTriangle, CheckCircle, XCircle, Search, Filter, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import LeadsTable from "@/components/admin/LeadsTable";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/api/v1';

async function getAllLeads(token: string) {
    try {
        const res = await fetch(`${API_URL}/leads/admin/all`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function AdminLeadsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) return <div className="p-10 text-center font-bold text-red-500">Access Denied: Production Credentials Required</div>;

    const leads = await getAllLeads(token);

    // Stats calculation
    const pendingTotal = leads.filter((l: any) => l.status === 'PENDING').length;
    const flaggedTotal = leads.filter((l: any) => l.isFlagged).length;
    const approvedTotal = leads.filter((l: any) => l.status === 'APPROVED').length;

    return (
        <div className="space-y-10 max-w-[1600px] mx-auto">
            {/* Header with Commission Shield Messaging */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 text-emerald-600 font-black text-[10px] uppercase tracking-[0.2em] mb-2 bg-emerald-50 w-fit px-3 py-1 rounded-full border border-emerald-100">
                        <ShieldCheck className="w-3.5 h-3.5" />
                        Commission Shield Protocol Active
                    </div>
                    <h2 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Global <span className="text-brand-600">Lead Monitoring</span></h2>
                    <p className="text-slate-500 mt-3 font-medium max-w-xl">Detect platform leakage, moderate inquiries, and track high-value deal conversions across all agents.</p>
                </div>
            </div>

            {/* Shield Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-5">
                    <div className="w-14 h-14 bg-amber-50 rounded-2xl flex items-center justify-center border border-amber-100">
                        <MessageSquare className="w-7 h-7 text-amber-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Pending Review</p>
                        <p className="text-3xl font-black text-slate-900 leading-none">{pendingTotal}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-red-100 shadow-xl shadow-red-200/20 flex items-center gap-5">
                    <div className="w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center border border-red-100 animate-pulse">
                        <AlertTriangle className="w-7 h-7 text-red-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-red-500 uppercase tracking-widest leading-none mb-1.5">Leakage Alerts</p>
                        <p className="text-3xl font-black text-slate-900 leading-none">{flaggedTotal}</p>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-[2rem] border border-slate-100 shadow-xl shadow-slate-200/40 flex items-center gap-5">
                    <div className="w-14 h-14 bg-emerald-50 rounded-2xl flex items-center justify-center border border-emerald-100">
                        <CheckCircle className="w-7 h-7 text-emerald-600" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest leading-none mb-1.5">Agent Approved</p>
                        <p className="text-3xl font-black text-slate-900 leading-none">{approvedTotal}</p>
                    </div>
                </div>

                <div className="bg-brand-600 p-6 rounded-[2rem] shadow-xl shadow-brand-200 flex items-center gap-5 text-white">
                    <div className="w-14 h-14 bg-white/20 rounded-2xl flex items-center justify-center backdrop-blur-md">
                        <TrendingUp className="w-7 h-7 text-white" />
                    </div>
                    <div>
                        <p className="text-[10px] font-black text-brand-100 uppercase tracking-widest leading-none mb-1.5">Platform GMV</p>
                        <p className="text-2xl font-black text-white leading-none">Analysis Ready</p>
                    </div>
                </div>
            </div>

            {/* Interaction Table (Client Component for Actions) */}
            <div className="bg-white rounded-[2.5rem] border border-slate-100 shadow-2xl shadow-slate-200/50 overflow-hidden">
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-50/50">
                    <div>
                        <h3 className="text-xl font-black text-slate-900 tracking-tight">Active Conversation Audit</h3>
                        <p className="text-sm text-slate-500 font-medium">Moderate and verify deals before they reach agents.</p>
                    </div>
                    <div className="flex gap-3">
                        <div className="relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                            <input
                                type="text"
                                placeholder="Search Buyer or Agent..."
                                className="pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-xl text-xs font-bold outline-none focus:ring-2 focus:ring-brand-500/20"
                            />
                        </div>
                        <Button variant="outline" className="rounded-xl border-slate-200 text-xs font-black gap-2">
                            <Filter className="w-3.5 h-3.5" /> Filter
                        </Button>
                    </div>
                </div>

                <LeadsTable initialLeads={leads} token={token} />
            </div>
        </div>
    );
}
