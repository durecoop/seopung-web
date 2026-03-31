"""모든 페이지 스크린샷 캡처"""

from playwright.sync_api import sync_playwright
import os

BASE = 'https://durecoop.github.io/seopung-web'
OUT = 'D:/2_Projects/web/Maker_homepade/seopung-web/screenshots'
os.makedirs(OUT, exist_ok=True)

PAGES = [
    ('/', 'home', '메인'),
    ('/about', 'about', '회사소개'),
    ('/process', 'process', '생산공정'),
    ('/technology', 'technology', '기술설비'),
    ('/certification', 'certification', '품질인증'),
    ('/products', 'products', '제품'),
    ('/gulbi', 'gulbi', '영광굴비'),
    ('/vision', 'vision', '비전'),
    ('/contact', 'contact', '문의'),
    ('/news', 'news', '소식'),
    ('/resources', 'resources', '자료실'),
]

with sync_playwright() as p:
    browser = p.chromium.launch()
    page = browser.new_page(viewport={'width': 1280, 'height': 720})

    for path, name, label in PAGES:
        url = f'{BASE}{path}'
        print(f'[{label}] {url}')
        page.goto(url, wait_until='networkidle')
        page.wait_for_timeout(2000)

        # Hero screenshot (viewport)
        page.screenshot(path=f'{OUT}/{name}_hero.png')

        # Full page screenshot
        page.screenshot(path=f'{OUT}/{name}_full.png', full_page=True)

        print(f'  -> {name}_hero.png, {name}_full.png')

    # Mobile screenshots (3 key pages)
    mobile = browser.new_page(viewport={'width': 390, 'height': 844})
    for path, name, label in [('/', 'home', '메인'), ('/about', 'about', '회사소개'), ('/products', 'products', '제품')]:
        url = f'{BASE}{path}'
        print(f'[모바일-{label}] {url}')
        mobile.goto(url, wait_until='networkidle')
        mobile.wait_for_timeout(2000)
        mobile.screenshot(path=f'{OUT}/{name}_mobile.png')
        print(f'  -> {name}_mobile.png')

    mobile.close()
    browser.close()

print('\n완료!')
