# Colophon

> When used in reference to websites, a colophon is a description of the tools, systems and resources used to create the site and keep it operational. It also serves to acknowledge and give credit to all of them. — [Webopedia](https://www.webopedia.com/definitions/colophon/)

Hi, I'm [@clearlysid](https://twitter.com/clearlysid) and this is my personal website. It evolves as I do — it's design and underlying technology keeps changing as I grow and learn new things. Things break often and radical design changes happen overnight. [No really](https://twitter.com/clearlysid/status/1394198294193086465?s=20).

## Current Stack

1. [11ty](https://www.11ty.dev/), the best static site generator in town.
2. Under the hood, [Vite](https://vitejs.dev/) processes client-side JS and CSS.
3. I write in [Obsidian](https://obsidian.md)/[Logseq](https://logseq.com/blog/about) and pull the `markdown` files from [Dropbox](https://www.dropbox.com).
4. [Cloudinary](https://cloudinary.com/) handles image optimization and hosting
5. [Motion One](https://motion.dev) powers all the animation here. It's super lightweight!
6. I design stuff in [Figma](https://www.figma.com/) and code in [VS Code](https://code.visualstudio.com/).
7. The site is deployed via [![Netlify](https://api.netlify.com/api/v1/badges/4fc3be70-90bc-44a2-80f0-8deebc83575a/deploy-status)](https://app.netlify.com/sites/sidds/deploys)

## Developer Reference

To pull notes from Dropbox, we need to specify a directory in `getNotes.js` as well as enter an [API key](https://dropbox.tech/developers/generate-an-access-token-for-your-own-account) in a `.env` file at the root of the project.

1. `yarn` installs all packages needed.
2. `yarn notes` pulls notes from Dropbox — you set up an API key, right?
3. `yarn dev` spins up a dev server.
4. `yarn build` builds for production:
