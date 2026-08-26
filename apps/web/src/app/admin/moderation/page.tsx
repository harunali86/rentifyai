import { getAdminProperties } from '@/lib/api';
import { cookies } from 'next/headers';
import ModerationClient from './client';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default async function AdminModerationPage() {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
        redirect('/login');
    }

    // Fetch all listings (Access Check handled by Backend)
    const properties = await getAdminProperties(token);

    // If fetch failed (e.g. 403 Forbidden), properties might be empty or null
    // Ideally getAdminProperties should throw or return detail.
    // Assuming [] if error, but moderation queue shouldn't be empty typically.

    return (
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
            <div className="mb-10 flex items-end justify-between">
                <div>
                    <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-2">Moderation <span className="text-brand-600">Dashboard</span></h1>
                    <p className="text-gray-500">Review and verify new property listings.</p>
                </div>
                <div className="hidden md:block">
                    <div className="px-4 py-2 bg-brand-50 text-brand-700 rounded-xl text-sm font-bold flex items-center gap-2">
                        <span className="relative flex h-3 w-3">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-brand-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-3 w-3 bg-brand-500"></span>
                        </span>
                        System Active
                    </div>
                </div>
            </div>

            <ModerationClient initialProperties={properties || []} />
        </div>
    );
}
