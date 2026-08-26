import { cookies } from 'next/headers';
import {
    Activity,
    Home,
    Clock,
    AlertTriangle,
    TrendingUp,
    Users,
    Wallet,
    ShieldCheck
} from 'lucide-react';
import Link from 'next/link';
import { getAdminProperties, getAdminStats } from '@/lib/api';

export default async function AdminDashboard() {
    const cookieStore = await cookies();
    const token = cookieStore.get('token')?.value || '';

    // Fetch both listings and aggregated stats
    const [properties, aggregatedStats] = await Promise.all([
        getAdminProperties(token),
        getAdminStats(token)
    ]);

    const stats = [
        {
            label: 'Total Platform Revenue',
            value: `₹${aggregatedStats?.totalRevenue?.toLocaleString('en-IN') || '0'}`,
            icon: Wallet,
            color: 'text-emerald-500',
            bg: 'bg-emerald-500/10',
            sub: `${aggregatedStats?.platformBookings || 0} Paid Bookings`
        },
        {
            label: 'Pending Review',
            value: aggregatedStats?.pendingReview || 0,
            icon: Clock,
            color: 'text-amber-500',
            bg: 'bg-amber-500/10',
            sub: 'Requires attention'
        },
        {
            label: 'Active Listings',
            value: aggregatedStats?.totalProperties || 0,
            icon: Activity,
            color: 'text-blue-500',
            bg: 'bg-blue-500/10',
            sub: 'Live on platform'
        },
        {
            label: 'Verified Users',
            value: aggregatedStats?.totalUsers || 0,
            icon: Users,
            color: 'text-purple-500',
            bg: 'bg-purple-500/10',
            sub: 'Agents & Buyers'
        },
    ];

    return (
        <div className="space-y-10">
            <div className="flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-white tracking-tight">System <span className="text-brand-500 font-black">Overview</span></h1>
                    <p className="text-slate-400 mt-1 font-medium italic">Platform health and escrow audit logs.</p>
                </div>
                <div className="flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-xl">
                    <ShieldCheck className="w-5 h-5 text-emerald-500" />
                    <span className="text-xs font-black text-emerald-500 uppercase tracking-widest">Platform Secured</span>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-[#1e293b] p-6 rounded-2xl border border-slate-800 flex flex-col gap-4 hover:border-slate-700 transition-colors group">
                        <div className={`w-12 h-12 rounded-xl ${stat.bg} flex items-center justify-center group-hover:scale-110 transition-transform`}>
                            <stat.icon className={`w-6 h-6 ${stat.color}`} />
                        </div>
                        <div>
                            <div className="text-slate-400 text-[10px] font-black uppercase tracking-widest mb-1">{stat.label}</div>
                            <div className="text-3xl font-black text-white tracking-tight">{stat.value}</div>
                            <div className="text-[10px] text-slate-500 font-bold mt-1 uppercase tracking-wider">{stat.sub}</div>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                {/* Recent Activity Mini-Table */}
                <div className="bg-[#1e293b] rounded-2xl border border-slate-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Market Growth</h3>
                        <TrendingUp className="w-5 h-5 text-emerald-500" />
                    </div>
                    <div className="h-[200px] flex items-center justify-center text-slate-500 italic border border-dashed border-slate-700 rounded-xl">
                        Chart: Real-time trends visualization
                    </div>
                </div>

                <div className="bg-[#1e293b] rounded-2xl border border-slate-800 p-6">
                    <div className="flex justify-between items-center mb-6">
                        <h3 className="font-bold text-lg">Agent Performance</h3>
                        <Users className="w-5 h-5 text-blue-500" />
                    </div>
                    <div className="h-[200px] flex items-center justify-center text-slate-500 italic border border-dashed border-slate-700 rounded-xl">
                        Chart: Top performing agents by verification rate
                    </div>
                </div>
            </div>
        </div>
    );
}
