
import { getMyProperties } from "@/lib/api";
import { cookies } from "next/headers";
import { Button } from "@/components/ui/button";
import { Edit, Eye, MapPin, Tag, Calendar, Activity, ShieldCheck } from "lucide-react";
import Link from "next/link";
import DeletePropertyButton from "@/components/property/DeletePropertyButton";

export default async function MyPropertiesPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) return null;

    const properties = await getMyProperties(token);

    return (
        <div className="space-y-10">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                <div>
                    <div className="flex items-center gap-2 text-brand-600 font-bold text-xs uppercase tracking-widest mb-2">
                        <Activity className="w-4 h-4" />
                        Inventory Management
                    </div>
                    <h2 className="text-4xl font-black text-gray-900 tracking-tight">My <span className="text-brand-600">Listings</span></h2>
                    <p className="text-gray-500 mt-2 max-w-md">Manage your verified real estate portfolio with real-time performance tracking.</p>
                </div>
                <Link href="/agent/post">
                    <Button className="bg-brand-600 hover:bg-brand-700 text-white rounded-2xl shadow-xl shadow-brand-500/20 h-14 px-8 font-bold text-lg transition-all active:scale-95">
                        Add New Listing
                    </Button>
                </Link>
            </div>

            {properties.length === 0 ? (
                <div className="bg-white rounded-[2rem] border-2 border-dashed border-gray-100 p-24 text-center space-y-6 shadow-sm">
                    <div className="w-20 h-20 bg-brand-50 rounded-3xl flex items-center justify-center mx-auto border border-brand-100 rotate-3">
                        <MapPin className="w-10 h-10 text-brand-400" />
                    </div>
                    <div className="max-w-xs mx-auto">
                        <h3 className="text-2xl font-black text-gray-900">Your Portfolio is Empty</h3>
                        <p className="text-gray-500 mt-2">Start listing properties to connect with thousands of premium buyers.</p>
                    </div>
                    <Link href="/agent/post">
                        <Button className="rounded-2xl h-12 px-8 bg-gray-900 text-white hover:bg-black font-bold">Start Your First Listing</Button>
                    </Link>
                </div>
            ) : (
                <div className="bg-white rounded-[2.5rem] border border-gray-100 shadow-2xl shadow-gray-200/50 overflow-hidden">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50/50 border-b border-gray-100">
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Listing Asset</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Verification Status</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">Valuation / category</th>
                                    <th className="px-8 py-6 text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] text-right">Operational Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-50">
                                {properties.map((property) => (
                                    <tr key={property.id} className="hover:bg-brand-50/30 transition-all duration-300 group">
                                        <td className="px-8 py-8">
                                            <div className="flex items-center gap-6">
                                                <div className="w-24 h-16 rounded-2xl bg-gray-100 overflow-hidden border-2 border-white shadow-md flex-shrink-0 relative group-hover:scale-105 transition-transform duration-500">
                                                    {property.images?.[0] ? (
                                                        <img src={property.images[0].url} alt={property.title} className="w-full h-full object-cover" />
                                                    ) : (
                                                        <div className="w-full h-full flex items-center justify-center text-[8px] font-black text-gray-300 uppercase tracking-widest">No Media</div>
                                                    )}
                                                </div>
                                                <div className="min-w-0">
                                                    <p className="font-extrabold text-gray-900 truncate max-w-[240px] text-base group-hover:text-brand-600 transition-colors uppercase tracking-tight">{property.title}</p>
                                                    <p className="text-xs text-gray-400 flex items-center gap-1.5 mt-1.5 font-medium">
                                                        <MapPin className="w-3.5 h-3.5 text-brand-400" /> {property.city}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="flex items-center gap-2">
                                                {property.status === 'PUBLISHED' ? (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-100 text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                        <ShieldCheck className="w-3 h-3" /> Live & Verified
                                                    </div>
                                                ) : property.status === 'PENDING' ? (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-50 text-amber-700 border border-amber-100 text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                        <Calendar className="w-3 h-3" /> Under Review
                                                    </div>
                                                ) : (
                                                    <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-red-50 text-red-700 border border-red-100 text-[10px] font-black uppercase tracking-wider shadow-sm">
                                                        Rejected
                                                    </div>
                                                )}
                                            </div>
                                        </td>
                                        <td className="px-8 py-8">
                                            <div className="text-lg font-black text-gray-900 flex items-center gap-1">
                                                <span className="text-brand-600 text-sm">₹</span>
                                                {Number(property.price).toLocaleString('en-IN')}
                                            </div>
                                            <div className="flex items-center gap-2 mt-2">
                                                <span className="text-[9px] text-gray-400 uppercase font-black tracking-widest bg-gray-50 px-2 py-0.5 rounded border border-gray-100">{property.type}</span>
                                                <span className="text-[9px] text-brand-400 uppercase font-black tracking-widest bg-brand-50 px-2 py-0.5 rounded border border-brand-100">{property.listingType}</span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-8 text-right">
                                            <div className="flex items-center justify-end gap-3 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                                <Link href={`/properties/${property.slug}`} target="_blank">
                                                    <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-brand-600 hover:bg-brand-50 rounded-xl transition-all" title="View Public Listing">
                                                        <Eye className="w-5 h-5" />
                                                    </Button>
                                                </Link>
                                                <Button variant="ghost" size="icon" className="h-10 w-10 text-gray-400 hover:text-amber-600 hover:bg-amber-50 rounded-xl transition-all" title="Edit Listing">
                                                    <Edit className="w-5 h-5" />
                                                </Button>
                                                <div className="w-px h-6 bg-gray-100 mx-1"></div>
                                                <DeletePropertyButton id={property.id} />
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    );
}
