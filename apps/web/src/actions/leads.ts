'use server';

import { createLead } from "@/lib/api";

export async function createLeadAction(prevState: any, formData: FormData) {
    const data = {
        message: formData.get('message') as string,
        propertyId: formData.get('propertyId') as string,
        agentId: formData.get('agentId') as string,
        name: formData.get('name') as string,
        email: formData.get('email') as string,
    };

    if (!data.message || !data.name || !data.email) {
        return { error: 'Please fill in all required fields.' };
    }

    try {
        const result = await createLead(data);
        if (result) {
            return { success: true, message: 'Your inquiry has been sent to the agent.' };
        }
        return { error: 'Failed to send inquiry.' };
    } catch (error: any) {
        return { error: error.message || 'Something went wrong.' };
    }
}
