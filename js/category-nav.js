/**
 * CategoryNav - 分类导航组件
 * 支持：新手入门 / 高阶技巧 / 挑战解析
 * 功能：hover 效果、当前选中高亮、手机端折叠
 */

const CATEGORY_CONFIG = [
    {
        id: 'beginner',
        label: '新手入门',
        icon: '🌱',
        levels: ['beginner'],
        color: '#10b981'
    },
    {
        id: 'advanced',
        label: '高阶技巧',
        icon: '🔥',
        levels: ['intermediate', 'advanced'],
        color: '#6366f1'
    },
    {
        id: 'challenge',
        label: '挑战解析',
        icon: '🏆',
        levels: ['challenge'],
        color: '#f59e0b'
    }
];

/** 将 tip-level span 上的 class 映射成 CategoryNav 分类 id */
const LEVEL_TO_CATEGORY = {
    'level-beginner': 'beginner',
    'level-intermediate': 'advanced',
    'level-advanced': 'advanced',
    'level-challenge': 'challenge'
};

class CategoryNav {
    /**
     * @param {Object} options
     * @param {string|Element} options.container  - 挂载容器
     * @param {string}         [options.mode]     - 'sidebar' | 'inline'（默认 sidebar）
     * @param {Function}       [options.onFilter] - 分类切换回调 (categoryId) => void
     */
    constructor(options = {}) {
        this.container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : options.container;
        this.mode = options.mode || 'sidebar';
        this.onFilter = options.onFilter || null;
        this.activeId = 'all';
        this._open = false;
    }

    mount() {
        if (!this.container) return this;

        this.container.innerHTML = '';
        this.container.className = `category-nav category-nav--${this.mode}`;

        const header = this._buildHeader();
        const list = this._buildList();

        this.container.append(header, list);
        this._listEl = list;
        this._toggleEl = header.querySelector('.category-nav-toggle');

        this._bindToggle();
        return this;
    }

    _buildHeader() {
        const header = document.createElement('div');
        header.className = 'category-nav-header';

        const title = document.createElement('h3');
        title.className = 'widget-title';
        title.textContent = '按分类浏览';

        const toggle = document.createElement('button');
        toggle.className = 'category-nav-toggle';
        toggle.setAttribute('aria-expanded', 'true');
        toggle.setAttribute('aria-controls', 'categoryNavList');
        toggle.setAttribute('aria-label', '折叠分类导航');
        toggle.innerHTML = '<span class="category-nav-chevron"></span>';

        header.append(title, toggle);
        return header;
    }

    _buildList() {
        const ul = document.createElement('ul');
        ul.className = 'category-nav-list';
        ul.id = 'categoryNavList';

        // "全部" 项
        ul.appendChild(this._buildItem({ id: 'all', label: '全部攻略', icon: '📋', color: '#64748b' }, true));

        CATEGORY_CONFIG.forEach(cat => {
            ul.appendChild(this._buildItem(cat, false));
        });

        return ul;
    }

    _buildItem(cat, isActive) {
        const li = document.createElement('li');
        li.className = 'category-nav-item';

        const btn = document.createElement('button');
        btn.className = 'category-nav-btn' + (isActive ? ' is-active' : '');
        btn.dataset.categoryId = cat.id;
        btn.type = 'button';
        btn.setAttribute('aria-pressed', isActive ? 'true' : 'false');

        const iconEl = document.createElement('span');
        iconEl.className = 'category-nav-icon';
        iconEl.textContent = cat.icon;

        const labelEl = document.createElement('span');
        labelEl.className = 'category-nav-label';
        labelEl.textContent = cat.label;

        const dotEl = document.createElement('span');
        dotEl.className = 'category-nav-dot';
        dotEl.style.setProperty('--cat-color', cat.color || '#6366f1');

        btn.append(dotEl, iconEl, labelEl);
        li.appendChild(btn);

        btn.addEventListener('click', () => this._setActive(cat.id, btn));
        return li;
    }

    _setActive(id, clickedBtn) {
        this.activeId = id;

        this._listEl.querySelectorAll('.category-nav-btn').forEach(b => {
            const active = b === clickedBtn;
            b.classList.toggle('is-active', active);
            b.setAttribute('aria-pressed', active ? 'true' : 'false');
        });

        if (typeof this.onFilter === 'function') {
            this.onFilter(id);
        }
    }

    _bindToggle() {
        if (!this._toggleEl) return;
        this._toggleEl.addEventListener('click', () => {
            this._open = !this._open;
            this._listEl.classList.toggle('is-collapsed', this._open);
            this._toggleEl.setAttribute('aria-expanded', !this._open ? 'true' : 'false');
            this._toggleEl.querySelector('.category-nav-chevron')
                .classList.toggle('is-rotated', this._open);
        });
    }
}

/**
 * 将 tip-level 类映射为分类标签并插入文章 header
 * 调用时机：DOM 加载完成后
 */
function applyTipCategoryTags() {
    document.querySelectorAll('.tip-header').forEach(header => {
        const levelSpan = header.querySelector('.tip-level');
        if (!levelSpan) return;

        const levelClass = Array.from(levelSpan.classList)
            .find(c => c.startsWith('level-'));
        if (!levelClass) return;

        const catId = LEVEL_TO_CATEGORY[levelClass];
        const catConfig = CATEGORY_CONFIG.find(c => c.id === catId);
        if (!catConfig) return;

        // 避免重复插入
        if (header.querySelector('.tip-category-tag')) return;

        const tag = document.createElement('span');
        tag.className = `tip-category-tag tip-category-tag--${catId}`;
        tag.style.setProperty('--cat-color', catConfig.color);
        tag.textContent = catConfig.label;

        // 插到 tip-level span 之后
        levelSpan.insertAdjacentElement('afterend', tag);
    });
}

/**
 * 过滤文章列表，隐藏不属于当前分类的文章
 * @param {string} categoryId - 'all' | 'beginner' | 'advanced' | 'challenge'
 */
function filterTipsByCategory(categoryId) {
    const articles = document.querySelectorAll('.tip-detail');
    articles.forEach(article => {
        if (categoryId === 'all') {
            article.hidden = false;
            return;
        }
        const levelSpan = article.querySelector('.tip-level');
        const levelClass = levelSpan
            ? Array.from(levelSpan.classList).find(c => c.startsWith('level-'))
            : null;
        const catId = levelClass ? LEVEL_TO_CATEGORY[levelClass] : null;
        article.hidden = catId !== categoryId;
    });
}

window.CategoryNav = CategoryNav;
window.applyTipCategoryTags = applyTipCategoryTags;
window.filterTipsByCategory = filterTipsByCategory;
window.CATEGORY_CONFIG = CATEGORY_CONFIG;
