import { PrismaClient, Role, PropertyType, ListingType, ListingStatus } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding Industry-Grade Database (PostgreSQL)...');

    // Rule: CLEAN ARCHITECTURE - Separating cleanup from seeding
    await prisma.media.deleteMany();
    await prisma.lead.deleteMany();
    await prisma.booking.deleteMany();
    await prisma.property.deleteMany();
    await prisma.user.deleteMany();

    const hashedPassword = await bcrypt.hash('hashed-password-123', 10);
    const adminPassword = await bcrypt.hash('admin-password-123', 10);

    // 1. Create Agents (Realistic Indian Names)
    const agentRahul = await prisma.user.create({
        data: {
            email: 'rahul.sharma@rentify.in',
            name: 'Rahul Sharma',
            role: Role.AGENT,
            password: hashedPassword,
            phone: '+91 98765 43210',
            avatar: 'https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200',
            isVerified: true
        },
    });

    const agentPriya = await prisma.user.create({
        data: {
            email: 'priya.patel@rentify.in',
            name: 'Priya Patel',
            role: Role.AGENT,
            password: hashedPassword,
            phone: '+91 98765 43211',
            avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&q=80&w=200',
            isVerified: true
        },
    });

    const superAdmin = await prisma.user.create({
        data: {
            email: 'admin@rentify.in',
            name: 'Harun Shaikh',
            role: Role.ADMIN,
            password: adminPassword,
            phone: '+91 00000 00000',
            avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200',
            isVerified: true
        },
    });

    // 2. Create Premium Properties (Production Hardened Data)
    const properties = [
        {
            title: 'Penthouse with Infinity Pool in Bandra',
            description: 'Experience ultra-luxury living in this 4BHK penthouse. Includes private sky lounge, home automation, and 360-degree Arabian Sea views.',
            price: 85000000, // 8.5 Cr
            type: PropertyType.RESIDENTIAL,
            listingType: ListingType.SALE,
            status: ListingStatus.PUBLISHED,
            address: 'Bandra Bandstand, Bandra West',
            city: 'Mumbai',
            state: 'Maharashtra',
            zipCode: '400050',
            latitude: 19.0433,
            longitude: 72.8192,
            bedrooms: 4,
            bathrooms: 5,
            areaSqFt: 4500,
            agentId: agentRahul.id,
            features: JSON.stringify({ pool: true, automation: true, parking: 4 }),
            images: [
                'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&q=80&w=1000',
                'https://images.unsplash.com/photo-1600566753190-17f0bb2a6c3e?auto=format&fit=crop&q=80&w=1000'
            ]
        },
        {
            title: 'Modern Corporate Space in DLF Cyber City',
            description: 'Grade A commercial office space in the hub of Gurgaon. Fully furnished with modular workstations and high-speed fiber connectivity.',
            price: 4500000, // 45 Lakh per year rent
            type: PropertyType.COMMERCIAL,
            listingType: ListingType.RENT,
            status: ListingStatus.PUBLISHED,
            address: 'DLF Phase 3, Cyber City',
            city: 'Gurgaon',
            state: 'Haryana',
            zipCode: '122002',
            latitude: 28.4948,
            longitude: 77.0895,
            areaSqFt: 5000,
            agentId: agentRahul.id,
            features: JSON.stringify({ furnished: true, cafeteria: true }),
            images: [
                'https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=80&w=1000'
            ]
        },
        {
            title: 'Heritage Villa in Lutyens Delhi',
            description: 'A rare opportunity to own a piece of history. This sprawlng 5BHK villa features sprawling lawns and colonial architecture.',
            price: 450000000, // 45 Cr
            type: PropertyType.RESIDENTIAL,
            listingType: ListingType.SALE,
            status: ListingStatus.PUBLISHED,
            address: 'Amrita Shergill Marg',
            city: 'Delhi',
            state: 'Delhi',
            zipCode: '110003',
            latitude: 28.5995,
            longitude: 77.2272,
            bedrooms: 5,
            bathrooms: 6,
            areaSqFt: 8000,
            agentId: agentPriya.id,
            features: JSON.stringify({ lawn: true, servantQuarters: 2 }),
            images: [
                'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&q=80&w=1000'
            ]
        },
        {
            title: 'Smart Apartment in Magarpatta City',
            description: 'Compact and modern 2BHK with smart home features. Perfect for young professionals working in nearby IT parks.',
            price: 12500000, // 1.25 Cr
            type: PropertyType.RESIDENTIAL,
            listingType: ListingType.SALE,
            status: ListingStatus.PUBLISHED,
            address: 'Magarpatta, Hadapsar',
            city: 'Pune',
            state: 'Maharashtra',
            zipCode: '411028',
            latitude: 18.5147,
            longitude: 73.9265,
            bedrooms: 2,
            bathrooms: 2,
            areaSqFt: 1200,
            agentId: agentPriya.id,
            features: JSON.stringify({ balcony: true, gasPipeline: true }),
            images: [
                'https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1000'
            ]
        }
    ];

    for (const prop of properties) {
        const { images, ...propData } = prop;
        const slug = prop.title.toLowerCase().replace(/ /g, '-').replace(/[^\w-]+/g, '') + '-' + Math.random().toString(36).substring(7);

        await prisma.property.create({
            data: {
                ...propData,
                slug,
                images: {
                    create: images.map(url => ({ url }))
                }
            }
        });
    }

    console.log('✅ Seeding complete with Premium PostgreSQL data!');
}

main()
    .catch(e => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
