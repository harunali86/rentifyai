'use client';

import { useActionState, useEffect, useState } from 'react';
import { createPropertyAction } from '@/actions/properties';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { uploadImage } from '@/lib/api';
import { getCookie } from 'cookies-next';
import {
    Building2,
    MapPin,
    IndianRupee,
    Layout,
    Bed,
    Bath,
    Maximize,
    Image as ImageIcon,
    Loader2,
    CheckCircle2,
    AlertCircle,
    UploadCloud,
    X
} from 'lucide-react';
import { toast } from 'sonner';

function SubmitButton({ pending }: { pending: boolean }) {
    return (
        <Button
            type="submit"
            disabled={pending}
            className="w-full h-14 text-lg font-bold bg-brand-600 hover:bg-brand-700 text-white shadow-xl shadow-brand-500/20 transition-all rounded-2xl flex items-center justify-center gap-2"
        >
            {pending ? (
                <>
                    <Loader2 className="w-5 h-5 animate-spin" />
                    Transmitting Data...
                </>
            ) : (
                <>
                    <CheckCircle2 className="w-5 h-5" />
                    Publish Listing for Review
                </>
            )}
        </Button>
    );
}

const initialState = { error: '', success: false };

export default function PostPropertyPage() {
    // @ts-ignore
    const [state, formAction, isPending] = useActionState(createPropertyAction, initialState);

    // Image Upload State
    const [uploading, setUploading] = useState(false);
    const [imageUrls, setImageUrls] = useState<string[]>([]);

    const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setUploading(true);
            const token = getCookie('token') as string;

            if (!token) {
                toast.error('Session expired. Please login again.');
                setUploading(false);
                return;
            }

            const files = Array.from(e.target.files);
            const uploadPromises = files.map(file => uploadImage(file, token));

            try {
                const results = await Promise.all(uploadPromises);
                const successfulUrls = results.filter((url): url is string => url !== null);

                if (successfulUrls.length > 0) {
                    setImageUrls(prev => [...prev, ...successfulUrls]);
                    toast.success(`${successfulUrls.length} image(s) uploaded successfully`);
                }

                if (successfulUrls.length !== files.length) {
                    toast.error(`Failed to upload ${files.length - successfulUrls.length} image(s)`);
                }
            } catch (error) {
                toast.error('Batch upload failed');
            } finally {
                setUploading(false);
                e.target.value = ''; // Reset input
            }
        }
    };

    const removeImage = (index: number) => {
        setImageUrls(prev => prev.filter((_, i) => i !== index));
    };

    useEffect(() => {
        if (state?.error) {
            toast.error(state.error);
        }
    }, [state]);

    return (
        <div className="max-w-5xl mx-auto py-16 px-4 sm:px-6 lg:px-8">
            <div className="mb-12">
                <div className="flex items-center gap-3 text-brand-600 font-bold text-xs uppercase tracking-widest mb-4">
                    <span className="h-5 w-1 bg-brand-600 rounded-full"></span>
                    Agent Dashboard • New Listing
                </div>
                <h1 className="text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-4">Create <span className="text-brand-600">Property Listing</span></h1>
                <p className="text-gray-500 text-lg max-w-2xl">
                    Our AI-powered moderation system ensures only 100% verified listings reach premium buyers. Fill in the details to start the review process.
                </p>
            </div>

            {state?.error && (
                <div className="mb-8 bg-red-50 text-red-700 p-5 rounded-2xl border border-red-100 flex items-start gap-4 animate-slide-up">
                    <div className="p-2 bg-red-100 rounded-lg">
                        <AlertCircle className="w-5 h-5 text-red-600" />
                    </div>
                    <div>
                        <p className="font-bold">Transmission Error</p>
                        <p className="text-sm opacity-90">{state.error}</p>
                    </div>
                </div>
            )}

            <form action={formAction} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
                <div className="lg:col-span-8 space-y-10">
                    {/* Basic Information */}
                    <Card className="p-8 border-gray-100 shadow-sm rounded-3xl overflow-hidden relative group">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-brand-50/50 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-700"></div>

                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-brand-50 rounded-2xl text-brand-600">
                                <Building2 className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Property Details</h2>
                                <p className="text-xs text-gray-400">Core information about the property</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="title" className="text-gray-600 font-bold ml-1">Property Title</Label>
                                    <Input id="title" name="title" placeholder="e.g. 4BHK Penthouse in Worli" required className="rounded-xl border-gray-100 bg-gray-50 focus:bg-white h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="price" className="text-gray-600 font-bold ml-1">Price (Expected)</Label>
                                    <div className="relative">
                                        <IndianRupee className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input id="price" name="price" type="number" placeholder="4,50,00,000" required className="pl-12 rounded-xl border-gray-100 bg-gray-50 focus:bg-white h-12" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="description" className="text-gray-600 font-bold ml-1">Comprehensive Description</Label>
                                <Textarea id="description" name="description" placeholder="Mention key USPs like sea view, marble flooring, private terrace, etc..." required className="min-h-[160px] rounded-xl border-gray-100 bg-gray-50 focus:bg-white p-4" />
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="type" className="text-gray-600 font-bold ml-1 text-xs uppercase tracking-widest">Type</Label>
                                    <select id="type" name="type" className="w-full flex h-12 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium">
                                        <option value="RESIDENTIAL">Residential (Flat/Villa)</option>
                                        <option value="COMMERCIAL">Commercial (Office/Shop)</option>
                                        <option value="INDUSTRIAL">Industrial (Warehouse)</option>
                                        <option value="LAND">Land (Plot)</option>
                                    </select>
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="listingType" className="text-gray-600 font-bold ml-1 text-xs uppercase tracking-widest">Transaction</Label>
                                    <select id="listingType" name="listingType" className="w-full flex h-12 rounded-xl border border-gray-100 bg-gray-50 px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 font-medium">
                                        <option value="SALE">Direct Purchase</option>
                                        <option value="RENT">Monthly Rental</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Location Details */}
                    <Card className="p-8 border-gray-100 shadow-sm rounded-3xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-brand-50 rounded-2xl text-brand-600">
                                <MapPin className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Physical Address</h2>
                                <p className="text-xs text-gray-400">Regional and local details</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label htmlFor="address" className="text-gray-600 font-bold ml-1">Full Address (Building & Wing)</Label>
                                <Input id="address" name="address" placeholder="Tower B, Flat 2401, Lodha World Towers" required className="rounded-xl border-gray-100 bg-gray-50 h-12" />
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                <div className="space-y-2">
                                    <Label htmlFor="city" className="text-gray-600 font-bold ml-1">City</Label>
                                    <Input id="city" name="city" placeholder="Mumbai" required className="rounded-xl border-gray-100 bg-gray-50 h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="state" className="text-gray-600 font-bold ml-1">State</Label>
                                    <Input id="state" name="state" placeholder="Maharashtra" required className="rounded-xl border-gray-100 bg-gray-50 h-12" />
                                </div>
                                <div className="space-y-2">
                                    <Label htmlFor="zipCode" className="text-gray-600 font-bold ml-1">Zip Code</Label>
                                    <Input id="zipCode" name="zipCode" placeholder="400013" required className="rounded-xl border-gray-100 bg-gray-50 h-12" />
                                </div>
                            </div>
                        </div>
                    </Card>

                    {/* Property Features */}
                    <Card className="p-8 border-gray-100 shadow-sm rounded-3xl">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-brand-50 rounded-2xl text-brand-600">
                                <Layout className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Technical Specs</h2>
                                <p className="text-xs text-gray-400">Dimensions and capacity</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
                            {[
                                { id: 'bedrooms', icon: Bed, label: 'Bedrooms', val: '3' },
                                { id: 'bathrooms', icon: Bath, label: 'Bathrooms', val: '3' },
                            ].map(feat => (
                                <div key={feat.id} className="space-y-4 text-center">
                                    <Label htmlFor={feat.id} className="text-gray-400 text-xs font-bold uppercase tracking-widest">{feat.label}</Label>
                                    <div className="relative group">
                                        <feat.icon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-600/50" />
                                        <Input id={feat.id} name={feat.id} type="number" defaultValue={feat.val} className="text-center text-xl font-black rounded-2xl h-16 border-gray-50 bg-gray-50 group-hover:bg-white transition-colors" />
                                    </div>
                                </div>
                            ))}
                            <div className="space-y-4 text-center col-span-2 md:col-span-1">
                                <Label htmlFor="areaSqFt" className="text-gray-400 text-xs font-bold uppercase tracking-widest">Sq Ft Area</Label>
                                <div className="relative group">
                                    <Maximize className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-brand-600/50" />
                                    <Input id="areaSqFt" name="areaSqFt" type="number" placeholder="1850" required className="text-center text-xl font-black rounded-2xl h-16 border-gray-50 bg-gray-50 group-hover:bg-white transition-colors" />
                                </div>
                            </div>
                        </div>
                    </Card>
                </div>

                {/* Sidebar: Media & Submit */}
                <div className="lg:col-span-4 space-y-10">
                    <Card className="p-8 border-gray-100 shadow-xl rounded-3xl bg-gray-900 text-white sticky top-24">
                        <div className="flex items-center gap-4 mb-8">
                            <div className="p-3 bg-white/10 rounded-2xl text-brand-400">
                                <ImageIcon className="w-6 h-6" />
                            </div>
                            <div>
                                <h2 className="text-xl font-bold">Image Gallery</h2>
                                <p className="text-[10px] text-gray-400 uppercase font-black">Visual Assets</p>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="space-y-3">
                                <Label htmlFor="file-upload" className="text-xs font-bold text-gray-400">Upload Images</Label>
                                <div className="relative">
                                    <input
                                        type="file"
                                        id="file-upload"
                                        accept="image/*"
                                        multiple // Enable multiple file selection
                                        onChange={handleFileChange}
                                        disabled={uploading}
                                        className="hidden"
                                    />
                                    <Label
                                        htmlFor="file-upload"
                                        className="flex items-center justify-center w-full h-32 border-2 border-dashed border-white/20 rounded-xl cursor-pointer hover:border-brand-500 hover:bg-white/5 transition-all text-gray-400 hover:text-white"
                                    >
                                        <div className="flex flex-col items-center gap-2">
                                            {uploading ? (
                                                <Loader2 className="w-8 h-8 animate-spin text-brand-500" />
                                            ) : (
                                                <UploadCloud className="w-8 h-8" />
                                            )}
                                            <span className="text-xs font-medium">{uploading ? 'Uploading...' : 'Click to Upload'}</span>
                                        </div>
                                    </Label>
                                </div>

                                {/* Hidden input to send URLs to Server Action */}
                                <input type="hidden" name="images" value={imageUrls.join(',')} />

                                {/* Image Preview Grid */}
                                {imageUrls.length > 0 && (
                                    <div className="grid grid-cols-3 gap-2 mt-4">
                                        {imageUrls.map((url, idx) => (
                                            <div key={idx} className="relative aspect-square rounded-lg overflow-hidden group">
                                                <img src={url} alt="Property" className="w-full h-full object-cover" />
                                                <button
                                                    type="button"
                                                    onClick={() => removeImage(idx)}
                                                    className="absolute top-1 right-1 p-1 bg-red-600 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                                                >
                                                    <X className="w-3 h-3" />
                                                </button>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>

                            <hr className="border-white/5" />

                            <div className="space-y-4 pt-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    <span className="text-xs text-gray-300">Secure Cloud Storage</span>
                                </div>
                                <div className="flex items-center gap-3">
                                    <div className="w-5 h-5 rounded-full bg-emerald-500/20 flex items-center justify-center">
                                        <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                    </div>
                                    <span className="text-xs text-gray-300">Instant Preview</span>
                                </div>
                            </div>

                            <div className="pt-6">
                                <SubmitButton pending={isPending} />
                            </div>
                        </div>
                    </Card>
                </div>
            </form>
        </div>
    );
}
