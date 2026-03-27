from __future__ import annotations

import shutil
from pathlib import Path


SITE = Path(__file__).resolve().parent
ROOT = SITE.parent.parent
DIST = SITE / "dist"

SOURCE_FILES = [
    "studioart.html",
    "studioart.css",
    "studioart.js",
    "studioart-config.js",
]

ASSET_FILES = [
    "tng-logo-master-2048.png",
]


def build_dist() -> None:
    if DIST.exists():
        shutil.rmtree(DIST)

    (DIST / "assets").mkdir(parents=True, exist_ok=True)

    for filename in SOURCE_FILES:
        source = ROOT / filename
        target_name = "index.html" if filename == "studioart.html" else filename
        shutil.copy2(source, DIST / target_name)

    for filename in ASSET_FILES:
        shutil.copy2(ROOT / "assets" / filename, DIST / "assets" / filename)


if __name__ == "__main__":
    build_dist()
    print("Build StudioART listo en sites/studioart/dist/")
