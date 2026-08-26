import { Navbar } from "@/components/layout/Navbar";
import { getProperties } from "@/lib/api";
import { PropertySplitView } from "@/components/property/PropertySplitView";

export default async function RentPage({ searchParams }: { searchParams: Promise<any> }) {
    const params = await searchParams;
    const initialProperties = await getProperties({ ...params, listingType: 'RENT' });

    return (
        <main className="min-h-screen bg-white font-sans text-gray-900">
            <Navbar />
            <div className="pt-16 h-screen overflow-hidden">
                <PropertySplitView
                    initialProperties={initialProperties}
                    searchParams={{ ...params, listingType: 'RENT' }}
                />
            </div>
        </main>
    );
}
