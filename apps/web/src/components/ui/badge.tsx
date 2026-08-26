import * as React from "react"
import { cva, type VariantProps } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
    "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-black transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 uppercase tracking-widest",
    {
        variants: {
            variant: {
                default:
                    "border-transparent bg-brand-600 text-white shadow hover:bg-brand-600/80",
                secondary:
                    "border-transparent bg-gray-100 text-gray-900 hover:bg-gray-100/80",
                destructive:
                    "border-transparent bg-red-500 text-white shadow hover:bg-red-500/80",
                outline: "text-gray-950",
                success: "border-transparent bg-emerald-500 text-white shadow hover:bg-emerald-500/80",
                warning: "border-transparent bg-amber-500 text-white shadow hover:bg-amber-500/80",
            },
        },
        defaultVariants: {
            variant: "default",
        },
    }
)

export interface BadgeProps
    extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> { }

function Badge({ className, variant, ...props }: BadgeProps) {
    return (
        <div className={cn(badgeVariants({ variant }), className)} {...props} />
    )
}

export { Badge, badgeVariants }
