#!/usr/bin/env python3
"""Generate Block Blast guide illustrations and strategy demo GIFs."""

from __future__ import annotations

import os
from pathlib import Path
from typing import Iterable, Sequence

from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parent.parent
IMAGES = ROOT / "images"

GRID = 8
CELL = 52
PAD = 56
GAP = 5
RADIUS = 9

COLORS = {
    0: (241, 245, 249),   # empty
    1: (99, 102, 241),    # primary
    2: (139, 92, 246),    # secondary
    3: (236, 72, 153),    # accent
    4: (16, 185, 129),    # success
}
BG = (255, 255, 255)
GRID_LINE = (226, 232, 240)
TEXT = (15, 23, 42)
SUBTEXT = (100, 116, 139)
HIGHLIGHT = (245, 158, 11, 90)
HIGHLIGHT_ROW = (59, 130, 246, 70)
CORNER_MARK = (239, 68, 68, 120)


def _font(size: int, bold: bool = False) -> ImageFont.FreeTypeFont | ImageFont.ImageFont:
    candidates = [
        "C:/Windows/Fonts/msyhbd.ttc" if bold else "C:/Windows/Fonts/msyh.ttc",
        "C:/Windows/Fonts/segoeui.ttf",
        "/System/Library/Fonts/PingFang.ttc",
        "/usr/share/fonts/truetype/dejavu/DejaVuSans.ttf",
    ]
    for path in candidates:
        if os.path.exists(path):
            try:
                return ImageFont.truetype(path, size)
            except OSError:
                continue
    return ImageFont.load_default()


FONT_TITLE = _font(30, True)
FONT_LABEL = _font(21, True)
FONT_CAPTION = _font(18)
FONT_SMALL = _font(15)


Board = Sequence[Sequence[int]]


def empty_board() -> list[list[int]]:
    return [[0] * GRID for _ in range(GRID)]


def fill_rect(board: list[list[int]], r0: int, c0: int, r1: int, c1: int, color: int) -> None:
    for r in range(r0, r1 + 1):
        for c in range(c0, c1 + 1):
            board[r][c] = color


def fill_cells(board: list[list[int]], cells: Iterable[tuple[int, int]], color: int) -> None:
    for r, c in cells:
        board[r][c] = color


def board_size(cols: int = 1) -> tuple[int, int]:
    board_w = GRID * CELL + (GRID - 1) * GAP
    w = PAD * 2 + cols * board_w + (cols - 1) * 48
    h = 116 + GRID * CELL + (GRID - 1) * GAP + 112
    return w, h


def draw_rounded_cell(draw: ImageDraw.ImageDraw, x: int, y: int, color: tuple[int, int, int]) -> None:
    draw.rounded_rectangle([x, y, x + CELL, y + CELL], radius=RADIUS, fill=color, outline=GRID_LINE, width=1)


def draw_board(
    draw: ImageDraw.ImageDraw,
    board: Board,
    ox: int,
    oy: int,
    *,
    highlight_rows: Sequence[int] | None = None,
    highlight_cols: Sequence[int] | None = None,
    highlight_corners: bool = False,
    highlight_cells: Sequence[tuple[int, int]] | None = None,
    label: str = "",
) -> None:
    highlight_rows = highlight_rows or []
    highlight_cols = highlight_cols or []
    highlight_cells = highlight_cells or []

    if label:
        draw.text((ox, oy - 28), label, fill=SUBTEXT, font=FONT_LABEL)

    for r in highlight_rows:
        y = oy + r * (CELL + GAP)
        draw.rectangle([ox - 4, y - 2, ox + GRID * (CELL + GAP) - GAP + 4, y + CELL + 2], outline=(59, 130, 246), width=3)

    for c in highlight_cols:
        x = ox + c * (CELL + GAP)
        draw.rectangle([x - 2, oy - 4, x + CELL + 2, oy + GRID * (CELL + GAP) - GAP + 4], outline=(59, 130, 246), width=3)

    if highlight_corners:
        corners = [(0, 0), (0, GRID - 1), (GRID - 1, 0), (GRID - 1, GRID - 1)]
        for r, c in corners:
            x = ox + c * (CELL + GAP)
            y = oy + r * (CELL + GAP)
            draw.rounded_rectangle([x - 3, y - 3, x + CELL + 3, y + CELL + 3], outline=(239, 68, 68), width=3)

    for r in range(GRID):
        for c in range(GRID):
            x = ox + c * (CELL + GAP)
            y = oy + r * (CELL + GAP)
            if (r, c) in highlight_cells:
                draw.rounded_rectangle([x - 3, y - 3, x + CELL + 3, y + CELL + 3], outline=(245, 158, 11), width=3)
            draw_rounded_cell(draw, x, y, COLORS[board[r][c]])


def render_scene(
    title: str,
    boards: list[dict],
    caption: str = "",
    width: int | None = None,
) -> Image.Image:
    cols = len(boards)
    w, h = board_size(cols)
    if width:
        w = max(w, width)
    img = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(img)

    draw.text((PAD, 28), title, fill=TEXT, font=FONT_TITLE)

    board_w = GRID * CELL + (GRID - 1) * GAP
    total_boards_w = cols * board_w + (cols - 1) * 48
    start_x = max(PAD, (w - total_boards_w) // 2)
    oy = 116

    for i, spec in enumerate(boards):
        ox = start_x + i * (board_w + 48)
        draw_board(draw, spec["board"], ox, oy, **{k: v for k, v in spec.items() if k != "board"})

    if caption:
        panel_top = h - 72
        draw.rounded_rectangle([PAD, panel_top, w - PAD, h - 24], radius=12, fill=(248, 250, 252), outline=GRID_LINE)
        bbox = draw.textbbox((0, 0), caption, font=FONT_CAPTION)
        tw = bbox[2] - bbox[0]
        draw.text((max(PAD + 18, (w - tw) // 2), panel_top + 13), caption, fill=SUBTEXT, font=FONT_CAPTION)

    return img


def draw_piece_palette(draw: ImageDraw.ImageDraw, pieces: list[list[tuple[int, int]]], ox: int, oy: int, labels: list[str]) -> None:
    draw.text((ox, oy - 24), "候选方块", fill=SUBTEXT, font=FONT_LABEL)
    px = ox
    for idx, (cells, label) in enumerate(zip(pieces, labels)):
        min_r = min(r for r, _ in cells)
        min_c = min(c for _, c in cells)
        size = 22
        for r, c in cells:
            x = px + (c - min_c) * (size + 2)
            y = oy + 8 + (r - min_r) * (size + 2)
            draw.rounded_rectangle([x, y, x + size, y + size], radius=4, fill=COLORS[(idx % 4) + 1])
        draw.text((px, oy + 72), label, fill=TEXT if idx != 0 else (239, 68, 68), font=FONT_SMALL)
        px += 90


# ── Tip board definitions ──────────────────────────────────────────────

def tip01_board_cleanup() -> Image.Image:
    bad = empty_board()
    fill_rect(bad, 0, 0, 2, 3, 1)
    fill_rect(bad, 3, 0, 5, 2, 2)
    fill_rect(bad, 6, 0, 7, 7, 3)
    fill_rect(bad, 0, 4, 1, 7, 4)

    good = empty_board()
    fill_rect(good, 6, 0, 7, 1, 1)
    fill_rect(good, 6, 6, 7, 7, 2)
    fill_rect(good, 0, 6, 1, 7, 3)
    fill_rect(good, 0, 0, 1, 1, 4)
    fill_rect(good, 3, 3, 4, 4, 1)
    fill_rect(good, 2, 5, 5, 6, 2)

    return render_scene(
        "棋盘清理：保持平整，优先填角",
        [
            {"board": bad, "label": "❌ 不规则布局"},
            {"board": good, "label": "✓ 平整 + 填角", "highlight_corners": True},
        ],
        caption="避免「高山低谷」，边角优先填充，每行/列空格不超过 3 个",
        width=720,
    )


def tip02_reserve_space() -> Image.Image:
    b = empty_board()
    for c in range(6):
        b[2][c] = 1
    for c in range(1, 7):
        b[5][c] = 2
    for r in range(3, 7):
        b[r][1] = 3
    for r in range(1, 5):
        b[r][6] = 4
    return render_scene(
        "预留消除空间：同时准备多条接近完成的线",
        [{"board": b, "highlight_rows": [2, 5], "highlight_cols": [1, 6]}],
        caption="蓝色行、紫色行、绿/粉列均只差 1-2 格，拥挤时可快速消除腾空间",
    )


def tip03_big_block_first() -> Image.Image:
    b = empty_board()
    fill_rect(b, 2, 2, 5, 5, 0)
    fill_rect(b, 0, 0, 1, 7, 1)
    fill_rect(b, 6, 0, 7, 7, 2)

    img = render_scene(
        "大方块优先：先放占用格子最多的",
        [{"board": b, "highlight_cells": [(3, 3), (3, 4), (4, 3), (4, 4)]}],
        caption="先安排位置要求严格的大方块，小块留到最后填缝",
        width=980,
    )
    draw = ImageDraw.Draw(img)
    draw_piece_palette(
        draw,
        [[(0, 0), (0, 1), (1, 0), (1, 1)], [(0, 0), (0, 1)], [(0, 0)]],
        650,
        170,
        ["2×2 大方块 ★", "1×2 小方块", "1×1 最小"],
    )
    return img


def tip04_combo_clear() -> Image.Image:
    before = empty_board()
    for c in range(7):
        before[3][c] = 1
    for r in range(7):
        before[r][4] = 2
    before[3][7] = 0
    before[7][4] = 0

    after = [row[:] for row in before]
    after[3][7] = 3
    after[7][4] = 3

    cleared = empty_board()
    fill_rect(cleared, 0, 0, 2, 3, 1)
    fill_rect(cleared, 5, 4, 7, 7, 2)

    return render_scene(
        "连击消除：交叉点放置，同时消行消列",
        [
            {"board": before, "label": "放置前", "highlight_rows": [3], "highlight_cols": [4]},
            {"board": after, "label": "交叉点放块", "highlight_cells": [(3, 7), (7, 4)]},
            {"board": cleared, "label": "消除后", "highlight_rows": [], "highlight_cols": []},
        ],
        caption="在行列交叉点放置方块，一次消除 2 行/列，获得连击加分",
        width=900,
    )


def tip05_shapes() -> Image.Image:
    img_w, img_h = 1200, 900
    img = Image.new("RGB", (img_w, img_h), BG)
    draw = ImageDraw.Draw(img)
    draw.text((PAD, 28), "方块形状识别：I / L / T / O 型特点", fill=TEXT, font=FONT_TITLE)

    shapes = [
        ("I 型 · 填行/列", [(0, 0), (0, 1), (0, 2), (0, 3)], 1),
        ("L 型 · 填边角", [(0, 0), (1, 0), (2, 0), (2, 1)], 2),
        ("T 型 · 横纵兼顾", [(0, 0), (0, 1), (0, 2), (1, 1)], 3),
        ("O 型 · 稳定填中", [(0, 0), (0, 1), (1, 0), (1, 1)], 4),
    ]
    sx = 70
    for title, cells, color in shapes:
        draw.text((sx, 92), title, fill=SUBTEXT, font=FONT_LABEL)
        min_r = min(r for r, _ in cells)
        min_c = min(c for _, c in cells)
        for r, c in cells:
            x = sx + (c - min_c) * 36
            y = 136 + (r - min_r) * 42
            draw.rounded_rectangle([x, y, x + 36, y + 36], radius=7, fill=COLORS[color])
        sx += 280

    board = empty_board()
    fill_rect(board, 0, 0, 1, 1, 2)
    fill_rect(board, 6, 0, 7, 1, 2)
    fill_rect(board, 3, 3, 4, 4, 4)
    fill_rect(board, 2, 6, 3, 7, 1)
    draw_board(draw, board, 374, 324, label="综合布局示例", highlight_corners=True)
    draw.rounded_rectangle([PAD, 816, img_w - PAD, 870], radius=12, fill=(248, 250, 252), outline=GRID_LINE)
    draw.text((PAD + 20, 831), "提前规划：I 型填线、L 型填角、T 型灵活、O 型填中心", fill=SUBTEXT, font=FONT_CAPTION)
    return img


def tip06_corner_fill() -> Image.Image:
    b = empty_board()
    fill_rect(b, 0, 0, 1, 1, 1)
    fill_rect(b, 0, 6, 1, 7, 2)
    fill_rect(b, 6, 0, 1, 1, 3)
    fill_rect(b, 6, 6, 7, 7, 4)
    fill_rect(b, 0, 2, 0, 5, 2)
    fill_rect(b, 2, 0, 5, 0, 3)
    fill_rect(b, 7, 2, 7, 5, 4)
    fill_rect(b, 2, 7, 5, 7, 1)
    return render_scene(
        "边角优先填充：四角 → 边缘 → 中心",
        [{"board": b, "highlight_corners": True}],
        caption="L 型方块最适合填角；中心区域留到最后处理",
    )


def tip07_symmetric() -> Image.Image:
    b = empty_board()
    pattern = [
        (0, 0, 1), (0, 7, 1), (7, 0, 1), (7, 7, 1),
        (1, 2, 2), (1, 5, 2), (6, 2, 2), (6, 5, 2),
        (2, 3, 3), (2, 4, 3), (5, 3, 3), (5, 4, 3),
        (3, 2, 4), (3, 5, 4), (4, 2, 4), (4, 5, 4),
    ]
    for r, c, col in pattern:
        b[r][c] = col
    return render_scene(
        "对称布局：左右/上下对称，便于预测",
        [{"board": b}],
        caption="对称布局确保任何形状方块都有对应放置位置",
    )


def tip08_emergency() -> Image.Image:
    crowded = empty_board()
    for r in range(GRID):
        for c in range(GRID):
            if (r + c) % 3 != 0:
                crowded[r][c] = ((r + c) % 4) + 1
    for c in range(6):
        crowded[4][c] = 1
    crowded[4][6] = 0
    crowded[4][7] = 0

    rescue = [row[:] for row in crowded]
    rescue[4][6] = 4
    rescue[4][7] = 4

    cleared = [row[:] for row in rescue]
    for c in range(GRID):
        cleared[4][c] = 0

    return render_scene(
        "紧急救场：找接近完成的行/列，用小方块快速消除",
        [
            {"board": crowded, "label": "拥挤棋盘", "highlight_rows": [4]},
            {"board": rescue, "label": "小方块填完", "highlight_rows": [4]},
            {"board": cleared, "label": "获得空间"},
        ],
        width=900,
    )


def tip09_score_multiplier() -> Image.Image:
    b = empty_board()
    for c in range(7):
        b[2][c] = 1
        b[5][c] = 2
    for r in range(7):
        b[r][3] = 3
    b[2][7] = 0
    b[5][7] = 0
    b[7][3] = 0

    img = render_scene(
        "分数倍增：连续消除 + 多重消除",
        [{"board": b, "highlight_rows": [2, 5], "highlight_cols": [3]}],
        caption="连续消除 2x→3x→4x 递增；同时消多行多列额外加成",
        width=920,
    )
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([650, 160, 858, 228], radius=12, fill=(254, 243, 199), outline=(245, 158, 11), width=2)
    draw.text((674, 174), "2x → 3x → 4x", fill=(180, 83, 9), font=FONT_LABEL)
    draw.text((665, 244), "+ 多重消除加成", fill=SUBTEXT, font=FONT_SMALL)
    return img


def tip10_rhythm() -> Image.Image:
    b = empty_board()
    filled = 0
    for r in range(GRID):
        for c in range(GRID):
            if (r * GRID + c) % 5 < 2:
                b[r][c] = ((r + c) % 4) + 1
                filled += 1

    img = render_scene(
        "节奏控制：保持 40-60% 填充率",
        [{"board": b}],
        caption=f"当前填充约 {filled * 100 // 64}% · 每 5-6 步消除一次，保持稳定节奏",
        width=920,
    )
    draw = ImageDraw.Draw(img)
    draw.rounded_rectangle([650, 160, 858, 228], radius=12, fill=(219, 234, 254), outline=(59, 130, 246), width=2)
    draw.text((678, 176), "40% ─── 60%", fill=(29, 78, 216), font=FONT_LABEL)
    return img


def tip11_special_blocks() -> Image.Image:
    img_w, img_h = 1200, 900
    img = Image.new("RGB", (img_w, img_h), BG)
    draw = ImageDraw.Draw(img)
    draw.text((PAD, 28), "特殊方块：Z 型 / 十字 / 长条", fill=TEXT, font=FONT_TITLE)

    specials = [
        ("Z 型 · 需凹槽", [(0, 0), (0, 1), (1, 1), (1, 2)], 1),
        ("十字型 · 放中心", [(0, 1), (1, 0), (1, 1), (1, 2), (2, 1)], 2),
        ("长条 5 格 · 填整行", [(0, i) for i in range(5)], 3),
    ]
    sx = 72
    for title, cells, color in specials:
        draw.text((sx, 92), title, fill=SUBTEXT, font=FONT_LABEL)
        min_r = min(r for r, _ in cells)
        min_c = min(c for _, c in cells)
        for r, c in cells:
            x = sx + (c - min_c) * 42
            y = 136 + (r - min_r) * 42
            draw.rounded_rectangle([x, y, x + 36, y + 36], radius=7, fill=COLORS[color])
        sx += 360

    board = empty_board()
    fill_rect(board, 1, 1, 2, 2, 0)
    fill_rect(board, 3, 3, 4, 4, 0)
    fill_rect(board, 0, 0, 1, 7, 1)
    fill_rect(board, 6, 0, 7, 7, 2)
    fill_rect(board, 2, 3, 5, 3, 3)
    draw_board(draw, board, 374, 324, label="预留特殊形状空间", highlight_cells=[(1, 1), (1, 2), (3, 3), (4, 3)])
    draw.rounded_rectangle([PAD, 816, img_w - PAD, 870], radius=12, fill=(248, 250, 252), outline=GRID_LINE)
    draw.text((PAD + 20, 831), "提前为 Z 型留凹槽，十字放中心，长条一次性填整行/列", fill=SUBTEXT, font=FONT_CAPTION)
    return img


def tip12_mindset() -> Image.Image:
    img_w, img_h = 960, 620
    img = Image.new("RGB", (img_w, img_h), BG)
    draw = ImageDraw.Draw(img)
    draw.text((PAD, 28), "心态与决策：放置前思考 3-5 秒", fill=TEXT, font=FONT_TITLE)

    steps = [
        "① 观察 3 个候选方块",
        "② 评估 2-3 种放置方案",
        "③ 选择最保守安全的",
        "④ 失误后冷静补救",
    ]
    y = 104
    for step in steps:
        draw.rounded_rectangle([PAD, y, img_w - PAD, y + 70], radius=12, fill=(248, 250, 252), outline=GRID_LINE)
        draw.text((PAD + 20, y + 21), step, fill=TEXT, font=FONT_CAPTION)
        y += 86

    draw.rounded_rectangle([PAD, 518, img_w - PAD, 584], radius=12, fill=(254, 243, 199), outline=(245, 158, 11))
    draw.text((PAD + 20, 539), "Block Blast 是策略游戏，不是速度游戏 · 保持耐心", fill=(146, 64, 14), font=FONT_CAPTION)
    return img


def daily_solution() -> Image.Image:
    b = empty_board()
    fill_rect(b, 6, 0, 7, 1, 1)
    fill_rect(b, 5, 0, 5, 2, 2)
    for c in range(5):
        b[3][c] = 3
    for r in range(2, 6):
        b[r][1] = 4
        b[r][5] = 4
    fill_rect(b, 0, 6, 1, 7, 2)
    fill_rect(b, 2, 3, 4, 4, 1)

    return render_scene(
        "每日挑战解法总览（目标 5000 分 · 保留 50% 空间）",
        [{"board": b, "highlight_rows": [3], "highlight_cols": [1, 5], "highlight_corners": True}],
        caption="左下角开局 → 第 3-4 行消除线 → 中期连击 → 达标后防守紧凑布局",
        width=900,
    )


# ── Animated GIF demos ─────────────────────────────────────────────────

def _frame_board(board: Board, title: str = "", caption: str = "", extras: dict | None = None) -> Image.Image:
    extras = extras or {}
    w, h = 960, 680
    img = Image.new("RGB", (w, h), BG)
    draw = ImageDraw.Draw(img)
    if title:
        draw.text((PAD, 28), title, fill=TEXT, font=FONT_TITLE)
    ox = (w - (GRID * CELL + (GRID - 1) * GAP)) // 2
    oy = 110
    draw_board(draw, board, ox, oy, **extras)
    if caption:
        bbox = draw.textbbox((0, 0), caption, font=FONT_CAPTION)
        tw = bbox[2] - bbox[0]
        draw.rounded_rectangle([PAD, h - 82, w - PAD, h - 26], radius=12, fill=(248, 250, 252), outline=GRID_LINE)
        draw.text((max(PAD + 18, (w - tw) // 2), h - 65), caption, fill=SUBTEXT, font=FONT_CAPTION)
    return img


def _save_gif(frames: list[Image.Image], path: Path, duration: int = 800) -> None:
    path.parent.mkdir(parents=True, exist_ok=True)
    frames[0].save(
        path,
        save_all=True,
        append_images=frames[1:],
        duration=duration,
        loop=0,
        optimize=True,
    )


def demo_combo_clear() -> None:
    frames = []
    b1 = empty_board()
    for c in range(7):
        b1[3][c] = 1
    for r in range(7):
        b1[r][4] = 2
    frames.append(_frame_board(b1, "连击消除演示", "步骤 1：预留接近完成的行和列", {"highlight_rows": [3], "highlight_cols": [4]}))

    b2 = [row[:] for row in b1]
    b2[3][7] = 3
    b2[7][4] = 3
    frames.append(_frame_board(b2, "连击消除演示", "步骤 2：在交叉点放置方块", {"highlight_cells": [(3, 7), (7, 4)]}))

    b3 = empty_board()
    fill_rect(b3, 0, 0, 2, 3, 1)
    fill_rect(b3, 5, 5, 7, 7, 2)
    frames.append(_frame_board(b3, "连击消除演示", "步骤 3：同时消除多行多列 · 分数 x2！"))

    b4 = [row[:] for row in b3]
    for c in range(6):
        b4[1][c] = 4
    frames.append(_frame_board(b4, "连击消除演示", "步骤 4：继续连击 · 分数 x3！"))
    _save_gif(frames, IMAGES / "demos" / "combo-clear.gif", 900)


def demo_corner_fill() -> None:
    frames = []
    b = empty_board()
    frames.append(_frame_board(b, "边角填充技巧", "步骤 1：空棋盘，优先填充四角", {"highlight_corners": True}))

    steps = [
        ([(0, 0), (0, 1), (1, 0), (1, 1)], 1, "步骤 2：填入左上角"),
        ([(0, 6), (0, 7), (1, 6), (1, 7)], 2, "步骤 3：填入右上角"),
        ([(6, 0), (7, 0), (7, 1)], 3, "步骤 4：L 型填左下角"),
        ([(6, 6), (6, 7), (7, 6), (7, 7)], 4, "步骤 5：四角完成，避免死角"),
    ]
    board = empty_board()
    for cells, color, caption in steps:
        fill_cells(board, cells, color)
        frames.append(_frame_board(board, "边角填充技巧", caption, {"highlight_corners": True}))
    _save_gif(frames, IMAGES / "demos" / "corner-fill.gif", 850)


def demo_big_block_first() -> None:
    frames = []
    b = empty_board()
    fill_rect(b, 0, 0, 1, 7, 1)
    fill_rect(b, 6, 0, 7, 7, 2)
    frames.append(_frame_board(b, "大方块优先放置", "步骤 1：观察 3 个候选方块"))

    img = Image.new("RGB", (960, 680), BG)
    draw = ImageDraw.Draw(img)
    draw.text((PAD, 28), "大方块优先放置", fill=TEXT, font=FONT_TITLE)
    ox = 70
    oy = 110
    draw_board(draw, b, ox, oy)
    draw_piece_palette(
        draw,
        [[(0, 0), (0, 1), (1, 0), (1, 1)], [(0, 0), (0, 1)], [(0, 0)]],
        610,
        190,
        ["2×2 ★优先", "1×2", "1×1"],
    )
    draw.rounded_rectangle([PAD, 598, 960 - PAD, 654], radius=12, fill=(248, 250, 252), outline=GRID_LINE)
    draw.text((PAD + 18, 615), "步骤 2：识别 2×2 大方块，优先放置", fill=SUBTEXT, font=FONT_CAPTION)
    frames.append(img)

    b2 = [row[:] for row in b]
    fill_rect(b2, 2, 2, 3, 3, 3)
    frames.append(_frame_board(b2, "大方块优先放置", "步骤 3：大方块已放置，小方块留作填缝"))

    b3 = [row[:] for row in b2]
    b3[2][5] = 4
    b3[3][5] = 4
    b3[4][4] = 4
    frames.append(_frame_board(b3, "大方块优先放置", "步骤 4：小方块灵活填补剩余缝隙"))
    _save_gif(frames, IMAGES / "demos" / "big-block-first.gif", 900)


TIPS = [
    ("tip-01-board-cleanup.png", tip01_board_cleanup),
    ("tip-02-reserve-space.png", tip02_reserve_space),
    ("tip-03-big-block-first.png", tip03_big_block_first),
    ("tip-04-combo-clear.png", tip04_combo_clear),
    ("tip-05-shapes.png", tip05_shapes),
    ("tip-06-corner-fill.png", tip06_corner_fill),
    ("tip-07-symmetric.png", tip07_symmetric),
    ("tip-08-emergency.png", tip08_emergency),
    ("tip-09-score-multiplier.png", tip09_score_multiplier),
    ("tip-10-rhythm.png", tip10_rhythm),
    ("tip-11-special-blocks.png", tip11_special_blocks),
    ("tip-12-mindset.png", tip12_mindset),
]


def main() -> None:
    tips_dir = IMAGES / "tips"
    daily_dir = IMAGES / "daily"
    demos_dir = IMAGES / "demos"
    for d in (tips_dir, daily_dir, demos_dir):
        d.mkdir(parents=True, exist_ok=True)

    print("Generating tip illustrations...")
    for filename, fn in TIPS:
        out = tips_dir / filename
        fn().save(out, "PNG", optimize=True)
        print(f"  OK {out.relative_to(ROOT)}")

    print("Generating daily challenge illustration...")
    daily_path = daily_dir / "2026-05-13-solution.png"
    daily_solution().save(daily_path, "PNG", optimize=True)
    print(f"  OK {daily_path.relative_to(ROOT)}")

    print("Generating strategy demo GIFs...")
    demo_combo_clear()
    print("  OK images/demos/combo-clear.gif")
    demo_corner_fill()
    print("  OK images/demos/corner-fill.gif")
    demo_big_block_first()
    print("  OK images/demos/big-block-first.gif")

    print("\nDone! Generated 16 media files.")


if __name__ == "__main__":
    main()
