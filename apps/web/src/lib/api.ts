import { refreshTokenAction } from '@/actions/auth';
import { getCookie } from 'cookies-next';
import { getMockProperties, getMockPropertyBySlug, MOCK_AGENTS } from './mock-properties';

const API_URL = ((typeof window === 'undefined' && process.env.INTERNAL_API_URL)
    ? process.env.INTERNAL_API_URL
    : (process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000')) + '/api/v1';

export interface Agent {
    id: string;
    name: string;
    email: string;
    avatar?: string;
    agency?: string;
    designation?: string;
    reraId?: string;
    phone?: string;
    experienceYears?: number;
    specialization?: string;
    transactedVolume?: string;
    _count?: {
        listings: number;
    };
}

// Zillow Parity Types
export interface PriceHistory {
    id: string;
    price: number | string;
    event: string;
    date: string;
    source: string;
}

export interface TaxHistory {
    id: string;
    year: number;
    taxPaid: number | string;
    assessment: number | string;
}

export interface School {
    id: string;
    name: string;
    rating: number;
    type: string;
    level: string;
    distance: number;
}

export interface PropertyImage {
    url: string;
}

export interface Property {
    id: string;
    slug: string;
    title: string;
    description: string;
    price: number | string;
    type: 'RESIDENTIAL' | 'COMMERCIAL' | 'INDUSTRIAL' | 'LAND';
    listingType: 'SALE' | 'RENT';
    status: 'DRAFT' | 'PENDING' | 'PUBLISHED' | 'VERIFIED' | 'SOLD' | 'RENTED' | 'REJECTED';
    address: string;
    city: string;
    state: string;
    zipCode: string;
    latitude: number;
    longitude: number;
    bedrooms: number;
    bathrooms: number;
    areaSqFt: number;
    features: any;
    agentId: string;
    agent?: Agent;
    images: PropertyImage[];
    createdAt: string;
    updatedAt: string;

    // Extensions
    priceHistory?: PriceHistory[];
    taxHistory?: TaxHistory[];
    schools?: School[];
}

export async function getAgents(): Promise<Agent[]> {
    try {
        const res = await apiFetch(`${API_URL}/users/agents`, {
            cache: 'no-store'
        });
        if (!res.ok) return MOCK_AGENTS;
        const data = await res.json();
        return Array.isArray(data) && data.length > 0 ? data : MOCK_AGENTS;
    } catch {
        return MOCK_AGENTS;
    }
}

/**
 * Enhanced Fetch Wrapper with Auto-Refresh Logic
 */
export async function apiFetch(url: string, options: RequestInit = {}): Promise<Response> {
    const res = await fetch(url, options);

    // If 401 Unauthorized, try to refresh token
    if (res.status === 401) {
        // Avoid infinite loop if refresh endpoint itself 401s
        if (url.includes('/auth/refresh')) {
            return res;
        }

        console.log('401 detected, attempting refresh...');
        const refreshRes = await refreshTokenAction();

        if (refreshRes.success && refreshRes.access_token) {
            console.log('Token refreshed, retrying request...');

            const newHeaders = new Headers(options.headers);
            newHeaders.set('Authorization', `Bearer ${refreshRes.access_token}`);

            return fetch(url, {
                ...options,
                headers: newHeaders
            });
        } else {
            console.error('Refresh failed');
            // Check if we are in browser to redirect
            if (typeof window !== 'undefined') {
                // Optionally force reload or event
            }
        }
    }

    return res;
}

export async function saveSearch(name: string, filters: any, token: string): Promise<any | null> {
    try {
        const response = await apiFetch(`${API_URL}/users/saved-searches`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ name, filters })
        });
        if (!response.ok) throw new Error('Failed to save search');
        return await response.json();
    } catch (error) {
        console.error('Error saving search:', error);
        return null;
    }
}

export async function getProperties(params: any = {}): Promise<Property[]> {
    try {
        const queryParams = new URLSearchParams();
        if (params.search) queryParams.append('search', params.search);
        if (params.listingType) queryParams.append('listingType', params.listingType.toUpperCase());
        if (params.type) queryParams.append('type', params.type);
        if (params.minPrice) queryParams.append('minPrice', params.minPrice.toString());
        if (params.maxPrice) queryParams.append('maxPrice', params.maxPrice.toString());
        if (params.minBeds) queryParams.append('minBeds', params.minBeds.toString());
        if (params.minBaths) queryParams.append('minBaths', params.minBaths.toString());
        if (params.minSqFt) queryParams.append('minSqFt', params.minSqFt.toString());

        // Geospatial bounds
        if (params.ne_lat) queryParams.append('ne_lat', params.ne_lat.toString());
        if (params.ne_lng) queryParams.append('ne_lng', params.ne_lng.toString());
        if (params.sw_lat) queryParams.append('sw_lat', params.sw_lat.toString());
        if (params.sw_lng) queryParams.append('sw_lng', params.sw_lng.toString());

        const url = `${API_URL}/properties?${queryParams.toString()}`;
        console.log("Fetching Properties URL:", url);

        const res = await apiFetch(url, {
            cache: 'no-store',
        });

        console.log("Fetch Status:", res.status);
        if (!res.ok) {
            const text = await res.text();
            console.error("Fetch Error Body:", text);
            throw new Error(`Failed to fetch properties: ${res.status} ${text}`);
        }
        const data = await res.json();
        if (Array.isArray(data) && data.length > 0) return data;
        return getMockProperties(params);
    } catch (error) {
        console.warn('API unavailable or empty, using high-fidelity Zillow mock dataset:', error);
        return getMockProperties(params);
    }
}

export async function getProperty(slug: string, token?: string): Promise<Property | null> {
    try {
        const headers: any = {};
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;
        }
        const res = await apiFetch(`${API_URL}/properties/${slug}`, {
            headers,
            cache: 'no-store'
        });

        if (!res.ok) {
            return getMockPropertyBySlug(slug);
        }

        const text = await res.text();
        if (!text) {
            return getMockPropertyBySlug(slug);
        }

        try {
            return JSON.parse(text);
        } catch (e) {
            return getMockPropertyBySlug(slug);
        }
    } catch (error) {
        return getMockPropertyBySlug(slug);
    }
}

export async function getSimilarProperties(id: string): Promise<Property[]> {
    try {
        const res = await apiFetch(`${API_URL}/properties/${id}/similar`, {
            cache: 'no-store'
        });
        if (res.ok) {
            const data = await res.json();
            if (Array.isArray(data) && data.length > 0) return data;
        }
        return getMockProperties().filter(p => p.id !== id).slice(0, 3);
    } catch (error) {
        return getMockProperties().filter(p => p.id !== id).slice(0, 3);
    }
}

export async function getPersonalizedRecommendations(token: string): Promise<Property[]> {
    try {
        const res = await apiFetch(`${API_URL}/properties/personalized`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        // Critical: Check if response is OK before parsing
        if (!res.ok) {
            console.warn(`getPersonalizedRecommendations failed: ${res.status} ${res.statusText}`);
            return [];
        }

        // Additional safety: Check content-type
        const contentType = res.headers.get('content-type');
        if (!contentType || !contentType.includes('application/json')) {
            console.warn(`getPersonalizedRecommendations received non-JSON response: ${contentType}`);
            return [];
        }

        return res.json();
    } catch (error) {
        console.error('getPersonalizedRecommendations error:', error);
        return [];
    }
}

export async function createProperty(data: any, token: string): Promise<Property | null> {
    try {
        const res = await apiFetch(`${API_URL}/properties`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify(data)
        });

        if (!res.ok) {
            const err = await res.json();
            console.error('Creation failed:', err);
            return null;
        }

        return res.json();
    } catch (error) {
        console.error('API Error creating property:', error);
        throw error;
    }
}

export async function getMyProperties(token: string): Promise<Property[]> {
    try {
        const res = await apiFetch(`${API_URL}/properties/my`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!res.ok) throw new Error('Failed to fetch my properties');
        return res.json();
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
}

export async function getAdminProperties(token: string): Promise<any[]> {
    try {
        const res = await apiFetch(`${API_URL}/properties/admin/all`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            cache: 'no-store'
        });

        if (!res.ok) throw new Error('Failed to fetch admin properties');
        return res.json();
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
}

export async function updatePropertyStatus(id: string, status: string, token: string): Promise<boolean> {
    try {
        const res = await apiFetch(`${API_URL}/properties/${id}/status`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({ status })
        });

        return res.ok;
    } catch (error) {
        console.error('API Error:', error);
        return false;
    }
}

export async function deleteProperty(id: string, token: string): Promise<boolean> {
    try {
        const res = await apiFetch(`${API_URL}/properties/${id}/delete`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });

        return res.ok;
    } catch (error) {
        console.error('API Error deleting property:', error);
        return false;
    }
}

export async function createLead(data: any): Promise<any> {
    try {
        const res = await apiFetch(`${API_URL}/leads`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        });

        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || 'Failed to create lead');
        }

        return res.json();
    } catch (error) {
        console.error('API Error creating lead:', error);
        throw error;
    }
}

export async function forgotPassword(email: string): Promise<boolean> {
    try {
        const res = await apiFetch(`${API_URL}/auth/forgot-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email })
        });
        return res.ok;
    } catch (error) {
        console.error('API Error:', error);
        return false;
    }
}

export async function resetPassword(token: string, newPassword: string): Promise<boolean> {
    try {
        const res = await apiFetch(`${API_URL}/auth/reset-password`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token, newPassword })
        });
        return res.ok;
    } catch (error) {
        console.error('API Error:', error);
        return false;
    }
}

export async function uploadImage(file: File, token: string): Promise<string | null> {
    try {
        const formData = new FormData();
        formData.append('file', file);

        const res = await apiFetch(`${API_URL}/upload/image`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${token}`
            },
            body: formData
        });

        if (!res.ok) {
            console.error('Upload failed with status:', res.status);
            return null;
        }

        const data = await res.json();
        return data.url;
    } catch (error) {
        console.error('API Error uploading image:', error);
        return null;
    }
}

export async function verifyEmail(token: string): Promise<boolean> {
    try {
        const res = await apiFetch(`${API_URL}/auth/verify`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token })
        });
        return res.ok;
    } catch (error) {
        console.error('API Error:', error);
        return false;
    }
}

export async function getAgentStats(token: string): Promise<any> {
    try {
        const res = await apiFetch(`${API_URL}/properties/agent/stats`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
        });
        if (!res.ok) return { activeListings: 0, totalLeads: 0, totalViews: 0 };
        return res.json();
    } catch (error) {
        console.error('API Error:', error);
        return { activeListings: 0, totalLeads: 0, totalViews: 0 };
    }
}

export async function getAdminStats(token: string): Promise<any> {
    try {
        const res = await apiFetch(`${API_URL}/properties/admin/stats`, {
            headers: { 'Authorization': `Bearer ${token}` },
            cache: 'no-store'
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

export async function createBooking(token: string, data: { propertyId: string, amount: number }): Promise<any> {
    try {
        const res = await apiFetch(`${API_URL}/bookings`, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            }
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

export async function confirmBookingPayment(token: string, bookingId: string): Promise<any> {
    try {
        const res = await apiFetch(`${API_URL}/bookings/${bookingId}/confirm`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return null;
        return res.json();
    } catch (error) {
        console.error('API Error:', error);
        return null;
    }
}

export async function getMyBookings(token: string): Promise<any[]> {
    try {
        const res = await apiFetch(`${API_URL}/bookings/my`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        if (!res.ok) return [];
        return res.json();
    } catch (error) {
        console.error('API Error:', error);
        return [];
    }
}
