'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

const API_URL = process.env.API_URL || 'http://localhost:4000';

interface PropertyState {
    error?: string;
    success?: boolean;
}

export async function createPropertyAction(prevState: PropertyState, formData: FormData): Promise<PropertyState> {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
        return { error: 'Authentication token missing' };
    }

    // Extract form data
    const rawData = {
        title: formData.get('title'),
        description: formData.get('description'),
        price: Number(formData.get('price')),
        type: formData.get('type'),
        listingType: formData.get('listingType'),
        address: formData.get('address'),
        city: formData.get('city'),
        state: formData.get('state'),
        zipCode: formData.get('zipCode'),
        bedrooms: Number(formData.get('bedrooms')),
        bathrooms: Number(formData.get('bathrooms')),
        areaSqFt: Number(formData.get('areaSqFt')),
        // Hardcoded for now as we skipped S3 setup
        images: [
            { url: 'https://images.unsplash.com/photo-1600596542815-e32898989c76?auto=format&fit=crop&q=80&w=1000' }
        ]
    };

    try {
        const res = await fetch(`${API_URL}/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(rawData),
        });

        const data = await res.json();

        if (!res.ok) {
            console.error("API Error:", data);
            return { error: Array.isArray(data.message) ? data.message[0] : (data.message || 'Failed to create property') };
        }

    } catch (err) {
        console.error('Create Property Error:', err);
        return { error: 'Failed to connect to server' };
    }

    redirect('/agent/dashboard');
}
