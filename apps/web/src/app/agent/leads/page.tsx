
import { cookies } from "next/headers";
import { Activity, Mail, Phone, Calendar, ArrowUpRight, MessageSquare, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const API_URL = (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000') + '/api/v1';

async function getMyLeads(token: string) {
    try {
        const res = await fetch(`${API_URL}/leads/my`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
        });
        if (!res.ok) return [];
        return res.json();
    } catch (e) {
        return [];
    }
}

export default async function AgentLeadsPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) return null;

    const leads = await getMyLeads(token);

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest mb-2">
                        <MessageSquare className="w-4 h-4" />
                        CRM Dashboard
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">Active <span className="text-brand-600">Inquiries</span></h2>
                    <p className="text-gray-500 mt-2 max-w-md">Real-time leads from potential high-net-worth buyers.</p>
                </div>
            </div>

            {leads.length === 0 ? (
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-gray-100 p-24 text-center space-y-6 shadow-sm">
                    <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto border border-brand-100 rotate-3">
                        <Mail className="w-10 h-10 text-brand-400" />
                    </div>
                    <div className="max-w-xs mx-auto">
                        <h3 className="text-2xl font-black text-gray-900">No Leads Yet</h3>
                        <p className="text-gray-500 mt-2">Promote your listings to start receiving inquiries from verified buyers.</p>
                    </div>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6">
                    {leads.map((lead: any) => (
                        <div key={lead.id} className="bg-white rounded-3xl border border-gray-100 shadow-xl shadow-gray-200/50 p-8 hover:border-brand-200 transition-all group overflow-hidden relative">
                            {/* Decorative gradient corner */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-brand-50 to-transparent rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>

                            <div className="flex flex-col lg:flex-row lg:items-center gap-10">
                                {/* Buyer Info */}
                                <div className="lg:w-1/3">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-12 h-12 rounded-2xl bg-brand-600 flex items-center justify-center text-white font-black text-xl shadow-lg shadow-brand-500/20">
                                            {lead.user?.name?.[0] || lead.guestName?.[0] || '?'}
                                        </div>
                                        <div>
                                            <h3 className="font-extrabold text-gray-900 text-lg uppercase tracking-tight">{lead.user?.name || lead.guestName || 'Anonymous Buyer'}</h3>
                                            <p className="text-xs text-gray-400 font-bold uppercase tracking-widest flex items-center gap-1 mt-0.5">
                                                <Calendar className="w-3 h-3" /> Received {new Date(lead.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>
                                    </div>
                                    <div className="space-y-2 mt-6">
                                        <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                                                <Mail className="w-4 h-4 text-brand-500" />
                                            </div>
                                            {lead.user?.email || lead.guestEmail || 'No email provided'}
                                        </div>
                                        <div className="flex items-center gap-3 text-sm text-gray-600 font-medium">
                                            <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center border border-gray-100">
                                                <Phone className="w-4 h-4 text-emerald-500" />
                                            </div>
                                            {lead.user?.phone || 'Phone hidden'}
                                        </div>
                                    </div>
                                </div>

                                {/* Inquiry Message */}
                                <div className="lg:w-1/2 bg-gray-50 rounded-2xl p-6 border border-gray-100 relative">
                                    <div className="absolute -top-3 left-6 px-3 py-1 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest text-brand-600">
                                        Requirements
                                    </div>
                                    <p className="text-gray-700 text-sm leading-relaxed italic">
                                        "{lead.message}"
                                    </p>
                                </div>

                                {/* Listing Context */}
                                <div className="lg:w-1/6 flex flex-col justify-center items-end text-right">
                                    <div className="mb-4">
                                        <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-1">Target Asset</p>
                                        <Link href={`/properties/${lead.property.slug}`} className="text-sm font-extrabold text-gray-900 hover:text-brand-600 transition-colors flex items-center justify-end gap-1">
                                            {lead.property.title} <ArrowUpRight className="w-3 h-3" />
                                        </Link>
                                    </div>
                                    <div className="flex items-center gap-1 text-[10px] text-gray-400 font-bold uppercase tracking-widest">
                                        <MapPin className="w-3 h-3" /> {lead.property.city}
                                    </div>
                                    <Button className="mt-6 rounded-xl bg-gray-900 text-white hover:bg-brand-600 transition-all font-bold px-6">
                                        Verify Agent
                                    </Button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
