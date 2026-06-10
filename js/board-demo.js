class BlockBlastBoardDemo {
    constructor(container, config) {
        this.container = typeof container === 'string' ? document.querySelector(container) : container;
        this.config = config || {};
        this.activeStep = 0;
    }

    mount() {
        if (!this.container) return;

        this.steps = this.config.steps || [];
        this.container.className = `bb-demo ${this.config.compact ? 'bb-demo-compact' : ''}`.trim();
        this.render();
    }

    render() {
        const step = this.steps[this.activeStep] || {};
        this.container.innerHTML = '';

        const visual = document.createElement('div');
        visual.className = 'bb-demo-visual';

        const board = this.createBoard(step);
        const pieces = this.createPieces(step);
        visual.append(board, pieces);

        const panel = this.createPanel(step);
        this.container.append(visual, panel);
    }

    createBoard(step) {
        const board = document.createElement('div');
        board.className = 'bb-board';
        board.setAttribute('aria-label', step.title || 'Block Blast 棋盘演示');

        const base = step.board || this.config.board || [];
        const cells = new Set(step.cells || []);
        const previewCells = new Set(step.previewCells || []);
        const clearCells = new Set(step.clearCells || []);
        const dangerCells = new Set(step.dangerCells || []);

        for (let row = 0; row < 8; row += 1) {
            const line = base[row] || '........';
            for (let col = 0; col < 8; col += 1) {
                const key = `${row}-${col}`;
                const cell = document.createElement('span');
                const value = line[col];
                cell.className = 'bb-cell';

                if (value && value !== '.') cell.classList.add(`bb-cell-${value}`);
                if (cells.has(key)) cell.classList.add('bb-cell-focus');
                if (previewCells.has(key)) cell.classList.add('bb-cell-preview');
                if (clearCells.has(key)) cell.classList.add('bb-cell-clear');
                if (dangerCells.has(key)) cell.classList.add('bb-cell-danger');

                board.appendChild(cell);
            }
        }

        return board;
    }

    createPieces(step) {
        const tray = document.createElement('div');
        tray.className = 'bb-piece-tray';

        const pieces = step.pieces || this.config.pieces || [];
        pieces.forEach(piece => {
            const item = document.createElement('div');
            item.className = `bb-piece ${piece.recommended ? 'bb-piece-recommended' : ''}`.trim();
            item.setAttribute('aria-label', piece.name || '候选方块');

            const shape = document.createElement('div');
            shape.className = 'bb-piece-shape';
            const grid = piece.shape || ['1'];
            shape.style.setProperty('--piece-cols', String(Math.max(...grid.map(row => row.length))));

            grid.forEach(row => {
                row.split('').forEach(mark => {
                    const dot = document.createElement('span');
                    dot.className = mark === '1' ? `bb-piece-cell bb-piece-${piece.color || 'a'}` : 'bb-piece-cell bb-piece-empty';
                    shape.appendChild(dot);
                });
            });

            const label = document.createElement('span');
            label.className = 'bb-piece-label';
            label.textContent = piece.recommended ? '推荐' : (piece.name || '');

            item.append(shape, label);
            tray.appendChild(item);
        });

        return tray;
    }

    createPanel(step) {
        const panel = document.createElement('div');
        panel.className = 'bb-demo-panel';

        const eyebrow = document.createElement('div');
        eyebrow.className = 'bb-demo-eyebrow';
        eyebrow.textContent = `${this.activeStep + 1} / ${Math.max(this.steps.length, 1)}`;

        const title = document.createElement('h3');
        title.className = 'bb-demo-title';
        title.textContent = step.title || this.config.title || '局面演示';

        const text = document.createElement('p');
        text.className = 'bb-demo-text';
        text.textContent = step.description || this.config.description || '';

        const metrics = document.createElement('div');
        metrics.className = 'bb-demo-metrics';
        (step.metrics || this.config.metrics || []).forEach(metric => {
            const item = document.createElement('span');
            item.textContent = metric;
            metrics.appendChild(item);
        });

        const controls = document.createElement('div');
        controls.className = 'bb-demo-controls';

        this.steps.forEach((item, index) => {
            const button = document.createElement('button');
            button.type = 'button';
            button.className = index === this.activeStep ? 'bb-step-dot active' : 'bb-step-dot';
            button.textContent = String(index + 1);
            button.setAttribute('aria-label', item.title || `第 ${index + 1} 步`);
            button.addEventListener('click', () => {
                this.activeStep = index;
                this.render();
            });
            controls.appendChild(button);
        });

        panel.append(eyebrow, title, text);
        if (metrics.children.length) panel.appendChild(metrics);
        if (this.steps.length > 1) panel.appendChild(controls);

        return panel;
    }
}

const BlockBlastDemoPresets = {
    homepage: {
        steps: [
            {
                title: '先看三块，不急着下手',
                description: '当前有 3x3、长条和小 L。先把最难放的 3x3 安排到右上角，避免后面被碎格卡住。',
                metrics: ['空间 61%', '风险 低'],
                board: [
                    'aa..bbbb',
                    'a...b..b',
                    '..cc...b',
                    '..c.....',
                    'dd..ee..',
                    'd...e...',
                    '....fff.',
                    'gg..f...'
                ],
                previewCells: ['0-5','0-6','0-7','1-5','1-6','1-7','2-5','2-6','2-7'],
                pieces: [
                    { name: '3x3', shape: ['111','111','111'], color: 'b', recommended: true },
                    { name: '竖条', shape: ['1','1','1','1'], color: 'c' },
                    { name: '小 L', shape: ['10','11'], color: 'd' }
                ]
            },
            {
                title: '用长条补出纵向消除',
                description: '3x3 放好后，竖条落在第 8 列，直接补齐一列并释放空间。',
                metrics: ['清除 1 列', '连击准备'],
                board: [
                    'aa..bbbb',
                    'a...bbbb',
                    '..cc.bbb',
                    '..c....b',
                    'dd..ee.b',
                    'd...e..b',
                    '....fff.',
                    'gg..f...'
                ],
                previewCells: ['3-7','4-7','5-7','6-7'],
                clearCells: ['0-7','1-7','2-7','3-7','4-7','5-7','6-7','7-7'],
                pieces: [
                    { name: '竖条', shape: ['1','1','1','1'], color: 'c', recommended: true },
                    { name: '小 L', shape: ['10','11'], color: 'd' }
                ]
            },
            {
                title: '小块只用来收尾',
                description: '最后用小 L 补角，不破坏中心空地。好局面的关键是让下一组三块仍然有落点。',
                metrics: ['空间 70%', '下一轮稳定'],
                board: [
                    'aa..bbb.',
                    'a...bbb.',
                    '..cc.bb.',
                    '..c.....',
                    'dd..ee..',
                    'd...e...',
                    '....fff.',
                    'gg..f...'
                ],
                previewCells: ['6-0','7-0','7-1'],
                pieces: [
                    { name: '小 L', shape: ['10','11'], color: 'd', recommended: true }
                ]
            }
        ]
    },
    cleanup: {
        compact: true,
        steps: [
            {
                title: '错误信号：棋盘变成锯齿',
                description: '空格散在中间时，大块很快会无处可放。先找一条最接近完成的线。',
                board: ['aa..b...', 'a...bb..', '..cc.b..', 'd.c..e..', 'dd..ee..', '...ff...', 'g..f....', 'gg......'],
                dangerCells: ['0-2','0-3','1-1','2-0','3-1'],
                metrics: ['目标：压平边缘']
            },
            {
                title: '推荐：先补边，再清线',
                description: '把不规则边角补齐，让下一步可以直接消除整列，局面会重新变干净。',
                board: ['aa..b...', 'a...bb..', '..cc.b..', 'd.c..e..', 'dd..ee..', '...ff...', 'g..f....', 'gg......'],
                previewCells: ['0-2','1-2','2-2'],
                clearCells: ['0-2','1-2','2-2','3-2','4-2','5-2','6-2','7-2'],
                pieces: [{ name: '竖条', shape: ['1','1','1'], color: 'c', recommended: true }]
            }
        ]
    },
    reserve: {
        compact: true,
        steps: [
            {
                title: '保留两条安全线',
                description: '不要看到能消就立刻消。让两行只差 1-2 格，后面拥挤时可以快速回血。',
                board: ['aaa.bb..', 'cc..bb..', 'cc.dd...', '...dd...', 'eeeee..f', 'ggggg..f', '.......f', '........'],
                cells: ['4-5','4-6','5-5','5-6'],
                metrics: ['备用线 2 条']
            },
            {
                title: '拥挤时一次释放空间',
                description: '当大块要来了，用小块补齐缺口，同时清掉两行，给下一组三块腾地方。',
                board: ['aaa.bb..', 'cc..bb..', 'cc.dd...', '...dd...', 'eeeee..f', 'ggggg..f', '.......f', '........'],
                previewCells: ['4-5','4-6','5-5','5-6'],
                clearCells: ['4-0','4-1','4-2','4-3','4-4','4-5','4-6','4-7','5-0','5-1','5-2','5-3','5-4','5-5','5-6','5-7'],
                pieces: [{ name: '2x2', shape: ['11','11'], color: 'e', recommended: true }]
            }
        ]
    },
    combo: {
        compact: true,
        steps: [
            {
                title: '找交叉点',
                description: '高分来自行列同时完成。先确认哪一个格子能同时补齐一行和一列。',
                board: ['aaa.ffff', 'bbb.ff..', 'ccc.ff..', 'ddd....e', '.......e', 'gggggg.e', '.......e', 'hhhhhhh.'],
                cells: ['7-7'],
                metrics: ['潜在双清']
            },
            {
                title: '落在交叉点触发双清',
                description: '小块放在右下角，横向和纵向一起消除，比单纯清一行更值。',
                board: ['aaa.ffff', 'bbb.ff..', 'ccc.ff..', 'ddd....e', '.......e', 'gggggg.e', '.......e', 'hhhhhhh.'],
                previewCells: ['7-7'],
                clearCells: ['7-0','7-1','7-2','7-3','7-4','7-5','7-6','7-7','0-7','1-7','2-7','3-7','4-7','5-7','6-7'],
                pieces: [{ name: '单格', shape: ['1'], color: 'f', recommended: true }]
            }
        ]
    }
};

window.BlockBlastBoardDemo = BlockBlastBoardDemo;
window.BlockBlastDemoPresets = BlockBlastDemoPresets;
