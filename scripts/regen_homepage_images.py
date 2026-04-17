"""
Flux 1.1 Pro Ultra로 seopung-web 핵심 이미지 15장 재생성.
공통 톤: bright clean Korean seafood industry, natural daylight / cinematic dawn,
editorial quality, no text/watermark, no AI artifacts.
"""
import argparse, os, time
from pathlib import Path
import requests

ENV_PATH = Path(r"D:/2_Projects/automation/planning-automation/.env")
for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
    if line.startswith("FAL_KEY="):
        os.environ["FAL_KEY"] = line.split("=", 1)[1].strip()
        break

import fal_client

ROOT = Path(r"D:/2_Projects/web/Maker_homepade/seopung-web/public/images")

COMMON = (
    "bright clean Korean seafood industry photography, editorial magazine quality, "
    "realistic texture and materials, true-to-life colors, shallow depth of field, "
    "no text, no watermark, no labels, no AI artifacts, shot on Canon 5D"
)

DAWN = "cinematic cool dawn light, subtle blue-orange gradient in sky, "
DAYLIGHT = "bright natural daylight, soft clean lighting, "


IMAGES = [
    # ───── 홈 히어로 크로스페이드 (5장, 21:9 시네마틱) ─────
    ("food-web/td06120004185.jpg", "21:9",
     DAWN + "wide panoramic view of Yeosu fishing harbor at early dawn. "
     "Several small Korean fishing boats with warm yellow lights docked at quay, "
     "silhouetted workers carrying fish boxes, pale blue sea, "
     "calm morning atmosphere. " + COMMON),

    ("food-web/pc0031187199.jpg", "21:9",
     DAYLIGHT + "modern HACCP-certified Korean seafood processing factory interior, "
     "workers in white sanitary uniforms and hair nets on stainless steel "
     "processing line, bright fluorescent overhead lighting, pristine clean "
     "environment, subtle motion blur suggesting active production. " + COMMON),

    ("food-web/tica034m19010001.jpg", "21:9",
     DAYLIGHT + "close-up of industrial IQF quick-freezing tunnel conveyor "
     "with freshly processed fish fillets passing through. Visible frost "
     "vapor, cool blue tones, stainless steel surfaces gleaming, "
     "precision food technology feel. " + COMMON),

    ("food-web/td06120004172.jpg", "21:9",
     DAYLIGHT + "pristine vacuum-sealed premium Korean seafood packages "
     "arranged in neat rows on white surface — mackerel fillets, hairtail slices, "
     "shrimp packs — clean minimalist product showcase, soft top-down lighting. "
     + COMMON),

    ("food-web/pc0031187509.jpg", "21:9",
     DAWN + "wide coastal seascape of the South Korean sea at early morning. "
     "Gentle waves, pale blue water meeting soft golden sunrise horizon, "
     "minimal composition, serene clean atmosphere symbolizing ocean sustainability. "
     + COMMON),

    # ───── PageSections 2장 ─────
    ("food-web/tica034m19010003.jpg", "16:9",
     DAYLIGHT + "wide angle of clean modern Korean seafood processing plant. "
     "Long stainless steel conveyor lines with workers in white uniforms doing "
     "filleting and sorting, bright hygienic walls, tracking overhead lights, "
     "facility feels spacious and precise. " + COMMON),

    ("food-web/pc0031187533.jpg", "21:9",
     DAYLIGHT + "packaging and dispatch line at Korean seafood factory. "
     "Vacuum-packed frozen fish boxes stacked on stainless trolleys heading to "
     "refrigerated trucks, workers sealing cardboard boxes with labels, "
     "bright efficient logistics scene. " + COMMON),

    # ───── Process 공정 페이지 4장 ─────
    ("process/04-tunnel-freezer.jpg", "16:9",
     DAYLIGHT + "large industrial tunnel blast freezer at Korean seafood "
     "factory. Conveyor carrying fish fillets into the freezer entrance, "
     "visible cold vapor drifting out, blue-white metal housing with control "
     "panel, subtle frost on stainless steel surfaces. " + COMMON),

    ("auction/director-inspect.jpg", "4:3",
     DAYLIGHT + "close-up from behind: hands of a Korean seafood quality manager "
     "in white coat and cap inspecting fresh silver mackerel laid on blue plastic "
     "crate at wholesale market. Face not visible, focus on careful hand "
     "examination of fish, early-morning market light. " + COMMON),

    ("auction/auction-panorama.jpg", "21:9",
     DAWN + "wide panorama of Korean coastal fish auction market at dawn. "
     "Rows of blue plastic fish crates filled with fresh catch on wet concrete "
     "floor, buyers and sellers in yellow boots and caps from distance, "
     "bright overhead market lights, bustling early morning scene. " + COMMON),

    ("hero/dawn-workers.jpg", "16:9",
     DAWN + "silhouette of Korean fishing port workers carrying crates of "
     "fresh fish at early dawn. Warm yellow harbor lights, dark blue sea "
     "in background, cinematic rim lighting outlining the figures, "
     "atmospheric and respectful tone. " + COMMON),

    # ───── Products 1장 ─────
    ("process/06-cold-storage.jpg", "16:9",
     DAYLIGHT + "interior of large Korean cold storage warehouse. Rows of "
     "neatly stacked white cardboard seafood boxes on tall metal shelving "
     "disappearing into the distance, visible frost air, cool blue-white "
     "LED lighting, clean industrial cold-chain facility. " + COMMON),

    # ───── Technology / Resources 2장 ─────
    ("facility/fish-scanner.jpg", "4:3",
     DAYLIGHT + "modern X-ray and metal detection scanner on Korean seafood "
     "production line. Stainless steel conveyor carrying sealed fish packages "
     "through a rectangular tunnel detector, digital screen showing scan result "
     "on the side, clean hygienic white-tile factory environment. " + COMMON),

    ("facility/fish-scanner-3.jpg", "4:3",
     DAYLIGHT + "quality control technician in white coat examining a digital "
     "X-ray scan image on high-resolution monitor at Korean seafood factory. "
     "Background shows stainless steel scanner and production line, precise "
     "tech-forward atmosphere. Face of technician angled away or unclear. "
     + COMMON),

    # ───── Contact 1장 ─────
    ("hero/dawn-unloading.jpg", "21:9",
     DAWN + "wide shot of Yeosu fishing harbor at dawn: fishing boats tied up "
     "at the pier, workers unloading crates of fresh fish onto the dock under "
     "warm yellow lamp posts, gentle pale-blue sea behind, calm productive "
     "morning atmosphere symbolizing Korean maritime heritage. " + COMMON),
]


def generate(prompt, aspect, fmt):
    result = fal_client.subscribe(
        "fal-ai/flux-pro/v1.1-ultra",
        arguments={
            "prompt": prompt,
            "aspect_ratio": aspect,
            "num_images": 1,
            "enable_safety_checker": True,
            "safety_tolerance": "2",
            "output_format": fmt,
            "raw": False,
        },
        with_logs=False,
    )
    imgs = result.get("images") or []
    if not imgs:
        return None
    url = imgs[0].get("url")
    return requests.get(url, timeout=90).content if url else None


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--only", help="substring match on relative path")
    ap.add_argument("--dry-run", action="store_true")
    args = ap.parse_args()

    targets = IMAGES
    if args.only:
        targets = [t for t in IMAGES if args.only in t[0]]

    for i, (rel, aspect, prompt) in enumerate(targets, 1):
        dest = ROOT / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        if args.dry_run:
            print(f"[{i}/{len(targets)}] {rel} ({aspect})")
            continue
        fmt = "png" if rel.endswith(".png") else "jpeg"
        print(f"[{i}/{len(targets)}] GEN  {rel} ({aspect})")
        t0 = time.time()
        data = generate(prompt, aspect, fmt)
        if data is None:
            print("    FAIL")
            continue
        dest.write_bytes(data)
        print(f"    OK ({len(data)//1024} KB, {time.time()-t0:.1f}s)")


if __name__ == "__main__":
    main()
