const dailyChallenges = {
    '2026-06-10': {
        date: '2026年6月10日',
        difficulty: 'hard',
        difficultyText: '困难',
        objective: '今日训练目标：完成一次双线消除，并在 8 步后保持至少 35 个空格。',
        boardPreset: {
            compact: true,
            steps: [
                {
                    title: '先保留右下角交叉点',
                    description: '不要急着补最外侧空格。右下角同时影响最后一行和最后一列，是这局的关键得分点。',
                    metrics: ['关键格：右下角', '目标：双线消除'],
                    board: ['aa..ffff', 'bbb.ff..', 'ccc.ff..', 'ddd....e', '.......e', 'gggggg.e', '.......e', 'hhhhhhh.'],
                    cells: ['7-7'],
                    pieces: [
                        { name: '单格', shape: ['1'], color: 'f', recommended: true },
                        { name: '竖条', shape: ['1','1','1'], color: 'c' },
                        { name: '小 L', shape: ['10','11'], color: 'd' }
                    ]
                },
                {
                    title: '单格触发横竖双清',
                    description: '单格落在右下角，完成最后一行和最后一列。这个动作比先清任意一行更赚空间。',
                    metrics: ['清除 2 条线', '空间回收 +15'],
                    board: ['aa..ffff', 'bbb.ff..', 'ccc.ff..', 'ddd....e', '.......e', 'gggggg.e', '.......e', 'hhhhhhh.'],
                    previewCells: ['7-7'],
                    clearCells: ['7-0','7-1','7-2','7-3','7-4','7-5','7-6','7-7','0-7','1-7','2-7','3-7','4-7','5-7','6-7'],
                    pieces: [
                        { name: '单格', shape: ['1'], color: 'f', recommended: true },
                        { name: '竖条', shape: ['1','1','1'], color: 'c' },
                        { name: '小 L', shape: ['10','11'], color: 'd' }
                    ]
                },
                {
                    title: '大空间留给下一组三块',
                    description: '双清之后不要把中心填满。优先贴边放小 L，保留中间 3x3 和长条落点。',
                    metrics: ['中心空地保留', '下一轮风险低'],
                    board: ['aa..fff.', 'bbb.ff..', 'ccc.ff..', 'ddd.....', '........', 'gggggg..', '........', '........'],
                    previewCells: ['5-6','6-6','6-7'],
                    pieces: [
                        { name: '小 L', shape: ['10','11'], color: 'd', recommended: true },
                        { name: '竖条', shape: ['1','1','1'], color: 'c' }
                    ]
                }
            ]
        },
        steps: [
            {
                title: '锁定交叉点',
                description: '先找到能同时完成一行和一列的位置。本局右下角是最关键的交叉点。'
            },
            {
                title: '用最小块触发双清',
                description: '把单格放在交叉点，立刻清掉最后一行和最后一列，比分散补格更稳定。'
            },
            {
                title: '清线后贴边收尾',
                description: '后续小 L 贴边放，不要抢占中心区域，给下一组三块保留 3x3 和长条空间。'
            }
        ],
        tips: [
            '单格和 2 格小块不要随手用，它们经常是触发双清的钥匙。',
            '清线之后先看中心是否还留有大块落点，再决定下一步。',
            '如果右下角被提前填掉，本局会变成只能单线消除，得分和空间都更差。'
        ]
    },
    '2026-05-13': {
        date: '2026年5月13日',
        difficulty: 'hard',
        difficultyText: '困难',
        objective: '在限定的方块组合下，达到 5000 分以上并保持棋盘至少 50% 的空间',
        boardPreset: BlockBlastDemoPresets.reserve,
        steps: [
            { title: '开局布局', description: '将第一组方块放置在左下角区域，优先使用 L 型方块占据边角。' },
            { title: '建立消除线', description: '在第 3-4 行建立接近完成的横向消除线，同时准备纵向消除。' },
            { title: '保持空间', description: '达到目标分数后，重点转向保持棋盘空间，避免填充中心区域。' }
        ],
        tips: [
            '保持 2-3 条接近完成的行/列作为安全阀。',
            '优先使用大方块，小方块留到最后填补缝隙。',
            '达到目标分数后转为防守策略。'
        ]
    },
    '2026-05-12': {
        date: '2026年5月12日',
        difficulty: 'medium',
        difficultyText: '中等',
        objective: '达到 3000 分并消除 10 次以上',
        boardPreset: BlockBlastDemoPresets.cleanup,
        steps: [
            { title: '快速开局', description: '前期不要过于追求完美布局，快速建立基础分数。' },
            { title: '频繁消除', description: '目标是消除次数，看到稳定消除机会就执行。' },
            { title: '保持节奏', description: '维持稳定的消除频率，避免棋盘过于拥挤。' }
        ],
        tips: ['优先消除，不要囤积。', '保持棋盘流动性。', '注意消除次数。']
    }
};

function getRequestedChallengeKey() {
    const params = new URLSearchParams(window.location.search);
    const requestedDate = params.get('date');
    if (requestedDate && dailyChallenges[requestedDate]) return requestedDate;

    const today = new Date();
    const todayKey = `${today.getFullYear()}-${String(today.getMonth() + 1).padStart(2, '0')}-${String(today.getDate()).padStart(2, '0')}`;
    if (dailyChallenges[todayKey]) return todayKey;

    return Object.keys(dailyChallenges).sort().reverse()[0];
}

function renderDailyChallenge(challenge) {
    const dateElement = document.getElementById('todayDate');
    const difficultyBadge = document.querySelector('.challenge-difficulty .difficulty-badge');
    const objective = document.querySelector('.challenge-objective p');
    const stepsContainer = document.querySelector('.solution-steps');
    const tipsList = document.querySelector('.challenge-tips ul');

    if (dateElement) dateElement.textContent = challenge.date;
    if (objective) objective.textContent = challenge.objective;

    if (difficultyBadge) {
        difficultyBadge.className = `difficulty-badge difficulty-${challenge.difficulty}`;
        difficultyBadge.textContent = challenge.difficultyText;
    }

    if (stepsContainer) {
        stepsContainer.innerHTML = '';
        challenge.steps.forEach((step, index) => {
            const item = document.createElement('div');
            item.className = 'step-item';
            item.innerHTML = `
                <div class="step-number">${index + 1}</div>
                <div class="step-content">
                    <h4>${step.title}</h4>
                    <p>${step.description}</p>
                </div>
            `;
            stepsContainer.appendChild(item);
        });
    }

    if (tipsList) {
        tipsList.innerHTML = '';
        challenge.tips.forEach(tip => {
            const item = document.createElement('li');
            item.textContent = tip;
            tipsList.appendChild(item);
        });
    }

    new BlockBlastBoardDemo('#dailyBoardDemo', challenge.boardPreset).mount();
}

function renderHistoryList(activeKey) {
    const historyList = document.querySelector('.history-list');
    if (!historyList) return;

    historyList.innerHTML = '';
    Object.entries(dailyChallenges)
        .sort(([a], [b]) => b.localeCompare(a))
        .filter(([key]) => key !== activeKey)
        .forEach(([key, challenge]) => {
            const item = document.createElement('div');
            item.className = 'history-item';
            item.innerHTML = `
                <div class="history-date">
                    <span class="date">${key}</span>
                    <span class="difficulty-badge difficulty-${challenge.difficulty}">${challenge.difficultyText}</span>
                </div>
                <h4 class="history-title">${challenge.objective}</h4>
                <a href="daily.html?date=${key}" class="history-link">查看解法</a>
            `;
            historyList.appendChild(item);
        });
}

document.addEventListener('DOMContentLoaded', () => {
    const activeKey = getRequestedChallengeKey();
    const challenge = dailyChallenges[activeKey];
    renderDailyChallenge(challenge);
    renderHistoryList(activeKey);
});
