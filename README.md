# Colophon

> When used in reference to websites, a colophon is a description of the tools, systems and resources used to create the site and keep it operational. It also serves to acknowledge and give credit to all of them.

Hi, I'm @clearlysid and this is my personal website. It evolves as I do — the design, and underlying technologies keep changing as I grow and learn new things. Things break often and radical design changes happen overnight. [No really](https://twitter.com/clearlysid/status/1394198294193086465?s=20).

### Current Stack

1. Posts are written in plain markdown files pulled from [Dropbox](https://www.dropbox.com).
2. I design stuff in [Figma](https://www.figma.com/) and code the stuff in [VS Code](https://code.visualstudio.com/).
3. [11ty](https://www.11ty.dev/), the best static site generator in town.
4. The leanest WAAPI animation library [Motion One](https://motion.dev)
5. [Cloudinary](https://cloudinary.com/) handles image optimization and hosting.
6. Deployed via [![Netlify](https://api.netlify.com/api/v1/badges/4fc3be70-90bc-44a2-80f0-8deebc83575a/deploy-status)](https://app.netlify.com/sites/sidds/deploys).

In the past, I've used Jekyll, Hugo, Hexo, Gatsby and NextJS to power this site: but for a project this size, 11ty was a clear winner. I adore the JAMstack and try to keep my codebase lean if I can.

### Developer Reference

Under the hood, I use [Vite](https://vitejs.dev/) to process my JS and CSS.

1. `yarn` will install all packages needed
2. To spin up a dev server: `yarn dev`
3. Build it for production: `yarn build`
