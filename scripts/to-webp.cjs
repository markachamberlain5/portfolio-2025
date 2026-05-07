/**
 * One-shot: generates .webp siblings next to every .jpg/.jpeg/.png under Images/.
 * Run: npm install && npm run webp
 */
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const root = path.join(__dirname, '..', 'Images');

async function walk(dir) {
    const names = fs.readdirSync(dir, { withFileTypes: true });
    for (const ent of names) {
        const full = path.join(dir, ent.name);
        if (ent.isDirectory()) {
            await walk(full);
            continue;
        }
        if (!/\.(jpe?g|png)$/i.test(ent.name)) {
            continue;
        }
        const outPath = full.replace(/\.(jpe?g|png)$/i, '.webp');
        if (fs.existsSync(outPath)) {
            continue;
        }
        try {
            await sharp(full).webp({ quality: 85 }).toFile(outPath);
            console.log('webp:', path.relative(root, outPath));
        }
        catch (err) {
            console.error(full, err.message);
        }
    }
}

(async function main() {
    if (!fs.existsSync(root)) {
        console.error('Missing Images folder:', root);
        process.exit(1);
    }
    await walk(root);
})();
