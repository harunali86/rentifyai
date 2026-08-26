
'use server';

import { cookies } from 'next/headers';
import { updatePropertyStatus } from '@/lib/api';
import { revalidatePath } from 'next/cache';

export async function updatePropertyAction(formData: FormData) {
    const propertyId = formData.get('id') as string;
    const status = formData.get('status') as string;

    const cookieStore = await cookies();
    const token = cookieStore.get('access_token')?.value;

    if (!token) return { error: 'Unauthorized' };

    const success = await updatePropertyStatus(propertyId, status, token);

    if (success) {
        revalidatePath('/admin/moderation');
        revalidatePath('/');
        return { success: true };
    }

    return { error: 'Failed to update status' };
}
