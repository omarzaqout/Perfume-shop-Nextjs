import { PrismaClient } from '@prisma/client'


const prisma = new PrismaClient()
async function main() {
    await prisma.user.create(
        {
            data: {
                email: "yazanhendi999@gmail.com"

            }
        }
    )

}

main()
    .catch(async (e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        await prisma.$disconnect()
    })