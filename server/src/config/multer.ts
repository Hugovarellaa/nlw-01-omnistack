import multer from 'multer'
import { randomBytes } from 'node:crypto'
import { resolve } from 'node:path'

export default {
	storage: multer.diskStorage({
		destination: resolve(__dirname, '..', '..', 'uploads'),
		filename: (request, file, callback) => {
			const hash = randomBytes(6).toString('hex')
			const fileName = `${hash}-${file.originalname}`
			callback(null, fileName)
		},
	}),
}
