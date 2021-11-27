require('dotenv').config()
const fs = require('fs');
const path = require('path');
const Dropbox = require('dropbox');
const extract = require('extract-zip')


if (!process.env.DROPBOX_TOKEN) {
	console.warn("No API token for Dropbox found")
	return
}

const dbx = new Dropbox.Dropbox({ accessToken: process.env.DROPBOX_TOKEN });

const blogDir = '/Notes/blog'
const destination = 'notes'
const destinationPath = path.resolve(`./${destination}`)

dbx.filesDownloadZip({ path: blogDir })
	.then((response) => {
		const folderName = response.result.metadata.name
		const folderPath = path.resolve(`./${folderName}`)

		// write zip file to filesystem
		const buffer = Buffer.from(response.result.fileBinary, 'binary')
		const folderZipPath = folderPath + '.zip'
		fs.writeFileSync(folderZipPath, buffer)

		// extract zip file
		extract(folderZipPath, { dir: __dirname })
			.then(() => {

				// copy each exatracted file to destination
				fs.readdirSync(folderPath).forEach(file => {
					const slug = file.replace(/\s+/g, '-').toLowerCase()
					fs.copyFileSync(folderPath + '/' + file, destinationPath + '/' + slug);
				})

				// delete temporary folders
				fs.rmSync(folderZipPath)
				fs.rmSync(folderPath, { recursive: true, force: true })
			})
	})