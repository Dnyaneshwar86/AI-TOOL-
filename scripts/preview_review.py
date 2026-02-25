from pathlib import Path
from html.parser import HTMLParser

ROOT = Path(__file__).resolve().parent.parent
html_files = sorted([p for p in ROOT.glob('*.html')])

class LinkParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []
        self.has_title = False
        self.has_description = False
        self.has_viewport = False

    def handle_starttag(self, tag, attrs):
        attrs = dict(attrs)
        if tag == 'a' and 'href' in attrs:
            self.links.append(attrs['href'])
        if tag == 'title':
            self.has_title = True
        if tag == 'meta' and attrs.get('name') == 'description':
            self.has_description = True
        if tag == 'meta' and attrs.get('name') == 'viewport':
            self.has_viewport = True

missing = []
broken = []
all_links = 0

for file in html_files:
    parser = LinkParser()
    parser.feed(file.read_text(encoding='utf-8'))

    if not parser.has_title:
        missing.append((file.name, 'missing <title>'))
    if not parser.has_viewport:
        missing.append((file.name, 'missing viewport meta'))
    if not parser.has_description:
        missing.append((file.name, 'missing description meta'))

    for href in parser.links:
        all_links += 1
        if href.startswith(('http://', 'https://', 'mailto:', 'tel:', '#', 'javascript:')):
            continue
        target = href.split('#', 1)[0].split('?', 1)[0]
        if not target:
            continue
        if not (ROOT / target).exists():
            broken.append((file.name, href))

print(f'HTML files scanned: {len(html_files)}')
print(f'Anchor links scanned: {all_links}')
print(f'Metadata issues: {len(missing)}')
print(f'Broken local links: {len(broken)}')

if missing:
    print('\nMetadata issues:')
    for file, issue in missing:
        print(f'- {file}: {issue}')

if broken:
    print('\nBroken links:')
    for file, href in broken:
        print(f'- {file}: {href}')
