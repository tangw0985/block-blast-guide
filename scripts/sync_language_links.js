const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const pairs = [
    ['index.html', 'https://blockblastgui.com/', 'https://blockblastgui.com/en/'],
    ['guides/index.html', 'https://blockblastgui.com/guides/', 'https://blockblastgui.com/en/guides/'],
    ['guides/3x3-block-strategy.html', 'https://blockblastgui.com/guides/3x3-block-strategy.html', 'https://blockblastgui.com/en/guides/3x3-block-strategy.html'],
    ['guides/avoid-game-over.html', 'https://blockblastgui.com/guides/avoid-game-over.html', 'https://blockblastgui.com/en/guides/avoid-game-over.html'],
    ['guides/combo-strategy.html', 'https://blockblastgui.com/guides/combo-strategy.html', 'https://blockblastgui.com/en/guides/combo-strategy.html'],
    ['guides/high-score-10000.html', 'https://blockblastgui.com/guides/high-score-10000.html', 'https://blockblastgui.com/en/guides/high-score-10000.html'],
    ['guides/special-blocks.html', 'https://blockblastgui.com/guides/special-blocks.html', 'https://blockblastgui.com/en/guides/special-blocks.html'],
    ['guides/keep-center-open.html', 'https://blockblastgui.com/guides/keep-center-open.html', 'https://blockblastgui.com/en/guides/keep-center-open.html'],
    ['guides/long-block-strategy.html', 'https://blockblastgui.com/guides/long-block-strategy.html', 'https://blockblastgui.com/en/guides/long-block-strategy.html'],
    ['guides/corner-strategy.html', 'https://blockblastgui.com/guides/corner-strategy.html', 'https://blockblastgui.com/en/guides/corner-strategy.html'],
    ['guides/emergency-rescue.html', 'https://blockblastgui.com/guides/emergency-rescue.html', 'https://blockblastgui.com/en/guides/emergency-rescue.html'],
    ['guides/single-block-strategy.html', 'https://blockblastgui.com/guides/single-block-strategy.html', 'https://blockblastgui.com/en/guides/single-block-strategy.html'],
    ['about.html', 'https://blockblastgui.com/about.html', 'https://blockblastgui.com/en/about.html'],
    ['contact.html', 'https://blockblastgui.com/contact.html', 'https://blockblastgui.com/en/contact.html'],
    ['privacy.html', 'https://blockblastgui.com/privacy.html', 'https://blockblastgui.com/en/privacy.html'],
    ['disclaimer.html', 'https://blockblastgui.com/disclaimer.html', 'https://blockblastgui.com/en/disclaimer.html'],
];

for (const [relative, zhUrl, enUrl] of pairs) {
    const file = path.join(root, relative);
    let html = fs.readFileSync(file, 'utf8');
    if (!html.includes('hreflang="en"')) {
        const tags = [
            `    <link rel="alternate" hreflang="zh-CN" href="${zhUrl}">`,
            `    <link rel="alternate" hreflang="en" href="${enUrl}">`,
            `    <link rel="alternate" hreflang="x-default" href="${enUrl}">`,
        ].join('\n');
        html = html.replace(/(\s*<link rel="canonical"[^>]+>)/, `$1\n${tags}`);
    }

    if (!html.includes('aria-label="English version"')) {
        const englishHref = relative.includes('/') ? `../en/${relative}` : `en/${relative === 'index.html' ? '' : relative}`;
        html = html.replace(
            /<button class="lang-toggle" id="langToggle"[^>]*>[\s\S]*?<\/button>/,
            ''
        );
        html = html.replace(
            '<div class="nav-controls">',
            `<div class="nav-controls"><a class="lang-toggle" href="${englishHref}" aria-label="English version">EN</a>`
        );
    }
    fs.writeFileSync(file, html, 'utf8');
}

const legacyPages = ['tips.html', 'daily.html', 'levels.html', 'download.html'];
for (const relative of legacyPages) {
    const file = path.join(root, relative);
    let html = fs.readFileSync(file, 'utf8');
    html = html.replace(
        /<button class="lang-toggle" id="langToggle"[^>]*>[\s\S]*?<\/button>/,
        '<a class="lang-toggle" href="en/" aria-label="English version">EN</a>'
    );
    fs.writeFileSync(file, html, 'utf8');
}

console.log(`Synchronized ${pairs.length} language pairs.`);
