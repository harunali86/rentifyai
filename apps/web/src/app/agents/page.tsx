import { Navbar } from "@/components/layout/Navbar";
import { getAgents } from "@/lib/api";
import { ArrowRight, Mail, Building2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default async function AgentsPage() {
    const agents = await getAgents();

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />

            <section className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="mb-16 md:flex justify-between items-end gap-10">
                    <div className="max-w-2xl">
                        <span className="text-brand-600 font-black tracking-widest uppercase text-[10px] bg-brand-50 px-3 py-1 rounded-lg">Our Experts</span>
                        <h1 className="text-5xl font-black text-gray-900 mt-4 tracking-tight">Partner <span className="text-brand-600">Agents</span></h1>
                        <p className="text-gray-500 mt-4 text-xl font-medium leading-relaxed">
                            Connect with India's most trusted real estate professionals. Our agents are verified, experienced, and dedicated to finding your perfect space.
                        </p>
                    </div>
                    <div className="mt-8 md:mt-0">
                        <Link href="/register?role=AGENT">
                            <Button className="bg-gray-900 text-white hover:bg-black px-8 h-14 rounded-2xl font-bold shadow-xl">
                                Join as an Agent
                            </Button>
                        </Link>
                    </div>
                </div>

                {agents.length === 0 ? (
                    <div className="text-center py-32 bg-white rounded-3xl border-2 border-dashed border-gray-100">
                        <h3 className="text-2xl font-black text-gray-900 mb-2">No agents found</h3>
                        <p className="text-gray-400 max-w-sm mx-auto font-medium">We are currently onboarding top-tier agents. Check back soon.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {agents.map((agent) => (
                            <div key={agent.id} className="group bg-white rounded-3xl p-8 shadow-sm hover:shadow-2xl hover:-translate-y-2 transition-all duration-500 border border-gray-100">
                                <div className="flex items-center gap-6 mb-8">
                                    <div className="w-20 h-20 rounded-full bg-brand-50 overflow-hidden border-4 border-white shadow-lg ring-1 ring-gray-100 relative">
                                        {agent.avatar ? (
                                            <img src={agent.avatar} alt={agent.name} className="w-full h-full object-cover" />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center text-xl font-black text-brand-700">
                                                {agent.name.charAt(0)}
                                            </div>
                                        )}
                                        <div className="absolute -bottom-1 -right-1 bg-emerald-500 p-1 rounded-full border-2 border-white shadow-sm">
                                            <CheckCircle2 className="w-3 h-3 text-white" />
                                        </div>
                                    </div>
                                    <div>
                                        <h3 className="text-xl font-black text-gray-900 group-hover:text-brand-600 transition-colors uppercase tracking-tight">{agent.name}</h3>
                                        <p className="text-xs font-bold text-gray-400 mt-1 uppercase tracking-widest">Verified Partner</p>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-8">
                                    <div className="flex items-center gap-3 text-gray-500 bg-gray-50 p-3 rounded-2xl border border-gray-100/50">
                                        <Mail className="w-4 h-4 text-brand-600" />
                                        <span className="text-sm font-bold truncate">{agent.email}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-gray-500 bg-gray-50 p-3 rounded-2xl border border-gray-100/50">
                                        <Building2 className="w-4 h-4 text-brand-600" />
                                        <span className="text-sm font-bold">{agent._count?.listings || 0} Active Listings</span>
                                    </div>
                                </div>

                                <div className="pt-4 border-t border-gray-50">
                                    <Button variant="premium" className="w-full h-12 rounded-xl text-sm font-bold shadow-lg shadow-brand-100 group">
                                        View Profile
                                        <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </section>
        </main>
    );
}
