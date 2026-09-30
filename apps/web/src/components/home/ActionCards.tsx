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
        subtitle: "Verified Luxury Residences & Villas",
        description: "Find your dream luxury residence with RERA-verified clear titles, 3D interactive floor plans, and expert on-ground advisors.",
        cta: "Browse Properties",
        href: "/buy",
        icon: Home,
        badge: "RERA VERIFIED",
        badgeColor: "bg-emerald-600",
        image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=1000&auto=format&fit=crop",
        features: ["100% Clear Title Guarantee", "3D Interactive Floor Plans", "MahaRERA Certified Advisors"]
    },
    {
        title: "Rent a home",
        subtitle: "Direct Owner Rentals & Penthouses",
        description: "Explore 100% verified rentals with Zero Brokerage, direct owner contact on WhatsApp, and instant digital move-in agreements.",
        cta: "Find Rentals",
        href: "/rent",
        icon: Key,
        badge: "ZERO BROKERAGE",
        badgeColor: "bg-blue-600",
        image: "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?q=80&w=1000&auto=format&fit=crop",
        features: ["Direct Owner WhatsApp Access", "Biometric Aadhaar e-Agreement", "Zero Middlemen Markups"]
    },
    {
        title: "Sell a home",
        subtitle: "Instant Valuation & Elite Buyers",
        description: "Get real-time Rentify Zestimate® valuation and connect directly with high-net-worth verified buyers in Pune & Mumbai.",
        cta: "Post Your Property",
        href: "/agent/post",
        icon: Building2,
        badge: "FREE AI ZESTIMATE®",
        badgeColor: "bg-amber-600",
        image: "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?q=80&w=1000&auto=format&fit=crop",
        features: ["Instant AI Valuation Report", "4,500+ Qualified Active Buyers", "1-Click Instant Listing Live"]
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
                <div className="text-center max-w-3xl mx-auto mb-12">
                    <span className="text-xs font-black text-[#006AFF] uppercase tracking-[0.2em] block mb-2">
                        Tailored Journey
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        See How RentifyAI Can Help You
                    </h2>
                    <p className="text-slate-500 text-sm mt-2">
                        Whether you are investing, leasing, or liquidating luxury real estate in India.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
                    {actionCards.map((card) => (
                        <div
                            key={card.title}
                            className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl border border-slate-200/90 hover:border-blue-400/80 transition-all duration-300 flex flex-col group"
                        >
                            {/* Visual Image Header */}
                            <div className="relative h-56 sm:h-60 w-full overflow-hidden bg-slate-900">
                                <img
                                    src={card.image}
                                    alt={card.title}
                                    className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-108"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/85 via-slate-950/20 to-transparent" />
                                
                                {/* Top Floating Badge */}
                                <div className="absolute top-4 left-4">
                                    <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black tracking-widest text-white uppercase shadow-md backdrop-blur-md ${card.badgeColor}`}>
                                        <Zap className="w-3 h-3 text-white" />
                                        {card.badge}
                                    </span>
                                </div>

                                {/* Floating Icon Squircle */}
                                <div className="absolute -bottom-4 right-6 w-14 h-14 rounded-2xl bg-white shadow-xl border border-slate-100 flex items-center justify-center text-[#006AFF] group-hover:bg-[#006AFF] group-hover:text-white transition-all duration-300 group-hover:scale-105 z-10">
                                    <card.icon className="w-7 h-7 transition-colors" />
                                </div>
                            </div>

                            {/* Card Content Body */}
                            <div className="p-6 sm:p-7 pt-7 flex flex-col flex-grow text-left">
                                <span className="text-[11px] font-black text-blue-600 uppercase tracking-widest block mb-1">
                                    {card.subtitle}
                                </span>

                                <h3 className="text-2xl font-black text-slate-900 mb-2 group-hover:text-[#006AFF] transition-colors">
                                    {card.title}
                                </h3>

                                <p className="text-slate-600 text-xs sm:text-sm leading-relaxed mb-5">
                                    {card.description}
                                </p>

                                {/* Features Checklist */}
                                <ul className="space-y-2 mb-6 border-t border-slate-100 pt-4 flex-grow">
                                    {card.features.map((feat) => (
                                        <li key={feat} className="flex items-center text-xs font-semibold text-slate-700">
                                            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 mr-2 shrink-0" />
                                            <span>{feat}</span>
                                        </li>
                                    ))}
                                </ul>

                                <Link
                                    href={card.href}
                                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-gradient-to-r from-[#006AFF] to-blue-700 hover:from-blue-700 hover:to-indigo-800 text-white font-bold text-xs uppercase tracking-wider shadow-md shadow-blue-500/25 group-hover:shadow-lg transition-all"
                                >
                                    <span>{card.cta}</span>
                                    <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                </Link>
                            </div>
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
