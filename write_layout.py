content = open('app/layout.js', 'r', encoding='utf-8').read()

new_whatsapp = '''        <div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">
          
            href="https://whatsapp.com/channel/0029VbBbQOK4inoxcWKjHY2v"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-green-500 text-white pl-4 pr-5 py-3 rounded-r-full shadow-lg hover:bg-green-600 transition-all duration-300"
            aria-label="Join our WhatsApp channel"
          >
            <span className="text-sm font-semibold">Join Channel</span>
          </a>
        </div>'''

# Find and replace the broken whatsapp div
import re
fixed = re.sub(
    r'<div className="fixed left-0 top-1/2 -translate-y-1/2 z-40">.*?</div>',
    new_whatsapp,
    content,
    flags=re.DOTALL
)

with open('app/layout.js', 'w', encoding='utf-8') as f:
    f.write(fixed)

print('Done! Check app/layout.js')