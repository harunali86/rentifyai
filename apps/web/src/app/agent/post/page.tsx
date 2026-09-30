'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { 
    Building2, 
    Sparkles, 
    CheckCircle2, 
    ArrowRight, 
    UploadCloud, 
    MapPin, 
    IndianRupee, 
    Bed, 
    Bath, 
    Maximize, 
    ShieldCheck, 
    Zap,
    ExternalLink,
    RefreshCw
} from 'lucide-react';
import { toast } from 'sonner';

const LUXURY_PRESETS = [
    {
        name: "🏰 Koregaon Park Heritage Villa",
        city: "Pune",
        title: "Koregaon Park South Main Road Heritage Estate",
        price: 135000000,
        type: "RESIDENTIAL",
        listingType: "SALE",
        bedrooms: 5,
        bathrooms: 5,
        areaSqFt: 5400,
        address: "South Main Road, Near Osho Lane, Koregaon Park",
        images: [
            "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=1600&q=85"
        ]
    },
    {
        name: "🏙️ Worli Sea Face Sky Penthouse",
        city: "Mumbai",
        title: "Worli Sea Face Ultra-Luxury Arabian View Penthouse",
        price: 245000000,
        type: "RESIDENTIAL",
        listingType: "SALE",
        bedrooms: 4,
        bathrooms: 5,
        areaSqFt: 6200,
        address: "Worli Sea Face, Worli, South Mumbai",
        images: [
            "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?auto=format&fit=crop&w=1600&q=85"
        ]
    },
    {
        name: "🌿 Baner High Street Smart High-Rise",
        city: "Pune",
        title: "Baner High Street Signature Corner High-Rise",
        price: 18500000,
        type: "RESIDENTIAL",
        listingType: "SALE",
        bedrooms: 3,
        bathrooms: 3,
        areaSqFt: 1950,
        address: "Behind Balewadi High Street, Baner, Pune",
        images: [
            "https://images.unsplash.com/photo-1600573472550-8090b5e0745e?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1600210492486-724fe5c67fb0?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1600&q=85"
        ]
    },
    {
        name: "🌊 Goa Candolim Beachfront Villa",
        city: "Goa",
        title: "Candolim Portuguese Luxury Beachside Villa",
        price: 115000000,
        type: "RESIDENTIAL",
        listingType: "SALE",
        bedrooms: 4,
        bathrooms: 4,
        areaSqFt: 4300,
        address: "Near Fort Aguada, Candolim, North Goa",
        images: [
            "https://images.unsplash.com/photo-1600585154526-990dced4db0d?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1600&q=85",
            "https://images.unsplash.com/photo-1613977257363-707ba9348227?auto=format&fit=crop&w=1600&q=85"
        ]
    }
];

export default function PostPropertyPage() {
    const router = useRouter();

    const [title, setTitle] = useState('');
    const [city, setCity] = useState('Pune');
    const [address, setAddress] = useState('');
    const [listingType, setListingType] = useState('SALE');
    const [type, setType] = useState('RESIDENTIAL');
    const [price, setPrice] = useState('');
    const [bedrooms, setBedrooms] = useState('3');
    const [bathrooms, setBathrooms] = useState('3');
    const [areaSqFt, setAreaSqFt] = useState('1850');
    const [description, setDescription] = useState('');
    const [images, setImages] = useState<string[]>([
        "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?auto=format&fit=crop&w=1600&q=85"
    ]);

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [publishedUrl, setPublishedUrl] = useState<string | null>(null);
    const [publishedSlug, setPublishedSlug] = useState<string | null>(null);

    const applyPreset = (preset: typeof LUXURY_PRESETS[0]) => {
        setTitle(preset.title);
        setCity(preset.city);
        setAddress(preset.address);
        setListingType(preset.listingType);
        setType(preset.type);
        setPrice(preset.price.toString());
        setBedrooms(preset.bedrooms.toString());
        setBathrooms(preset.bathrooms.toString());
        setAreaSqFt(preset.areaSqFt.toString());
        setDescription(`Architect-designed luxury home in ${preset.address}. Italian marble, private deck, 24/7 concierge, MahaRERA compliant.`);
        setImages(preset.images);
        toast.success(`Loaded preset: ${preset.name}`);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!title.trim()) {
            toast.error('Please enter a property title');
            return;
        }

        setIsSubmitting(true);
        try {
            const res = await fetch('/api/properties/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    title,
                    city,
                    address,
                    listingType,
                    type,
                    price: Number(price) || (listingType === 'RENT' ? 45000 : 15000000),
                    bedrooms: Number(bedrooms) || 3,
                    bathrooms: Number(bathrooms) || 3,
                    areaSqFt: Number(areaSqFt) || 1850,
                    description,
                    images
                })
            });

            if (!res.ok) throw new Error('Failed to publish listing');
            const data = await res.json();

            // Client persistence in localStorage
            try {
                const existing = JSON.parse(localStorage.getItem('rentify_user_properties') || '[]');
                existing.unshift(data.property);
                localStorage.setItem('rentify_user_properties', JSON.stringify(existing));
            } catch (err) {
                console.warn('Storage sync:', err);
            }

            setPublishedUrl(data.url);
            setPublishedSlug(data.slug);
            toast.success('🎉 Property is now LIVE on RentifyAI!');
        } catch (error: any) {
            toast.error(error.message || 'Error publishing listing');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="min-h-screen bg-slate-50/60 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                {/* Header */}
                <div className="mb-8 text-center sm:text-left">
                    <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-xs font-black text-emerald-700 uppercase tracking-widest mb-3">
                        <Zap className="h-3.5 w-3.5 text-emerald-600" />
                        Live Demo • Instant 1-Click Publishing
                    </div>
                    <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
                        Post a Property on <span className="text-[#006AFF]">RentifyAI</span>
                    </h1>
                    <p className="text-slate-500 text-sm mt-1 max-w-2xl">
                        Publish your listing directly to the verified luxury catalog. No approval lag — your property goes live across search, maps, and detail pages immediately.
                    </p>
                </div>

                {/* 🌟 1-Click Luxury Presets (Demo Accelerator) */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-xs mb-8">
                    <div className="flex items-center justify-between mb-3">
                        <span className="text-xs font-black uppercase tracking-wider text-slate-800 flex items-center gap-1.5">
                            <Sparkles className="w-4 h-4 text-amber-500" />
                            1-Click Luxury Architecture Presets (Demo Mode)
                        </span>
                        <span className="text-[11px] text-slate-400">Click to autofill all specs & 4K photos</span>
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2.5">
                        {LUXURY_PRESETS.map((p, idx) => (
                            <button
                                key={idx}
                                type="button"
                                onClick={() => applyPreset(p)}
                                className="p-3 text-left rounded-xl border border-slate-200 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-xs font-bold text-slate-700 active:scale-98 cursor-pointer flex flex-col gap-1 shadow-xs"
                            >
                                <span className="text-slate-900 font-black truncate">{p.name}</span>
                                <span className="text-[11px] text-emerald-600">₹{(p.price / 10000000).toFixed(2)} Cr • {p.bedrooms} BHK</span>
                            </button>
                        ))}
                    </div>
                </div>

                {/* Success Banner if published */}
                {publishedUrl && (
                    <div className="mb-8 rounded-2xl bg-gradient-to-r from-emerald-600 to-teal-700 p-6 text-white shadow-xl animate-in fade-in slide-in-from-top-4">
                        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                            <div className="flex items-center gap-3">
                                <div className="h-12 w-12 rounded-full bg-white/20 flex items-center justify-center shrink-0">
                                    <CheckCircle2 className="w-7 h-7 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-black">🎉 Property Published Successfully!</h3>
                                    <p className="text-xs text-emerald-100">
                                        Your listing is now live across the RentifyAI search index with Zero Brokerage badge.
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-2.5 shrink-0">
                                <Link
                                    href={publishedUrl}
                                    className="px-4 py-2.5 bg-white text-emerald-800 rounded-xl font-bold text-xs flex items-center gap-1.5 shadow-md hover:bg-emerald-50 active:scale-95 transition-all"
                                >
                                    View Live Page <ExternalLink className="w-3.5 h-3.5" />
                                </Link>
                                <Link
                                    href="/search"
                                    className="px-4 py-2.5 bg-emerald-900/60 text-white rounded-xl font-bold text-xs flex items-center gap-1.5 border border-white/20 hover:bg-emerald-900 active:scale-95 transition-all"
                                >
                                    See in Search 🔍
                                </Link>
                            </div>
                        </div>
                    </div>
                )}

                {/* Main Form */}
                <form onSubmit={handleSubmit} className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-md space-y-6">
                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                            <Building2 className="w-4 h-4 text-[#006AFF]" /> Property Headline & Location
                        </h3>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            <div className="sm:col-span-2">
                                <label className="block text-xs font-bold text-slate-700 mb-1">Listing Title *</label>
                                <input
                                    type="text"
                                    required
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    placeholder="e.g. Koregaon Park Modern Colonial Sky Villa"
                                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#006AFF] focus:outline-none"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">City</label>
                                <select
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#006AFF] focus:outline-none bg-white cursor-pointer"
                                >
                                    <option value="Pune">Pune</option>
                                    <option value="Mumbai">Mumbai</option>
                                    <option value="Bengaluru">Bengaluru</option>
                                    <option value="Gurgaon">Gurgaon (Delhi-NCR)</option>
                                    <option value="Goa">Goa</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Address / Landmark</label>
                                <input
                                    type="text"
                                    value={address}
                                    onChange={(e) => setAddress(e.target.value)}
                                    placeholder="e.g. Lane 7, North Main Road"
                                    className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-slate-900 focus:border-[#006AFF] focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Price & Specs */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <h3 className="text-base font-black text-slate-900 border-b border-slate-100 pb-2 flex items-center gap-2">
                            <IndianRupee className="w-4 h-4 text-[#006AFF]" /> Financials & Specifications
                        </h3>

                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Purpose</label>
                                <select
                                    value={listingType}
                                    onChange={(e) => setListingType(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-[#006AFF] focus:outline-none bg-white cursor-pointer"
                                >
                                    <option value="SALE">For Sale</option>
                                    <option value="RENT">For Rent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Price (₹ INR)</label>
                                <input
                                    type="number"
                                    value={price}
                                    onChange={(e) => setPrice(e.target.value)}
                                    placeholder={listingType === 'RENT' ? '45000' : '15000000'}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-900 focus:border-[#006AFF] focus:outline-none font-bold"
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Bedrooms (BHK)</label>
                                <select
                                    value={bedrooms}
                                    onChange={(e) => setBedrooms(e.target.value)}
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-900 focus:border-[#006AFF] focus:outline-none bg-white cursor-pointer"
                                >
                                    <option value="1">1 BHK</option>
                                    <option value="2">2 BHK</option>
                                    <option value="3">3 BHK</option>
                                    <option value="4">4 BHK</option>
                                    <option value="5">5+ BHK</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-xs font-bold text-slate-700 mb-1">Super Area (Sq Ft)</label>
                                <input
                                    type="number"
                                    value={areaSqFt}
                                    onChange={(e) => setAreaSqFt(e.target.value)}
                                    placeholder="1850"
                                    className="w-full rounded-xl border border-slate-200 px-3 py-2.5 text-xs text-slate-900 focus:border-[#006AFF] focus:outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-4 pt-4 border-t border-slate-100">
                        <label className="block text-xs font-bold text-slate-700">Property Description</label>
                        <textarea
                            rows={3}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Highlight imported marble, luxury club amenities, smart automation, and terrace views..."
                            className="w-full rounded-xl border border-slate-200 p-3 text-xs text-slate-900 focus:border-[#006AFF] focus:outline-none"
                        />
                    </div>

                    {/* Image Preview */}
                    <div className="space-y-2 pt-2">
                        <div className="flex items-center justify-between">
                            <label className="block text-xs font-bold text-slate-700">Property Photos ({images.length})</label>
                            <span className="text-[11px] text-emerald-600 font-semibold">✓ Curated 4K Quality</span>
                        </div>
                        <div className="grid grid-cols-3 gap-2">
                            {images.map((img, i) => (
                                <div key={i} className="aspect-video rounded-xl overflow-hidden bg-slate-100 border border-slate-200">
                                    <img src={img} alt="Preview" className="w-full h-full object-cover" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Submit Bar */}
                    <div className="pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                        <p className="text-xs text-slate-400">
                            🛡️ 100% MahaRERA Verified & Zero Brokerage Listing.
                        </p>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className="px-8 py-3.5 rounded-xl bg-[#006AFF] hover:bg-[#0052cc] text-white font-bold text-sm flex items-center gap-2 shadow-lg shadow-blue-500/20 active:scale-95 disabled:opacity-50 transition-all cursor-pointer"
                        >
                            {isSubmitting ? (
                                <>
                                    <RefreshCw className="w-4 h-4 animate-spin" /> Publishing...
                                </>
                            ) : (
                                <>
                                    <CheckCircle2 className="w-4 h-4" /> Publish Listing Instantly
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
