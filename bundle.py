import re

# Read all parts
with open('css/style.css', 'r') as f: css = f.read()
with open('js/data.js', 'r') as f: data_js = f.read()
with open('js/storage.js', 'r') as f: storage_js = f.read()
with open('js/calc.js', 'r') as f: calc_js = f.read()
with open('js/app.js', 'r') as f: app_js = f.read()

# Also read each page HTML and extract body content
pages = {}
for page in ['index','characters','create','view','profile']:
    with open(f'{page}.html', 'r') as f:
        pages[page] = f.read()

# Build the bundle: single HTML with everything inline + SPA router
bundle = f"""<!DOCTYPE html>
<html lang="it">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0">
  <meta name="theme-color" content="#080810">
  <link rel="icon" type="image/png" href="assets/app-icon.png">
  <link rel="apple-touch-icon" href="assets/app-icon.png">
  <link rel="manifest" href="manifest.json">
  <meta name="apple-mobile-web-app-capable" content="yes">
  <meta name="mobile-web-app-capable" content="yes">
  <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent">
  <meta name="apple-mobile-web-app-title" content="D&amp;D Sheets">
  <title>D&D Sheets</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700;900&family=Cinzel+Decorative:wght@400;700&family=EB+Garamond:ital,wght@0,400;0,500;0,600;1,400&display=swap" rel="stylesheet">
  <style>
{css}
  </style>
</head>
<body>

<!-- All pages rendered by SPA router -->
<div id="app-root"></div>

<script>
// ============ DATA ============
{data_js}
// ============ STORAGE ============
{storage_js}
// ============ CALC ============
{calc_js}
// ============ SPA ROUTER ============
(function() {{
  const PAGES = {{
    index: `__INDEX_BODY__`,
    chars: `__CHARS_BODY__`,
    create: `__CREATE_BODY__`,
    view: `__VIEW_BODY__`,
    profile: `__PROFILE_BODY__`
  }};

  function getPage() {{
    const h = location.hash.replace('#','') || 'index';
    return h;
  }}

  function navigate(page, params) {{
    if (params) {{
      location.hash = page + '?' + new URLSearchParams(params).toString();
    }} else {{
      location.hash = page;
    }}
  }}

  // Override location.href assignments to use hash routing
  const origHref = Object.getOwnPropertyDescriptor(window.location, 'href');
  window._navigate = navigate;

  function renderPage() {{
    const raw = location.hash.replace('#','');
    const [page, query] = raw.split('?');
    const root = document.getElementById('app-root');
    root.innerHTML = PAGES[page] || PAGES['index'];
    document.body.dataset.page = page || 'index';

    // Fake URLSearchParams for getParam()
    window._currentQuery = query || '';

    // Init page
    const body = document.body;
    if (page === 'index' || !page) initIndexPage();
    else if (page === 'chars') initCharsPage();
    else if (page === 'create') initCreatePage();
    else if (page === 'view') initViewPage();
    else if (page === 'profile') initProfilePage();
  }}

  window.addEventListener('hashchange', renderPage);
  window.addEventListener('load', renderPage);
}}());

// Patch getParam to use hash query
const _origGetParam = typeof getParam === 'function' ? getParam : null;
function getParam(key) {{
  const q = window._currentQuery || '';
  return new URLSearchParams(q).get(key);
}}

// Patch window.location.href navigation
const _navMap = {{
  'index.html': 'index',
  'characters.html': 'chars',
  'create.html': 'create',
  'view.html': 'view',
  'profile.html': 'profile'
}};

// Override all href navigations
Object.defineProperty(window, '_patchedNav', {{ value: true }});

// ============ APP ============
{app_js.replace("window.location.href = 'index.html'", "location.hash='index'")
       .replace("window.location.href = 'characters.html'", "location.hash='chars'")
       .replace("window.location.href = `create.html?id=${{character.id}}`", "location.hash='create?id='+character.id")
       .replace("window.location.href = `view.html?id=${{character.id}}`", "location.hash='view?id='+character.id")
       .replace("window.location.href = `create.html?id=${{id}}`", "location.hash='create?id='+id")
       .replace("window.location.href = `view.html?id=${{id}}`", "location.hash='view?id='+id")}
</script>
</body>
</html>"""

# Extract body content from each page HTML
import re

def extract_body(html):
    m = re.search(r'<body[^>]*>(.*?)</body>', html, re.DOTALL)
    if m:
        content = m.group(1)
        # Remove script tags (we have them inline)
        content = re.sub(r'<script src="[^"]+"></script>', '', content)
        # Remove canvas (we add it)
        return content.strip()
    return ''

def fix_hrefs(html):
    """Convert href="page.html" and href="page.html?x=y" to hash navigation"""
    def replace_href(m):
        url = m.group(1)
        for k,v in _navMap.items():
            if url.startswith(k):
                rest = url[len(k):]
                if rest:
                    return f'href="#{v}{rest}"'
                return f'href="#{v}"'
        return m.group(0)
    return re.sub(r'href="([^"#][^"]*)"', replace_href, html)

_navMap = {
    'index.html': 'index',
    'characters.html': 'chars',
    'create.html': 'create',
    'view.html': 'view',
    'profile.html': 'profile'
}

for page in ['index','chars','create','view','profile']:
    html_page = 'index' if page == 'index' else ('characters' if page == 'chars' else page)
    content = extract_body(pages[html_page])
    content = fix_hrefs(content)
    # Add canvas to each page
    content = '<canvas id="particles-canvas"></canvas>\n<div id="toast-container" class="toast-container"></div>\n' + content
    # Escape backticks and template literal special chars for JS template literal
    content = content.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
    bundle = bundle.replace(f'__{page.upper()}_BODY__', content)

with open('dnd-sheets-bundle.html', 'w') as f:
    f.write(bundle)

print(f"Bundle created: {len(bundle)} chars ({len(bundle)//1024}KB)")
