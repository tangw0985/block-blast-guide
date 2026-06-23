#!/usr/bin/env python3
"""Generate English Block Blast guide illustrations."""

from pathlib import Path

from PIL import Image, ImageDraw

import generate_media as gm


OUT = gm.IMAGES / "en"


def cleanup() -> Image.Image:
    bad = gm.empty_board()
    gm.fill_rect(bad, 0, 0, 2, 3, 1)
    gm.fill_rect(bad, 3, 0, 5, 2, 2)
    gm.fill_rect(bad, 6, 0, 7, 7, 3)
    gm.fill_rect(bad, 0, 4, 1, 7, 4)
    good = gm.empty_board()
    gm.fill_rect(good, 6, 0, 7, 1, 1)
    gm.fill_rect(good, 6, 6, 7, 7, 2)
    gm.fill_rect(good, 0, 6, 1, 7, 3)
    gm.fill_rect(good, 0, 0, 1, 1, 4)
    gm.fill_rect(good, 3, 3, 4, 4, 1)
    gm.fill_rect(good, 2, 5, 5, 6, 2)
    return gm.render_scene(
        "Board cleanup: keep the surface usable",
        [
            {"board": bad, "label": "Risky uneven board"},
            {"board": good, "label": "Compact edges", "highlight_corners": True},
        ],
        caption="Avoid isolated holes and preserve continuous space for large pieces.",
    )


def big_block() -> Image.Image:
    board = gm.empty_board()
    gm.fill_rect(board, 0, 0, 1, 7, 1)
    gm.fill_rect(board, 6, 0, 7, 7, 2)
    return gm.render_scene(
        "Place the most restrictive piece first",
        [{"board": board, "highlight_cells": [(3, 3), (3, 4), (4, 3), (4, 4)]}],
        caption="Protect a full 3x3 zone and use small pieces to finish lines later.",
        width=980,
    )


def combo() -> Image.Image:
    before = gm.empty_board()
    for col in range(7):
        before[3][col] = 1
    for row in range(7):
        before[row][4] = 2
    placed = [row[:] for row in before]
    placed[3][7] = 3
    placed[7][4] = 3
    cleared = gm.empty_board()
    gm.fill_rect(cleared, 0, 0, 2, 3, 1)
    gm.fill_rect(cleared, 5, 4, 7, 7, 2)
    return gm.render_scene(
        "Double clear: complete a row and column together",
        [
            {"board": before, "label": "Find the crossing", "highlight_rows": [3], "highlight_cols": [4]},
            {"board": placed, "label": "Place the finisher", "highlight_cells": [(3, 7), (7, 4)]},
            {"board": cleared, "label": "Space recovered"},
        ],
        caption="Save precise small pieces for high-value crossing points.",
    )


def rhythm() -> Image.Image:
    board = gm.empty_board()
    filled = 0
    for row in range(gm.GRID):
        for col in range(gm.GRID):
            if (row * gm.GRID + col) % 5 < 2:
                board[row][col] = ((row + col) % 4) + 1
                filled += 1
    return gm.render_scene(
        "High-score rhythm: protect future moves",
        [{"board": board}],
        caption=f"Board fill is about {filled * 100 // 64}%. Clear before large-piece options disappear.",
        width=920,
    )


def special_blocks() -> Image.Image:
    image = Image.new("RGB", (1200, 900), gm.BG)
    draw = ImageDraw.Draw(image)
    draw.text((gm.PAD, 28), "Special pieces: Z, cross and long bar", fill=gm.TEXT, font=gm.FONT_TITLE)
    shapes = [
        ("Z piece: needs a notch", [(0, 0), (0, 1), (1, 1), (1, 2)], 1),
        ("Cross: keep center space", [(0, 1), (1, 0), (1, 1), (1, 2), (2, 1)], 2),
        ("5-bar: keep a clear lane", [(0, i) for i in range(5)], 3),
    ]
    start_x = 72
    for title, cells, color in shapes:
        draw.text((start_x, 92), title, fill=gm.SUBTEXT, font=gm.FONT_LABEL)
        for row, col in cells:
            x = start_x + col * 42
            y = 136 + row * 42
            draw.rounded_rectangle([x, y, x + 36, y + 36], radius=7, fill=gm.COLORS[color])
        start_x += 360
    board = gm.empty_board()
    gm.fill_rect(board, 0, 0, 1, 7, 1)
    gm.fill_rect(board, 6, 0, 7, 7, 2)
    gm.fill_rect(board, 2, 3, 5, 3, 3)
    gm.draw_board(draw, board, 374, 324, label="Reserve shape-friendly space", highlight_cells=[(1, 1), (1, 2), (3, 3), (4, 3)])
    draw.rounded_rectangle([gm.PAD, 816, 1200 - gm.PAD, 870], radius=12, fill=(248, 250, 252), outline=gm.GRID_LINE)
    draw.text((gm.PAD + 20, 831), "Plan before the piece appears: notch, center, and straight lane.", fill=gm.SUBTEXT, font=gm.FONT_CAPTION)
    return image


def center_space() -> Image.Image:
    board = gm.empty_board()
    gm.fill_rect(board, 0, 0, 1, 1, 2)
    gm.fill_rect(board, 6, 0, 7, 1, 2)
    gm.fill_rect(board, 2, 6, 3, 7, 1)
    gm.fill_rect(board, 6, 6, 7, 7, 3)
    return gm.render_scene(
        "Keep the center flexible",
        [{"board": board, "highlight_cells": [(3, 3), (3, 4), (4, 3), (4, 4)]}],
        caption="Use edges first when possible. The center supports the widest range of shapes.",
        width=920,
    )


def corner() -> Image.Image:
    board = gm.empty_board()
    gm.fill_rect(board, 0, 0, 1, 1, 1)
    gm.fill_rect(board, 0, 6, 1, 7, 2)
    gm.fill_cells(board, [(6, 0), (7, 0), (7, 1)], 3)
    gm.fill_rect(board, 6, 6, 7, 7, 4)
    gm.fill_rect(board, 0, 2, 0, 5, 2)
    gm.fill_rect(board, 2, 0, 5, 0, 3)
    return gm.render_scene(
        "Corner strategy: corners, edges, then center",
        [{"board": board, "highlight_corners": True}],
        caption="Use L pieces and compact blocks to avoid trapped corner cells.",
        width=920,
    )


def emergency() -> Image.Image:
    crowded = gm.empty_board()
    for row in range(gm.GRID):
        for col in range(gm.GRID):
            if (row + col) % 3 != 0:
                crowded[row][col] = ((row + col) % 4) + 1
    for col in range(6):
        crowded[4][col] = 1
    rescue = [row[:] for row in crowded]
    rescue[4][6] = rescue[4][7] = 4
    cleared = [row[:] for row in rescue]
    for col in range(gm.GRID):
        cleared[4][col] = 0
    return gm.render_scene(
        "Emergency rescue: clear the safest line first",
        [
            {"board": crowded, "label": "Crowded", "highlight_rows": [4]},
            {"board": rescue, "label": "Fill the gap", "highlight_rows": [4]},
            {"board": cleared, "label": "Space restored"},
        ],
        caption="Stop chasing combos when large-piece options are disappearing.",
    )


IMAGES = {
    "board-cleanup.png": cleanup,
    "big-block-first.png": big_block,
    "combo-strategy.png": combo,
    "high-score-rhythm.png": rhythm,
    "special-blocks.png": special_blocks,
    "keep-center-open.png": center_space,
    "corner-strategy.png": corner,
    "emergency-rescue.png": emergency,
}


def main() -> None:
    OUT.mkdir(parents=True, exist_ok=True)
    for filename, builder in IMAGES.items():
        output = OUT / filename
        builder().save(output, "PNG", optimize=True)
        print(f"OK {output.relative_to(gm.ROOT)}")


if __name__ == "__main__":
    main()
