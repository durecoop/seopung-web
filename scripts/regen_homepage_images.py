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
    "candid realistic photograph, digital camera, authentic unposed moment, "
    "true-to-life natural colors, neutral white balance, "
    "no color grading, no filter, no tint, no film grain, no retouching, "
    "no HDR look, no glow, no vignette, no cinematic look, no stylization, "
    "sharp clean focus, crisp modern image quality, "
    "clean uncluttered background, tidy organized composition, minimalist framing, "
    "modern young progressive Korean company brand aesthetic, "
    "fresh optimistic energetic mood, bright and airy atmosphere, "
    "ABSOLUTELY NO TEXT ANYWHERE IN FRAME: no letters, no words, no Korean "
    "characters 한글, no English writing, no numbers, no digits, no signs, "
    "no posters, no banners, no labels on equipment, no brand names, "
    "no stickers, no printed text, no clock faces with numbers, "
    "no displays with readable text, no menu boards, no warning signs, "
    "no typography whatsoever, completely text-free composition, "
    "looks like a real contemporary photograph, not a rendered image"
)

DAWN = "clear bright early morning light, natural soft sky, no lens flare, no color cast, "
DAYLIGHT = "bright natural daylight, clean even lighting, soft shadows, "


IMAGES = [
    # ───── 홈 히어로 크로스페이드 (5장, 21:9 시네마틱) ─────
    ("food-web/td06120004185.jpg", "21:9",
     DAWN + "wide panoramic view of Yeosu fishing harbor at early morning. "
     "Several small Korean fishing boats docked at quay, workers carrying fish boxes, "
     "calm sea, clear natural morning atmosphere. " + COMMON),

    ("food-web/pc0031187199.jpg", "21:9",
     DAYLIGHT + "modern HACCP-certified Korean seafood processing factory interior, "
     "workers in white sanitary uniforms and hair nets on stainless steel "
     "processing line, bright fluorescent overhead lighting, pristine clean "
     "environment, subtle motion blur suggesting active production. " + COMMON),

    ("food-web/tica034m19010001.jpg", "21:9",
     DAYLIGHT + "close-up of industrial IQF quick-freezing tunnel conveyor "
     "with freshly processed fish fillets passing through. Visible light "
     "frost, clean stainless steel surfaces, modern precision food technology. "
     + COMMON),

    ("food-web/td06120004172.jpg", "21:9",
     DAYLIGHT + "clean vacuum-sealed Korean seafood packages in plain "
     "transparent wrapping arranged in neat rows on light wooden surface — "
     "mackerel fillets, hairtail slices, peeled shrimp — minimalist product "
     "showcase, soft top-down lighting, no printed labels, no stickers. "
     + COMMON),

    ("food-web/pc0031187509.jpg", "21:9",
     DAWN + "wide coastal seascape of the South Korean sea at early morning. "
     "Gentle waves, natural blue water meeting clear horizon, minimal composition, "
     "bright clean atmosphere, contemporary ocean feel. " + COMMON),

    # ───── PageSections 2장 ─────
    ("food-web/tica034m19010003.jpg", "16:9",
     DAYLIGHT + "wide angle of clean modern Korean seafood processing plant. "
     "Long stainless steel conveyor lines with workers in white uniforms doing "
     "filleting and sorting, bright hygienic walls, tracking overhead lights, "
     "facility feels spacious and precise. " + COMMON),

    ("food-web/pc0031187533.jpg", "21:9",
     DAYLIGHT + "packaging and dispatch line at Korean seafood factory. "
     "Vacuum-packed frozen fish in plain white packaging stacked on stainless "
     "trolleys heading to refrigerated trucks, workers in white uniforms "
     "sealing plain cardboard boxes, bright efficient clean logistics scene, "
     "no printing on boxes. " + COMMON),

    # ───── Process 공정 페이지 4장 ─────
    ("process/04-tunnel-freezer.jpg", "16:9",
     DAYLIGHT + "large industrial tunnel blast freezer at Korean seafood "
     "factory. Conveyor carrying fish fillets into the freezer entrance, "
     "light cold vapor, clean metal housing with plain control panel, "
     "light frost on stainless steel surfaces. " + COMMON),

    ("auction/director-inspect.jpg", "4:3",
     DAYLIGHT + "close-up overhead view of hands in white gloves carefully "
     "inspecting fresh silver Korean mackerel with clear scale and gill detail, "
     "laid neatly on a clean blue plastic crate. No face visible, just "
     "hands and fish, tidy uncluttered background, early-morning market light. "
     + COMMON),

    ("auction/auction-panorama.jpg", "21:9",
     DAWN + "wide panorama of Korean coastal fish auction market at dawn. "
     "Neat rows of clean blue plastic fish crates filled with fresh silver "
     "mackerel, hairtail and sea bream on wet concrete floor, realistic fish "
     "scales texture, a few blurred workers in yellow boots in the distance, "
     "overhead lights, clean organized early morning scene, no signs or banners. "
     + COMMON),

    ("hero/dawn-workers.jpg", "16:9",
     DAWN + "Korean fishing port workers carrying crates of fresh fish "
     "at early morning. Natural harbor light, calm sea in background, "
     "authentic working moment, realistic everyday atmosphere. " + COMMON),

    # ───── Products 1장 ─────
    ("process/06-cold-storage.jpg", "16:9",
     DAYLIGHT + "interior of large Korean cold storage warehouse. Rows of "
     "neatly stacked plain white cardboard boxes (no printing, no labels) "
     "on tall metal shelving disappearing into the distance, light cold "
     "mist, bright even LED lighting, spotless floor, clean modern organized "
     "cold-chain facility. " + COMMON),

    # ───── Technology / Resources 2장 ─────
    ("facility/fish-scanner.jpg", "4:3",
     DAYLIGHT + "modern X-ray and metal detection scanner on Korean seafood "
     "production line. Stainless steel conveyor carrying sealed fish packages "
     "in plain white wrapping through a rectangular tunnel detector, simple "
     "blank control panel, clean hygienic white-tile factory environment, "
     "no text or labels on any equipment. " + COMMON),

    ("facility/fish-scanner-3.jpg", "4:3",
     DAYLIGHT + "quality control technician in white coat standing next to "
     "industrial scanner at Korean seafood factory, examining the machine "
     "interior. Monitor in background shows abstract neutral X-ray silhouette "
     "of fish without any text or numbers. Stainless steel equipment with "
     "clean blank surfaces, face of technician angled away. " + COMMON),

    # ───── Contact 1장 ─────
    ("hero/dawn-unloading.jpg", "21:9",
     DAWN + "wide shot of Yeosu fishing harbor at early morning: fishing boats tied "
     "up at the pier, workers unloading crates of fresh fish onto the dock, "
     "calm natural sea behind, bright productive morning atmosphere, "
     "modern Korean maritime industry scene. " + COMMON),
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
            "raw": True,
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
