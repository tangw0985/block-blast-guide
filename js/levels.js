// ==========================================
// 关卡筛选功能
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const filterButtons = document.querySelectorAll('.filter-btn');
    const levelCards = document.querySelectorAll('.level-card');

    // 筛选按钮点击事件
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // 移除所有按钮的 active 类
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // 添加当前按钮的 active 类
            button.classList.add('active');

            const filter = button.getAttribute('data-filter');

            // 筛选关卡
            levelCards.forEach(card => {
                const difficulty = card.getAttribute('data-difficulty');

                if (filter === 'all' || difficulty === filter) {
                    card.style.display = 'block';
                    // 添加淡入动画
                    setTimeout(() => {
                        card.style.opacity = '1';
                        card.style.transform = 'translateY(0)';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(20px)';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });

    // 关卡卡片展开/收起功能
    const levelHeaders = document.querySelectorAll('.level-header');

    levelHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const levelCard = header.closest('.level-card');
            levelCard.classList.toggle('expanded');
        });
    });

    // 默认展开第一个关卡
    if (levelCards.length > 0) {
        levelCards[0].classList.add('expanded');
    }
});
