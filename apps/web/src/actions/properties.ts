'use server';

import { createProperty, deleteProperty } from "@/lib/api";
import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPropertyAction(prevState: any, formData: FormData) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
        return { error: 'You must be logged in to post a property.' };
    }

    const imagesStr = formData.get('images') as string;
    const images = imagesStr ? imagesStr.split(',').map(url => url.trim()).filter(url => url !== "") : [];

    const data = {
        title: formData.get('title') as string,
        description: formData.get('description') as string,
        price: Number(formData.get('price')),
        type: formData.get('type') as string,
        listingType: formData.get('listingType') as string,
        address: formData.get('address') as string,
        city: formData.get('city') as string,
        state: formData.get('state') as string,
        zipCode: formData.get('zipCode') as string,
        latitude: Number(formData.get('latitude') || 19.0760),
        longitude: Number(formData.get('longitude') || 72.8777),
        bedrooms: Number(formData.get('bedrooms')),
        bathrooms: Number(formData.get('bathrooms')),
        areaSqFt: Number(formData.get('areaSqFt')),
        images: images,
    };

    try {
        await createProperty(data, token);
        revalidatePath('/');
        revalidatePath('/agent/dashboard');
        revalidatePath('/agent/properties');
    } catch (error: any) {
        return { error: error.message || 'Something went wrong while creating the property.' };
    }

    redirect('/agent/properties');
}

export async function deletePropertyAction(id: string) {
    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) {
        return { error: 'Not authenticated' };
    }

    try {
        const success = await deleteProperty(id, token);
        if (success) {
            revalidatePath('/');
            revalidatePath('/agent/dashboard');
            revalidatePath('/agent/properties');
            return { success: true };
        }
        return { error: 'Failed to delete property' };
    } catch (error: any) {
        return { error: error.message || 'An error occurred' };
    }
}
