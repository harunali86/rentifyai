'use client';

import { useActionState } from 'react'; // React 19/Next 14+
import { createPropertyAction } from '@/actions/property';
import { Button } from '@/components/ui/button';
import { useFormStatus } from 'react-dom';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" variant="premium" className="w-full h-12 text-lg" disabled={pending}>
            {pending ? 'Creating Listing...' : 'Publish Property'}
        </Button>
    );
}

const initialState = {
    error: '',
    success: false
};

export default function NewPropertyPage() {
    // @ts-ignore - useActionState types might be tricky with Next.js canary/beta sometimes
    const [state, formAction] = useActionState(createPropertyAction, initialState);

    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <Link href="/agent/dashboard" className="text-gray-500 hover:text-gray-900 flex items-center gap-2 mb-4">
                    <ArrowLeft className="w-4 h-4" /> Back to Dashboard
                </Link>
                <h1 className="text-3xl font-bold text-gray-900">Add New Property</h1>
                <p className="text-gray-500 mt-2">Fill in the details to list a new premium property.</p>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
                {state?.error && (
                    <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm">
                        {state.error}
                    </div>
                )}

                <form action={formAction} className="space-y-8">

                    {/* Section 1: Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Basic Details</h3>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Title</label>
                                <input name="title" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. Luxury Villa in Bandra" />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Listing Type</label>
                                <select name="listingType" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 bg-white">
                                    <option value="SALE">For Sale</option>
                                    <option value="RENT">For Rent</option>
                                </select>
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Property Type</label>
                                <select name="type" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 bg-white">
                                    <option value="APARTMENT">Apartment</option>
                                    <option value="HOUSE">House/Villa</option>
                                    <option value="COMMERCIAL">Commercial Office</option>
                                    <option value="LAND">Land/Plot</option>
                                </select>
                            </div>

                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Price (INR)</label>
                                <input name="price" type="number" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. 25000000" />
                            </div>
                        </div>
                    </div>

                    {/* Section 2: Location */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Location</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="md:col-span-2">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Address Line</label>
                                <input name="address" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. 123, Pali Hill" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                                <input name="city" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. Mumbai" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                                <input name="state" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. Maharashtra" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Zip Code</label>
                                <input name="zipCode" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="e.g. 400050" />
                            </div>
                        </div>
                    </div>

                    {/* Section 3: Features */}
                    <div className="space-y-4">
                        <h3 className="text-lg font-bold text-gray-900 border-b pb-2">Features</h3>
                        <div className="grid grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bedrooms</label>
                                <input name="bedrooms" type="number" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Bathrooms</label>
                                <input name="bathrooms" type="number" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="3" />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-1">Area (sqft)</label>
                                <input name="areaSqFt" type="number" required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="1800" />
                            </div>
                            <div className="md:col-span-3">
                                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                                <textarea name="description" rows={4} required className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:ring-2 focus:ring-brand-500 transition-all" placeholder="Describe the property..." />
                            </div>
                        </div>
                    </div>

                    <div className="pt-4">
                        <SubmitButton />
                    </div>

                </form>
            </div>
        </div>
    );
}
