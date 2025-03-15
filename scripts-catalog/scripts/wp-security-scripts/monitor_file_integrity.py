# Script: monitor_file_integrity.py
# Description: Monitors file integrity of WordPress files using SHA-256 hashes.

import hashlib
import os

# Directory to monitor
wordpress_dir = "/var/www/html"

# Predefined file hashes (Example)
file_hashes = {
    "wp-config.php": "expected_hash_here",
    "index.php": "expected_hash_here"
}

print("Checking file integrity...")

for file, expected_hash in file_hashes.items():
    filepath = os.path.join(wordpress_dir, file)
    if os.path.exists(filepath):
        with open(filepath, "rb") as f:
            file_hash = hashlib.sha256(f.read()).hexdigest()
            if file_hash != expected_hash:
                print(f"WARNING: File integrity compromised for {file}!")
            else:
                print(f"File {file} is intact.")
    else:
        print(f"File {file} not found!")
