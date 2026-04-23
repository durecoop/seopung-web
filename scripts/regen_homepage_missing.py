"""
홈페이지에서 실제 사용되지만 첫 번째 재생성(regen_homepage_images.py)에 포함되지 않았던
team/, facility/, gulbi/ 이미지 11장 재생성.
동일한 톤: AI·필터감 제거, 젊고 진취적.
"""
import os, time
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

DAYLIGHT = "bright natural daylight, clean even lighting, soft shadows, "

IMAGES = [
    # ───── Team (about·vision·TeamSection) 5장 ─────
    ("team/factory-team.jpg", "16:9",
     DAYLIGHT + "group of young and middle-aged Korean workers in clean white "
     "sanitary uniforms and white caps standing together on clean stainless-steel "
     "processing floor of modern seafood factory. Confident friendly expressions, "
     "faces not closely detailed, diverse ages, bright hygienic workplace, "
     "teamwork atmosphere. " + COMMON),

    ("team/factory-team-2.jpg", "16:9",
     DAYLIGHT + "three Korean factory workers in white uniforms collaborating "
     "at a stainless steel worktable in a modern seafood processing plant, "
     "pointing at a work piece, focused and positive expressions, "
     "bright clean hygienic environment. " + COMMON),

    ("team/director-writing.jpg", "4:3",
     DAYLIGHT + "Korean male executive in his 50s wearing clean navy suit, "
     "sitting at a clean modern office desk writing in a notebook, thoughtful "
     "expression, face partly visible in 3/4 view, bright airy office with "
     "minimal neutral decor, no text visible on papers or screens. " + COMMON),

    ("team/office-team.jpg", "16:9",
     DAYLIGHT + "small team of Korean office workers in smart casual business "
     "attire in a modern bright corporate office, gathered around a desk "
     "looking at a laptop, collaborative and optimistic mood, minimalist "
     "Scandinavian-style office, large windows with natural light. " + COMMON),

    ("team/auction-team.jpg", "16:9",
     "early morning bright natural light, Korean seafood auction hall. "
     "Two or three Korean men in practical work clothes standing at the edge "
     "of an auction area inspecting fresh fish in blue plastic crates, "
     "attentive expressions, clean concrete floor, no signs or text visible. "
     + COMMON),

    # ───── Facility (certification) 3장 ─────
    ("facility/radiation-tester.jpg", "4:3",
     DAYLIGHT + "modern gamma radiation spectrometer analyzer in a clean Korean "
     "seafood quality lab. Stainless steel analyzer unit with a plain blank "
     "control panel on a tidy bright lab bench, Korean technician in white "
     "coat and gloves operating it in background, spotless hygienic lab "
     "environment. " + COMMON),

    ("facility/radiation-tester-2.jpg", "16:9",
     DAYLIGHT + "close detail shot of modern radiation testing instrument on "
     "a clean lab bench, with a small sample of fresh fish fillet nearby in "
     "a stainless steel tray, scientist's gloved hand carefully placing the "
     "sample, bright clean laboratory atmosphere. " + COMMON),

    ("facility/safety-sign.jpg", "4:3",
     DAYLIGHT + "clean modern food processing area of a Korean seafood factory, "
     "with blank plain metal wall signs (no text), orderly arranged workstations, "
     "stainless steel tables, clean white walls and tiled floor, workers in "
     "uniforms in the distance out of focus, bright hygienic production environment. "
     + COMMON),

    # ───── Gulbi 2장 ─────
    ("gulbi/tying.jpg", "4:3",
     DAYLIGHT + "close-up overhead view of Korean artisan's hands tying ten "
     "premium Yeonggwang dried yellow croaker (gulbi) together with traditional "
     "straw rope, golden-amber natural fish color, placed on clean natural "
     "wooden surface, realistic and authentic traditional craft atmosphere. "
     + COMMON),

    ("gulbi/drying-rows.jpg", "16:9",
     DAYLIGHT + "long rows of Korean premium yellow croaker hanging neatly to "
     "dry on clean wooden bars inside a tidy modern drying room, uniform "
     "golden color, natural air circulation, clean hygienic professional "
     "drying facility. " + COMMON),
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
    for i, (rel, aspect, prompt) in enumerate(IMAGES, 1):
        dest = ROOT / rel
        dest.parent.mkdir(parents=True, exist_ok=True)
        fmt = "png" if rel.endswith(".png") else "jpeg"
        print(f"[{i}/{len(IMAGES)}] GEN  {rel} ({aspect})", flush=True)
        t0 = time.time()
        data = generate(prompt, aspect, fmt)
        if data is None:
            print("    FAIL", flush=True)
            continue
        dest.write_bytes(data)
        print(f"    OK ({len(data)//1024} KB, {time.time()-t0:.1f}s)", flush=True)


if __name__ == "__main__":
    main()
