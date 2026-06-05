/**
 * StrategyCard - 策略卡片组件
 * 支持传入标题、描述文字、视频或 GIF 图片链接
 * 适配移动端，支持懒加载，带播放/查看悬浮图标
 */

class StrategyCard {
    /**
     * @param {Object} options
     * @param {string} options.title       - 卡片标题
     * @param {string} options.description - 描述文字
     * @param {string} options.mediaSrc    - 视频或 GIF/图片 URL
     * @param {string} [options.mediaType] - 'video' | 'gif' | 'image'，默认自动检测
     * @param {string} [options.poster]    - 视频封面图（仅视频有效）
     * @param {string} [options.alt]       - 图片/GIF 的 alt 文字
     * @param {string} [options.badge]     - 难度标签，如 '初级' '中级' '高级'
     */
    constructor(options = {}) {
        this.title = options.title || '';
        this.description = options.description || '';
        this.mediaSrc = options.mediaSrc || '';
        this.mediaType = options.mediaType || StrategyCard._detectType(options.mediaSrc || '');
        this.poster = options.poster || '';
        this.alt = options.alt || options.title || '策略演示';
        this.badge = options.badge || '';
    }

    /** 根据文件扩展名自动判断媒体类型 */
    static _detectType(src) {
        const lower = src.toLowerCase();
        if (/\.(mp4|webm|ogg|mov)(\?|$)/.test(lower)) return 'video';
        if (/\.gif(\?|$)/.test(lower)) return 'gif';
        return 'image';
    }

    /** 构建媒体元素 HTML */
    _buildMedia() {
        if (!this.mediaSrc) return '';

        if (this.mediaType === 'video') {
            const poster = this.poster ? `poster="${this.poster}"` : '';
            return `
                <div class="sc-media-wrap">
                    <video
                        class="sc-video"
                        ${poster}
                        preload="none"
                        playsinline
                        muted
                        loop
                        data-src="${this.mediaSrc}"
                        aria-label="${this.alt}"
                    ></video>
                    <div class="sc-overlay" aria-hidden="true">
                        <span class="sc-play-icon">▶</span>
                        <span class="sc-overlay-label">点击播放</span>
                    </div>
                </div>`;
        }

        // GIF / 图片：使用 loading="lazy" + data-src 懒加载
        return `
            <div class="sc-media-wrap">
                <img
                    class="sc-img"
                    src="data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7"
                    data-src="${this.mediaSrc}"
                    alt="${this.alt}"
                    loading="lazy"
                />
                <div class="sc-overlay" aria-hidden="true">
                    <span class="sc-play-icon">🔍</span>
                    <span class="sc-overlay-label">查看</span>
                </div>
            </div>`;
    }

    /** 渲染为 DOM 元素 */
    render() {
        const badgeHtml = this.badge
            ? `<span class="sc-badge">${this.badge}</span>`
            : '';

        const el = document.createElement('article');
        el.className = 'strategy-card';
        el.innerHTML = `
            ${this._buildMedia()}
            <div class="sc-body">
                <div class="sc-header">
                    <h3 class="sc-title">${this.title}</h3>
                    ${badgeHtml}
                </div>
                <p class="sc-desc">${this.description}</p>
            </div>`;

        StrategyCard._bindEvents(el);
        return el;
    }

    /** 挂载到指定容器 */
    mount(containerSelector) {
        const container = typeof containerSelector === 'string'
            ? document.querySelector(containerSelector)
            : containerSelector;
        if (!container) {
            console.warn(`StrategyCard: 找不到容器 "${containerSelector}"`);
            return this;
        }
        container.appendChild(this.render());
        return this;
    }

    /** 绑定交互事件（视频点击播放 / 图片点击放大） */
    static _bindEvents(el) {
        const wrap = el.querySelector('.sc-media-wrap');
        if (!wrap) return;

        const video = wrap.querySelector('.sc-video');
        const img = wrap.querySelector('.sc-img');
        const overlay = wrap.querySelector('.sc-overlay');

        // 懒加载：IntersectionObserver
        const lazyLoad = (target) => {
            if ('IntersectionObserver' in window) {
                const observer = new IntersectionObserver((entries, obs) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            const t = entry.target;
                            if (t.dataset.src) {
                                t.src = t.dataset.src;
                                delete t.dataset.src;
                            }
                            obs.unobserve(t);
                        }
                    });
                }, { rootMargin: '200px' });
                observer.observe(target);
            } else {
                // 降级：直接赋值
                if (target.dataset.src) target.src = target.dataset.src;
            }
        };

        if (video) {
            lazyLoad(video); // 触发 preload="none" 的懒加载源
            wrap.addEventListener('click', () => {
                if (!video.src && video.dataset.src) {
                    video.src = video.dataset.src;
                    delete video.dataset.src;
                }
                if (video.paused) {
                    video.play();
                    overlay && (overlay.style.opacity = '0');
                } else {
                    video.pause();
                    overlay && (overlay.style.opacity = '1');
                }
            });
            video.addEventListener('ended', () => {
                overlay && (overlay.style.opacity = '1');
            });
        }

        if (img) {
            lazyLoad(img);
            wrap.addEventListener('click', () => {
                StrategyCard._openLightbox(img.src || img.dataset.src, img.alt);
            });
        }
    }

    /** 简易 Lightbox 放大查看 */
    static _openLightbox(src, alt) {
        if (!src) return;
        let lb = document.getElementById('sc-lightbox');
        if (!lb) {
            lb = document.createElement('div');
            lb.id = 'sc-lightbox';
            lb.innerHTML = `
                <div class="sc-lb-backdrop"></div>
                <div class="sc-lb-content">
                    <button class="sc-lb-close" aria-label="关闭">✕</button>
                    <img class="sc-lb-img" src="" alt="" />
                </div>`;
            document.body.appendChild(lb);
            lb.querySelector('.sc-lb-backdrop').addEventListener('click', () => lb.classList.remove('sc-lb-open'));
            lb.querySelector('.sc-lb-close').addEventListener('click', () => lb.classList.remove('sc-lb-open'));
        }
        lb.querySelector('.sc-lb-img').src = src;
        lb.querySelector('.sc-lb-img').alt = alt;
        lb.classList.add('sc-lb-open');
    }
}

/**
 * 批量渲染多个策略卡片
 * @param {string} containerSelector - 容器选择器
 * @param {Array}  cardsData         - StrategyCard options 数组
 */
function renderStrategyCards(containerSelector, cardsData = []) {
    cardsData.forEach(data => new StrategyCard(data).mount(containerSelector));
}

// 挂载到全局，方便在 HTML 内联脚本使用
window.StrategyCard = StrategyCard;
window.renderStrategyCards = renderStrategyCards;
