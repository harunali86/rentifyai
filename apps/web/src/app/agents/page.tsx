import { Navbar } from "@/components/layout/Navbar";
import { getAgents } from "@/lib/api";
import { ArrowRight, Mail, Building2, CheckCircle2, Phone, ShieldCheck, MapPin, Award } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/layout/Footer";

export default async function AgentsPage() {
    const agents = await getAgents();

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />

            <section className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                {/* Header */}
                <div className="mb-14 md:flex justify-between items-end gap-10">
                    <div className="max-w-2xl">
                        <div className="flex items-center gap-2">
                            <span className="text-[#006AFF] font-bold tracking-wider uppercase text-xs bg-blue-50 px-3 py-1 rounded-full border border-blue-100 flex items-center gap-1.5">
                                <ShieldCheck className="w-3.5 h-3.5 text-[#006AFF]" /> RERA Registered Partners
                            </span>
                            <span className="text-emerald-700 font-bold text-xs bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                                100% Background Verified
                            </span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-black text-gray-900 mt-4 tracking-tight">
                            Premier Real Estate <span className="text-[#006AFF]">Advisors</span>
                        </h1>
                        <p className="text-gray-600 mt-3 text-lg leading-relaxed">
                            Connect with Western India's most accomplished luxury brokers. Each partner is government RERA certified with verified high-value transaction records in Pune, Mumbai & Delhi-NCR.
                        </p>
                    </div>
                    <div className="mt-6 md:mt-0">
                        <Link href="/agent/post">
                            <Button className="bg-[#006AFF] text-white hover:bg-[#0052CC] px-8 h-12 rounded-xl font-bold shadow-lg shadow-blue-500/20 cursor-pointer">
                                Partner with RentifyAI
                            </Button>
                        </Link>
                    </div>
                </div>

                {/* Agents Grid */}
                {agents.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">No agents found</h3>
                        <p className="text-gray-400 max-w-sm mx-auto font-medium">We are currently onboarding top-tier agents. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {agents.map((agent) => (
                            <div 
                                key={agent.id} 
                                className="group bg-white rounded-3xl p-6 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-gray-200/80 flex flex-col justify-between"
                            >
                                <div>
                                    {/* Top: Agency & RERA Badge */}
                                    <div className="flex items-center justify-between gap-2 pb-4 border-b border-gray-100 mb-5">
                                        <span className="text-xs font-bold text-gray-500 truncate">
                                            {agent.agency || "Luxury Real Estate Advisory"}
                                        </span>
                                        <span className="text-[10px] font-extrabold text-emerald-800 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200 shrink-0 flex items-center gap-1">
                                            <ShieldCheck className="w-3 h-3 text-emerald-600" />
                                            {agent.reraId ? agent.reraId.split(':')[0] : "RERA"}
                                        </span>
                                    </div>

                                    {/* Profile Header */}
                                    <div className="flex items-center gap-4 mb-5">
                                        <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-white shadow-md ring-2 ring-gray-100 relative shrink-0">
                                            {agent.avatar ? (
                                                <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center text-xl font-black text-blue-700 bg-blue-50">
                                                    {agent.name.charAt(0)}
                                                </div>
                                            )}
                                            <div className="absolute -bottom-0.5 -right-0.5 bg-emerald-500 p-0.5 rounded-full border-2 border-white">
                                                <CheckCircle2 className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                        <div>
                                            <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#006AFF] transition-colors leading-snug">
                                                {agent.name}
                                            </h3>
                                            <p className="text-xs text-gray-500 font-medium">
                                                {agent.designation || "Senior Real Estate Partner"}
                                            </p>
                                            {agent.reraId && (
                                                <p className="text-[10px] text-gray-400 font-mono mt-0.5">
                                                    {agent.reraId}
                                                </p>
                                            )}
                                        </div>
                                    </div>

                                    {/* Specialization Locality Tag */}
                                    {agent.specialization && (
                                        <div className="mb-4 bg-gray-50 px-3 py-2 rounded-xl border border-gray-100 flex items-center gap-2 text-xs font-semibold text-gray-700">
                                            <MapPin className="w-3.5 h-3.5 text-[#006AFF] shrink-0" />
                                            <span className="truncate">{agent.specialization}</span>
                                        </div>
                                    )}

                                    {/* Metrics Grid */}
                                    <div className="grid grid-cols-2 gap-2 mb-5 text-center">
                                        <div className="bg-blue-50/60 p-2.5 rounded-xl border border-blue-100/60">
                                            <span className="text-xs font-black text-[#006AFF] block">
                                                {agent._count?.listings || 15} Listings
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-medium">Active Portfolio</span>
                                        </div>
                                        <div className="bg-emerald-50/60 p-2.5 rounded-xl border border-emerald-100/60">
                                            <span className="text-xs font-black text-emerald-700 block">
                                                {agent.transactedVolume || "₹250+ Cr"}
                                            </span>
                                            <span className="text-[10px] text-gray-500 font-medium">Track Record</span>
                                        </div>
                                    </div>

                                    {/* Direct Contacts */}
                                    <div className="space-y-2 mb-6 text-xs text-gray-600">
                                        {agent.phone && (
                                            <a 
                                                href={`tel:${agent.phone}`}
                                                className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                            >
                                                <Phone className="w-3.5 h-3.5 text-[#006AFF]" />
                                                <span className="font-semibold text-gray-800">{agent.phone}</span>
                                            </a>
                                        )}
                                        <a 
                                            href={`mailto:${agent.email}`}
                                            className="flex items-center gap-2.5 p-2 rounded-lg hover:bg-gray-100 transition-colors"
                                        >
                                            <Mail className="w-3.5 h-3.5 text-[#006AFF]" />
                                            <span className="truncate">{agent.email}</span>
                                        </a>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="pt-4 border-t border-gray-100 flex items-center gap-2">
                                    <Link 
                                        href={`/search?search=${encodeURIComponent(agent.name.split(' ')[0])}`}
                                        className="flex-1"
                                    >
                                        <Button variant="outline" className="w-full h-10 rounded-xl text-xs font-bold text-gray-700 hover:text-[#006AFF] border-gray-200">
                                            View Listings
                                        </Button>
                                    </Link>
                                    <a 
                                        href={`https://wa.me/${agent.phone ? agent.phone.replace(/[^0-9]/g, '') : '919822041890'}?text=${encodeURIComponent('Hi, I am interested in exploring properties with RentifyAI.')}`}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex-1"
                                    >
                                        <Button className="w-full h-10 rounded-xl text-xs font-bold bg-[#006AFF] hover:bg-[#0052CC] text-white">
                                            Connect
                                        </Button>
                                    </a>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
            <Footer />
        </main>
    );
}
