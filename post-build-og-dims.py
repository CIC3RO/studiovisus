#!/usr/bin/env python3
"""Adds og:image:width and og:image:height meta tags after og:image, with real dimensions."""
import re
import struct
import os
import glob

BASE = os.path.dirname(os.path.abspath(__file__))


def get_image_size(path):
    try:
        with open(path, 'rb') as f:
            head = f.read(30)
        if head[:8] == b'\x89PNG\r\n\x1a\n':
            w, h = struct.unpack('>II', head[16:24])
            return w, h
        if head[:2] == b'\xff\xd8':
            with open(path, 'rb') as f:
                data = f.read()
            i = 2
            while i < len(data):
                while data[i] == 0xff:
                    i += 1
                marker = data[i]
                i += 1
                if marker in (0xc0, 0xc1, 0xc2, 0xc3, 0xc5, 0xc6, 0xc7,
                              0xc9, 0xca, 0xcb, 0xcd, 0xce, 0xcf):
                    h = struct.unpack('>H', data[i+3:i+5])[0]
                    w = struct.unpack('>H', data[i+5:i+7])[0]
                    return w, h
                seg_len = struct.unpack('>H', data[i:i+2])[0]
                i += seg_len
        if head[:4] == b'RIFF' and head[8:12] == b'WEBP':
            with open(path, 'rb') as f:
                data = f.read()
            if data[12:16] == b'VP8X':
                w = (data[24] | (data[25] << 8) | (data[26] << 16)) + 1
                h = (data[27] | (data[28] << 8) | (data[29] << 16)) + 1
                return w, h
            if data[12:16] == b'VP8L':
                b0, b1, b2, b3 = data[21], data[22], data[23], data[24]
                w = ((b1 & 0x3f) << 8 | b0) + 1
                h = ((b3 & 0xf) << 10 | b2 << 2 | (b1 & 0xc0) >> 6) + 1
                return w, h
            if data[12:16] == b'VP8 ':
                w = struct.unpack('<H', data[26:28])[0] & 0x3fff
                h = struct.unpack('<H', data[28:30])[0] & 0x3fff
                return w, h
    except Exception:
        return None
    return None


count = 0
for fp in sorted(glob.glob(os.path.join(BASE, '*.html'))):
    with open(fp, 'r', encoding='utf-8') as f:
        c = f.read()

    m = re.search(r'(<meta property="og:image" content="([^"]+)">)', c)
    if not m:
        continue

    # Skip if width/height already present
    if 'og:image:width' in c:
        continue

    full_tag = m.group(1)
    url = m.group(2)
    local = url.replace('https://www.studiovisus.de/', '')
    local_abs = os.path.join(BASE, local)
    if not os.path.exists(local_abs):
        continue
    sz = get_image_size(local_abs)
    if not sz:
        continue
    w, h = sz

    addition = (
        f'{full_tag}\n'
        f'<meta property="og:image:width" content="{w}">\n'
        f'<meta property="og:image:height" content="{h}">\n'
        f'<meta property="og:image:type" content="{"image/webp" if local.lower().endswith(".webp") else "image/jpeg"}">'
    )
    c2 = c.replace(full_tag, addition, 1)
    with open(fp, 'w', encoding='utf-8') as f:
        f.write(c2)
    count += 1
    print(f"  {os.path.basename(fp)}: {w}x{h}")

print(f"\n{count} HTML-Dateien aktualisiert")
