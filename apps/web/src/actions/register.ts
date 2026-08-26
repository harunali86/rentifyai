'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Server-side env or default
const API_URL = ((typeof window === 'undefined' && process.env.INTERNAL_API_URL)
    ? process.env.INTERNAL_API_URL
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')) + '/api/v1';

interface RegisterState {
    error?: string;
    success?: boolean;
    message?: string;
}

export async function registerAction(prevState: RegisterState, formData: FormData): Promise<RegisterState> {
    const name = formData.get('name') as string;
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;
    const role = formData.get('role') as string; // 'AGENT' or 'USER'

    if (!name || !email || !password || !role) {
        return { error: 'All fields are required' };
    }

    try {
        const res = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role }),
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            return { error: data.message || 'Registration failed' };
        }

        return {
            success: true,
            message: data.message || 'Account created! Please check your email to verify your account.'
        };

    } catch (err) {
        console.error('Register action error:', err);
        return { error: 'Failed to connect to server' };
    }
}
