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
    "authentic unposed moment, imperfect casual framing, real-world wear and "
    "small dust on surfaces, subtle lens softness, no over-retouching, "
    "no dramatic stylization, no oversaturated colors, no text, no watermark, "
    "looks like a real photojournalism snapshot, not a rendered image"
)

IMAGES = [
    # (filename, aspect, prompt)
    ("radiation-tester-2.jpg", "21:9",
     "Wide panoramic view of a bright modern Korean seafood processing lab. "
     "A white-coated technician operates a Gamma Radiation Spectrometer — "
     "a large white industrial device with digital control panel — testing "
     "fresh fish samples on stainless steel tray. Clean white walls, soft "
     "LED lighting, HACCP-certified clinical environment, blurred background "
     "of laboratory equipment. " + STYLE),

    ("radiation-tester.jpg", "4:3",
     "Close-up of a Gamma Radiation Spectrometer in a Korean seafood quality "
     "control lab. White industrial housing with digital readout display "
     "showing test data, stainless steel sample chamber open with fresh "
     "fish fillet inside. Gloved hand of technician in background adjusting "
     "settings. Bright, clean, precision-instrument look. " + STYLE),

    ("safety-sign.jpg", "4:3",
     "Modern metal detector and X-ray foreign object detection machine on a "
     "Korean seafood packaging line. Stainless steel conveyor belt carrying "
     "vacuum-sealed fish packages through the scanner. Clean white factory "
     "environment, blue safety floor markings, soft daylight from large windows. "
     "Precision food safety inspection scene. " + STYLE),

    ("ai-xray-process.png", "4:3",
     "Futuristic AI X-ray inspection machine on Korean seafood production line. "
     "Glowing blue monitor screen shows X-ray scan image of fish fillet with "
     "AI-detected highlights. Stainless steel conveyor, clean white factory "
     "walls, subtle tech-forward atmosphere with soft cyan accent lighting. "
     "Modern food safety technology. " + STYLE),
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
