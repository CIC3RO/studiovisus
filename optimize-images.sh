#!/usr/bin/env bash
# Bilder-Optimierung fuer Studio Visus
# Verwendet imagemagick (magick) und cwebp.
#
# Voraussetzungen (Mac):
#   brew install imagemagick webp
#
# Voraussetzungen (Ubuntu/Debian):
#   sudo apt install imagemagick webp
#
# Nutzung:
#   chmod +x optimize-images.sh
#   ./optimize-images.sh
#
# Was passiert:
# - Backup nach images-backup/ wird erstellt
# - Alle .jpg/.jpeg/.JPG werden auf Qualitaet 82 reduziert und auf max 2000px Breite limitiert
# - Alle .webp werden mit cwebp -q 80 neu komprimiert, auf max 2000px Breite
# - Erwartung: ca. 60-75% Reduktion der Gesamtgroesse

set -e

cd "$(dirname "$0")"

if [ ! -d images ]; then
  echo "Fehler: images/ Verzeichnis nicht gefunden"
  exit 1
fi

# Backup einmalig anlegen
if [ ! -d images-backup ]; then
  echo "Backup wird angelegt: images-backup/"
  cp -r images images-backup
fi

MAX_WIDTH=2000
JPEG_QUALITY=82
WEBP_QUALITY=80

# Toolchain pruefen
if ! command -v magick >/dev/null && ! command -v convert >/dev/null; then
  echo "Fehler: imagemagick fehlt. Installation:"
  echo "  macOS:  brew install imagemagick"
  echo "  Linux:  sudo apt install imagemagick"
  exit 1
fi
if ! command -v cwebp >/dev/null; then
  echo "Fehler: cwebp fehlt. Installation:"
  echo "  macOS:  brew install webp"
  echo "  Linux:  sudo apt install webp"
  exit 1
fi

# Wrapper, weil magick (v7) und convert (v6) sich unterscheiden
if command -v magick >/dev/null; then
  IM="magick"
else
  IM="convert"
fi

before=$(du -sk images | cut -f1)

echo ""
echo "JPEG-Bilder werden optimiert..."
find images -type f \( -iname "*.jpg" -o -iname "*.jpeg" \) -size +200k | while read f; do
  echo "  $f"
  $IM "$f" -resize "${MAX_WIDTH}>" -strip -interlace Plane -sampling-factor 4:2:0 -quality $JPEG_QUALITY "$f.tmp"
  mv "$f.tmp" "$f"
done

echo ""
echo "WebP-Bilder werden optimiert..."
find images -type f -iname "*.webp" -size +200k | while read f; do
  echo "  $f"
  # WebP-Bilder gehen erst durch imagemagick fuer Resize, dann durch cwebp
  $IM "$f" -resize "${MAX_WIDTH}>" "$f.png"
  cwebp -q $WEBP_QUALITY -mt -m 6 "$f.png" -o "$f.new" 2>/dev/null
  rm "$f.png"
  mv "$f.new" "$f"
done

after=$(du -sk images | cut -f1)

echo ""
echo "Fertig."
echo "Vorher: $((before / 1024)) MB"
echo "Nachher: $((after / 1024)) MB"
echo "Ersparnis: $((100 - 100 * after / before))%"
echo ""
echo "Backup liegt unter images-backup/ (kann geloescht werden, wenn alles passt)."
echo ""
echo "=================================================================="
echo "Optional: Responsive Image Varianten erzeugen?"
echo "Erzeugt fuer jedes Hauptbild 2 zusaetzliche Groessen (800w, 1200w),"
echo "die ueber srcset im HTML angesprochen werden."
echo "=================================================================="
read -p "Responsive Varianten erzeugen? (y/N): " yn
if [ "$yn" = "y" ] || [ "$yn" = "Y" ]; then
  echo ""
  echo "Erzeuge responsive Varianten..."

  # Pfade die responsive werden sollen (Hauptbilder, nicht Logos und nicht Favicons)
  find images -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.webp" \) \
    | grep -v "images/logo" \
    | while read f; do
    dir=$(dirname "$f")
    base=$(basename "$f")
    name="${base%.*}"
    ext="${base##*.}"

    # 800w-Variante
    if [ ! -f "$dir/${name}-800w.${ext}" ]; then
      if [ "${ext,,}" = "webp" ]; then
        $IM "$f" -resize "800>" "$f.png" 2>/dev/null
        cwebp -q $WEBP_QUALITY -mt -m 6 "$f.png" -o "$dir/${name}-800w.${ext}" 2>/dev/null
        rm "$f.png"
      else
        $IM "$f" -resize "800>" -strip -quality $JPEG_QUALITY "$dir/${name}-800w.${ext}"
      fi
    fi

    # 1200w-Variante
    if [ ! -f "$dir/${name}-1200w.${ext}" ]; then
      if [ "${ext,,}" = "webp" ]; then
        $IM "$f" -resize "1200>" "$f.png" 2>/dev/null
        cwebp -q $WEBP_QUALITY -mt -m 6 "$f.png" -o "$dir/${name}-1200w.${ext}" 2>/dev/null
        rm "$f.png"
      else
        $IM "$f" -resize "1200>" -strip -quality $JPEG_QUALITY "$dir/${name}-1200w.${ext}"
      fi
    fi
  done
  echo "Responsive Varianten erzeugt."
fi
