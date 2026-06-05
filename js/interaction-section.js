class InteractionSection {
    constructor(options = {}) {
        this.container = typeof options.container === 'string'
            ? document.querySelector(options.container)
            : options.container;
        this.storageKey = options.storageKey || 'blockBlastTipsUsefulVotes';
        this.giscus = options.giscus || {};
        this.giscusLoaded = false;
    }

    mount() {
        if (!this.container) return;

        this.container.innerHTML = '';
        this.container.className = 'interaction-section content-card';
        this.container.append(this.createVoteCard(), this.createCommentsCard());
        this.bindVote();
        this.deferGiscusLoad();
    }

    createVoteCard() {
        const card = document.createElement('div');
        card.className = 'interaction-vote-card';

        const content = document.createElement('div');
        content.className = 'interaction-vote-content';

        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = '这篇攻略有帮助吗？';

        const description = document.createElement('p');
        description.className = 'section-description';
        description.textContent = '如果这些技巧对你有用，可以点一下赞同，帮助我们判断哪些攻略值得继续更新。';

        const button = document.createElement('button');
        button.className = 'useful-vote-button';
        button.type = 'button';
        button.setAttribute('aria-pressed', this.hasVoted() ? 'true' : 'false');

        const label = document.createElement('span');
        label.className = 'vote-label';
        label.textContent = '赞同 / 有用';

        const count = document.createElement('span');
        count.className = 'vote-count';
        count.textContent = this.getVoteCount();

        button.append(label, count);

        content.append(title, description);
        card.append(content, button);
        return card;
    }

    createCommentsCard() {
        const card = document.createElement('div');
        card.className = 'interaction-comments-card';

        const title = document.createElement('h2');
        title.className = 'section-title';
        title.textContent = '玩家评论与补充';

        const description = document.createElement('p');
        description.className = 'section-description';
        description.textContent = '欢迎补充你的高分技巧、关卡经验或对攻略内容的建议。';

        const container = document.createElement('div');
        container.className = 'giscus-container';
        container.id = 'giscusContainer';
        container.textContent = '评论区将在滚动到这里时加载。';

        card.append(title, description, container);
        return card;
    }

    bindVote() {
        const button = this.container.querySelector('.useful-vote-button');
        if (!button) return;

        button.addEventListener('click', () => {
            const hasVoted = this.hasVoted();
            const nextCount = Math.max(0, this.getVoteCount() + (hasVoted ? -1 : 1));
            localStorage.setItem(this.storageKey, JSON.stringify({ voted: !hasVoted, count: nextCount }));
            button.setAttribute('aria-pressed', !hasVoted ? 'true' : 'false');
            button.querySelector('.vote-count').textContent = nextCount;
        });
    }

    getVoteData() {
        try {
            return JSON.parse(localStorage.getItem(this.storageKey)) || { voted: false, count: 0 };
        } catch {
            return { voted: false, count: 0 };
        }
    }

    hasVoted() {
        return Boolean(this.getVoteData().voted);
    }

    getVoteCount() {
        return Number(this.getVoteData().count) || 0;
    }

    deferGiscusLoad() {
        const target = this.container.querySelector('#giscusContainer');
        if (!target) return;

        if (!this.hasGiscusConfig()) {
            target.textContent = '评论区已预留：发布到 GitHub 后，请补充 Giscus 配置参数启用评论。';
            return;
        }

        if ('IntersectionObserver' in window) {
            const observer = new IntersectionObserver((entries, obs) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        this.loadGiscus(target);
                        obs.unobserve(entry.target);
                    }
                });
            }, { rootMargin: '240px' });
            observer.observe(target);
            return;
        }

        window.setTimeout(() => this.loadGiscus(target), 1200);
    }

    hasGiscusConfig() {
        return Boolean(
            this.giscus.repo &&
            this.giscus.repoId &&
            this.giscus.category &&
            this.giscus.categoryId
        );
    }

    loadGiscus(target) {
        if (this.giscusLoaded) return;
        this.giscusLoaded = true;
        target.textContent = '';

        const script = document.createElement('script');
        script.src = 'https://giscus.app/client.js';
        script.async = true;
        script.crossOrigin = 'anonymous';
        script.setAttribute('data-repo', this.giscus.repo);
        script.setAttribute('data-repo-id', this.giscus.repoId);
        script.setAttribute('data-category', this.giscus.category);
        script.setAttribute('data-category-id', this.giscus.categoryId);
        script.setAttribute('data-mapping', this.giscus.mapping || 'pathname');
        script.setAttribute('data-strict', this.giscus.strict || '0');
        script.setAttribute('data-reactions-enabled', this.giscus.reactionsEnabled || '1');
        script.setAttribute('data-emit-metadata', this.giscus.emitMetadata || '0');
        script.setAttribute('data-input-position', this.giscus.inputPosition || 'bottom');
        script.setAttribute('data-theme', this.giscus.theme || this.getTheme());
        script.setAttribute('data-lang', this.giscus.lang || 'zh-CN');
        target.appendChild(script);
    }

    getTheme() {
        return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light';
    }
}

window.InteractionSection = InteractionSection;
