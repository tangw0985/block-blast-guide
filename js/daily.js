// ==========================================
// 每日挑战数据结构
// ==========================================
const dailyChallenges = {
    '2026-05-13': {
        date: '2026年5月13日',
        difficulty: 'hard',
        objective: '在限定的方块组合下，达到 5000 分以上并保持棋盘至少 50% 的空间',
        steps: [
            {
                title: '开局布局',
                description: '首先将第一组方块放置在棋盘的左下角区域。优先使用 L 型方块占据边角，为后续方块预留中心空间。'
            },
            {
                title: '建立消除线',
                description: '在第 3-4 行建立接近完成的横向消除线。同时在第 2、5 列准备纵向消除。这样可以在关键时刻快速清理空间。'
            },
            {
                title: '中期策略',
                description: '当棋盘填充到 40-50% 时，开始执行连击消除。优先放置能同时完成多行/列的方块，获得高分加成。'
            },
            {
                title: '保持空间',
                description: '达到 5000 分后，重点转向保持棋盘空间。避免填充中心区域，将新方块尽量放在已有方块的周围，形成紧凑布局。'
            },
            {
                title: '完成挑战',
                description: '最后阶段，每次放置前都要计算剩余空间。确保至少保留 32 个空格（50%），同时维持分数在 5000 以上即可完成挑战。'
            }
        ],
        tips: [
            '不要急于消除，保持 2-3 条接近完成的行/列作为"安全阀"',
            '优先使用大方块，小方块留到最后填补缝隙',
            '注意方块形状，L 型和 T 型最适合边角布局',
            '达到目标分数后，转为防守策略，避免冒险'
        ]
    },
    '2026-05-12': {
        date: '2026年5月12日',
        difficulty: 'medium',
        objective: '达到 3000 分并消除 10 次以上',
        steps: [
            {
                title: '快速开局',
                description: '前期不要过于追求完美布局，快速放置方块，建立基础分数。'
            },
            {
                title: '频繁消除',
                description: '每当有机会消除时就立即执行，不要等待更好的时机。目标是消除次数，不是单次高分。'
            },
            {
                title: '保持节奏',
                description: '维持稳定的消除频率，避免棋盘过于拥挤导致无法继续。'
            }
        ],
        tips: [
            '优先消除，不要囤积',
            '保持棋盘流动性',
            '注意消除次数计数器'
        ]
    },
    '2026-05-11': {
        date: '2026年5月11日',
        difficulty: 'easy',
        objective: '在 20 步内达到 2000 分',
        steps: [
            {
                title: '高效放置',
                description: '每一步都要尽量选择能获得最多分数的位置。'
            },
            {
                title: '追求连击',
                description: '尽量一次性消除多行或多列，获得连击加成。'
            },
            {
                title: '控制步数',
                description: '注意步数限制，不要浪费在低分操作上。'
            }
        ],
        tips: [
            '每步都要最大化分数',
            '优先多重消除',
            '控制好步数节奏'
        ]
    }
};

// ==========================================
// 显示今日挑战
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    // 获取今天的日期（格式：YYYY-MM-DD）
    const today = new Date();
    const dateString = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;

    // 更新页面上的日期显示
    const dateElement = document.getElementById('todayDate');
    if (dateElement) {
        const todayChallenge = dailyChallenges[dateString];
        if (todayChallenge) {
            dateElement.textContent = todayChallenge.date;
        } else {
            // 如果没有今天的数据，显示默认日期
            dateElement.textContent = `${today.getFullYear()}年${today.getMonth() + 1}月${today.getDate()}日`;
        }
    }

    // 可以在这里添加更多动态加载挑战数据的逻辑
    // 例如：根据日期从服务器获取挑战数据
});

// ==========================================
// 历史挑战点击事件（占位）
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
    const historyLinks = document.querySelectorAll('.history-link');

    historyLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('历史挑战详情功能即将上线！');
        });
    });
});
