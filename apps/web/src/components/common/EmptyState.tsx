
import Link from "next/link";
import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
    title: string;
    description: string;
    icon?: LucideIcon;
    actionLabel?: string;
    actionLink?: string;
    onAction?: () => void;
}

export function EmptyState({ title, description, icon: Icon, actionLabel, actionLink, onAction }: EmptyStateProps) {
    return (
        <div className="flex flex-col items-center justify-center text-center p-12 bg-white rounded-2xl border border-dashed border-gray-200">
            <div className="w-20 h-20 bg-brand-50 rounded-full flex items-center justify-center mb-6 animate-fade-in">
                {Icon && <Icon className="w-10 h-10 text-brand-600" />}
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
            <p className="text-gray-500 max-w-sm mb-8 leading-relaxed">{description}</p>

            {actionLabel && (actionLink ? (
                <Link href={actionLink}>
                    <Button size="lg" className="rounded-xl px-8 font-bold shadow-brand hover:shadow-brand-lg transition-all">
                        {actionLabel}
                    </Button>
                </Link>
            ) : (
                <Button onClick={onAction} size="lg" className="rounded-xl px-8 font-bold shadow-brand hover:shadow-brand-lg transition-all">
                    {actionLabel}
                </Button>
            ))}
        </div>
    );
}
