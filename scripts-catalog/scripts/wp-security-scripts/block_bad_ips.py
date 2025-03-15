# Script: block_bad_ips.py
# Description: Blocks IPs with suspicious behavior using UFW.

import os

# List of bad IPs
bad_ips = ["192.168.1.10", "203.0.113.5"]

for ip in bad_ips:
    os.system(f"ufw deny from {ip}")
    print(f"Blocked IP: {ip}")
