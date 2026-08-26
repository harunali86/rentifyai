import Image from "next/image";
import Link from "next/link";
import { Home, Key, Building2 } from "lucide-react";

interface ActionCard {
    title: string;
    description: string;
    cta: string;
    href: string;
    illustration: string;
    bgColor: string;
}

const actionCards: {
    title: string;
    description: string;
    cta: string;
    href: string;
    icon: React.ElementType; // Lucide Icon
    bgColor: string;
}[] = [
        {
            title: "Buy a home",
            description: "Find your perfect property with personalized search, verified agents, and instant loan estimates.",
            cta: "Browse Properties",
            href: "/buy",
            icon: Home, // Using Lucide Home icon
            bgColor: "bg-white",
        },
        {
            title: "Rent a home",
            description: "Discover rentals in your budget with transparent pricing, virtual tours, and easy applications.",
            cta: "Find Rentals",
            href: "/rent",
            icon: Key,
            bgColor: "bg-white",
        },
        {
            title: "Sell a home",
            description: "Get your home's estimated value and connect with top local agents to sell faster.",
            cta: "See Your Options",
            href: "/agent/post",
            icon: Building2,
            bgColor: "bg-white",
        },
    ];

export function ActionCards() {
    return (
        <section className="bg-gray-50 py-16">
            <div className="max-w-6xl mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {actionCards.map((card) => (
                        <div
                            key={card.title}
                            className={`${card.bgColor} rounded-xl p-8 shadow-sm border border-gray-100 hover:shadow-md transition-shadow flex flex-col items-center text-center group`}
                        >
                            {/* Illustration / Icon */}
                            <div className="w-24 h-24 mb-6 rounded-full bg-[#E5F1FF] flex items-center justify-center group-hover:bg-[#CCE4FF] transition-colors">
                                <card.icon className="w-10 h-10 text-[#006AFF]" />
                            </div>

                            {/* Title */}
                            <h3 className="text-xl font-bold text-gray-900 mb-3">
                                {card.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-sm leading-relaxed mb-6 flex-grow">
                                {card.description}
                            </p>

                            {/* CTA Button */}
                            <Link
                                href={card.href}
                                className="inline-flex items-center justify-center px-6 py-3 border-2 border-[#006AFF] text-[#006AFF] font-semibold rounded-lg hover:bg-[#006AFF] hover:text-white transition-colors"
                            >
                                {card.cta}
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
