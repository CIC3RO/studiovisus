#!/usr/bin/env python3
"""
Adds srcset/sizes attributes to <img> tags pointing to images
that will have responsive variants after running optimize-images.sh.

Skipped: logos, favicons, OG images, already has srcset.
"""
import os
import re
import glob

BASE = os.path.dirname(os.path.abspath(__file__))

# Skip these directories: logo, favicons
SKIP_PATHS = ('images/logo/', 'favicon')

IMG_RE = re.compile(
    r'<img\b([^>]*?)\bsrc="(images/[^"]+\.(?:jpe?g|webp|png|JPG|JPEG))"([^>]*?)>',
    re.IGNORECASE
)

def transform(match):
    pre = match.group(1)
    src = match.group(2)
    post = match.group(3)
    full_attrs = pre + post

    # Skip if already has srcset
    if 'srcset=' in full_attrs:
        return match.group(0)
    # Skip logos
    if any(s in src for s in SKIP_PATHS):
        return match.group(0)

    # Build srcset
    dir_ = os.path.dirname(src)
    base = os.path.basename(src)
    name, ext = os.path.splitext(base)
    if not name or not ext:
        return match.group(0)

    src_800 = f"{dir_}/{name}-800w{ext}"
    src_1200 = f"{dir_}/{name}-1200w{ext}"

    srcset = f'srcset="{src_800} 800w, {src_1200} 1200w, {src} 2000w"'
    sizes = 'sizes="(max-width: 700px) 90vw, (max-width: 1200px) 50vw, 33vw"'

    # Insert before closing >
    return f'<img{pre} src="{src}" {srcset} {sizes}{post}>'


count = 0
for fp in sorted(glob.glob(os.path.join(BASE, '*.html'))):
    with open(fp, 'r', encoding='utf-8') as f:
        content = f.read()
    new_content = IMG_RE.sub(transform, content)
    if new_content != content:
        with open(fp, 'w', encoding='utf-8') as f:
            f.write(new_content)
        count += 1

print(f"{count} HTML-Dateien mit srcset versehen")
