# Personal Website + Blog

Exploring React and Gatsby



#### for documentation purposes

added childTransforms to render function in notion plugin

inside renderUtils.js

```javascript
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function default_1(imageNodes) {
    return {
        publicUrl(imageUrl) {
            const node = imageNodes.find(i => i.imageUrl === imageUrl);
            if (!node) {
                return null;
            }
            return node.localFile && node.localFile.publicURL;
        },
        childImage(imageUrl) {
            const node = imageNodes.find(i => i.imageUrl === imageUrl);
            if (!node) {
                return null;
            }
            return node.localFile && node.localFile.childImageSharp.fluid;
        }
    };
}
exports.default = default_1;
```

inside renderNotionBlocks.js

```javascript
if (root.type === 'image') {
    const url = renderUtils.publicUrl(meta.source);
    if (!url) {
        console.log(`cannot find public url for image: ${JSON.stringify(meta)}`);
    }
    const fluid = renderUtils.childImage(meta.source);
    // TODO: default image?
    meta.publicImageUrl = url || '';
    meta.childImage = fluid || '';
}
```


# To-Do

1. use context api to set back button state