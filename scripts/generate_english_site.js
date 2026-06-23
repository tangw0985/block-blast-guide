const fs = require('fs');
const path = require('path');

const root = path.resolve(__dirname, '..');
const out = path.join(root, 'en');
const guidesOut = path.join(out, 'guides');
fs.mkdirSync(guidesOut, { recursive: true });

const analytics = `
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-HLT2EEQB8R"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-HLT2EEQB8R');
    </script>`;
const adsense = `<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6348261322431083" crossorigin="anonymous"></script>`;

const guides = [
    {
        slug: '3x3-block-strategy',
        zh: '../../guides/3x3-block-strategy.html',
        title: 'What to Do When a 3x3 Block Does Not Fit',
        description: 'Learn how to preserve a full 3x3 area, place restrictive pieces first, and recover space before a large square appears.',
        image: 'big-block-first.png',
        alt: 'Block Blast board with a protected 3x3 space',
        difficulty: 'Beginner to intermediate',
        lead: 'A 3x3 block needs nine connected cells. The solution is not to search after it appears, but to protect at least one full 3x3 zone several moves in advance.',
        answer: 'Place the most restrictive piece first, avoid breaking the center into small holes, and check after every two or three moves that a complete 3x3 zone still exists.',
        sections: [
            ['Why the 3x3 block causes losses', ['It cannot use narrow lanes or uneven gaps. A board may look open while still having no nine-cell square.']],
            ['A reliable four-step method', ['Review all three pieces before moving.', 'Place large squares and awkward shapes before flexible small pieces.', 'Keep the center connected instead of scattering single cells.', 'Recheck your 3x3 options after each group of placements.']],
            ['If no 3x3 space remains', ['Use the other pieces to finish the safest row or column. The immediate goal is to create one continuous area, not to maximize the current score.']],
            ['Common mistakes', ['Using 1x1 and 1x2 pieces before the 3x3 block.', 'Counting empty cells without checking whether they are connected.', 'Breaking the only 3x3 area to complete a low-value line.']],
        ],
        related: ['avoid-game-over', 'high-score-10000']
    },
    {
        slug: 'avoid-game-over',
        zh: '../../guides/avoid-game-over.html',
        title: 'How to Avoid Losing in Block Blast',
        description: 'Recognize uneven edges, isolated holes, blocked center space, and other warning signs before the board becomes impossible.',
        image: 'board-cleanup.png',
        alt: 'Risky uneven Block Blast board compared with a compact board',
        difficulty: 'Beginner',
        lead: 'Most games are lost several turns before the final piece. Isolated holes, jagged edges, and a fragmented center gradually remove your legal moves.',
        answer: 'Keep empty cells connected, keep placed blocks compact, and preserve at least one area that can accept a large piece.',
        sections: [
            ['Five warning signs', ['Jagged rows and columns appear along the edges.', 'Single-cell holes become trapped between blocks.', 'The center is split into small islands.', 'You have no nearly completed safety line.', 'Only narrow lanes remain for future pieces.']],
            ['A safer placement order', ['Compare the restrictions of all three pieces. Place large or awkward shapes first, then use small pieces to repair edges or finish lines.']],
            ['How to rescue a crowded board', ['Stop waiting for a perfect combo. Clear the easiest safe line and rebuild continuous space before pursuing a higher multiplier.']],
        ],
        related: ['3x3-block-strategy', 'emergency-rescue']
    },
    {
        slug: 'combo-strategy',
        zh: '../../guides/combo-strategy.html',
        title: 'Block Blast Combo Strategy: Double and Multi-Line Clears',
        description: 'Find row-column crossing points, save precise small pieces, and decide when a double clear is worth waiting for.',
        image: 'combo-strategy.png',
        alt: 'Block Blast row and column crossing point for a double clear',
        difficulty: 'Intermediate',
        lead: 'A strong multi-line clear comes from one placement completing a row and a column at the same time.',
        answer: 'Identify nearly completed rows and columns, then protect their crossing point for a small piece that can finish both.',
        sections: [
            ['Find the crossing point', ['Look for rows and columns missing only one or two cells. Their shared area is the most valuable target.']],
            ['Why small pieces matter', ['A 1x1, 1x2, or small L piece can complete exact gaps that large pieces cannot reach.']],
            ['When not to wait', ['If your board is losing large-piece space, take the safe single clear. Survival is more valuable than a risky future combo.']],
            ['Practice routine', ['Mark two potential lines.', 'Find their crossing area.', 'Save a precise finishing piece.', 'Compare immediate space with delayed combo value.']],
        ],
        related: ['single-block-strategy', 'high-score-10000']
    },
    {
        slug: 'high-score-10000',
        zh: '../../guides/high-score-10000.html',
        title: 'How to Score 10,000 in Block Blast',
        description: 'Build a stable high-score strategy around continuous space, safe clears, piece order, and late-game risk control.',
        image: 'high-score-rhythm.png',
        alt: 'Block Blast board showing a sustainable high-score fill level',
        difficulty: 'Intermediate',
        lead: 'Reaching 10,000 is mostly about survival. The longer you protect usable space, the more scoring opportunities you receive.',
        answer: 'Prioritize continuous space over immediate points, restrictive pieces over flexible pieces, and safe clears over risky waiting.',
        sections: [
            ['Early game: build compact edges', ['Keep new blocks close to existing blocks. Avoid splitting the board into several unrelated zones.']],
            ['Mid game: maintain safety lines', ['Prepare two nearly completed lines, but clear early if your large-piece options begin to disappear.']],
            ['Late game: lower your risk', ['Confirm that all remaining pieces still have legal placements. Protect a 3x3 zone and at least one straight lane.']],
            ['Quick checklist', ['Do I still have a 3x3 area?', 'Is there a lane for a long bar?', 'Can I clear one line quickly?', 'Is the center fragmented?', 'Did I place the most restrictive piece first?']],
        ],
        related: ['combo-strategy', 'avoid-game-over']
    },
    {
        slug: 'special-blocks',
        zh: '../../guides/special-blocks.html',
        title: 'Block Blast Special Shapes Guide',
        description: 'Learn where to place Z pieces, crosses, long bars, and large squares by preserving shape-friendly space.',
        image: 'special-blocks.png',
        alt: 'Block Blast Z piece, cross piece, and long bar guide',
        difficulty: 'Intermediate',
        lead: 'Special pieces are difficult because they require a specific shape of connected space. Planning before they appear is more reliable than improvising.',
        answer: 'Keep a notch for Z pieces, central flexibility for crosses, a straight lane for long bars, and a full square for 3x3 pieces.',
        sections: [
            ['Z and S pieces', ['Preserve step-shaped notches. A board made only of rectangles and narrow lanes gives these pieces very few options.']],
            ['Cross pieces', ['They usually work best near the center because they extend in four directions.']],
            ['Five-cell bars', ['Keep at least one five-cell horizontal or vertical lane available.']],
            ['Large squares', ['Protect a complete 3x3 zone and place the square before smaller flexible pieces.']],
        ],
        related: ['long-block-strategy', 'keep-center-open']
    },
    {
        slug: 'keep-center-open',
        zh: '../../guides/keep-center-open.html',
        title: 'Should You Keep the Center Open in Block Blast?',
        description: 'Understand why the center is valuable, which pieces need it, and when it is safe to use central cells.',
        image: 'keep-center-open.png',
        alt: 'Block Blast board with flexible center space',
        difficulty: 'Beginner to intermediate',
        lead: 'The center does not need to remain completely empty, but it should stay connected and flexible because it supports the widest range of shapes.',
        answer: 'Use edges first when possible. Occupy the center when the move clears a line or when another large-piece zone remains available.',
        sections: [
            ['Why the center matters', ['Central cells can expand in four directions. Crosses, T pieces, and large squares often need this flexibility.']],
            ['When to protect it', ['Large shapes may appear soon.', 'Edge placements are still available.', 'A single central cell would create isolated holes.', 'The move does not advance a clear.']],
            ['When it is safe to use', ['Use the center for an immediate clear or when another 3x3 zone and long lane remain open.']],
        ],
        related: ['corner-strategy', '3x3-block-strategy']
    },
    {
        slug: 'long-block-strategy',
        zh: '../../guides/long-block-strategy.html',
        title: 'Best Way to Place Long Blocks in Block Blast',
        description: 'Keep straight lanes available, use five-cell bars to finish lines, and recover when no long lane remains.',
        image: 'special-blocks.png',
        alt: 'Block Blast long bar and reserved straight lane',
        difficulty: 'Intermediate',
        lead: 'A long bar is restrictive because every cell must fit on one straight line. Jagged boards quickly remove all valid placements.',
        answer: 'Keep at least one five-cell horizontal or vertical lane and use the bar to finish a line instead of filling a random open area.',
        sections: [
            ['Reserve a lane early', ['Avoid placing isolated cells across every row. Compact stacking keeps entire rows or columns available.']],
            ['Horizontal or vertical?', ['Choose the direction that advances a clear. If neither scores, protect the center and your 3x3 zone.']],
            ['No five-cell lane remains', ['Use the other pieces first to clear a row or column and recreate a straight path.']],
        ],
        related: ['special-blocks', 'emergency-rescue']
    },
    {
        slug: 'corner-strategy',
        zh: '../../guides/corner-strategy.html',
        title: 'Block Blast Corner Strategy',
        description: 'Use corners and edges without creating trapped cells, then preserve the center for flexible and special pieces.',
        image: 'corner-strategy.png',
        alt: 'Block Blast corner-first placement strategy',
        difficulty: 'Beginner',
        lead: 'Corners have only two expansion directions, edges have three, and the center has four. Pieces that fit corners should be handled early.',
        answer: 'Use compact squares and L pieces in corners, build smooth edges, and preserve central flexibility for more restrictive shapes.',
        sections: [
            ['Best corner pieces', ['Small L pieces, 2x2 squares, and shapes that create a flat boundary work well in corners.']],
            ['Recommended order', ['Handle corners.', 'Build compact edges.', 'Protect the center.', 'Use small pieces to finish lines.']],
            ['Corner-first does not mean filling every edge', ['The goal is a smooth boundary, not a ring of jagged blocks around an isolated center.']],
        ],
        related: ['keep-center-open', 'avoid-game-over']
    },
    {
        slug: 'emergency-rescue',
        zh: '../../guides/emergency-rescue.html',
        title: 'Block Blast Emergency Board Rescue',
        description: 'When the board is nearly full, stop chasing combos and clear the safest line to restore usable space.',
        image: 'emergency-rescue.png',
        alt: 'Block Blast crowded-board rescue sequence',
        difficulty: 'Intermediate',
        lead: 'A crowded board requires a change of objective: stop maximizing points and restore enough continuous space for the next three pieces.',
        answer: 'Clear the easiest safe line, save precise small pieces, and stop waiting for a risky multi-line clear.',
        sections: [
            ['Can the board recover?', ['Check whether the current three pieces can complete at least one line. If not, create the largest continuous open area possible.']],
            ['Start with the closest line', ['Compare missing cells and whether your pieces can cover them without producing new isolated holes.']],
            ['Do not spread blocks everywhere', ['Concentrating blocks on one side can preserve a usable area on the other side.']],
            ['When to abandon a combo', ['If a large piece has only one placement left, clear immediately.']],
        ],
        related: ['avoid-game-over', 'single-block-strategy']
    },
    {
        slug: 'single-block-strategy',
        zh: '../../guides/single-block-strategy.html',
        title: 'When to Save the Single Block in Block Blast',
        description: 'Use the 1x1 block to finish crossing lines, repair isolated holes, and perform emergency clears instead of wasting it.',
        image: 'combo-strategy.png',
        alt: 'Block Blast single block completing a double clear',
        difficulty: 'Beginner to intermediate',
        lead: 'The single block is the most flexible piece and one of the easiest to waste. Its best value comes from precise finishing moves.',
        answer: 'Save it when a row or column is missing one cell, when a crossing point is available, or when it can repair an isolated hole.',
        sections: [
            ['Three high-value uses', ['Complete a row-column crossing point.', 'Fill a cell other shapes cannot reach.', 'Trigger an emergency safety clear.']],
            ['When not to use it', ['If the move does not advance a clear or repair the board shape, place restrictive pieces first.']],
            ['Avoid creating another single-cell hole', ['A good single-block placement should smooth the board or immediately clear a line.']],
        ],
        related: ['combo-strategy', 'emergency-rescue']
    },
];

const guideBySlug = Object.fromEntries(guides.map(guide => [guide.slug, guide]));

function head({ title, description, canonical, zh, type = 'website' }) {
    return `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="description" content="${description}">
    <meta property="og:type" content="${type}">
    <meta property="og:title" content="${title}">
    <meta property="og:description" content="${description}">
    <meta property="og:url" content="${canonical}">
    <meta name="twitter:card" content="summary_large_image">
    <title>${title}</title>
    <link rel="canonical" href="${canonical}">
    <link rel="alternate" hreflang="en" href="${canonical}">
    <link rel="alternate" hreflang="zh-CN" href="${zh}">
    <link rel="alternate" hreflang="x-default" href="${canonical}">
    <link rel="stylesheet" href="${canonical.includes('/guides/') ? '../../css/styles.css' : '../css/styles.css'}">
    <link rel="stylesheet" href="${canonical.includes('/guides/') ? '../../css/content-pages.css' : '../css/content-pages.css'}">
    ${adsense}
    ${analytics}
</head>`;
}

function header(prefix = '.', chineseHref = '../index.html') {
    return `<header class="header"><nav class="navbar container">
        <div class="nav-brand"><h1 class="logo">Block Blast Guide</h1></div>
        <ul class="nav-menu" id="navMenu">
            <li><a href="${prefix}/index.html">Home</a></li>
            <li><a href="${prefix}/guides/">Guides</a></li>
            <li><a href="${prefix}/about.html">About</a></li>
            <li><a href="${prefix}/contact.html">Contact</a></li>
        </ul>
        <div class="nav-controls">
            <a class="lang-toggle" href="${chineseHref}" aria-label="Chinese version">中文</a>
            <button class="theme-toggle" id="themeToggle" aria-label="Toggle theme"><span class="theme-icon">🌙</span></button>
            <button class="mobile-menu-toggle" id="mobileMenuToggle" aria-label="Menu"><span class="hamburger"></span></button>
        </div>
    </nav></header>`;
}

function footer(prefix = '.') {
    return `<footer class="footer"><div class="container"><div class="footer-bottom">
        <p>&copy; 2026 Block Blast Guide</p>
        <p><a href="${prefix}/about.html">About</a> · <a href="${prefix}/contact.html">Contact</a> · <a href="${prefix}/privacy.html">Privacy</a> · <a href="${prefix}/disclaimer.html">Disclaimer</a></p>
    </div></div></footer><script src="${prefix}/../js/main.js"></script>`;
}

function renderSections(sections) {
    return sections.map(([heading, content]) => {
        const body = content.length > 1
            ? `<ul>${content.map(item => `<li>${item}</li>`).join('')}</ul>`
            : `<p>${content[0]}</p>`;
        return `<h2>${heading}</h2>${body}`;
    }).join('');
}

function renderGuide(guide) {
    const canonical = `https://blockblastgui.com/en/guides/${guide.slug}.html`;
    const schema = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'Article',
        headline: guide.title,
        description: guide.description,
        image: `https://blockblastgui.com/images/en/${guide.image}`,
        datePublished: '2026-06-23',
        dateModified: '2026-06-23',
        author: { '@type': 'Organization', name: 'Block Blast Guide' },
        mainEntityOfPage: canonical,
        inLanguage: 'en'
    });
    const related = guide.related.map(slug => {
        const item = guideBySlug[slug];
        return `<a href="${slug}.html">${item.title}</a>`;
    }).join('');
    return `${head({ title: `${guide.title} | Block Blast Guide`, description: guide.description, canonical, zh: `https://blockblastgui.com/guides/${guide.slug}.html`, type: 'article' })}
<script type="application/ld+json">${schema}</script>
<body>
${header('..', guide.zh)}
<main class="content-page"><div class="container content-page-inner">
    <div class="breadcrumbs"><a href="../index.html">Home</a> / <a href="./">Guides</a> / ${guide.title}</div>
    <article class="article-body">
        <header class="article-header"><h1>${guide.title}</h1><p class="article-lead">${guide.lead}</p><div class="article-meta"><span>Updated June 23, 2026</span><span>${guide.difficulty}</span></div></header>
        <div class="answer-box"><strong>Quick answer:</strong> ${guide.answer}</div>
        <img class="article-image" src="../../images/en/${guide.image}?v=1" alt="${guide.alt}">
        ${renderSections(guide.sections)}
        <nav class="article-nav">${related}</nav>
    </article>
</div></main>
${footer('..')}
</body></html>`;
}

const guideCards = guides.map(guide => `<a class="guide-card" href="${guide.slug}.html"><h2>${guide.title}</h2><p>${guide.description}</p></a>`).join('\n');
const homeGuideCards = guides.map(guide => `<a class="guide-card" href="guides/${guide.slug}.html"><h2>${guide.title}</h2><p>${guide.description}</p></a>`).join('\n');
const guideIndex = `${head({
    title: 'Block Blast Strategy Guides',
    description: 'Practical Block Blast guides for 3x3 blocks, high scores, board rescue, combos, special pieces, and space management.',
    canonical: 'https://blockblastgui.com/en/guides/',
    zh: 'https://blockblastgui.com/guides/'
})}
<body>${header('..', '../../guides/')}
<main class="content-page"><div class="container content-page-inner">
    <div class="breadcrumbs"><a href="../index.html">Home</a> / Guides</div>
    <header class="article-header"><h1>Block Blast Strategy Guides</h1><p class="article-lead">Each guide answers one specific gameplay problem with practical steps and original board diagrams.</p><div class="article-meta"><span>10 guides</span><span>Updated June 23, 2026</span></div></header>
    <section class="guide-grid">${guideCards}</section>
</div></main>${footer('..')}</body></html>`;

const home = `${head({
    title: 'Block Blast Guide: Tips, High Scores and Board Strategy',
    description: 'Practical Block Blast strategies for high scores, 3x3 blocks, combos, board rescue, special pieces, and safer placements.',
    canonical: 'https://blockblastgui.com/en/',
    zh: 'https://blockblastgui.com/'
})}
<body>${header('.', '../index.html')}
<section class="page-header"><div class="container"><h1 class="page-title">Block Blast Strategy Guide</h1><p class="page-subtitle">Practical board diagrams and clear steps for safer moves and higher scores.</p></div></section>
<main class="content-page"><div class="container content-page-inner">
    <section class="article-body"><div class="answer-box"><strong>Start here:</strong> Protect continuous space, place restrictive pieces first, and keep one safety line ready before the board becomes crowded.</div>
    <h2>Popular guides</h2><div class="guide-grid">${homeGuideCards}</div>
    <h2>What this site covers</h2><p>Block Blast Guide is an independent strategy resource focused on board management, piece order, emergency recovery, and sustainable high scores. It is not affiliated with the game publisher.</p></section>
</div></main>${footer('.')}</body></html>`;

const legalPages = [
    {
        file: 'about.html',
        title: 'About Block Blast Guide',
        description: 'Learn about the editorial goals and independence of Block Blast Guide.',
        zh: 'about.html',
        content: `<h2>Our goal</h2><p>We explain specific Block Blast situations with original diagrams, direct answers, and practical steps.</p><h2>Editorial principles</h2><ul><li>Answer a real gameplay question on each page.</li><li>Separate tested strategy from opinion.</li><li>Correct broken links and inaccurate guidance.</li><li>Avoid promising guaranteed scores.</li></ul><h2>Independent website</h2><p>This is an independent fan-made strategy website and is not affiliated with the game developer or publisher.</p>`
    },
    {
        file: 'contact.html',
        title: 'Contact Block Blast Guide',
        description: 'Report guide errors, broken links, or suggest new Block Blast strategy topics.',
        zh: 'contact.html',
        content: `<div class="answer-box"><strong>Recommended contact:</strong> use the public GitHub Issues page so reports can be tracked.</div><p><a class="btn btn-primary" href="https://github.com/tangw0985/block-blast-guide/issues" target="_blank" rel="noopener">Open GitHub Issues</a></p><h2>Include these details</h2><ul><li>The page URL.</li><li>A screenshot or board description.</li><li>The expected correction.</li></ul><h2>Privacy reminder</h2><p>Do not post account credentials, payment details, verification codes, phone numbers, or home addresses.</p>`
    },
    {
        file: 'privacy.html',
        title: 'Privacy Policy',
        description: 'Privacy policy for Block Blast Guide, including cookies, Google AdSense, analytics, and third-party services.',
        zh: 'privacy.html',
        content: `<p>Last updated: June 23, 2026.</p><h2>Information we process</h2><p>The site does not require user registration. Hosting, analytics, and advertising services may process browser, device, IP address, referral, and page-view information.</p><h2>Cookies, Analytics and AdSense</h2><p>We use Google Analytics to measure site usage and Google AdSense to display advertising. Google and its partners may use cookies to deliver, measure, and personalize ads where permitted.</p><h2>Consent</h2><p>Visitors in regions that require consent may receive a Google-certified consent message with options to accept, reject, or manage choices.</p><h2>Third-party links</h2><p>External websites have their own privacy policies and practices.</p>`
    },
    {
        file: 'disclaimer.html',
        title: 'Disclaimer',
        description: 'Disclaimer covering unofficial status, strategy limitations, external links, advertising, and trademarks.',
        zh: 'disclaimer.html',
        content: `<p>Last updated: June 23, 2026.</p><h2>Unofficial resource</h2><p>This website is not affiliated with the Block Blast developer, publisher, or app stores. Names and trademarks belong to their respective owners.</p><h2>Strategy limitations</h2><p>Random pieces, game versions, and event rules may change. No strategy can guarantee the same result in every board state.</p><h2>Advertising and external links</h2><p>The site displays Google AdSense ads and may link to third-party services. An advertisement does not represent an endorsement or guarantee.</p>`
    },
];

fs.writeFileSync(path.join(out, 'index.html'), home, 'utf8');
fs.writeFileSync(path.join(guidesOut, 'index.html'), guideIndex, 'utf8');
for (const guide of guides) fs.writeFileSync(path.join(guidesOut, `${guide.slug}.html`), renderGuide(guide), 'utf8');
for (const page of legalPages) {
    const html = `${head({
        title: `${page.title} | Block Blast Guide`,
        description: page.description,
        canonical: `https://blockblastgui.com/en/${page.file}`,
        zh: `https://blockblastgui.com/${page.zh}`
    })}<body>${header('.', `../${page.zh}`)}<main class="content-page"><div class="container content-page-inner"><div class="breadcrumbs"><a href="index.html">Home</a> / ${page.title}</div><article class="article-body"><header class="article-header"><h1>${page.title}</h1><p class="article-lead">${page.description}</p></header>${page.content}</article></div></main>${footer('.')}</body></html>`;
    fs.writeFileSync(path.join(out, page.file), html, 'utf8');
}

console.log(`Generated English site with ${guides.length + legalPages.length + 2} pages.`);
