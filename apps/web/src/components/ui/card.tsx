import * as React from "react"

const Card = React.forwardRef<
    HTMLDivElement,
    React.HTMLAttributes<HTMLDivElement>
>(({ className, ...props }, ref) => (
    <div
        ref={ref}
        className="rounded-xl border border-slate-200 bg-white text-slate-950 shadow-sm"
        {...props}
    />
))
Card.displayName = "Card"

export { Card }
