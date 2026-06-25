from base64 import b64encode
from pathlib import Path
import mimetypes
import re

import streamlit as st
import streamlit.components.v1 as components


ROOT = Path(__file__).parent
DIST = ROOT / "dist"
ASSETS = DIST / "assets"


def data_uri(path: Path) -> str:
    mime_type = mimetypes.guess_type(path.name)[0] or "application/octet-stream"
    encoded = b64encode(path.read_bytes()).decode("ascii")
    return f"data:{mime_type};base64,{encoded}"


def inline_assets(html: str) -> str:
    def inline_css(match):
        href = match.group(1).lstrip("./")
        css_path = DIST / href
        if not css_path.exists():
            return match.group(0)
        return f"<style>{css_path.read_text(encoding='utf-8')}</style>"

    def inline_js(match):
        src = match.group(1).lstrip("./")
        js_path = DIST / src
        if not js_path.exists():
            return match.group(0)
        script = js_path.read_text(encoding="utf-8")
        for asset_path in ASSETS.glob("*"):
            if asset_path.is_file() and asset_path.suffix.lower() in {".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"}:
                uri = data_uri(asset_path)
                script = script.replace(f"./assets/{asset_path.name}", uri)
                script = script.replace(f"/assets/{asset_path.name}", uri)
        return f"<script>{script}</script>"

    html = re.sub(r'<link[^>]+href="([^"]+\.css)"[^>]*>', inline_css, html)
    html = re.sub(r'<script[^>]+src="([^"]+\.js)"[^>]*></script>', inline_js, html)
    for asset_path in ASSETS.glob("*"):
        if asset_path.is_file() and asset_path.suffix.lower() in {".svg", ".png", ".jpg", ".jpeg", ".webp", ".gif"}:
            html = html.replace(f"./assets/{asset_path.name}", data_uri(asset_path))
            html = html.replace(f"/assets/{asset_path.name}", data_uri(asset_path))
    return html


st.set_page_config(
    page_title="Hadoota — every toy tells a tale",
    page_icon=str(ROOT / "src" / "assets" / "logo-mark.svg"),
    layout="wide",
)

st.markdown(
    """
    <style>
      .block-container { padding: 0; max-width: 100%; }
      header, footer, [data-testid="stToolbar"] { display: none; }
      iframe { display: block; }
    </style>
    """,
    unsafe_allow_html=True,
)

index_path = DIST / "index.html"

if not index_path.exists():
    st.error("Build files are missing. Run `npm run build` before launching Streamlit.")
else:
    html = inline_assets(index_path.read_text(encoding="utf-8"))
    components.html(html, height=900, scrolling=True)
