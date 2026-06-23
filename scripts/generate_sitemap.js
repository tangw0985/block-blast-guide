const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const siteUrl = 'https://blockblastgui.com';
const excludedDirectories = new Set(['.git', '.agents', 'node_modules']);

function collectHtmlFiles(directory, files = []) {
    for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
        if (entry.isDirectory() && excludedDirectories.has(entry.name)) continue;

        const fullPath = path.join(directory, entry.name);
        if (entry.isDirectory()) {
            collectHtmlFiles(fullPath, files);
        } else if (entry.name.endsWith('.html') && !entry.name.startsWith('google')) {
            files.push(fullPath);
        }
    }
    return files;
}

function toUrl(filePath) {
    const relative = path.relative(root, filePath).replace(/\\/g, '/');
    if (relative === 'index.html') return `${siteUrl}/`;
    if (relative.endsWith('/index.html')) return `${siteUrl}/${relative.slice(0, -10)}`;
    return `${siteUrl}/${relative}`;
}

function getPriority(url) {
    if (url === `${siteUrl}/`) return '1.0';
    if (url.includes('/guides/')) return '0.8';
    if (url.endsWith('/tips.html') || url.endsWith('/daily.html')) return '0.9';
    if (url.endsWith('/about.html') || url.endsWith('/contact.html') ||
        url.endsWith('/privacy.html') || url.endsWith('/disclaimer.html')) return '0.3';
    return '0.6';
}

const urls = collectHtmlFiles(root)
    .sort()
    .map(filePath => {
        const url = toUrl(filePath);
        const lastModified = fs.statSync(filePath).mtime.toISOString().slice(0, 10);
        return `  <url><loc>${url}</loc><lastmod>${lastModified}</lastmod><priority>${getPriority(url)}</priority></url>`;
    });

const sitemap = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">',
    ...urls,
    '</urlset>',
    ''
].join('\n');

fs.writeFileSync(path.join(root, 'sitemap.xml'), sitemap, 'utf8');
console.log(`Generated sitemap.xml with ${urls.length} URLs.`);
