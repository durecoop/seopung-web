"""
Flux 1.1 Pro Ultra로 certification 페이지용 설비 이미지 4장 재생성.
자연 조명·현실적 질감, AI 합성 티 최소화.
"""
import argparse, os, sys, time
from pathlib import Path
import requests

ENV_PATH = Path(r"D:/2_Projects/automation/planning-automation/.env")
for line in ENV_PATH.read_text(encoding="utf-8").splitlines():
    if line.startswith("FAL_KEY="):
        os.environ["FAL_KEY"] = line.split("=", 1)[1].strip()
        break

import fal_client

ROOT = Path(r"D:/2_Projects/web/Maker_homepade/seopung-web/public/images/facility")

STYLE = (
    "candid documentary photograph inside a real Korean seafood factory, "
    "35mm film look, slight grain, natural ambient fluorescent and daylight mix, "
    "authentic unposed moment, subtle lens softness, no over-retouching, "
    "no dramatic stylization, clean uncluttered background, tidy composition, "
    "ABSOLUTELY NO TEXT ANYWHERE IN FRAME: no letters, no words, no Korean "
    "characters 한글, no English writing, no numbers, no digits, no signs, "
    "no posters, no banners, no labels on equipment, no brand names, "
    "no stickers, no printed text, no displays with readable text, "
    "no warning signs, no typography whatsoever, completely text-free composition, "
    "looks like a real photojournalism snapshot, not a rendered image"
)

IMAGES = [
    # (filename, aspect, prompt)
    ("radiation-tester-2.jpg", "21:9",
     "Wide view of a bright modern Korean seafood quality lab. A white-coated "
     "technician operating a large white industrial radiation spectrometer "
     "machine with blank panel (no text or numbers), testing fresh fish "
     "samples on clean stainless steel tray. Clean white walls, soft LED "
     "lighting, uncluttered blurred background of lab equipment, no posters "
     "or signs on walls. " + STYLE),

    ("radiation-tester.jpg", "4:3",
     "Close-up of a radiation spectrometer in a Korean seafood quality lab. "
     "Clean white industrial housing with blank control surface (no text, "
     "no digits), open stainless steel sample chamber showing fresh fish "
     "fillet inside. A gloved hand in background, bright clean lab feel. "
     + STYLE),

    ("safety-sign.jpg", "4:3",
     "Modern metal detector and X-ray scanner machine on a Korean seafood "
     "packaging line. Stainless steel conveyor belt carrying plain "
     "vacuum-sealed fish packages (no printed labels) through the rectangular "
     "tunnel detector. Clean white factory, soft daylight, spotless floor, "
     "no warning signs or posters anywhere. " + STYLE),

    ("ai-xray-process.png", "4:3",
     "AI X-ray inspection machine on Korean seafood production line. Monitor "
     "in background shows abstract glowing blue silhouette of fish shape "
     "without any text, numbers or readable UI. Stainless steel conveyor with "
     "plain white-wrapped fish packages, clean white factory walls, soft cyan "
     "accent lighting, uncluttered setup. " + STYLE),
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
    images = result.get("images") or []
    if not images:
        return None
    url = images[0].get("url")
    return requests.get(url, timeout=60).content if url else None

def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    for i, (fname, aspect, prompt) in enumerate(IMAGES, 1):
        dest = ROOT / fname
        if dest.exists() and not args.overwrite:
            print(f"[{i}/{len(IMAGES)}] SKIP {fname}")
            continue
        fmt = "png" if fname.endswith(".png") else "jpeg"
        print(f"[{i}/{len(IMAGES)}] GEN  {fname} ({aspect})")
        t0 = time.time()
        data = generate(prompt, aspect, fmt)
        if data is None:
            print("    FAIL")
            continue
        dest.write_bytes(data)
        print(f"    OK ({len(data)//1024} KB, {time.time()-t0:.1f}s)")

if __name__ == "__main__":
    main()
