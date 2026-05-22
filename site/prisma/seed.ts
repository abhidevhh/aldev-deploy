import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3'
import { subMonths } from 'date-fns'
import { getPasswordHash } from '#app/utils/password.server.ts'
import { PrismaClient } from '#app/utils/prisma-generated.server/client.ts'

import 'dotenv/config'

const url = process.env.DATABASE_URL
if (!url) {
	throw new Error('DATABASE_URL is required (expected a file: URL for SQLite).')
}
const prisma = new PrismaClient({
	adapter: new PrismaBetterSqlite3({ url }),
})

async function main() {
	const abhiPasswordHash = await getPasswordHash('iliketwix')

	const abhi = await prisma.user.upsert({
		where: { email: 'me@abhidev.com' },
		update: {
			password: {
				upsert: {
					create: { hash: abhiPasswordHash },
					update: { hash: abhiPasswordHash },
				},
			},
		},
		create: {
			email: `me@abhidev.com`,
			firstName: 'Kent',
			team: 'BLUE',
			role: 'ADMIN',
			password: { create: { hash: abhiPasswordHash } },
		},
	})

	const hannah = await prisma.user.upsert({
		where: { email: 'me+hannah@abhidev.com' },
		update: {},
		create: {
			email: `me+hannah@abhidev.com`,
			firstName: 'Hannah',
			team: 'RED',
		},
	})

	const kody = await prisma.user.upsert({
		where: { email: 'me+kody@abhidev.com' },
		update: {},
		create: {
			email: `me+kody@abhidev.com`,
			firstName: 'Kody',
			team: 'YELLOW',
		},
	})

	const peter = await prisma.user.upsert({
		where: { email: 'me+peter@abhidev.com' },
		update: {},
		create: {
			email: `me+peter@abhidev.com`,
			firstName: 'Peter',
			team: 'YELLOW',
		},
	})

	// we'll stick one really old read in for peter to make sure he doesn't
	// show up in the rankings as an active user, but the read *should* show up in the total reads.
	const postReads = [
		prisma.postRead.create({
			data: {
				postSlug: 'super-simple-start-to-remix',
				userId: peter.id,
				createdAt: subMonths(new Date(), 13),
			},
		}),
	]

	for (const [user, reads] of [
		[abhi, 6],
		[hannah, 4],
		[kody, 2],
	] as const) {
		// user.firstName.length is just an easy way to make these different
		for (let index = 0; index < reads; index++) {
			postReads.push(
				prisma.postRead.create({
					data: {
						postSlug: 'super-simple-start-to-remix',
						userId: user.id,
					},
				}),
			)
		}
	}

	await Promise.all(postReads)

	console.log('created')
}

main()
	.catch((e) => {
		console.error(e)
		process.exit(1)
	})
	.finally(async () => {
		await prisma.$disconnect()
	})
