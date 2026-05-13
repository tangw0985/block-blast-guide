// ==========================================
// 主题切换功能
// ==========================================
const themeToggle = document.getElementById('themeToggle');
const themeIcon = document.querySelector('.theme-icon');
const html = document.documentElement;

// 从本地存储加载主题
const savedTheme = localStorage.getItem('theme') || 'light';
html.setAttribute('data-theme', savedTheme);
updateThemeIcon(savedTheme);

// 主题切换事件
themeToggle.addEventListener('click', () => {
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';

    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
});

function updateThemeIcon(theme) {
    themeIcon.textContent = theme === 'light' ? '🌙' : '☀️';
}

// ==========================================
// 移动端菜单切换
// ==========================================
const mobileMenuToggle = document.getElementById('mobileMenuToggle');
const navMenu = document.getElementById('navMenu');

if (mobileMenuToggle) {
    mobileMenuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
    });

    // 点击菜单项后关闭菜单
    const navLinks = navMenu.querySelectorAll('a');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navMenu.classList.remove('active');
        });
    });

    // 点击页面其他地方关闭菜单
    document.addEventListener('click', (e) => {
        if (!mobileMenuToggle.contains(e.target) && !navMenu.contains(e.target)) {
            navMenu.classList.remove('active');
        }
    });
}

// ==========================================
// 平滑滚动
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href === '#' || href === '') return;

        e.preventDefault();
        const target = document.querySelector(href);
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ==========================================
// 导航栏滚动效果
// ==========================================
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;

    if (currentScroll > 50) {
        header.style.boxShadow = '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)';
    } else {
        header.style.boxShadow = '0 1px 3px rgba(0, 0, 0, 0.1), 0 1px 2px rgba(0, 0, 0, 0.06)';
    }

    lastScroll = currentScroll;
});

// ==========================================
// 卡片动画（滚动时淡入）
// ==========================================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// 页面加载完成后观察所有卡片
document.addEventListener('DOMContentLoaded', () => {
    const cards = document.querySelectorAll('.content-card, .category-card, .guide-item, .popular-card, .tip-detail, .level-card, .download-card');

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(card);
    });
});

// ==========================================
// 语言切换（简化版，暂时只显示按钮）
// ==========================================
const langToggle = document.getElementById('langToggle');
const langText = document.querySelector('.lang-text');

if (langToggle) {
    langToggle.addEventListener('click', () => {
        // 暂时只是切换按钮文字，实际国际化功能可以后续添加
        const currentLang = langText.textContent;
        if (currentLang === 'EN') {
            langText.textContent = '中文';
            alert('English version coming soon! 英文版即将推出！');
        } else {
            langText.textContent = 'EN';
        }
    });
}

// ==========================================
// 控制台输出
// ==========================================
console.log('🎮 Block Blast 攻略网站已加载完成！');
console.log('💡 提示：点击右上角可以切换暗色/亮色主题');
