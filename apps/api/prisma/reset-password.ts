
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
    const email = 'rahul.sharma@rentify.in';
    const password = 'password123';

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.update({
        where: { email },
        data: { password: hashedPassword },
    });

    console.log(`Updated password for ${user.email} -> Hash: ${hashedPassword.substring(0, 10)}...`);
}

main()
    .catch((e) => console.error(e))
    .finally(async () => await prisma.$disconnect());
