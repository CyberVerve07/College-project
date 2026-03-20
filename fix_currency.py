import os
import re

# Correct Rupee symbol
RUPEE = '₹'
# Symbols to replace
BAD_SYMBOLS = ['₱', '₽', 'Rs.', 'RS']

FILES_TO_CHECK = [
    r'c:\Users\lenovo\Freelaancing-project\Images\services-data.ts',
    r'c:\Users\lenovo\Freelaancing-project\Images\hotels-data.ts',
    r'c:\Users\lenovo\Freelaancing-project\Images\himachal-knowledge.ts',
    r'c:\Users\lenovo\Freelaancing-project\AI\ai\flows\itinerary-types.ts',
    r'c:\Users\lenovo\Freelaancing-project\AI\ai\flows\chat-assistant-flow.ts'
]

def fix_file(path):
    if not os.path.exists(path):
        print(f"File not found: {path}")
        return
    
    with open(path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    new_content = content
    for sym in BAD_SYMBOLS:
        new_content = new_content.replace(sym, RUPEE)
    
    # Also replace anything that might be a weirdly encoded Rupee
    # U+20B1 is ₱
    # U+20B9 is ₹
    new_content = new_content.replace('\u20B1', RUPEE)
    
    if new_content != content:
        with open(path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        print(f"Fixed: {path}")
    else:
        print(f"No changes needed: {path}")

for file_path in FILES_TO_CHECK:
    fix_file(file_path)
