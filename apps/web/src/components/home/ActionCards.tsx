import React from "react";
import Link from "next/link";
import { 
    Home, 
    Key, 
    Building2, 
    FileText, 
    Landmark, 
    Truck, 
    ShieldCheck, 
    CheckCircle2, 
    ArrowRight,
    Zap
} from "lucide-react";

const actionCards = [
    {
        title: "Buy a home",
        description: "Find your dream luxury residence with RERA-verified titles, 3D floor plans, and expert on-ground advisors.",
        cta: "Browse Properties",
        href: "/buy",
        icon: Home,
    },
    {
        title: "Rent a home",
        description: "Explore 100% verified rentals with Zero Brokerage, direct owner contact, and instant digital move-in.",
        cta: "Find Rentals",
        href: "/rent",
        icon: Key,
    },
    {
        title: "Sell a home",
        description: "Get real-time Rentify Zestimate® valuation and connect directly with high-net-worth buyers in Pune & Mumbai.",
        cta: "See Your Options",
        href: "/agent/post",
        icon: Building2,
    },
];

const homeServices = [
    {
        title: "Online Rent Agreement",
        desc: "Government-compliant lease agreement with biometric/Aadhaar e-Sign & doorstep delivery.",
        icon: FileText,
        badge: "INSTANT E-SIGN",
        href: "/rent",
    },
    {
        title: "Instant Home Loans",
        desc: "Lowest interest rates starting at 8.35% from SBI, HDFC & ICICI with 48h in-principle sanction.",
        icon: Landmark,
        badge: "LOWEST ROI",
        href: "/buy",
    },
    {
        title: "Packers & Movers",
        desc: "Dedicated move manager, guaranteed damage-free handling, and automated live GPS tracking.",
        icon: Truck,
        badge: "ZERO DAMAGE",
        href: "/rent",
    },
    {
        title: "MahaRERA Legal Verification",
        desc: "Senior property advocate title check, 30-year encumbrance audit, and municipal zoning report.",
        icon: ShieldCheck,
        badge: "100% SAFE",
        href: "/buy",
    },
];

export function ActionCards() {
    return (
        <section className="bg-slate-50/70 py-16 sm:py-20 border-t border-slate-200/60">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                
                {/* 🌟 NoBroker-Style Zero Brokerage Trust Banner */}
                <div className="rounded-3xl bg-gradient-to-r from-blue-900 via-indigo-950 to-slate-900 p-8 sm:p-10 text-white shadow-xl mb-16 relative overflow-hidden">
                    <div className="absolute top-0 right-0 -mt-10 -mr-10 h-64 w-64 rounded-full bg-blue-500/10 blur-3xl pointer-events-none" />
                    
                    <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8">
                        <div className="max-w-2xl">
                            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/20 border border-emerald-400/30 px-3 py-1 text-xs font-black text-emerald-300 uppercase tracking-widest mb-3">
                                <Zap className="h-3.5 w-3.5 text-emerald-400" />
                                100% Zero Brokerage Guarantee
                            </div>
                            <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-white">
                                Buy & Rent Directly Without Middlemen Fees
                            </h2>
                            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                                RentifyAI connects you directly with verified developers, principal owners, and MahaRERA-certified advisors. Zero hidden charges, 100% contract transparency.
                            </p>
                        </div>

                        {/* Three Key Metrics */}
                        <div className="grid grid-cols-3 gap-4 sm:gap-6 border-t lg:border-t-0 lg:border-l border-white/10 pt-6 lg:pt-0 lg:pl-8 shrink-0">
                            <div>
                                <div className="text-xl sm:text-2xl font-black text-emerald-400">₹120+ Cr</div>
                                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Brokerage Saved</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-black text-blue-400">4,500+</div>
                                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">Direct Listings</div>
                            </div>
                            <div>
                                <div className="text-xl sm:text-2xl font-black text-amber-400">100%</div>
                                <div className="text-[11px] text-slate-400 font-semibold uppercase tracking-wider mt-0.5">RERA Verified</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* 🌟 Core Action Cards (Buy / Rent / Sell) */}
                <div className="text-center max-w-3xl mx-auto mb-10">
                    <span className="text-xs font-black text-[#006AFF] uppercase tracking-[0.2em] block mb-1">
                        Tailored Journey
                    </span>
                    <h2 className="text-2xl sm:text-3xl font-black text-slate-900 tracking-tight">
                        See How RentifyAI Can Help You
                    </h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
                    {actionCards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white rounded-2xl p-8 shadow-xs border border-slate-200/80 hover:shadow-xl hover:border-blue-400 transition-all flex flex-col items-center text-center group"
                        >
                            <div className="w-20 h-20 mb-6 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-[#006AFF] group-hover:text-white transition-all text-[#006AFF] shadow-inner">
                                <card.icon className="w-9 h-9 transition-colors" />
                            </div>

                            <h3 className="text-xl font-black text-slate-900 mb-2 group-hover:text-[#006AFF] transition-colors">
                                {card.title}
                            </h3>

                            <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-6 flex-grow">
                                {card.description}
                            </p>

                            <Link
                                href={card.href}
                                className="w-full inline-flex items-center justify-center px-5 py-2.5 rounded-xl border border-[#006AFF] text-[#006AFF] font-bold text-xs uppercase tracking-wider hover:bg-[#006AFF] hover:text-white transition-all shadow-xs"
                            >
                                {card.cta}
                            </Link>
                        </div>
                    ))}
                </div>

                {/* 🌟 Rentify Essentials: Indian Home Services Strip */}
                <div className="rounded-3xl bg-white border border-slate-200/80 p-8 sm:p-10 shadow-xs">
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
                        <div>
                            <span className="text-xs font-black text-emerald-600 uppercase tracking-widest block mb-1">
                                Complete Ecosystem
                            </span>
                            <h3 className="text-2xl font-black text-slate-900 tracking-tight">
                                Rentify Home Essentials & Legal Services
                            </h3>
                            <p className="text-xs sm:text-sm text-slate-500 mt-1">
                                Hassle-free legal, financial, and relocation services built for modern Indian home-seekers.
                            </p>
                        </div>
                        <span className="inline-flex items-center gap-1 text-xs font-bold text-[#006AFF]">
                            Zero Brokerage Guaranteed <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                        </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {homeServices.map((service, idx) => (
                            <Link
                                key={idx}
                                href={service.href}
                                className="group relative rounded-2xl border border-slate-200/90 bg-slate-50/50 p-5 hover:bg-white hover:border-[#006AFF] hover:shadow-md transition-all flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center justify-between mb-3">
                                        <div className="w-10 h-10 rounded-xl bg-blue-100/70 text-[#006AFF] flex items-center justify-center group-hover:scale-110 transition-transform">
                                            <service.icon className="w-5 h-5" />
                                        </div>
                                        <span className="text-[9px] font-black text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                                            {service.badge}
                                        </span>
                                    </div>
                                    <h4 className="text-sm font-bold text-slate-900 group-hover:text-[#006AFF] transition-colors mb-1.5">
                                        {service.title}
                                    </h4>
                                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                                        {service.desc}
                                    </p>
                                </div>

                                <div className="mt-4 pt-3 border-t border-slate-200/60 flex items-center justify-between text-xs font-bold text-[#006AFF]">
                                    <span>Explore</span>
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                                </div>
                            </Link>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    );
}
