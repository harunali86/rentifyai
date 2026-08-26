import { MetadataRoute } from 'next';
import { getProperties } from '@/lib/api';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    const properties = await getProperties({ limit: 100 });
    const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

    const propertyEntries: MetadataRoute.Sitemap = properties.map((p) => ({
        url: `${appUrl}/properties/${p.slug}`,
        lastModified: new Date(p.createdAt),
        changeFrequency: 'weekly',
        priority: 0.8,
    }));

    return [
        {
            url: `${appUrl}/`,
            lastModified: new Date(),
            changeFrequency: 'daily',
            priority: 1,
        },
        ...propertyEntries,
    ];
}
