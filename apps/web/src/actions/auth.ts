'use server';

import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

// Server-side env or default
const API_URL = ((typeof window === 'undefined' && process.env.INTERNAL_API_URL)
    ? process.env.INTERNAL_API_URL
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')) + '/api/v1';

interface LoginState {
    error?: string;
    success?: boolean;
}

export async function loginAction(prevState: LoginState, formData: FormData): Promise<LoginState> {
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    if (!email || !password) {
        return { error: 'Please enter both email and password' };
    }

    try {
        const res = await fetch(`${API_URL}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
            cache: 'no-store',
        });

        const data = await res.json();

        if (!res.ok) {
            return { error: data.message || 'Authentication failed' };
        }

        const cookieStore = await cookies();

        // 1. Set Access Token (15 min)
        cookieStore.set('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60,
            path: '/',
            sameSite: 'lax'
        });

        // 2. Set Refresh Token (7 days)
        if (data.refresh_token) {
            cookieStore.set('refresh_token', data.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax'
            });
        }

        // 3. User Info (Non-sensitive)
        cookieStore.set('user_info', JSON.stringify(data.user), {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 7 * 24 * 60 * 60,
            path: '/'
        });

        // 4. Token for Client-side API usage
        cookieStore.set('token', data.access_token, {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60,
            path: '/'
        });


    } catch (err) {
        console.error('Login action error:', err);
        return { error: 'Failed to connect to authentication server.' };
    }

    redirect('/');
}

export async function refreshTokenAction() {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refresh_token')?.value;

    if (!refreshToken) {
        return { success: false, error: 'No refresh token' };
    }

    try {
        const res = await fetch(`${API_URL}/auth/refresh`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refresh_token: refreshToken }),
            cache: 'no-store',
        });

        if (!res.ok) {
            await logoutAction();
            return { success: false, error: 'Refresh failed' };
        }

        const data = await res.json();

        // Rotate Tokens
        cookieStore.set('access_token', data.access_token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60,
            path: '/',
            sameSite: 'lax'
        });

        if (data.refresh_token) {
            cookieStore.set('refresh_token', data.refresh_token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                maxAge: 7 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax'
            });
        }

        cookieStore.set('token', data.access_token, {
            secure: process.env.NODE_ENV === 'production',
            maxAge: 15 * 60,
            path: '/'
        });

        return { success: true, access_token: data.access_token };
    } catch (error) {
        console.error("Refresh Action Error:", error);
        return { success: false, error: 'Server error' };
    }
}

export async function logoutAction() {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get('access_token')?.value;

    if (accessToken) {
        try {
            await fetch(`${API_URL}/auth/logout`, {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${accessToken}`
                }
            });
        } catch (e) {
            // Ignore
        }
    }

    cookieStore.delete('access_token');
    cookieStore.delete('refresh_token');
    cookieStore.delete('user_info');
    cookieStore.delete('token');

    redirect('/login');
}
