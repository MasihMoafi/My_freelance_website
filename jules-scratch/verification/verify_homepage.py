import time
from playwright.sync_api import sync_playwright, expect

def run():
    with sync_playwright() as p:
        browser = p.chromium.launch(headless=True)
        page = browser.new_page()
        page.goto("http://localhost:3000")

        # Give the server plenty of time to start
        time.sleep(20)

        # Take the screenshot
        page.screenshot(path="jules-scratch/verification/homepage_final.png")

        browser.close()

if __name__ == "__main__":
    run()
