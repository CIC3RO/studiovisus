#!/usr/bin/env node
/**
 * Studio Visus — Build-Schritt nach den Generatoren
 *
 * Reihenfolge der Anwendung nach jedem Generator-Lauf:
 *   1. node generate-werke.js
 *   2. node generate-blog.js
 *   3. node generate-landingpages.js
 *   4. node generate-faq.js
 *   5. node generate-legal.js   (falls _legal_*.html vorhanden)
 *   6. node post-build.js       <-- diese Datei
 *
 * Was hier passiert:
 *   - srcset/sizes wird auf alle Content-Bilder gelegt
 *   - og:image:width / og:image:height / og:image:type werden ergaenzt
 *
 * Voraussetzung: python3 ist auf dem System installiert.
 * Die beiden Python-Scripts werden aus dem gleichen Verzeichnis aufgerufen.
 */

const { execSync } = require('child_process');
const path = require('path');

const here = __dirname;

function run(label, cmd) {
  console.log(`\n→ ${label}`);
  try {
    const out = execSync(cmd, { cwd: here, encoding: 'utf-8' });
    console.log(out.trim());
  } catch (e) {
    console.error(`Fehler bei: ${label}`);
    console.error(e.stdout || e.message);
    process.exit(1);
  }
}

run('srcset / sizes ergaenzen', 'python3 post-build-srcset.py');
run('og:image Dimensionen ergaenzen', 'python3 post-build-og-dims.py');

console.log('\n✓ Post-Build abgeschlossen.');
