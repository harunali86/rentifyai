import { Navbar } from "@/components/layout/Navbar";
import { getProperties } from "@/lib/api";
import { PropertyGrid } from "@/components/property/PropertyGrid";

export default async function CommercialPage() {
    const properties = await getProperties({ type: 'COMMERCIAL' });

    return (
        <main className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900">
            <Navbar />

            <section className="pt-32 pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
                <div className="mb-16">
                    <span className="text-brand-600 font-black tracking-widest uppercase text-[10px] bg-brand-50 px-3 py-1 rounded-lg">Commercial Space</span>
                    <h1 className="text-5xl font-black text-gray-900 mt-4 tracking-tight">Strategic <span className="text-brand-600">Business</span> Spaces</h1>
                    <p className="text-gray-500 mt-4 text-xl font-medium leading-relaxed max-w-2xl">
                        Find the perfect location for your business. Prime retail spaces, high-end offices, and strategic commercial properties.
                    </p>
                </div>

                <PropertyGrid properties={properties} />
            </section>
        </main>
    );
}
