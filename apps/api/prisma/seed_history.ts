
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
    console.log('🌱 Seeding Price History and Tax Data...');

    const properties = await prisma.property.findMany();

    if (properties.length === 0) {
        console.log('No properties found. Please create properties first.');
        return;
    }

    for (const property of properties) {
        console.log(`Processing ${property.title}...`);
        const currentPrice = Number(property.price);

        // 1. Generate Price History (Last 10 years)
        // We will simulate a steady appreciation of 5% per year
        const historyEvents = [];
        let price = currentPrice;

        // Current Listing
        historyEvents.push({
            date: new Date(),
            price: price,
            event: 'Listed for Sale',
            source: 'Rentify MLS'
        });

        // 3 Years ago: Sold
        price = price * 0.85; // 15% cheaper
        historyEvents.push({
            date: new Date(new Date().setFullYear(new Date().getFullYear() - 3)),
            price: price,
            event: 'Sold',
            source: 'Public Record'
        });

        // 5 Years ago: Listed
        historyEvents.push({
            date: new Date(new Date().setFullYear(new Date().getFullYear() - 5)),
            price: price * 0.95,
            event: 'Listed for Sale',
            source: 'Rentify MLS'
        });

        // 8 Years ago: Sold
        price = price * 0.70; // 30% cheaper than today
        historyEvents.push({
            date: new Date(new Date().setFullYear(new Date().getFullYear() - 8)),
            price: price,
            event: 'Sold',
            source: 'Public Record'
        });

        for (const event of historyEvents) {
            await prisma.priceHistory.create({
                data: {
                    propertyId: property.id,
                    price: event.price,
                    event: event.event,
                    date: event.date,
                    source: event.source
                }
            });
        }

        // 2. Generate Tax History (Last 5 years)
        for (let i = 1; i <= 5; i++) {
            const year = new Date().getFullYear() - i;
            const assessment = currentPrice * (0.4 - (i * 0.02)); // Tax assessment grows
            const taxPaid = assessment * 0.012; // 1.2% Tax Rate

            await prisma.taxHistory.create({
                data: {
                    propertyId: property.id,
                    year: year,
                    assessment: assessment,
                    taxPaid: taxPaid
                }
            });
        }

        // 3. Generate Schools
        // We will attach 3 random schools to each property
        const schools = [
            { name: 'St. Mary High School', type: 'Private', level: 'High', rating: 9 },
            { name: 'Bombay Scottish', type: 'Private', level: 'Elementary', rating: 10 },
            { name: 'Dhirubhai Ambani Intl', type: 'International', level: 'K-12', rating: 10 },
            { name: 'City Public School', type: 'Public', level: 'Middle', rating: 6 },
            { name: 'Greenwood High', type: 'Charter', level: 'High', rating: 8 }
        ];

        // Pick 3 random schools
        const nearbySchools = schools.sort(() => 0.5 - Math.random()).slice(0, 3);

        for (const s of nearbySchools) {
            await prisma.school.create({
                data: {
                    name: s.name,
                    type: s.type,
                    level: s.level,
                    rating: s.rating,
                    distance: parseFloat((Math.random() * 5).toFixed(1)),
                    properties: {
                        connect: { id: property.id }
                    }
                }
            });
        }
    }

    console.log('✅ Seeding Complete!');
}

main()
    .catch((e) => {
        console.error(e);
        process.exit(1);
    })
    .finally(async () => {
        await prisma.$disconnect();
    });
