import 'dotenv/config'
import { z } from 'zod'

const envSchema = z.object({
	NODE_ENV: z.enum(['development', 'production', 'test']).default('production'),
	PORT: z.coerce.number().default(3333),
})

const _env = envSchema.safeParse(envSchema)

if (_env.success === false) {
	console.error('❌❌ Error environments not found ❌❌', _env.error.format())
	throw new Error('❌❌ Error environments not found ❌❌')
}

export const env = _env.data
