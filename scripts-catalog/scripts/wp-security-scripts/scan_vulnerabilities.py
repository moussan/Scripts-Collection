# Script: scan_vulnerabilities.py
# Description: Scans WordPress installation for common vulnerabilities.

import requests

# Define the WordPress site URL
wordpress_url = "https://example.com"

# Vulnerability endpoints to check
endpoints = ["/wp-json/", "/wp-login.php", "/xmlrpc.php"]

print(f"Scanning WordPress site: {wordpress_url}")

for endpoint in endpoints:
    url = wordpress_url + endpoint
    response = requests.get(url)
    if response.status_code == 200:
        print(f"Potentially vulnerable endpoint detected: {url}")
    else:
        print(f"Endpoint secure: {url}")
