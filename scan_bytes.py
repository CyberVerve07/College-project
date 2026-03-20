import os

# Hex for ₱ (Philippine Peso) is 0xE2 0x82 0xB1 in UTF-8
BAD_BYTES = b'\xe2\x82\xb1'
# Hex for ₹ (Indian Rupee) is 0xE2\x82\xb9 in UTF-8
GOOD_BYTES = b'\xe2\x82\xb9'

def scan_dir(directory):
    for root, dirs, files in os.walk(directory):
        if '.git' in dirs:
            dirs.remove('.git')
        if 'node_modules' in dirs:
            dirs.remove('node_modules')
        if '.next' in dirs:
            dirs.remove('.next')
            
        for file in files:
            if file.endswith(('.ts', '.tsx', '.js', '.jsx', '.json', '.css')):
                path = os.path.join(root, file)
                try:
                    with open(path, 'rb') as f:
                        data = f.read()
                        if BAD_BYTES in data:
                            print(f"FOUND ₱ in {path}")
                        if GOOD_BYTES in data:
                            # print(f"FOUND ₹ in {path}")
                            pass
                except Exception as e:
                    pass

scan_dir(r'c:\Users\lenovo\Freelaancing-project')
