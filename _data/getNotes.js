// require('dotenv').config()
// const fs = require('fs');
// const Dropbox = require('dropbox');
// const fetch = require('node-fetch');
// const extract = require('extract-zip')
// const ACCESS_TOKEN = process.env.DROPBOX_TOKEN;
// const dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });


// dbx.filesDownloadZip({ path: '/Notes/blog' })
// 	.then((response) => {
// 		const fileName = response.result.metadata.name
// 		const buffer = Buffer.from(response.result.fileBinary, 'binary')
// 		fs.writeFile(`./${fileName}.zip`, buffer, (err) => {
// 			if (err) throw err;
// 		})

// 		extract(`${fileName}.zip`, { dir: './_data/' }).then(() => console.log('Extraction complete'))

// 	})