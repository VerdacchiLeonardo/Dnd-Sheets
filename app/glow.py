"""
PIL-based glow text rendering: creates PhotoImage-ready images with fantasy glow effects.
"""
import math
from PIL import Image, ImageDraw, ImageFilter, ImageChops, ImageFont
from typing import Tuple

Rgb = Tuple[int, int, int]


def glow_image(
    text: str,
    font: ImageFont.FreeTypeFont,
    img_size: Tuple[int, int],
    text_color: Rgb = (240, 220, 160),
    glow_color: Rgb = (180, 110, 20),
    glow_radius: int = 15,
    glow_strength: int = 3,
    bg_color: Rgb = (8, 8, 8),
    y_offset: int = 0,
) -> Image.Image:
    """Return an RGB PIL image with glowing text centred in img_size."""
    w, h = img_size

    # Measure text position
    dummy_img = Image.new("RGBA", (1, 1))
    dd = ImageDraw.Draw(dummy_img)
    try:
        bbox = dd.textbbox((0, 0), text, font=font)
        tw = bbox[2] - bbox[0]
        th = bbox[3] - bbox[1]
    except AttributeError:
        tw, th = dd.textsize(text, font=font)

    tx = (w - tw) // 2
    ty = (h - th) // 2 + y_offset

    # Glow layer: draw text, blur heavily
    glow_layer = Image.new("RGBA", img_size, (0, 0, 0, 0))
    gd = ImageDraw.Draw(glow_layer)
    gd.text((tx, ty), text, font=font, fill=(*glow_color, 255))
    glow_layer = glow_layer.filter(ImageFilter.GaussianBlur(radius=glow_radius))

    # Sharp text layer
    sharp_layer = Image.new("RGBA", img_size, (0, 0, 0, 0))
    sd = ImageDraw.Draw(sharp_layer)
    sd.text((tx, ty), text, font=font, fill=(*text_color, 255))

    # Composite onto background
    bg = Image.new("RGB", img_size, bg_color)
    for _ in range(glow_strength):
        glow_rgb = Image.new("RGB", img_size, (0, 0, 0))
        glow_rgb.paste(glow_layer.convert("RGB"), mask=glow_layer.split()[3])
        bg = ImageChops.add(bg, glow_rgb)

    sharp_rgb = Image.new("RGB", img_size, (0, 0, 0))
    sharp_rgb.paste(sharp_layer.convert("RGB"), mask=sharp_layer.split()[3])
    bg = ImageChops.add(bg, sharp_rgb)

    return bg


def divider_image(
    width: int,
    height: int = 6,
    color: Rgb = (180, 110, 20),
    bg_color: Rgb = (8, 8, 8),
) -> Image.Image:
    """Horizontal glowing divider line."""
    img = Image.new("RGB", (width, height), bg_color)
    draw = ImageDraw.Draw(img)
    cy = height // 2
    draw.line([(0, cy), (width, cy)], fill=color, width=1)
    blurred = img.filter(ImageFilter.GaussianBlur(radius=2))
    return ImageChops.add(blurred, img)
